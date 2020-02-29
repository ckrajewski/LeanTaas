import React from 'react';
import { connect } from 'react-redux';
import Select from '../Select/Select';
import SelectItem from '../SelectItem/SelectItem';
import Rover from '../Rover/Rover';
import { fetchRoverInfo, fetchRoverPhotos } from '../../actions/action';
import './Toolbar.css';
// const cx = classNames.bind(styles);

class Toolbar extends React.Component {
  constructor() {
    super();
    this.selectNode = null;
    this.state = {
      sol: null,
    };
  }

  componentDidMount() {
    const { fetchRoverInfo } = this.props;
    debugger;
    // fetchRoverInfo();
  }

  setWrapperRef = (node) => {
    this.selectNode = node;
  }

  handleSelect = (values) => {
    const { sol } = this.state;
    const { fetchRoverPhotos } = this.props;
    if (values.length > 0) {
      fetchRoverPhotos(values, sol);
    }
  }

  handleMouseMove = (event) => {
    const { selectNode } = this;
  }

  isEmptyObject = obj => Object.entries(obj).length === 0 && obj.constructor === Object;

  render() {
    const { sol } = this.state;
    const { rover } = this.props;
    debugger;
    return (
      <div styleName="toolbar" onMouseMove={this.handleMouseMove}>
        <div styleName="cameraContainer">
          <div styleName="label"> Cameras </div>
          <Select onSelect={this.handleSelect} ref={this.setWrapperRef}>
            {
          !this.isEmptyObject(rover) ? rover.rover.cameras.map((camera, index) => {
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
          <input styleName="input" type="number" min={0} value={sol} onChange={event => this.setState({ sol: event.target.value })} />
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
