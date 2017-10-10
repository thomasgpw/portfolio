import { Work } from './work';

class Point {
  x: number;
  y: number;
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
}
class DrawPoint extends Point {
  color: string;
  constructor (x, y, color) {
    super(x, y);
    this.color = color;
  }
}
export class SpecificWork extends Work {

  pointerDown = false;
  dotList: Array<DrawPoint>;
  r: number;

  constructor (parentElement: Element) {
    super(parentElement);
  }
  init(): void {
    const w = this.w;
    const h = this.h;
    super.init(this.context, w, h);
    this.dotList = [];
    this.r = 10;
    for (let i = 0; i < (Math.sqrt(w * h) / 200) ; i++) {
      this.dotList.push(new DrawPoint(
        Math.random(),
        Math.random(),
        '#'
        + (Math.floor(Math.random() * 256)).toString(16)
        + (Math.floor(Math.random() * 256)).toString(16)
        + (Math.floor(Math.random() * 256)).toString(16)
      ));
      console.log(this.dotList[i].color);
    }
    this.drawDotList();
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
    const dotListLength = dotList.length;
    const r = this.r;
    for (let i = 0; i < dotListLength; i++) {
      const dot = dotList[i];
      context.beginPath();
      this.setStrokeStyle(dot.color, context);
      this.applyFunc(context.arc, [['X', dot.x], ['Y', dot.y], r, 0, 2 * Math.PI, false], context);
      context.fill();
    }
  }
  drawConnections (context: CanvasRenderingContext2D, pointerX: number, pointerY: number) {
    const commandStacks = this.commandStacks;
    const w = this.w;
    const h = this.h;
    const emptyArray = [];
    const addAndApply = this.addAndApply.bind(this);
    const beginPath = context.beginPath;
    const stroke = context.stroke;
    for (const dot of this.dotList) {
      const x = dot.x;
      const y = dot.y;

      addAndApply(commandStacks, beginPath, emptyArray, context);
      addAndApply(commandStacks, this.setStrokeStyle, [dot.color, context], this);
      addAndApply(commandStacks, context.moveTo, [['X', pointerX], ['Y', pointerY]], context);
      addAndApply(commandStacks, context.lineTo, [['X', x], ['Y', y]], context);
      addAndApply(commandStacks, stroke, emptyArray, context);
      addAndApply(commandStacks, beginPath, emptyArray, context);
      addAndApply(commandStacks, context.arc, [
        ['X', x], ['Y', y],
        ['XY', pointerX - x, pointerY - y],
        0, 2 * Math.PI, false
      ], context);
      addAndApply(commandStacks, stroke, emptyArray, context);
    }
    addAndApply(commandStacks, context.closePath, emptyArray, context);
    this.drawDotList();
  }
}
