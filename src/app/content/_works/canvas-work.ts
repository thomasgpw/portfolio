import { Subject } from 'rxjs';
import { WorkState } from './work-state.datatype';
import { CanvasWorkData } from './canvas-work-data.datatype';
import { CanvasWorkSettings } from './canvas-work-settings.datatype';
import { Work } from './work';

export abstract class CanvasWork implements Work {
  type: string;
  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  workData: CanvasWorkData;
  workDataSubject: Subject<CanvasWorkData>;
  undoData: CanvasWorkData;
  workSettings: CanvasWorkSettings;

  constructor (parentEl: Element) {
    console.log('creating canvas for', parentEl);
    const canvas = document.createElement('canvas');
    this.context = canvas.getContext('2d');
    parentEl.appendChild(canvas);
    this.canvas = canvas;
    this.workDataSubject = new Subject();
    this.resizeContents(parentEl);
  }
  resizeContents(parentEl: Element = this.canvas.closest('.work-wrapper-view-container')): void {
    const w = parentEl.clientWidth;
    const h = parentEl.clientHeight;
    this.w = w;
    this.h = h;
    this.resizeCanvas(this.canvas, w, h);
    console.log('resized');
  }
  resizeCanvas(canvas: HTMLCanvasElement = this.canvas, w: number, h: number): void {
    // const canvasstyle = canvas.style;
    canvas.width = w;
    canvas.height = h;
    if (this.workData) {
      this.drawAll(this.context);
    }
  }
  setup(context: CanvasRenderingContext2D): void {
    this.drawAll(context);
  }
  init(): void {
    const context = this.context;
    this.clearCanvas(context);
    this.clearWorkData();
    this.clearUndoData();
    // this.applySettings(context);
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
    this.type = workState.type;
    const context = this.context;
    this.setWorkSettings(workState.workSettings as CanvasWorkSettings, context);
    this.setWorkData(workState.workData as CanvasWorkData, context);
  }
  setWorkData(workData: CanvasWorkData, context: CanvasRenderingContext2D): void {
    this.workData = workData;
    this.drawAll(this.context);
    // this.workDataSubject.next(workData);
  }
  setWorkSettings(workSettings: CanvasWorkSettings, context: CanvasRenderingContext2D): void {
    this.workSettings = workSettings;
    // this.applySettings(context);
  }
  abstract setupSettings(): HTMLElement;
  abstract setColors(colors: {[key: string]: string}): void;
  abstract drawAll(context: CanvasRenderingContext2D): void;
  abstract undo(): void;
  abstract redo(): void;
  abstract clearWorkData(): void;
  abstract clearUndoData(): void;
  abstract onPointerDown(e: PointerEvent): void;
  abstract onPointerMove(e: PointerEvent): void;
  abstract onPointerUp(e: PointerEvent): void;
}
