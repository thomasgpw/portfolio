import { Work } from './work';

export class SpecificWork extends Work {

  pointerDown = false;
  startX: number;
  startY: number;
  constructor (parentElement: Element) {
    super(parentElement);
  }
  init(context: CanvasRenderingContext2D, w: number, h: number): void {
    super.init(context, w, h);
    context.strokeStyle = 'black';
  }
  onPointerDown (e: PointerEvent): void {
    this.pointerDown = true;
    this.startX = e.offsetX / this.w;
    this.startY = e.offsetY / this.h;
  }
  onPointerMove (e: PointerEvent): void {
    if (this.pointerDown) {
      this.drawEllipse(this.context, e.offsetX / this.w, e.offsetY / this.h);
    }
  }
  onPointerUp (): void {
    this.pointerDown = false;
  }
  drawEllipse (context: CanvasRenderingContext2D, pointerX: number, pointerY: number) {
    let startX = this.startX;
    let startY = this.startY;
    this.commandStack.push(context.beginPath);
    this.paramStack.push([]);
    this.commandStack.push(context.ellipse);
    this.paramStack.push([
      ['X', startX], ['Y', startY],
      ['X', Math.abs(pointerX - startX)], ['Y', Math.abs(pointerY - startY)],
      0, 0,
      2 * Math.PI, false
    ]);
    this.commandStack.push(context.stroke);
    this.paramStack.push([]);
    this.commandStack.push(context.closePath);
    this.paramStack.push([]);
    const w = this.w;
    const h = this.h;
    startX *= this.w;
    startY *= this.h;
    pointerX *= w;
    pointerY *= h;
    context.beginPath();
    context.ellipse(startX, startY, Math.abs(pointerX - startX), Math.abs(pointerY - startY), 0, 0, 2 * Math.PI, false);
    context.stroke();
    context.closePath();
  }
}
