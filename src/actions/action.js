import axios from 'axios';

export function fetchRoverInfo() {
  return function (dispatch) {
    axios.get('/api/rover')
      .then((response) => {
        dispatch({ type: 'RECEIVED_ROVER', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECEIVED_ROVER_ERROR', payload: err });
      });
  };
}

export function fetchRoverPhotos(cameras, sol) {
  return function (dispatch) {
    axios.post('/api/roverPhotos', { cameras, sol })
      .then((response) => {
        dispatch({ type: 'RECEIVED_ROVER_PHOTOS', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'RECEIVED_ROVER_PHOTOS_ERROR', payload: err });
      });
  };
}
