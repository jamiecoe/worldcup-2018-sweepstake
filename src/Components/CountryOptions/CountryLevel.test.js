import React from 'react';
import { shallow } from 'enzyme';
import CountryLevel from './CountryLevel';

describe('CountryLevel', () => {
  const props = { level: 'Top' };
  const countryLevel = shallow(<CountryLevel {...props}/>);

  it('renders properly', () => {
    expect(countryLevel).toMatchSnapshot();
  });
});