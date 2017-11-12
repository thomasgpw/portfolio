import { Subject } from 'rxjs/Subject';
import { WorkState } from './work-state.datatype';
import { WorkData } from './work-data.datatype';
import { WorkSettings } from './work-settings.datatype';

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
  workSettings: WorkSettings;

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
    const context = this.context;
    this.drawAll(this.applySettings(context));
    this.active = true;
    return Promise.resolve(null);
  }
  deactivate(): Promise<null> {
    this.clearCanvas();
    this.active = false;
    return Promise.resolve(null);
  }
  setup(context: CanvasRenderingContext2D): void {
    this.drawAll(context);
  }
  init(): void {
    const context = this.context;
    this.clearCanvas(context);
    this.clearWorkData();
    this.clearUndoData();
    this.applySettings(context);
  }
  download(link: HTMLAnchorElement) {
    link.href = this.canvas.toDataURL();
    link.download = 'thomasgdotpw' + this.type + '.png';
    link.click();
  }
  fill(context: CanvasRenderingContext2D = this.context, w: number = this.w, h: number = this.h): void {
    context.fillRect(0, 0, w, h);
  }
  clearCanvas(context: CanvasRenderingContext2D = this.context, w: number = this.w, h: number = this.h): void {
    context.clearRect(0, 0, w, h);
  }
  setWorkState(workState: WorkState): void {
    const context = this.context;
    this.setWorkSettings(workState.workSettings, context);
    this.setWorkData(workState.workData, context);
  }
  setWorkData(workData: WorkData, context: CanvasRenderingContext2D): void {
    this.workData = workData;
    this.drawAll(this.context);
    // this.workDataSubject.next(workData);
  }
  setWorkSettings(workSettings: WorkSettings, context: CanvasRenderingContext2D): void {
    this.workSettings = workSettings;
    this.applySettings(context);
  }
  abstract setupSettings(): HTMLElement;
  abstract applySettings(context: CanvasRenderingContext2D): CanvasRenderingContext2D;
  abstract drawAll(context: CanvasRenderingContext2D): void;
  abstract undo(): void;
  abstract redo(): void;
  abstract clearWorkData(): void;
  abstract clearUndoData(): void;
  abstract onPointerDown(e: PointerEvent): void;
  abstract onPointerMove(e: PointerEvent): void;
  abstract onPointerUp(): void;
}
