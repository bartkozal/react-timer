import * as React from "react";
import Pointer from "../Pointer";
import { svgPath, convertMinutesToFrames } from "../utils";

import * as Shield from "./shield.svg";
import * as Glass from "./glass.svg";

interface TimerProps {
  isRunning: boolean;
  minutes: number;
}

interface TimerState {
  counter: number;
  tick: number | void;
}

const MAXIMUM_MINUTES = 60;

export default class extends React.PureComponent<TimerProps, TimerState> {
  state = {
    counter: 0,
    tick: 0
  };

  componentWillReceiveProps({ minutes, isRunning }) {
    this.setState({ counter: convertMinutesToFrames(minutes) }, () => {
      isRunning ? this.start() : this.stop();
    });
  }

  componentWillUnmount() {
    this.stop();
  }

  tick = () => {
    if (this.state.counter <= 0) return;

    this.setState({
      counter: this.state.counter - 1,
      tick: requestAnimationFrame(this.tick)
    });
  };

  start = () => {
    this.setState({
      tick: requestAnimationFrame(this.tick)
    });
  };

  stop = () => {
    this.setState({
      tick: cancelAnimationFrame(this.state.tick)
    });
  };

  render() {
    const percent =
      100 * this.state.counter / convertMinutesToFrames(MAXIMUM_MINUTES);
    return (
      <div className="Timer">
        <img src={svgPath(Shield)} alt="Shield" />
        <Pointer percent={percent} />
        <img src={svgPath(Glass)} alt="Glass" />
      </div>
    );
  }
}
