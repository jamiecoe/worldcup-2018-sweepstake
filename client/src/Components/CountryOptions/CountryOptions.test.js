import React from 'react';
import { shallow } from 'enzyme';
import CountryOptions from './CountryOptions';

describe('CountryOptions', () => {
  const props = {
    countries: {
      top: {},
      mid: {},
      low: {},
    },
  };
  const countryOptions = shallow(<CountryOptions {...props} />);

  it('renders properly', () => {
    expect(countryOptions).toMatchSnapshot();
  });
});
