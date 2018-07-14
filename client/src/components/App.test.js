import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('App', () => {
  const props = {
    countries: {},
    players: []
  }

  const app = shallow(<App {...props} />);

  it('renders properly', () => {
    expect(app).toMatchSnapshot();
  });
});
