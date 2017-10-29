import { Point } from './work.datatypes';
import { Work } from './work';

export class FractalExplorer extends Work {
  z: number;
  c: number;
  escV: number;
  mandelbrotData: Array<Array<number>>;
  juliaData: Array<Array<number>>;
  constructor(parentElement: Element) {
    super(parentElement);
    this.type = 'FractalExplorer';
  }
  init(): void {
    super.init();
  }
  undo(): void {}
  redo(): void {}
  drawAll(context: CanvasRenderingContext2D): void {}
  clearWorkData(): void {
    const res = this.workData.res;
    const mData = this.mandelbrotData;
    const jData = this.juliaData;
    for (let i = 0; i < res; i++) {
      mData[i] = [];
      jData[i] = [];
      for (let i1 = 0; i1 < res; i1++) {
        mData[i][i1] = 0;
        jData[i][i1] = 0;
      }
    }
  }
  clearUndoData(): void {}
  onPointerDown(e: PointerEvent): void {}
  onPointerMove(e: PointerEvent): void {}
  onPointerUp(): void {}
}
