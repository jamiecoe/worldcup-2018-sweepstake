import React from 'react';
import { shallow } from 'enzyme';
import CountryOptions from './CountryOptions';

describe('CountryOptions', () => {
  const countryOptions = shallow(<CountryOptions />);

  it('renders properly', () => {
    expect(countryOptions).toMatchSnapshot();
  });
});