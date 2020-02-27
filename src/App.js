import React from 'react';
import { connect } from 'react-redux';
// import classNames from 'classnames/bind';
import { fetchStuff } from './actions/action';
import Curiosity from './components/Curiosity/Curiosity';

// const cx = classNames.bind(styles);

class App extends React.Component {
  render() {
    /*
    const className = cx({
      notAnUglyBackground: true,
    });
    */
    return (
      <div>
        <Curiosity />
      </div>
    );
  }
}

const mapToStateProps = state => ({
  data: state.weather,
});

const mapDispatchToProps = dispatch => ({
  fetchStuff: () => dispatch(fetchStuff()),
});


export default connect(mapToStateProps, mapDispatchToProps)(App);
