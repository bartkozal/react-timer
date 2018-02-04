import * as React from "react";

interface DialProps {
  percent: number;
}

const getCoordinatesForPercent = (percent: number): [number, number] => [
  Math.cos(2 * Math.PI * percent),
  Math.sin(2 * Math.PI * percent)
];

class Dial extends React.PureComponent<DialProps, {}> {
  pathData = (percent: number): string => {
    const [startX, startY] = getCoordinatesForPercent(0);
    const [endX, endY] = getCoordinatesForPercent(percent);
    const largeArcFlag = percent > 0.5 ? 1 : 0;

    return [
      `M ${startX} ${startY}`,
      `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`,
      `L 0 0`
    ].join(" ");
  };

  render() {
    const percent = this.props.percent / 100;
    return (
      <svg
        width="151"
        height="151"
        viewBox="-1 -1 2 2"
        style={{
          marginLeft: "25px",
          marginTop: "23px",
          opacity: 0.35,
          transform: "rotate(-90deg) translate(-2px, 0)"
        }}
      >
        <path d={this.pathData(percent)} fill="#FF001F" />
      </svg>
    );
  }
}

export default Dial;
