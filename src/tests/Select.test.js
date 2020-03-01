import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Select from '../components/Select/Select';

configure({ adapter: new Adapter() });

describe('Select component', () => {
  test('renders', () => {
    const wrapper = shallow(<Select />);
    expect(wrapper.exists()).toBe(true);
  });
});
