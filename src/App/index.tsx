import * as React from "react";
import { throttle } from "lodash";
import Timer from "../Timer";

interface AppState {
  isRunning: boolean;
  minutes: number;
  startPosition: number;
}

export default class extends React.PureComponent<{}, AppState> {
  state = {
    isRunning: false,
    minutes: 0,
    startPosition: 0
  };

  startTimer = () => {
    this.setState({ isRunning: true });
  };

  updateTimer = (event: React.DragEvent<HTMLDivElement>) => {
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
        onDrag={this.updateTimer}
        onDragEnd={this.startTimer}
      >
        <Timer minutes={minutes} isRunning={isRunning} />
      </div>
    );
  }
}
