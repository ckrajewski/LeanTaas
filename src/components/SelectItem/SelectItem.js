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
    this.setState(prevState => ({ checked: !prevState.checked }), () => {
      const {
        handleSelect, value, children,
      } = this.props;
      const { checked } = this.state;
      handleSelect(checked, event, { children, value });
    });
  }

  render() {
    const {
      value, children, selectAll, clearAll,
    } = this.props;
    const { checked } = this.state;
    if ((selectAll && !checked) || (clearAll && checked)) {
      this.handleSelect();
    }
    return (
      <div styleName="row" onClick={this.handleSelect}>
        <div styleName="checkbox">
          <input type="checkbox" checked={checked} />
        </div>
        <div>
          {children}
        </div>
      </div>
    );
  }
}
