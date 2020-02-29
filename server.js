const path = require('path');
const express = require('express');
const app = express();
const axios = require('axios');
const bodyParser = require("body-parser");
const openBrowser = require('react-dev-utils/openBrowser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
if (openBrowser('http://localhost:8080')) {
    console.log('The browser tab has been opened!');
}
isEmptyObject = obj => Object.entries(obj).length === 0 && obj.constructor === Object;

const parsePhotos = (data, cameras) => {
	//if empty
	if(isEmptyObject(data)) {
		return {};
	}
	//create map by photo type
	return data.photos.reduce((photos, photo) => {
		const cameraName = photo.camera.name;
		if (cameras.includes(cameraName)) {
			let currentPhoto = {};
			currentPhoto.cameraName = photo.camera.full_name;
			currentPhoto.img_src = photo.img_src;
			if( typeof photos[cameraName] === 'undefined') {
				photos[cameraName] = [];
			}
			photos[cameraName].push(currentPhoto);
		}
		return photos;
	},{});
}
app.get('/api/rover', (req, res) => {
    debugger;
    axios.get('https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/?api_key=DEMO_KEY')
        .then(response => {
           res.send(response.data);
        }).catch(error => {
            console.log(error);
        });
});

app.post('/api/roverPhotos', (req, res) => {
    debugger;
    const { cameras, sol} = req.body;
    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${sol}&api_key=DEMO_KEY`)
        .then(response => {
           res.send(parsePhotos(response.data, cameras));
        }).catch(error => {
            console.log(error);
    });
});