import React from 'react';
import { connect } from 'react-redux';
import Rover from '../Rover/Rover';
import './Grid.css';

class Toolbar extends React.Component {
  render() {
    const { roverPhotos } = this.props;
    debugger;
    return (
      <div styleName="grid">
        {
          Object.keys(roverPhotos).map((camera) => {
            const photos = roverPhotos[camera];
            const { cameraName } = photos[0];
            return (<Rover camera={cameraName} photos={photos} />);
          })
        }
      </div>
    );
  }
}

const mapToStateProps = state => ({
  roverPhotos: state.roverReducer.roverPhotos,
});

export default connect(mapToStateProps, null)(Toolbar);
