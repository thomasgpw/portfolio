import { Point, ColorPoint, PointsToPointData } from './work.datatypes';
import { Work } from './work';

export class PointsToPoint extends Work {

  pointerDown = false;
  workData: PointsToPointData;
  undoData: PointsToPointData;
  r: number;
  readonly type: string;
  constructor (parentElement: Element, workData?: PointsToPointData) {
    super(parentElement);
    this.r = 10;
    this.type = 'PointsToPoint';
    if (workData) {
      this.setWorkData(workData);
    } else {
      this.init();
    }
  }
  init(): void {
    super.init();
    this.generatePoints();
  }
  generatePoints(): void {
    this.workData.centerPoints = [];
    const centerPoints = this.workData.centerPoints;
    this.r = 10;
    const dotNum = Math.floor(Math.sqrt(window.innerWidth * window.innerHeight * 0.64 /* 80% squared is 64% */) / 200);
    console.log(dotNum);
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
  moveLastPoint(fromPoints: Array<Point>, toPoints: Array<Point>): Promise<boolean> {
    console.log(fromPoints, toPoints);
    if (fromPoints.length === 0) {
      return Promise.resolve(false);
    } else {
      toPoints.push(fromPoints.pop());
      return Promise.resolve(true);
    }
  }
  undo(): void {
    this.moveLastPoint(this.workData.points, this.undoData.points).then(result => {if (result) {
      this.clearCanvas();
      this.drawAll(this.context);
    } else {
      console.log('nothing to undo');
    }});
  }
  redo(): void {
    const points = this.workData.points;
    this.moveLastPoint(this.undoData.points, points).then(result => {if (result) {
      this.drawPoint(this.context, points[points.length - 1]);
    } else {
      console.log('nothing to redo');
    }});
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
    const color = centerPoint.color;
    context.beginPath();
    context.strokeStyle = color;
    context.fillStyle = color;
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
    context.closePath();
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
    console.log(this.workData);
    this.drawPoint(this.context, point);
  }
  clearWorkData(): void {
    this.workData = {centerPoints: [], points: []};
  }
  clearUndoData(): void {
    this.undoData = {centerPoints: [], points: []};
  }
  onPointerDown (e: PointerEvent): void {
    if (e.srcElement.closest('.button') === null) {
      this.pointerDown = true;
      this.clearUndoData();
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
