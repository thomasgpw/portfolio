export class Point {
  x: number;
  y: number;
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
}
export class ColorPoint extends Point {
  color: string;
  constructor (x, y, color) {
    super(x, y);
    this.color = color;
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
