import { Duration } from "luxon";

const FRAMES_PER_SECOND = 60;

export const convertMinutesToFrames = (minutes: number): number =>
  Duration.fromObject({ minutes }).as("seconds") * FRAMES_PER_SECOND;

export const svgPath = (path: any): string => `/dist/${path}`;
