import React, { Component } from 'react';
import { endDate } from '../constants/constants';

class Countdown extends Component {

  constructor() {
    super();
    this.state = {
      endDate,
      countDownString: '',
      timer: setInterval(this.countDown, 1000),
      completed: false
    }
  }

  countDown = () => {
    const now = new Date().getTime();
    const distance = this.state.endDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countDownString = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    this.setState({ countDownString });

    if (distance < 0) {
      clearInterval(this.timer);
      this.setState({ completed: true });
    }
  }

  displayCurrentTimer = () => {
    if (this.state.completed) {
      return <p>Completed!</p>
    }

    return <p>{this.state.countDownString}</p>
  }

  render() {
    return (
      <div>
        <p>The draw will commence at...</p>
        {this.displayCurrentTimer()}
      </div>
    )
  }
}

export default Countdown;
