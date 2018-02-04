import * as React from "react";
import { DateTime } from "luxon";
import Dial from "../Dial";
import {
  getSvgPath,
  convertEndTimeToFrames,
  convertMinutesToFrames
} from "../utils";
import * as Shield from "./shield.svg";
import * as Glass from "./glass.svg";

interface AnalogDisplayProps {
  isTimerRunning: boolean;
  minutes: number;
}

interface AnalogDisplayState {
  counter: number;
  endTime: DateTime | null;
  tick: number | void;
}

const MAXIMUM_MINUTES = 60;

class AnalogDisplay extends React.PureComponent<
  AnalogDisplayProps,
  AnalogDisplayState
> {
  state = {
    counter: 0,
    endTime: null,
    tick: 0
  };

  componentWillReceiveProps({ minutes, isTimerRunning }) {
    const counter = convertMinutesToFrames(minutes);
    const endTime = DateTime.local().plus({ minutes });

    this.setState({ counter, endTime }, () => {
      isTimerRunning ? this.start() : this.stop();
    });
  }

  componentWillUnmount() {
    this.stop();
  }

  tick = () => {
    this.setState(
      this.state.counter <= 0
        ? {
            counter: 0,
            tick: cancelAnimationFrame(this.state.tick)
          }
        : {
            counter: convertEndTimeToFrames(this.state.endTime) - 1,
            tick: requestAnimationFrame(this.tick)
          }
    );
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
      <div className="AnalogDisplay">
        <img src={getSvgPath(Shield)} alt="Shield" />
        <Dial percent={percent} />
        <img src={getSvgPath(Glass)} alt="Glass" />
      </div>
    );
  }
}

export default AnalogDisplay;
