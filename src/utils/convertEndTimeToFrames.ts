import { DateTime } from "luxon";
import { FRAMES_PER_SECOND } from "./constants";

const convertEndTimeToFrames = (endTime: DateTime): number =>
  endTime.diffNow("seconds").seconds * FRAMES_PER_SECOND;

export default convertEndTimeToFrames;
