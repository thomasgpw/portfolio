import { Point, ColorPoint, PointsToPointData, PointsToPointSettings } from './work.datatypes';
import { Work } from './work';

export class PointsToPoint extends Work {

  pointerDown = false;
  workData: PointsToPointData;
  undoData: PointsToPointData;
  workSettings: PointsToPointSettings;
  r: number;
  readonly type: string;
  constructor (parentElement: Element) {
    super(parentElement);
    this.r = 10;
    this.type = 'PointsToPoint';
    this.init();
  }
  init(): void {
    super.init();
    this.generateCenterPoints();
  }
  setupSettings(): HTMLElement {
    const workSettings = this.workSettings;
    return null;
  }
  applySettings(context: CanvasRenderingContext2D = this.context): CanvasRenderingContext2D {
    const workSettings = this.workSettings;
    return context;
  }
  download(link: HTMLAnchorElement) {
    const context = this.context;
    const w = this.w;
    const h = this.h;
    context.fillStyle = this.workSettings.backgroundColor;
    this.fill(context, w, h);
    this.drawAll(context);
    super.download(link);
    this.clearCanvas(context, w, h);
    this.drawAll(context);
  }
  setWorkData(workData: PointsToPointData, context: CanvasRenderingContext2D) {
    super.setWorkData(workData, context);
    if (workData.centerPoints.length === 0) {
      this.generateCenterPoints();
    }
  }
  setWorkSettings(workSettings: PointsToPointSettings, context: CanvasRenderingContext2D) {
    if (!workSettings.backgroundColor) {
      workSettings.backgroundColor = 'white';
    }
    if (!workSettings.chosenColorSet) {
      workSettings.chosenColorSet = true;
    }
    if (!workSettings.centerPointDensity) {
      workSettings.centerPointDensity = 1;
    }
    super.setWorkSettings(workSettings, context);
  }
  generateCenterPoints(): void {
    const workData = this.workData;
    workData.centerPoints = [];
    const centerPoints = workData.centerPoints;
    this.r = 10;
    const dotNum = Math.floor(Math.sqrt(window.innerWidth * window.innerHeight * 0.64 /* 80% squared is 64% */) / 200);
    console.log(dotNum);
    const getRandomColor = this.getRandomColor.bind(this);
    for (let i = 0; i < dotNum ; i++) {
      centerPoints.push(new ColorPoint(
        Math.random(),
        Math.random(),
        getRandomColor()
      ));
    }
    this.workDataSubject.next(workData);
  }
  getRandomColor(): string {
    return '#'
      + (Math.floor(Math.random() * 256)).toString(16)
      + (Math.floor(Math.random() * 256)).toString(16)
      + (Math.floor(Math.random() * 256)).toString(16);
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
      this.workDataSubject.next(this.workData);
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
    this.drawPoint(this.context, point);
  }
  clearWorkData(): void {
    const emptyWorkData: PointsToPointData = {centerPoints: [], points: []};
    this.workData = emptyWorkData;
    this.workDataSubject.next(emptyWorkData);
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
      this.workDataSubject.next(this.workData);
    }
  }
  onPointerMove (e: PointerEvent): void {
    if (this.pointerDown) {
      this.addPoint(new Point(e.offsetX / this.w, e.offsetY / this.h));
      this.workDataSubject.next(this.workData);
    }
  }
  onPointerUp (): void {
    this.pointerDown = false;
  }
}
