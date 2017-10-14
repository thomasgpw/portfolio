import { Work, Point } from './work';

class EllipseSet {
  public readonly center: Point;
  public points: Array<Point>;
  constructor(center: Point) {
    this.center = center;
    this.points = [];
  }
}
export class ImmediateEllipse extends Work {

  pointerDown = false;
  setNum: number;
  workData: Array<EllipseSet>;
  constructor (parentElement: Element, workData) {
    super(parentElement, workData);
  }
  setWorkData(workData: Array<EllipseSet>): void {
    super.setWorkData(workData);
  }
  init(): void {
    super.init();
  }
  draw(context: CanvasRenderingContext2D, center: Point, pointer: Point): void {
    const centerX = center.x;
    const centerY = center.y;
    const w = this.w;
    const h = this.h;
    context.beginPath();
    context.ellipse(
      centerX * w, centerY * h,
      Math.abs(centerX - pointer.x) * w, Math.abs(centerY - pointer.y) * h,
      0, 0, 2 * Math.PI, false
    );
    context.stroke();
    context.closePath();
  }
  drawEllipseSet(context: CanvasRenderingContext2D, ellipseSet: EllipseSet): void {
    const setLength = ellipseSet.points.length;
    const center = ellipseSet.center;
    const points = ellipseSet.points;
    const draw = this.draw.bind(this);
    for (let i = 0; i < setLength; i++) {
      draw(context, center, points[i]);
    }
  }
  drawAll(context: CanvasRenderingContext2D = this.context): void {
    const workData = this.workData;
    const workDataLength = workData.length;
    const drawEllipseSet = this.drawEllipseSet.bind(this);
    for (let i = 0; i < workDataLength; i++) {
      drawEllipseSet(context, workData[i]);
    }
  }
  onPointerDown (e: PointerEvent): void {
    this.pointerDown = true;
    this.setNum = this.addEllipseSet(new Point(e.offsetX / this.w, e.offsetY / this.h));
  }
  onPointerMove (e: PointerEvent): void {
    if (this.pointerDown) {
      this.addEllipse(new Point(e.offsetX / this.w, e.offsetY / this.h));
    }
  }
  onPointerUp (): void {
    this.pointerDown = false;
  }
  addEllipseSet(center: Point): number {
    const workData = this.workData;
    const setNum = workData.length + 1;
    workData[setNum] = new EllipseSet(center);
    return setNum;
  }
  addEllipse(pointer: Point): void {
    const ellipseSet = this.workData[this.setNum];
    ellipseSet.points.push(pointer);
    this.draw(this.context, ellipseSet.center, pointer);
  }
}
