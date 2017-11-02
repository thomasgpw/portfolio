// http://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value: number, decimals: number): number {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
}
export class Point {
  x: number;
  y: number;
  fromString;
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  toString(): string {
    return round(this.x, 3).toString() + '|' + round(this.y, 3).toString();
  }
}
export class ColorPoint extends Point {
  color: string;
  constructor (x, y, color) {
    super(x, y);
    this.color = color;
  }
  toString(): string {
    return super.toString() + '|' + this.color.toString();
  }
}
export class EllipseSet {
  public readonly center: Point;
  public points: Array<Point>;
  constructor(center: Point) {
    this.center = center;
    this.points = [];
  }
}
export type ImmediateEllipseData = Array<EllipseSet>;
export interface PointsToPointData {centerPoints: Array<ColorPoint>; points: Array<Point>; }
export interface FractalExplorerData {a: number; b: number; res: number; p0: Point; p1: Point; }
export interface ImmediateEllipseSettings {colors: string; backgroundColor: string; }
export interface PointsToPointSettings {centerPointDensity: number; chosenColorSet: boolean; backgroundColor: string; }
