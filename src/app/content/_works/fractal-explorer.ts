import { Point, FractalExplorerData, FractalExplorerSettings } from './work.datatypes';
import { Work } from './work';

export class FractalExplorer extends Work {
  mandelbrotData: Array<Array<number>>;
  juliaData: Array<Array<number>>;
  workData: FractalExplorerData;
  workSettings: FractalExplorerSettings;
  constructor(parentElement: Element) {
    super(parentElement);
    this.type = 'FractalExplorer';
    this.init();
  }
  resizeCanvas(canvas: HTMLCanvasElement = this.canvas, parentEl: Element = canvas.closest('.work-wrapper-view-container')): void {
    super.resizeCanvas(canvas, parentEl);
    // this.setup(this.context);
  }
  init(): void {
    super.init();
  }
  setup(context: CanvasRenderingContext2D, settingsEl: Element): void {
    const res = this.workSettings ? (this.workSettings.res ? this.workSettings.res : 0.3) : 0.3;
    const w = this.w;
    const h = this.h;
    const mData = [];
    const jData = [];
    for (let i = 0; i < (res * w); i++) {
      mData.push([]);
      jData.push([]);
      for (let i1 = 0; i1 < (res * h); i1++) {
        mData[i].push(0);
        jData[i].push(0);
      }
    }
    console.log(mData);
    this.mandelbrotData = this.calcAll(mData);
    this.juliaData = jData;
    super.setup(context, settingsEl);
  }
  setupSettings(settingsEl: Element): void {
    const workSettings = this.workSettings;
  }
  calcAll(numberArrayArray: Array<Array<number>>): Array<Array<number>> {
    if (numberArrayArray) {
      const workSettings = this.workSettings;
      let z: Point;
      let zX: number;
      let zY: number;
      let zInitial: Point;
      let escVsq: number;
      let iMax: number;
      if (workSettings) {
        zInitial = (workSettings.zInitial && workSettings.zInitial.x && workSettings.zInitial.y) ? workSettings.zInitial : new Point(0, 0);
        escVsq = Math.pow(workSettings.escV ? workSettings.escV : 2, 2);
        iMax = workSettings.iMax ? workSettings.iMax : 1000;
      } else {
        zInitial = new Point(0, 0);
        escVsq = 4;
        iMax = 1000;
      }
      const iMaxLg = Math.log(iMax);
      const xLength = numberArrayArray.length;
      const xMid = Math.ceil(xLength / 2);
      const xScale = xLength / 4;
      const yLength = numberArrayArray[0].length;
      const yMid = Math.ceil(yLength / 2);
      const yScale = yLength / 4;
      for (let iX = 0; iX < xLength; iX++) {
        const numberArray = numberArrayArray[iX];
        for (let iY = 0; iY < yLength; iY++) {
          z = zInitial;
          zX = zInitial.x;
          zY = zInitial.y;
          let i = 0;
          const c = new Point((iX - xMid) / xScale, (iY - yMid) / yScale);
          while ((Math.pow(zX, 2) + Math.pow(zY, 2) <= escVsq) && (i < iMax)) {
            z = this.calcPoint(z, c);
            zX = z.x;
            zY = z.y;
            i++;
          }
          numberArray[iY] = Math.floor(100 * (1 - Math.log(i) / iMaxLg));
        }
      }
    }
    return numberArrayArray;
  }
  calcPoint(z: Point, c: Point): Point {
    const zx = z.x;
    const zy = z.y;
    return new Point(Math.pow(zx, 2) - Math.pow(zy, 2) + c.x, (2 * zx * zy) + c.y);
  }
  undo(): void {}
  redo(): void {}
  drawAll(context: CanvasRenderingContext2D): void {
    // this.mandelbrotSettings = this.calcAll(this.mandelbrotData);
    const res = this.workSettings ? this.workSettings.res : null;
    const stretch = 1 / (res ? res : 0.3);
    this.drawMandelbrot(context, stretch, this.workSettings ? this.workSettings.color : 223);
  }
  drawMandelbrot(context: CanvasRenderingContext2D, stretch: number, hue: number) {
    const mData = this.mandelbrotData;
    if (mData) {
      const xLength = mData.length;
      const yLength = mData[0].length;
      for (let iX = 0; iX < xLength; iX++) {
        const mColumb = mData[iX];
        for (let iY = 0; iY < yLength; iY++) {
          context.fillStyle = 'hsl(' + hue + ', 100%, ' + mColumb[iY].toString() + '%)';
          context.fillRect(iX * stretch, iY * stretch, stretch, stretch);
          // context.closePath();
        }
      }
    }
  }
  clearWorkData(): void {
  }
  clearUndoData(): void {}
  onPointerDown(e: PointerEvent): void {}
  onPointerMove(e: PointerEvent): void {}
  onPointerUp(): void {}
}
