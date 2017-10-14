// import { CommandStacks } from '../../app.datatypes';

export abstract class Work {

  w: number;
  h: number;
  actionLength: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  active = false;
  // commandStacks: CommandStacks;
  // redoStacks: CommandStacks;

  constructor (parentEl: Element) {
    const canvas = document.createElement('canvas');
    this.context = canvas.getContext('2d');
    // this.commandStacks = {id: null, functionStack: [], paramStack: [], miscData: []};
    // this.redoStacks = {id: null, functionStack: [], paramStack: [], miscData: []};
    parentEl.appendChild(canvas);
    this.canvas = canvas;
    this.resizeCanvas(canvas, parentEl);
  }
  // setCommandStacks(newCommandStacks: CommandStacks): void {
  //   this.commandStacks = newCommandStacks;
  //   this.drawAll();
  // }
  // setStrokeStyle(style: string, context: CanvasRenderingContext2D = this.context): void {
  //   context.strokeStyle = style;
  // }
  resizeCanvas(canvas: HTMLCanvasElement = this.canvas, parentEl: Element = canvas.closest('.work-wrapper-view-container')): void {
    const canvasstyle = canvas.style;
    const w = parentEl.clientWidth;
    const h = parentEl.clientHeight;
    canvas.width = w;
    canvas.height = h;
    this.w = w;
    this.h = h;
    this.drawAll();
  }
  activate(): Promise<null> {
    this.drawAll();
    this.active = true;
    return Promise.resolve(null);
  }
  deactivate(): Promise<null> {
    this.clear();
    this.active = false;
    return Promise.resolve(null);
  }
  init(): void {
  //   this.clear();
  //   const commandStacks = this.commandStacks;
  //   commandStacks.functionStack = [];
  //   commandStacks.paramStack = [];
  //   const redoStacks = this.redoStacks;
  //   redoStacks.functionStack = [];
  //   redoStacks.paramStack = [];
  }
  save(context: CanvasRenderingContext2D, w: number, h: number): ImageData {
    // return context.getImageData(0, 0, w, h);
  }
  load(context: CanvasRenderingContext2D, imageData: ImageData): void {
    // context.putImageData(imageData, 0, 0);
  }
  undo(): void {
    // const commandStacks = this.commandStacks;
    // if (commandStacks.functionStack.length > 0) {
    //   const redoStacks = this.redoStacks;
    //   const actionLength = this.actionLength;
    //   for (let i = 0; i < actionLength; i++) {
    //     redoStacks.functionStack.push(commandStacks.functionStack.pop());
    //     redoStacks.paramStack.push(commandStacks.paramStack.pop());
    //   }
    //   this.drawAll();
    // }
  }
  redo(): void {
    // const redoStacks = this.redoStacks;
    // const funtionStack = redoStacks.functionStack;
    // if (funtionStack.length > 0) {
    //   const actionLength = this.actionLength;
    //   const w = this.w;
    //   const h = this.h;
    //   for (let i = 0; i < actionLength; i++) {
    //     const redoneCommand = funtionStack.pop();
    //     const redoneParam = redoStacks.paramStack.pop();
    //     this.addAndApply(this.commandStacks, redoneCommand, redoneParam, this.context, w, h);
    //   }
    // }
  }
  clear(context: CanvasRenderingContext2D = this.context, w: number = this.w, h: number = this.h): void {
    context.clearRect(0, 0, w, h);
  }
  drawAll(): void {
    // const commandStack = this.commandStacks['functionStack'];
    // const paramStack = this.commandStacks['paramStack'];
    // const commandStackLength = commandStack.length;
    // const context = this.context;
    // const w = this.w;
    // const h = this.h;
    // const applyFunc = this.applyFunc.bind(this);
    // this.clear(context);
    // for (let i = 0; i < commandStackLength; i++) {
    //   applyFunc(commandStack[i], paramStack[i], context, w, h);
    // }
  }
  applyFunc(f: Function, paramSet: any[], context: CanvasRenderingContext2D = this.context, w?: number, h?: number): void {
    // const paramSetLength = paramSet.length;
    // const newParamSet: any[] = [];
    // if (!f.name) {
    //   f(paramSet[0], context);
    // }
    // for (let i = 0; i < paramSetLength; i++) {
    //   const param = paramSet[i];
    //   let newParam;
    //   if (Object.prototype.toString.call( param ) === '[object Array]') {
    //     const paramType = param[0];
    //     const paramVal = param[1];
    //     switch (paramType) {
    //       case 'X':
    //         newParam = paramVal * w;
    //         break;
    //       case 'Y':
    //         newParam = paramVal * h;
    //         break;
    //       case 'XY':
    //         newParam = Math.sqrt(Math.pow(paramVal * w, 2) + Math.pow(param[2] * h, 2));
    //         break;
    //       default:
    //         newParam = param;
    //         break;
    //     }
    //   }  else {
    //     newParam = param;
    //   }
    //   newParamSet.push(newParam);
    // }
    // f.apply(context, newParamSet);
  }
  addAndApply(commandStacks: CommandStacks, f: Function, paramSet: any[], context: CanvasRenderingContext2D = this.context,
    w?: number, h?: number): void {
    // commandStacks.functionStack.push(f);
    // commandStacks.paramStack.push(paramSet);
    // this.applyFunc(f, paramSet, context, w, h);
  }
  clickInteract(e: Event) { }
  onPointerDown(e: Event) { }
  onPointerMove(e: Event) { }
  onPointerUp() { }
}
