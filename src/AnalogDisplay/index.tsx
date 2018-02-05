import * as React from "react";
import { DateTime } from "luxon";
import Dial from "../Dial";
import { convertEndTimeToFrames, convertMinutesToFrames } from "../utils";
import * as shield from "./shield.svg";
import * as glass from "./glass.svg";
import * as alarm from "./alarm.wav";

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

  componentDidUpdate(_, prevState) {
    if (prevState.counter < 0) new Audio(alarm).play();
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
        <img src={shield} alt="Shield" />
        <Dial percent={percent} />
        <img src={glass} alt="Glass" />
      </div>
    );
  }
}

export default AnalogDisplay;
