export class Point {
  x: number;
  y: number;
  constructor (x, y) {
    this.x = x;
    this.y = y;
  }
}
export abstract class Work {
  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  active: boolean;
  workData: any;
  undoData: any;

  constructor (parentEl: Element, workData) {
    const canvas = document.createElement('canvas');
    this.context = canvas.getContext('2d');
    parentEl.appendChild(canvas);
    this.active = false;
    this.canvas = canvas;
    this.resizeCanvas(canvas, parentEl);
    this.setWorkData(workData);
  }
  resizeCanvas(canvas: HTMLCanvasElement = this.canvas, parentEl: Element = canvas.closest('.work-wrapper-view-container')): void {
    const canvasstyle = canvas.style;
    const w = parentEl.clientWidth;
    const h = parentEl.clientHeight;
    canvas.width = w;
    canvas.height = h;
    this.w = w;
    this.h = h;
    this.drawAll(this.context);
  }
  activate(): Promise<null> {
    this.drawAll(this.context);
    this.active = true;
    return Promise.resolve(null);
  }
  deactivate(): Promise<null> {
    this.clearCanvas();
    this.active = false;
    return Promise.resolve(null);
  }
  init(): void {
    this.clearCanvas();
    this.clearWorkData();
    this.clearRedoData();
  }
  clearCanvas(context: CanvasRenderingContext2D = this.context, w: number = this.w, h: number = this.h): void {
    context.clearRect(0, 0, w, h);
  }
  setWorkData(workData): void {
    this.workData = workData;
    this.drawAll(this.context);
  }
  abstract drawAll(context: CanvasRenderingContext2D): void;
  abstract undo(): void;
  abstract redo(): void;
  abstract clearWorkData(): void;
  abstract clearRedoData(): void;
}
