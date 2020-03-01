import React from 'react';
import './Select.css';

export default class Select extends React.Component {
  constructor() {
    super();
    this.allSelectedValues = [];
    this.dropDown = null;
    this.state = {
      dropDownVisible: false,
      selected: [],
      selectAll: false,
      clearAll: false,
    };
  }

  populateAllSelectValues = () => {
    const { children } = this.props;
    React.Children.map(children, (child) => {
      this.allSelectedValues.push(child.props.value);
    });
  }

  handleSelect = (checked, info) => {
    const { selected } = this.state;
    const { value } = info;
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
    if (children && children.length > 0 && this.allSelectedValues.length === 0) {
      this.populateAllSelectValues();
    }
    const visibleCSS = dropDownVisible ? '' : 'hidden';
    return (
      <div>
        <div styleName="dropDownSelectorWrapper">
          <div styleName="dropDownSelectorContainer" onClick={this.handleClickDropDown}>
            <div styleName="dropDownSelector">
              {selected.length}
              {' '}
            Selected
            </div>
            <div styleName="arrowContainer">
              <div styleName="arrowDown" />
            </div>
          </div>
        </div>
        <div styleName={`dropDownContainer ${visibleCSS}`}>
          <div styleName="selectors">
            <div styleName="selectAll" onClick={this.handleSelectAll}> Select All </div>
            <div styleName="clearAll" onClick={this.handleClearAll}> Clear All </div>
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
