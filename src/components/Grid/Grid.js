import React from 'react';
import { connect } from 'react-redux';
import Rover from '../Rover/Rover';
import './Grid.css';

const Toolbar = (props) => {
  const { roverReducer } = props;
  const { fetched } = roverReducer;
  const { roverPhotos } = roverReducer;
  return (
    <div styleName="grid">
      {
        fetched === false && Object.keys(roverPhotos).length === 0
          ? (<div styleName="loading"> Loading... </div>)
          : fetched && Object.keys(roverPhotos).length === 0
            ? (<div styleName="loading"> No Images Found :&apos;( </div>)
            : Object.keys(roverPhotos).map((camera) => {
              const photos = roverPhotos[camera];
              const { cameraName } = photos[0];
              return (<Rover camera={cameraName} photos={photos} />);
            })
        }
    </div>
  );
};

const mapToStateProps = state => ({
  roverReducer: state.roverReducer,
});

export default connect(mapToStateProps, null)(Toolbar);
