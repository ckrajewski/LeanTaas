import React from 'react';
import { connect } from 'react-redux';
import Select from '../Select/Select';
import SelectItem from '../SelectItem/SelectItem';
import Rover from '../Rover/Rover';
import { isEmptyObject } from '../../Util';
import { fetchRoverInfo, fetchRoverPhotos } from '../../actions/action';
import './Toolbar.css';
// const cx = classNames.bind(styles);

class Toolbar extends React.Component {
  constructor() {
    super();
    this.selectNode = null;
    this.state = {
      sol: null,
      cameras: null,
    };
  }

  componentDidMount() {
    const { fetchRoverInfo } = this.props;
    fetchRoverInfo();
  }

  handleSelect = (values) => {
    this.setState({ cameras: values }, () => {
      const { sol, cameras } = this.state;
      const { fetchRoverPhotos } = this.props;
      if (sol !== null) {
        fetchRoverPhotos(cameras, sol);
      }
    });
  }

  handleInputChange = (event) => {
    const sol = event.target.value;
    this.setState({ sol }, () => {
      const { sol, cameras } = this.state;
      const { fetchRoverPhotos } = this.props;
      fetchRoverPhotos(cameras, sol);
    });
  }

  render() {
    const { sol } = this.state;
    const { rover } = this.props;
    return (
      <div styleName="toolbar" onMouseMove={this.handleMouseMove}>
        <div styleName="cameraContainer">
          <div styleName="label"> Cameras </div>
          <Select onSelect={this.handleSelect}>
            {
          !isEmptyObject(rover) ? rover.rover.cameras.map((camera) => {
            const { name, full_name } = camera;
            return (
              <SelectItem value={name}>
                {full_name}
              </SelectItem>
            );
          }) : null
        }
          </Select>
        </div>
        <div styleName="inputContainer">
          <div styleName="label"> Sol </div>
          <input styleName="input" type="number" min={0} value={sol} onChange={this.handleInputChange} />
        </div>
      </div>
    );
  }
}

const mapToStateProps = state => ({
  rover: state.roverReducer.rover,
});

const mapDispatchToProps = dispatch => ({
  fetchRoverInfo: () => dispatch(fetchRoverInfo()),
  fetchRoverPhotos: (cameras, sol) => dispatch(fetchRoverPhotos(cameras, sol)),
});

export default connect(mapToStateProps, mapDispatchToProps)(Toolbar);
