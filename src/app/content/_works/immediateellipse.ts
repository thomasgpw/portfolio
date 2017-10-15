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
  undoSetNum: number;
  workData: Array<EllipseSet>;
  undoData: Array<EllipseSet>;
  constructor (parentElement: Element, workData) {
    super(parentElement, workData);
    this.setNum = 0;
  }
  setWorkData(workData: Array<EllipseSet>): void {
    super.setWorkData(workData);
  }
  init(): void {
    super.init();
  }
  moveLastPoint(fromData: Array<EllipseSet>, toData: Array<EllipseSet>, fromSetNum: number, toSetNum: number): void {
    if (fromData[fromSetNum].points.length === 0) {
      delete fromData[fromSetNum];
      fromSetNum -= 1;
    }
    if (fromSetNum === -1) {
      /* nothing to undo */
      fromSetNum = 0;
      console.log('nothing to undo');
    } else {
      const ellipseSet = fromData[fromSetNum];
      const undoCenter = ellipseSet.center;
      const undoPoint = ellipseSet.points.pop();
      if (toData[toSetNum].center !== undoCenter) {
        toSetNum = this.addEllipseSet(undoCenter, toData);
      }
      this.addEllipse(undoPoint, toData, toSetNum);
    }
  }
  undo(): void {
    this.moveLastPoint(this.workData, this.undoData, this.setNum, this.undoSetNum);
    this.drawAll(this.context);
  }
  redo(): void {
    const workData = this.workData;
    const setNum = this.setNum;
    this.moveLastPoint(this.undoData, workData, this.undoSetNum, setNum);
    const ellipseSet = workData[setNum];
    const points = ellipseSet.points;
    this.draw(this.context, ellipseSet.center, points[points.length - 1]);
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
  drawAll(context: CanvasRenderingContext2D): void {
    const workData = this.workData;
    const workDataLength = workData.length;
    const drawEllipseSet = this.drawEllipseSet.bind(this);
    for (let i = 0; i < workDataLength; i++) {
      drawEllipseSet(context, workData[i]);
    }
  }
  onPointerDown (e: PointerEvent): void {
    this.pointerDown = true;
    this.setNum = this.addEllipseSet(new Point(e.offsetX / this.w, e.offsetY / this.h), this.workData);
  }
  onPointerMove (e: PointerEvent): void {
    if (this.pointerDown) {
      this.addEllipse(new Point(e.offsetX / this.w, e.offsetY / this.h), this.workData, this.setNum);
    }
  }
  onPointerUp (): void {
    this.pointerDown = false;
  }
  addEllipseSet(center: Point, data: Array<EllipseSet>): number {
    const setNum = data.length + 1;
    data[setNum] = new EllipseSet(center);
    return setNum;
  }
  addEllipse(pointer: Point, data: Array<EllipseSet>, setNum: number): void {
    const ellipseSet = data[setNum];
    ellipseSet.points.push(pointer);
    this.draw(this.context, ellipseSet.center, pointer);
  }
  clearWorkData(): void {
    this.workData = [];
  }
  clearRedoData(): void {
    this.undoData = [];
  }
}
