import React from 'react';
import Select from '../Select/Select';
import SelectItem from '../SelectItem/SelectItem';
import { rover, data } from '../../data';

// const cx = classNames.bind(styles);

export default class Curiosity extends React.Component {
  render() {
    return (
      <div>
        <Select>
          {
          rover.rover.cameras.map((camera, index) => {
            const { name, full_name } = camera;
            return (
              <SelectItem value={name}>
                {full_name}
              </SelectItem>
            );
          })
        }
        </Select>
      </div>
    );
  }
}
