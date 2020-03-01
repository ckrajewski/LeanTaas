import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Grid from '../components/Grid/Grid';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const storeStateMock = {
    roverReducer: {
      roverPhotos: {photos :[{cameraName : 'test'}]},
    },
};

describe('Grid component', () => {
  test('renders', () => {
  	const store = mockStore(storeStateMock);

    const wrapper = shallow(<Grid store={store} />).shallow();
    expect(wrapper.exists()).toBe(true);
  });
});
