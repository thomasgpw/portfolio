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
    const commandStacks = this.commandStacks;
    const redoStacks = this.redoStacks;
    redoStacks['functionStack'].push(commandStacks['functionStack'].pop());
    redoStacks['paramStack'].push(commandStacks['paramStack'].pop());
    this.redrawAll();
  }
  redo(): void {
    const redoneCommand = this.redoStacks['functionStack'].pop();
    const redoneParam = this.redoStacks['paramStack'].pop();
    redoneCommand.apply(this, redoneParam);
    this.commandStacks['functionStack'].push(redoneCommand);
    this.commandStacks['paramStack'].push(redoneParam);
  }
  redrawAll(): void {
    const commandStack = this.commandStacks['functionStack'];
    const paramStack = this.commandStacks['paramStack'];
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
