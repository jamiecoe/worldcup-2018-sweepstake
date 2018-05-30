import React from 'react';
import { shallow } from 'enzyme';
import Countdown from './Countdown';

describe('Countdown', () => {
  const countdown = shallow(<Countdown />);

  it('renders properly', () => {
    expect(countdown).toMatchSnapshot();
  });

  it('should have a state property for endDate, with value of June 10, 2018 12:00:00', () => {
    const expectedEndDate = new Date('June 10, 2018 12:00:00').getTime();
    expect(countdown.state().endDate).toEqual(expectedEndDate);
  });

  describe('when the countdown has completed', () => {

    beforeEach(() => {
      countdown.setState({ completed: true });  
    })

    it('should render properly', () => {
      expect(countdown).toMatchSnapshot();
    })
  })

});
