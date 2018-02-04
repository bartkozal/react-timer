import * as React from "react";
import Timer from "./Timer";
import { throttle } from "lodash";

interface AppState {
  isRunning: boolean;
  minutes: number;
  startPosition: number;
}

class App extends React.PureComponent<{}, AppState> {
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

export default App;
