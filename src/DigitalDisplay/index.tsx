import * as React from "react";
import * as shield from "./shield.svg";

interface DigitalDisplayProps {
  minutes: number;
  isVisible: boolean;
}

const DigitalDisplay = ({ minutes, isVisible }: DigitalDisplayProps) => {
  if (!isVisible) return null;

  return (
    <div className="DigitalDisplay">
      <img src={shield} alt="Shield" />
      <div className="DigitalDisplay-dial">{minutes}</div>
    </div>
  );
};

export default DigitalDisplay;
