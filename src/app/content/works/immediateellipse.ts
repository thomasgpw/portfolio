import { Work } from './work';

export class SpecificWork extends Work {

  mouseDown = false;
  startX: number;
  startY: number;
  constructor (parentElement: Element) {
    super(parentElement);
  }
  init(context: CanvasRenderingContext2D, w: number, h: number): void {
  	super.init(context, w, h);
  	context.strokeStyle = "black";
  }
  onMouseDown (e: MouseEvent): void {
  	this.mouseDown = true;
  	this.startX = e.offsetX;
  	this.startY = e.offsetY;
  }
  onMouseMove (e: MouseEvent): void {
  	if(this.mouseDown) {
  	  this.drawEllipse(this.context, e.offsetX, e.offsetY);
  	}
  }
  onMouseUp (): void {
  	this.mouseDown = false;
  }
  drawEllipse (context: CanvasRenderingContext2D, mouseX: number, mouseY: number) {
    let startX = this.startX;
    let startY = this.startY;
    context.beginPath();
    context.ellipse(startX, startY, Math.abs(mouseX - startX), Math.abs(mouseY - startY), 0, 0, 2 * Math.PI, false);
    context.stroke();
    context.closePath();
  }
}
