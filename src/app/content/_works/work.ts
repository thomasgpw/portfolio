import { Subject } from 'rxjs/Subject';
import { WorkData } from './work-data.datatype';

export abstract class Work {
  type: string;
  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  active: boolean;
  workData: WorkData;
  workDataSubject: Subject<WorkData>;
  undoData: WorkData;

  constructor (parentEl: Element) {
    const canvas = document.createElement('canvas');
    this.context = canvas.getContext('2d');
    parentEl.appendChild(canvas);
    this.active = false;
    this.canvas = canvas;
    this.workDataSubject = new Subject();
    this.resizeCanvas(canvas, parentEl);
  }
  resizeCanvas(canvas: HTMLCanvasElement = this.canvas, parentEl: Element = canvas.closest('.work-wrapper-view-container')): void {
    const canvasstyle = canvas.style;
    const w = parentEl.clientWidth;
    const h = parentEl.clientHeight;
    canvas.width = w;
    canvas.height = h;
    this.w = w;
    this.h = h;
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
    this.clearUndoData();
  }
  clearCanvas(context: CanvasRenderingContext2D = this.context, w: number = this.w, h: number = this.h): void {
    context.clearRect(0, 0, w, h);
  }
  setWorkData(workData: WorkData): void {
    this.workData = workData;
    this.drawAll(this.context);
    // this.workDataSubject.next(workData);
  }
  abstract drawAll(context: CanvasRenderingContext2D): void;
  abstract undo(): void;
  abstract redo(): void;
  abstract clearWorkData(): void;
  abstract clearUndoData(): void;
  abstract onPointerDown(e: PointerEvent): void;
  abstract onPointerMove(e: PointerEvent): void;
  abstract onPointerUp(): void;
}
