export abstract class Work {
	
  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  constructor (parentElement: HTMLElement) {
    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.canvas.width = parentElement.clientWidth;
    this.canvas.height = parentElement.clientHeight;
  	this.w = this.canvas.width;
  	this.h = this.canvas.height;
    this.canvas.style.width = this.w.toString();
    this.canvas.style.height = this.h.toString();
    parentElement.appendChild(this.canvas);
  };
}