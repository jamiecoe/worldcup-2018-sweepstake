import React from 'react';
import { shallow } from 'enzyme';
import Rules from './Rules';

describe('Rules', () => {
  const rules = shallow(<Rules />);

  it('should render properly', () => {
    expect(rules).toMatchSnapshot();
  });
});
