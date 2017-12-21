import * as React from "react";
import Timer from "./Timer/";
import { throttle } from "lodash";

interface AppState {
  minutes: number;
  startPosition: number;
}

class App extends React.PureComponent<{}, AppState> {
  state = {
    minutes: 0,
    startPosition: 0,
  };

  updateTimer = (event: React.DragEvent<HTMLDivElement>) => {
    const minutes = this.state.startPosition - event.pageY;
    if (minutes > 0 && minutes <= 60) this.setState({ minutes });
  };

  setStartPosition = (event: React.DragEvent<HTMLDivElement>) => {
    this.setState({ startPosition: event.pageY });
  };

  render() {
    return (
      <div onDragStart={this.setStartPosition} onDrag={this.updateTimer}>
        <Timer minutes={this.state.minutes} />
      </div>
    );
  }
}

export default App;
