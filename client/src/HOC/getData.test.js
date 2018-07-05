import React from 'react';
import { shallow } from 'enzyme';
import App from '../Components/App';
import getData from './getData';

describe('getData HOC', () => {
  it('should produce a component that renders properly', () => {
    const appWithData = getData(App);
    const appWithDataRendered = shallow(<appWithData />);

    expect(appWithDataRendered).toMatchSnapshot();
  })
})