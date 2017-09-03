export class Work {
	
  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  active = false;
  constructor (parentEl: Element) {
    let canvas = document.createElement('canvas');
    this.context = canvas.getContext('2d');
    canvas.width = parentEl.clientWidth;
    canvas.height = parentEl.clientHeight;
  	let w = canvas.width;
  	let h = canvas.height;

    canvas.style.width = w.toString();
    canvas.style.height = h.toString();
    parentEl.appendChild(canvas);
    this.canvas = canvas;
    this.w = w;
    this.h = h;
  };
  resizeCanvas() {
  	let canvas = this.canvas;
  	let parentEl = canvas.parentElement.parentElement.parentElement;
  	let canvasstyle = canvas.style;
  	console.log(canvas.style.width);
  	canvas.width = parentEl.clientWidth;
    canvas.height = parentEl.clientHeight;
  	canvasstyle.width = parentEl.clientWidth.toString();
  	canvasstyle.height = parentEl.clientHeight.toString();
  	console.log(parentEl.clientHeight);
  	console.log(canvasstyle.width);
  }
  activate() {
  	this.active = true;
  	this.resizeCanvas();
  	return true;
  }
  deactivate() {
  	this.active = false;
  	this.resizeCanvas();
  	return true;
  }
  clickInteract(e:Event){
  	console.log(e);
  }
}