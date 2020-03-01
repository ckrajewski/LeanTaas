import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SelectItem from '../components/SelectItem/SelectItem';

configure({ adapter: new Adapter() });

describe('SelectItem component', () => {
  test('renders', () => {
    const wrapper = shallow(<SelectItem />);
    expect(wrapper.exists()).toBe(true);
  });
});
