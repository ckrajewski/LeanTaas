import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Curiosity from '../components/Curiosity/Curiosity';

configure({ adapter: new Adapter() });

describe('Curiosity component', () => {
  test('renders', () => {
    const wrapper = shallow(<Curiosity />);
    expect(wrapper.exists()).toBe(true);
  });
});
