import { Point, FractalExplorerData } from './work.datatypes';
import { Work } from './work';

export class FractalExplorer extends Work {
  mandelbrotData: Array<Array<number>>;
  juliaData: Array<Array<number>>;
  constructor(parentElement: Element) {
    super(parentElement);
    this.type = 'FractalExplorer';
  }
  init(): void {
    super.init();
    const res = (this.workData as FractalExplorerData).res;
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
  calcPoint(z: Point, c: Point): Point {
    const zx = z.x;
    const zy = z.y;
    return new Point(Math.pow(zx, 2) - Math.pow(zy, 2) + c.x, (2 * zx * zy) + c.y);
  }
  undo(): void {}
  redo(): void {}
  drawAll(context: CanvasRenderingContext2D): void {
    const xStretch = this.context.canvas.width / this.w;
  }
  clearWorkData(): void {
  }
  clearUndoData(): void {}
  onPointerDown(e: PointerEvent): void {}
  onPointerMove(e: PointerEvent): void {}
  onPointerUp(): void {}
}
