import React from 'react';
import './Select.css';

export default class Select extends React.Component {
  constructor() {
    super();
    this.allSelectedValues = [];
    this.state = {
      dropDownVisible: false,
      selected: [],
      selectAll: false,
      clearAll: false,
    };
  }

  componentDidMount() {
    const { children } = this.props;
    const { allSelectedValues } = this;
    React.Children.map(children, (child) => {
      allSelectedValues.push(child.props.value);
    });
  }

  handleSelect = (checked, info) => {
    const { selected } = this.state;
    const { value } = info;
    debugger;
    if (checked) {
      selected.push(info.value);
    } else {
      const index = selected.findIndex(item => item === value);
      selected.splice(index, 1);
    }
    this.setState({ selected, clearAll: false, selectAll: false }, () => {
      this.onSelect();
    });
  }

  handleClearAll = () => {
    this.setState({ clearAll: true, selectAll: false, selected: [] }, () => {
      this.onSelect();
      this.setState({ clearAll: false });
    });
  }

  handleSelectAll = () => {
    const { allSelectedValues } = this;
    this.setState({ clearAll: false, selectAll: true, selected: [...allSelectedValues] }, () => {
      this.onSelect();
      this.setState({ selectAll: false });
    });
  }

  onSelect = () => {
    const { onSelect } = this.props;
    const { selected } = this.state;
    onSelect(selected);
  }

  handleClickDropDown = (event) => {
    this.setState(prevState => ({ dropDownVisible: !prevState.dropDownVisible }));
  }

  render() {
    const { children } = this.props;
    const {
      dropDownVisible, selected, selectAll, clearAll,
    } = this.state;
    const visibleCSS = dropDownVisible ? '' : 'hidden';
    return (
      <div onBlur={() => {
        debugger;
        this.setState({ dropDownVisible: false });
      }}
      >
        <div styleName="dropDownSelector" onClick={this.handleClickDropDown}>
          {selected.length}
          {' '}
        Selected
        </div>
        <div styleName={`dropDownContainer ${visibleCSS}`}>
          <div styleName="selectors">
            <div styleName="clearAll" onClick={this.handleClearAll}> Clear All </div>
            <div styleName="selectAll" onClick={this.handleSelectAll}> Select All </div>
          </div>
          <div>
            {React.Children.map(children, child => (
              React.cloneElement(child, { handleSelect: this.handleSelect, selectAll, clearAll })))}
          </div>
        </div>
      </div>
    );
  }
}
