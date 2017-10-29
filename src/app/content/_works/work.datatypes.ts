export class Point {
  x: number;
  y: number;
  fromString;
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
  toString(): string {
    return this.x.toString() + '|' + this.y.toString();
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
export interface PointsToPointData {centerPoints: Array<ColorPoint>; points: Array<Point>; }
export type ImmediateEllipseData = Array<EllipseSet>;
export interface FractalExplorerData {a: number; b: number; res: number; p0: Point; p1: Point; }
