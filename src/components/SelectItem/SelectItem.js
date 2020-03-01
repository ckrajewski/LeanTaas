import React from 'react';
import './SelectItem.css';

export default class SelectItem extends React.Component {
  constructor() {
    super();
    this.state = {
      checked: false,
    };
  }

  handleSelect = (event) => {
    if (event.target.input) {
      return;
    }
    this.setState(prevState => ({ checked: !prevState.checked }), () => {
      const {
        handleSelect, value, children,
      } = this.props;
      const { checked } = this.state;
      handleSelect(checked, { children, value });
      // this.setState({ h: false });
    });
  }

  render() {
    const {
      value, children, selectAll, clearAll,
    } = this.props;
    const { checked } = this.state;
    // const checkboxStyling = checked ? 'active' : '';
    if (((selectAll && !checked) || (clearAll && checked))) {
      this.setState(prevState => ({ checked: !prevState.checked }));
    }
    return (
      <div onClick={this.handleSelect} styleName="checkboxRow">
        <label styleName="container">
          {children}
          <input type="checkbox" checked={checked} onClick={event => event.stopPropagation()} />
          <span styleName="checkmark" />
        </label>
      </div>
    );
  }
}
