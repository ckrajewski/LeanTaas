import React from 'react';

export default class Select extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: [],
      selectAll: false,
      clearAll: false,
    };
  }

  handleSelect = (checked, event, info) => {
    const { selected } = this.state;
    const { value } = info;
    debugger;
    if (checked) {
      selected.push(info);
    } else {
      const index = selected.findIndex(item => item.value === value);
      selected.splice(index, 1);
    }
    this.setState({ selected });
  }

  render() {
    const { children } = this.props;
    const { selected, selectAll, clearAll } = this.state;

    return (
      <div>
        <div>
          {selected.length}
          {' '}
        Selected
        </div>
        <div> Clear All </div>
        <div> Select All </div>
        <div>
          {React.Children.map(children, child => (
            React.cloneElement(child, { handleSelect: this.handleSelect, selectAll, clearAll })))}
        </div>
      </div>
    );
  }
}
