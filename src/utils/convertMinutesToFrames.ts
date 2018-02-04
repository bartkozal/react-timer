import { Duration } from "luxon";
import { FRAMES_PER_SECOND } from "./constants";

const convertMinutesToFrames = (minutes: number): number =>
  Duration.fromObject({ minutes }).as("seconds") * FRAMES_PER_SECOND;

export default convertMinutesToFrames;
