import * as React from "react";

interface TimerProps {
  minutes: number;
}

interface TimerState {
  counter: number;
  isRunning: boolean;
  tick: number | void;
}

class Timer extends React.Component<TimerProps, TimerState> {
  state = {
    counter: this.props.minutes * 60 * 60,
    isRunning: false,
    tick: 0,
  };

  componentWillUnmount() {
    this.stop();
  }

  toggle = () => {
    this.setState(
      {
        isRunning: !this.state.isRunning,
      },
      () => {
        this.state.isRunning ? this.start() : this.stop();
      }
    );
  };

  tick = () => {
    if (this.state.counter <= 0) return;

    this.setState({
      counter: this.state.counter - 1,
      tick: requestAnimationFrame(this.tick),
    });
  };

  start = () => {
    this.setState({
      tick: requestAnimationFrame(this.tick),
    });
  };

  stop = () => {
    this.setState({
      tick: cancelAnimationFrame(this.state.tick),
    });
  };

  render() {
    return (
      <div>
        <div>{this.state.counter}</div>
        <button onClick={this.toggle}>
          {this.state.isRunning ? "Stop" : "Start"}
        </button>
      </div>
    );
  }
}

export default Timer;
