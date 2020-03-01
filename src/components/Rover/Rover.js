import React from 'react';
import './Rover.css';

const Rover = (props) => {
  const { photos, camera } = props;
  return (
    <div styleName="rover">
      <div styleName="camera">
        {' '}
        {camera}
        {' '}
      </div>
      <div styleName="photoLabel">
        Photos:
        {' '}
        {photos.length}
      </div>
      <div>
          Sample Image :
        <div styleName="imgContainer">
          <img src={photos[0].img_src} alt="dsd" height="200" width="200" />
        </div>
      </div>
    </div>
  );
};
export default Rover;
