import { Point, ColorPoint, PointsToPointData } from './work.datatypes';
import { Work } from './work';

export class PointsToPoint extends Work {

  pointerDown = false;
  workData: PointsToPointData;
  undoData: PointsToPointData;
  r: number;
  readonly type: string;
  constructor (parentElement: Element) {
    super(parentElement);
    this.r = 10;
    this.type = 'PointsToPoint';
    this.setWorkData({centerPoints: [], points: []});
  }
  init(): void {
    super.init();
    this.generatePoints();
  }
  generatePoints(): void {
    const w = this.w;
    const h = this.h;
    this.workData.centerPoints = [];
    const centerPoints = this.workData.centerPoints;
    this.r = 10;
    const dotNum = Math.sqrt(w * h) / 200;
    for (let i = 0; i < dotNum ; i++) {
      centerPoints.push(new ColorPoint(
        Math.random(),
        Math.random(),
        '#'
        + (Math.floor(Math.random() * 256)).toString(16)
        + (Math.floor(Math.random() * 256)).toString(16)
        + (Math.floor(Math.random() * 256)).toString(16)
      ));
    }
  }
  moveLastPoint(fromPoints: Array<Point>, toPoints: Array<Point>): void {
    if (fromPoints.length === 0) {
      /* nothing to change */
      console.log('nothing to change');
    } else {
      toPoints.push(fromPoints.pop());
    }
  }
  undo(): void {
    this.moveLastPoint(this.workData.points, this.undoData.points);
    this.drawAll(this.context);
  }
  redo(): void {
    const undoPoints = this.undoData.points;
    this.moveLastPoint(undoPoints, this.workData.points);
    this.drawPoint(this.context, undoPoints[undoPoints.length - 1]);
  }
  draw(context: CanvasRenderingContext2D, point: Point, centerPoint: ColorPoint) {
    const w = this.w;
    const h = this.h;
    const centerX = centerPoint.x;
    const centerY = centerPoint.y;
    const pointX = point.x;
    const pointY = point.y;
    const adjustedCenterX = centerX * w;
    const adjustedCenterY = centerY * h;
    const circumference = 2 * Math.PI;
    context.beginPath();
    context.strokeStyle = centerPoint.color;
    context.moveTo(adjustedCenterX, adjustedCenterY);
    context.lineTo(pointX * w, pointY * h);
    context.stroke();
    context.beginPath();
    context.arc(
      adjustedCenterX, adjustedCenterY,
      Math.sqrt(Math.pow((centerX - pointX) * w, 2) + Math.pow((centerY - pointY) * h, 2)),
      0, circumference, false
    );
    context.stroke();
    context.beginPath();
    context.arc(
      adjustedCenterX, adjustedCenterY,
      this.r, 0, circumference, false
    );
    context.fill();
  }
  drawPoint(context: CanvasRenderingContext2D, point: Point) {
    const pointX = point.x;
    const pointY = point.y;
    const centerPoints = this.workData.centerPoints;
    const dotNum = centerPoints.length;
    const draw = this.draw.bind(this, context, point);
    for (let i = 0; i < dotNum; i++) {
      draw(centerPoints[i]);
    }
  }
  drawAll(context: CanvasRenderingContext2D) {
    const workData = this.workData;
    const centerPoints = workData.centerPoints;
    const points = workData.points;
    const pointsLength = points.length;
    const drawPoint = this.drawPoint.bind(this, context);
    for (let i = 0; i < pointsLength; i++) {
      drawPoint(points[i]);
    }
  }
  addPoint(point: Point) {
    this.workData.points.push(point);
    this.drawPoint(this.context, point);
  }
  clearWorkData(): void {
    this.workData = {centerPoints: [], points: []};
  }
  clearUndoData(): void {
    this.undoData = {centerPoints: [], points: []};
  }
  onPointerDown (e: PointerEvent): void {
    if (!e.srcElement.closest('svg')) {
      this.pointerDown = true;
      console.log('P2PpointerDown');
      this.addPoint(new Point(e.offsetX / this.w, e.offsetY / this.h));
    }
  }
  onPointerMove (e: PointerEvent): void {
    if (this.pointerDown) {
      this.addPoint(new Point(e.offsetX / this.w, e.offsetY / this.h));
    }
  }
  onPointerUp (): void {
    this.pointerDown = false;
  }
}
