import * as React from "react";
import { throttle } from "lodash";
import AnalogDisplay from "../AnalogDisplay";

interface TimerState {
  isRunning: boolean;
  minutes: number;
  startPosition: number;
}

class Timer extends React.PureComponent<{}, TimerState> {
  state = {
    isRunning: false,
    minutes: 0,
    startPosition: 0
  };

  start = () => {
    this.setState({ isRunning: true });
  };

  updateMinutes = (event: React.DragEvent<HTMLDivElement>) => {
    const minutes = this.state.startPosition - event.pageY;
    if (minutes > 0 && minutes <= 60) this.setState({ minutes });
  };

  setStartPosition = (event: React.DragEvent<HTMLDivElement>) => {
    this.setState({ isRunning: false, startPosition: event.pageY });
  };

  render() {
    const { minutes, isRunning } = this.state;
    return (
      <div
        onDragStart={this.setStartPosition}
        onDrag={this.updateMinutes}
        onDragEnd={this.start}
      >
        <AnalogDisplay minutes={minutes} isRunning={isRunning} />
      </div>
    );
  }
}

export default Timer;
