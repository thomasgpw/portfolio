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
    const canvas = document.createElement('canvas');
    this.context = canvas.getContext('2d');
    canvas.width = parentEl.clientWidth;
    canvas.height = parentEl.clientHeight;
    const w = canvas.width;
    const h = canvas.height;

    canvas.style.width = w.toString();
    canvas.style.height = h.toString();
    parentEl.appendChild(canvas);
    this.canvas = canvas;
    this.w = w;
    this.h = h;
  }
  resizeCanvas(): void {
    const canvas = this.canvas;
    const parentEl = canvas.parentElement.parentElement.parentElement;
    const canvasstyle = canvas.style;
    canvas.width = parentEl.clientWidth;
    canvas.height = parentEl.clientHeight;
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
  init(context: CanvasRenderingContext2D, w: number, h: number): void {
    context.clearRect(0, 0, w, h);
  }
  save(context: CanvasRenderingContext2D, w: number, h: number): ImageData {
    return context.getImageData(0, 0, w, h);
  }
  load(context: CanvasRenderingContext2D, imageData: ImageData): void {
    context.putImageData(imageData, 0, 0);
  }
  undo(): void {
    this.redoCommandStack.push(this.commandStack.pop());
    this.redoParamStack.push(this.paramStack.pop());
    this.redrawAll();
  }
  redo(): void {
    const redoneCommand = this.redoCommandStack.pop();
    const redoneParam = this.redoParamStack.pop();
    redoneCommand.apply(this, redoneParam);
    this.commandStack.push(redoneCommand);
    this.paramStack.push(redoneParam);
  }
  redrawAll(): void {
    const commandStack = this.commandStack;
    const paramStack = this.paramStack;
    for (let i = 0; i < commandStack.length; i++) {
      commandStack[i].apply(this, paramStack[i]);
    }
  }
  clickInteract(e: Event) { }
  onPointerDown(e: Event) { }
  onPointerMove(e: Event) { }
  onPointerUp() { }
}
