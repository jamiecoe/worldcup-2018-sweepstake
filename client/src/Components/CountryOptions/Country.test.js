import React from 'react';
import { shallow } from 'enzyme';
import Country from './Country';

describe('Country', () => {
  const props = { name: 'Test Country', imageUrl: 'https://test.com/test-image.jpg' };
  const country = shallow(<Country {...props}/>);

  it('renders properly', () => {
    expect(country).toMatchSnapshot();
  });
});