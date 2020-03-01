import React from 'react';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Rover from '../components/Rover/Rover';

configure({ adapter: new Adapter() });

const photos = [{img_src:'./someImage.png'}];
describe('Rover component', () => {
  test('renders', () => {
    const wrapper = shallow(<Rover photos={photos} />);
    expect(wrapper.exists()).toBe(true);
  });
});
