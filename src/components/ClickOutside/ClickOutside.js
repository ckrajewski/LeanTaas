import React from 'react';
import Grid from '../Grid/Grid';
import Toolbar from '../Toolbar/Toolbar';

const ClickOutside = (WrapperComponent) => {
  class HOC extends React.Component {
    constructor() {
      super();
      this.root = React.createRef();
      this.state = {
        clickedOutside: false,
      };
    }

    componentDidMount() {
      document.addEventListener('click', this.handleOutsideClick);
    }

  handleOutsideClick = (event) => {
    const { onClickOutside } = this.props;
    const { clickedOutside } = this.state;
    if (this.root.current && !this.root.current.contains(event.target)) {
      this.setState({ clickedOutside: true });
    } else if (clickedOutside) {
      this.setState({ clickedOutside: false });
    }
  };

  render() {
    const { clickedOutside } = this.state;
    return (

      <WrapperComponent {...this.props} refProp={this.root} clickedOutside={clickedOutside} />

    );
  }
  }
  return HOC;
};
export default ClickOutside;
