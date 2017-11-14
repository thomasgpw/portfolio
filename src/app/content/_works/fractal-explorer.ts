import { Point, FractalExplorerData, FractalExplorerSettings } from './work.datatypes';
import { Work } from './work';

export class FractalExplorer extends Work {
  pointerDown: boolean;
  mandelbrotData: Array<Array<number>>;
  juliaData: Array<Array<number>>;
  workData: FractalExplorerData;
  workSettings: FractalExplorerSettings;
  zScale: number;
  corner: Point;
  constructor(parentElement: Element) {
    super(parentElement);
    this.type = 'FractalExplorer';
    this.init();
  }
  resizeCanvas(canvas: HTMLCanvasElement = this.canvas, parentEl: Element = canvas.closest('.work-wrapper-view-container')): void {
    super.resizeCanvas(canvas, parentEl);
    this.mandelbrotData = this.calcAll();
  }
  init(): void {
    super.init();
    this.calcAll();
  }
  // setup(context: CanvasRenderingContext2D, settingsEl: Element): void {
  //   super.setup(context, settingsEl);
  // }
  calcAll(): Array<Array<number>> {
    const numberArrayArray: Array<Array<number>> = [];
    const workSettings = this.workSettings;
    const workData = this.workData;
    let zInitial: Point;
    let escVsq: number;
    let iMax: number;
    let res: number;
    let pX: number;
    let pY: number;
    let zoom: number;
    if (workSettings) {
      zInitial = (workSettings.zInitial && workSettings.zInitial.x && workSettings.zInitial.y) ? workSettings.zInitial : new Point(0, 0);
      escVsq = Math.pow(workSettings.escV ? workSettings.escV : 2, 2);
      iMax = workSettings.iMax ? workSettings.iMax : 1000;
      res = workSettings.res ? workSettings.res : 0.3;
    } else {
      zInitial = new Point(0, 0);
      escVsq = 4;
      iMax = 1000;
      res = 0.3;
    }
    if (workData) {
      const p0 = workData.p0;
      if (p0) {
        pX = p0.x ? p0.x : 0;
        pY = p0.y ? p0.y : 0;
      } else {
        pX = 0;
        pY = 0;
      }
      zoom = workData.zoom ? workData.zoom : 1;
    } else {
      pX = 0;
      pY = 0;
      zoom = 1;
    }
    const zScale = 4 / zoom;
    const w = this.w;
    const h = this.h;
    const iMaxLg = Math.log(iMax);
    const xLength = res * w;
    const xScale = xLength / zScale;
    const cornerX = pX - ((xLength / 2) / xScale);
    const yLength = res * h;
    const yScale = yLength / zScale;
    const cornerY = pY - ((yLength / 2) / yScale);
    let z: Point;
    let zX: number;
    let zY: number;
    this.zScale = zScale;
    this.corner = new Point(cornerX, cornerY);
    for (let iX = 0; iX < xLength; iX++) {
      const numberArray = numberArrayArray[numberArrayArray.push([]) - 1];
      for (let iY = 0; iY < yLength; iY++) {
        z = zInitial;
        zX = zInitial.x;
        zY = zInitial.y;
        let i = 0;
        const c = new Point(cornerX + (iX / xScale), cornerY + (iY / yScale));
        while ((Math.pow(zX, 2) + Math.pow(zY, 2) <= escVsq) && (i < iMax)) {
          z = this.calcPoint(z, c);
          zX = z.x;
          zY = z.y;
          i++;
        }
        numberArray.push(Math.floor(100 * (1 - Math.log(i) / iMaxLg)));
      }
    }
    console.log(numberArrayArray);
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
    const res = this.workSettings ? this.workSettings.res : 0.3;
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
    this.workData = {
      p0: new Point(0, 0),
      zoom: 1
    };
  }
  clearUndoData(): void {}
  onPointerDown(e: PointerEvent): void {
    if (e.srcElement.closest('.button') === null) {
      const w = this.w;
      const h = this.h;
      const zScale = this.zScale;
      const corner = this.corner;
      const workData = this.workData;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      this.pointerDown = true;
      this.clearUndoData();
      workData.p0 = new Point(corner.x + ((offsetX / w) * zScale), corner.y + ((offsetY / h) * zScale));
      this.workDataSubject.next(workData);
    }
  }
  onPointerMove(e: PointerEvent): void {
  }
  onPointerUp(e: PointerEvent): void {
    if (this.pointerDown) {
      const w = this.w;
      const h = this.h;
      const zScale = this.zScale;
      const corner = this.corner;
      const workData = this.workData;
      const p0 = workData.p0;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      this.pointerDown = false;
      const magnitude = Math.sqrt(
        Math.pow((corner.x + ((offsetX / w) * zScale)) - p0.x, 2)
        + Math.pow((corner.y + ((offsetY / h) * zScale)) - p0.y, 2)
      );
      if (magnitude !== 0) {
        workData.zoom = 1 / magnitude;
        console.log(workData.zoom);
        this.workDataSubject.next(workData);
        this.mandelbrotData = this.calcAll();
        this.drawAll(this.context);
      }
    }
  }
}
