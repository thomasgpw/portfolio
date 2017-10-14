import { Work, Point } from './work';


class DrawPoint extends Point {
  color: string;
  constructor (x, y, color) {
    super(x, y);
    this.color = color;
  }
}
export class PointsToPoint extends Work {

  pointerDown = false;
  workData: {centerPoints: Array<DrawPoint>, points: Array<Point>};
  r: number;

  constructor (parentElement: Element, workData) {
    super(parentElement, workData);
  }
  init(): void {
    super.init();
    this.generatePoints();
  }
  generatePoints() {
    const w = this.w;
    const h = this.h;
    const centerPoints = this.workData.centerPoints;
    centerPoints = [];
    this.r = 10;
    const dotNum = Math.sqrt(w * h) / 200;
    for (let i = 0; i < dotNum ; i++) {
      this.dotList.push(new DrawPoint(
        Math.random(),
        Math.random(),
        '#'
        + (Math.floor(Math.random() * 256)).toString(16)
        + (Math.floor(Math.random() * 256)).toString(16)
        + (Math.floor(Math.random() * 256)).toString(16)
      ));
    }
  }
  onPointerDown (e: PointerEvent): void {
    if (!e.srcElement.closest('svg')) {
      this.pointerDown = true;
      this.drawConnections(this.context, e.offsetX / this.w, e.offsetY / this.h);
    }
  }
  onPointerMove (e: PointerEvent): void {
    if (this.pointerDown) {
      this.drawConnections(this.context, e.offsetX / this.w, e.offsetY / this.h);
    }
  }
  onPointerUp (): void {
    this.pointerDown = false;
  }
  drawDotList(context: CanvasRenderingContext2D = this.context) {
    const dotList = this.dotList;
    const r = this.r;
    const arc = context.arc;
    const fill = context.fill.bind(context);
    for (const dot of dotList) {
      context.beginPath();
      this.setStrokeStyle(dot.color, context);
      this.applyFunc(arc, [['X', dot.x], ['Y', dot.y], r, 0, 2 * Math.PI, false], context);
      fill();
    }
  }
  drawConnections (context: CanvasRenderingContext2D, pointerX: number, pointerY: number) {
    const commandStacks = this.commandStacks;
    const w = this.w;
    const h = this.h;
    const emptyArray: undefined[] = [];
    const addAndApply = this.addAndApply.bind(this);
    const beginPath = context.beginPath;
    const stroke = context.stroke;
    const dotList = this.dotList;
    for (const dot of dotList) {
      const x = dot.x;
      const y = dot.y;

      addAndApply(commandStacks, beginPath, emptyArray, context);
      // addAndApply(commandStacks, this.setStrokeStyle, [dot.color, context], context);
      addAndApply(commandStacks, context.moveTo, [['X', pointerX], ['Y', pointerY]], context, w, h);
      addAndApply(commandStacks, context.lineTo, [['X', x], ['Y', y]], context, w, h);
      addAndApply(commandStacks, stroke, emptyArray, context);
      addAndApply(commandStacks, beginPath, emptyArray, context);
      addAndApply(commandStacks, context.arc, [
        ['X', x], ['Y', y],
        ['XY', pointerX - x, pointerY - y],
        0, 2 * Math.PI, false
      ], context, w, h);
      addAndApply(commandStacks, stroke, emptyArray, context);
    }
    addAndApply(commandStacks, context.closePath, emptyArray, context);
    this.drawDotList();
  }
}
