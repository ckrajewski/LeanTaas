import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Toolbar from '../components/Toolbar/Toolbar';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const storeStateMock = {
    roverReducer: {
      rover: {},
    },
};

describe('Toolbar component', () => {
  test('renders', () => {
  	const store = mockStore(storeStateMock);

    const wrapper = shallow(<Toolbar store={store} />).shallow();
    expect(wrapper.exists()).toBe(true);
  });
});
