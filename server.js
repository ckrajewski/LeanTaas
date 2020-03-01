const path = require('path');
const express = require('express');

const app = express();
const axios = require('axios');
const bodyParser = require('body-parser');
const openBrowser = require('react-dev-utils/openBrowser');

const isEmptyObject = obj => Object.entries(obj).length === 0 && obj.constructor === Object;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});
if (openBrowser('http://localhost:8080')) {
  console.log('The browser tab has been opened!');
}

const parsePhotos = (data, cameras) => {
  // if empty
  if (isEmptyObject(data)) {
    return {};
  }
  // create map by photo type
  return data.photos.reduce((photos, photo) => {
    const cameraName = photo.camera.name;
    if (cameras.includes(cameraName)) {
      const currentPhoto = {};
      currentPhoto.cameraName = photo.camera.full_name;
      currentPhoto.img_src = photo.img_src;
      if (typeof photos[cameraName] === 'undefined') {
        photos[cameraName] = []; // eslint-disable-line no-param-reassign
      }
      photos[cameraName].push(currentPhoto);
    }
    return photos;
  }, {});
};
app.get('/api/rover', (req, res) => {
  axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/?api_key=DEMO_KEY')
    .then((response) => {
      res.send(response.data);
    }).catch((error) => {
      console.log(error);
    });
});

app.post('/api/roverPhotos', (req, res) => {
  const { cameras, sol } = req.body;
  let url = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?api_key=DEMO_KEY';
  if (sol >= 0) {
    url += `&sol=${sol}`;
  }
  if (cameras.length === 1) {
    url += `&camera=${cameras[0]}`;
  }
  axios.get(url)
    .then((response) => {
      res.send(parsePhotos(response.data, cameras));
    }).catch((error) => {
      console.log(error);
    });
});
