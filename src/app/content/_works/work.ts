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
    const w = parentEl.clientWidth;
    const h = parentEl.clientHeight;
    canvas.width = w;
    canvas.height = h;
    this.w = w;
    this.h = h;
    this.redrawAll();
  }
  activate(): true {
    this.active = true;
    return true;
  }
  deactivate(): true {
    this.active = false;
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
      const paramSet = paramStack[i];
      const newParamSet = [];
      for (let iParam = 0; iParam < paramSet.length; iParam++) {
        const param = paramSet[iParam];
        let newParam;
        if (Object.prototype.toString.call( param ) === '[object Array]') {
          if (param[0] === 'X') {
            newParam = param[1] * this.w;
          } else if (param[0] === 'Y') {
            newParam = param[1] * this.h;
          }
        }  else {
          newParam = param;
        }
        newParamSet.push(newParam);
      }
      commandStack[i].apply(this.context, newParamSet);
    }
  }
  clickInteract(e: Event) { }
  onPointerDown(e: Event) { }
  onPointerMove(e: Event) { }
  onPointerUp() { }
}
