import { PointsToPoint } from './points-to-point';
import { ImmediateEllipse } from './immediate-ellipse';
import { Work } from './work';
export type AllWorks
  = Work
  | ImmediateEllipse
  | PointsToPoint;
