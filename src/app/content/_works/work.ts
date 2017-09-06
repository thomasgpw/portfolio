export abstract class Work {
	
  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  active = false;
  commandStack: Function[] = [];
  paramStack: any[][] = [];
  redoCommandStack: Function[] = [];
  redoParamStack: any[][] = [];
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
  resizeCanvas(): void {
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
  activate(): true {
  	this.active = true;
  	this.resizeCanvas();
  	return true;
  }
  deactivate(): true {
  	this.active = false;
  	this.resizeCanvas();
  	return true;
  }
  init(context: CanvasRenderingContext2D,w: number,h: number): void {
    context.clearRect(0,0,w,h);
  }
  save(context: CanvasRenderingContext2D,w: number,h: number): ImageData {
  	return context.getImageData(0,0,w,h);
  }
  load(context: CanvasRenderingContext2D, imageData:ImageData): void {
  	context.putImageData(imageData,0,0);
  }
  undo(): void {
  	this.redoCommandStack.push(this.commandStack.pop());
  	this.redoParamStack.push(this.paramStack.pop());
  	this.redrawAll();
  }
  redo(): void {
  	let redoneCommand = this.redoCommandStack.pop();
  	let redoneParam = this.redoParamStack.pop();
  	redoneCommand.apply(this, redoneParam);
  	this.commandStack.push(redoneCommand);
  	this.paramStack.push(redoneParam);
  }
  redrawAll(): void {
  	let commandStack = this.commandStack;
  	let paramStack = this.paramStack;
  	for (let i = 0; i < commandStack.length; i++) {
  	  commandStack[i].apply(this,paramStack[i]);
  	}
  }
  clickInteract(e:Event){ }
  onPointerDown(e:Event){ }
  onPointerMove(e:Event){ }
  onPointerUp(){ }
}