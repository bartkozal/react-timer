import * as React from "react";
import AnalogDisplay from "../AnalogDisplay";
import DigitalDisplay from "../DigitalDisplay";
import { createTransparentImage } from "../utils";

interface TimerState {
  isDigitalDisplayVisible: boolean;
  isRunning: boolean;
  minutes: number;
  startPosition: number;
  ghostImage: HTMLImageElement | null;
}

class Timer extends React.PureComponent<{}, TimerState> {
  state = {
    ghostImage: null,
    isDigitalDisplayVisible: false,
    isRunning: false,
    minutes: 0,
    startPosition: 0
  };

  componentDidMount() {
    this.setState({ ghostImage: createTransparentImage() });
  }

  startCounting = () => {
    this.setState({ isDigitalDisplayVisible: false, isRunning: true });
  };

  updateMinutes = (event: React.DragEvent<HTMLDivElement>) => {
    const minutes = this.state.startPosition - event.pageY;
    if (minutes > 0 && minutes <= 60) this.setState({ minutes });
  };

  setStartPosition = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setDragImage(this.state.ghostImage, 0, 0);
    this.setState({
      isDigitalDisplayVisible: true,
      isRunning: false,
      startPosition: event.pageY
    });
  };

  render() {
    const { isDigitalDisplayVisible, isRunning, minutes } = this.state;
    return (
      <div
        className="Timer"
        onDragStart={this.setStartPosition}
        onDrag={this.updateMinutes}
        onDragEnd={this.startCounting}
        draggable={true}
      >
        <AnalogDisplay minutes={minutes} isTimerRunning={isRunning} />
        <DigitalDisplay minutes={minutes} isVisible={isDigitalDisplayVisible} />
      </div>
    );
  }
}

export default Timer;
