import * as React from "react";
import Pointer from "../Pointer";

import { svgPath } from "../utils";
import * as Shield from "./shield.svg";
import * as Glass from "./glass.svg";

interface TimerProps {
  minutes: number;
}

interface TimerState {
  counter: number;
  isRunning: boolean;
  tick: number | void;
}

const MAXIMUM_MINUTES = 60;

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
    const percent = 100 * this.state.counter / (MAXIMUM_MINUTES * 60 * 60);
    return (
      <div>
        <Pointer percent={percent} />
        <img src={svgPath(Glass)} alt="Timer Shield" />
        <img src={svgPath(Shield)} alt="Timer Shield" />
        <div>{this.state.counter}</div>
        <button onClick={this.toggle}>
          {this.state.isRunning ? "Stop" : "Start"}
        </button>
      </div>
    );
  }
}

export default Timer;
