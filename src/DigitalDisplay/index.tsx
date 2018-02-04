import * as React from "react";
import { getSvgPath } from "../utils";
import * as Shield from "./shield.svg";

interface DigitalDisplayProps {
  minutes: number;
  isVisible: boolean;
}

const DigitalDisplay = ({ minutes, isVisible }: DigitalDisplayProps) => {
  if (!isVisible) return null;

  return (
    <div className="DigitalDisplay">
      <img src={getSvgPath(Shield)} alt="Shield" />
      <div className="DigitalDisplay-dial">{minutes}</div>
    </div>
  );
};

export default DigitalDisplay;
