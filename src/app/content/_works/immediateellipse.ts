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
  	this.startX = e.offsetX;
  	this.startY = e.offsetY;
  }
  onPointerMove (e: PointerEvent): void {
  	if (this.pointerDown) {
  	  this.drawEllipse(this.context, e.offsetX, e.offsetY);
  	}
  }
  onPointerUp (): void {
  	this.pointerDown = false;
  }
  drawEllipse (context: CanvasRenderingContext2D, pointerX: number, pointerY: number) {
    const startX = this.startX;
    const startY = this.startY;
    context.beginPath();
    context.ellipse(startX, startY, Math.abs(pointerX - startX), Math.abs(pointerY - startY), 0, 0, 2 * Math.PI, false);
    context.stroke();
    context.closePath();
  }
}
