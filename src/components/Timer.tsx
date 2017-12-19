import * as React from "react";

interface TimerProps {
  minutes: number;
}

interface TimerState {
  isRunning: boolean;
}

export default class Timer extends React.Component<TimerProps, TimerState> {
  state = {
    isRunning: false,
    time: this.props.minutes * 60,
  };

  toggle = () => {
    this.setState({
      isRunning: !this.state.isRunning,
    });
  };

  render() {
    return (
      <div>
        <div>{this.state.time}</div>
        <button onClick={this.toggle}>
          {this.state.isRunning ? "Stop" : "Start"}
        </button>
      </div>
    );
  }
}
