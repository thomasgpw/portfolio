import { CommandStacks } from '../../app.datatypes';

export abstract class Work {

  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  active = false;
  commandStacks: CommandStacks;
  redoStacks: CommandStacks;

  constructor (parentEl: Element) {
    const canvas = document.createElement('canvas');
    this.context = canvas.getContext('2d');
    this.commandStacks = {id: null, functionStack: [], paramStack: []};
    this.redoStacks = {id: null, functionStack: [], paramStack: []};
    parentEl.appendChild(canvas);
    this.canvas = canvas;
    this.resizeCanvas(canvas, parentEl);
  }
  setCommandStacks(newCommandStacks: CommandStacks): void {
    this.commandStacks = newCommandStacks;
    this.redrawAll();
  }
  setStrokeStyle(style: string, context: CanvasRenderingContext2D = this.context): void {
    context.strokeStyle = style;
  }
  resizeCanvas(canvas: HTMLCanvasElement = this.canvas, parentEl: Element = canvas.closest('.work-wrapper-view-container')): void {
    const canvasstyle = canvas.style;
    const w = parentEl.clientWidth;
    const h = parentEl.clientHeight;
    canvas.width = w;
    canvas.height = h;
    this.w = w;
    this.h = h;
    this.redrawAll();
  }
  activate(): Promise<null> {
    this.redrawAll();
    this.active = true;
    return Promise.resolve(null);
  }
  deactivate(): Promise<null> {
    this.init(this.context, this.w, this.h);
    this.active = false;
    return Promise.resolve(null);
  }
  init(context: CanvasRenderingContext2D = this.context, w: number = this.w, h: number = this.h): void {
    context.clearRect(0, 0, w, h);
  }
  save(context: CanvasRenderingContext2D, w: number, h: number): ImageData {
    return context.getImageData(0, 0, w, h);
  }
  load(context: CanvasRenderingContext2D, imageData: ImageData): void {
    context.putImageData(imageData, 0, 0);
  }
  undo(): void {
    const commandStacks = this.commandStacks;
    if (commandStacks.functionStack.length > 0) {
      const redoStacks = this.redoStacks;
      redoStacks.functionStack.push(commandStacks.functionStack.pop());
      redoStacks.paramStack.push(commandStacks.paramStack.pop());
      this.redrawAll();
    }
  }
  redo(): void {
    const redoStacks = this.redoStacks;
    if (redoStacks.functionStack.length > 0) {
      const redoneCommand = redoStacks.functionStack.pop();
      const redoneParam = redoStacks.paramStack.pop();
      // this.addAndApply(this.commandStacks, redoneCommand, redoneParam, this);
    }
  }
  redrawAll(): void {
    const commandStack = this.commandStacks['functionStack'];
    const paramStack = this.commandStacks['paramStack'];
    const commandStackLength = commandStack.length;
    for (let i = 0; i < commandStackLength; i++) {
      this.applyFunc(commandStack[i], paramStack[i], this.context);
    }
  }
  applyFunc(f: Function, paramSet: any[], scope): void {
    const paramSetLength = paramSet.length;
    const newParamSet: any[] = [];
    for (let i = 0; i < paramSetLength; i++) {
        const param = paramSet[i];
        let newParam;
        if (Object.prototype.toString.call( param ) === '[object Array]') {
          const paramType = param[0];
          const paramVal = param[1];
          if (paramType === 'X') {
            newParam = paramVal * this.w;
          } else if (paramType === 'Y') {
            newParam = paramVal * this.h;
          } else if (paramType === 'XY') {
            newParam = Math.sqrt(Math.pow(paramVal * this.w, 2) + Math.pow(param[2] * this.h, 2));
          }
        }  else {
          newParam = param;
        }
        newParamSet.push(newParam);
      }
      f.apply(scope, newParamSet);
  }
  addAndApply(commandStacks: CommandStacks, f: Function, paramSet: any[], scope): void {
    commandStacks.functionStack.push(f);
    commandStacks.paramStack.push(paramSet);
    this.applyFunc(f, paramSet, scope);
  }
  clickInteract(e: Event) { }
  onPointerDown(e: Event) { }
  onPointerMove(e: Event) { }
  onPointerUp() { }
}
