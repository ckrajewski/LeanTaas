export default function reducer(state = {
  fetching: false,
  rover: {},
  roverPhotos: {},
}, action) {
  switch (action.type) {
    case 'RECEIVED_ROVER':
    {
      return { ...state, fetched: true, rover: action.payload };
    }
    case 'RECEIVED_ROVER_ERROR':
    {
      return { ...state, fetched: false, rover: action.payload };
    }
    case 'RECEIVED_ROVER_PHOTOS':
    {
      return { ...state, fetched: true, roverPhotos: action.payload };
    }
    case 'RECEIVED_ROVER_PHOTOS_ERROR':
    {
      return { ...state, fetched: false, roverPhotos: action.payload };
    }
  }
  return state;
}
