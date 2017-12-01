import { Point, EllipseSet, ImmediateEllipseData, ImmediateEllipseSettings } from './work.datatypes';
import { CanvasWork } from './canvas-work';

export class ImmediateEllipse extends CanvasWork {

  pointerDown = false;
  // setNum: number;
  // undoSetNum: number;
  workData: ImmediateEllipseData;
  undoData: ImmediateEllipseData;
  workSettings: ImmediateEllipseSettings;
  readonly type: string;
  constructor (parentElement: Element) {
    super(parentElement);
    this.type = 'ImmediateEllipse';
    this.clearWorkData();
    this.clearUndoData();
  }
  init(): void {
    super.init();
    this.fill();
  }
  setupSettings(): HTMLElement {
    const workSettings = this.workSettings;
    const settingsEl = document.createElement('div');
    const colorLabel = settingsEl.appendChild(document.createElement('label'));
    colorLabel.setAttribute('for', 'colorInput');
    colorLabel.innerHTML = 'Line color:';
    const colorInput = settingsEl.appendChild(document.createElement('input'));
    colorInput.id = 'colorInput';
    colorInput.type = 'color';
    colorInput.value = workSettings.colors;
    colorInput.onchange = (event  => workSettings.colors = (event.target as HTMLInputElement).value);
    settingsEl.appendChild(document.createElement('br'));
    const bgColorLabel = settingsEl.appendChild(document.createElement('label'));
    bgColorLabel.setAttribute('for', 'bgColorInput');
    bgColorLabel.innerHTML = 'Background color:';
    const bgColorInput = settingsEl.appendChild(document.createElement('input'));
    bgColorInput.id = 'bgColorInput';
    bgColorInput.type = 'color';
    bgColorInput.value = workSettings.backgroundColor;
    bgColorInput.onchange = (event  => workSettings.backgroundColor = (event.target as HTMLInputElement).value);
    return settingsEl;
  }
  applySettings(context: CanvasRenderingContext2D): CanvasRenderingContext2D {
    const workSettings = this.workSettings;
    context.fillStyle = workSettings.backgroundColor;
    context.strokeStyle = workSettings.colors;
    return context;
  }
  setColors(colors: {[key: string]: string}): void {}
  download(link: HTMLAnchorElement) {
    const context = this.context;
    const w = this.w;
    const h = this.h;
    super.download(link);
    this.clearCanvas(context, w, h);
    this.drawAll(context);
  }
  setWorkSettings(workSettings: ImmediateEllipseSettings, context: CanvasRenderingContext2D) {
    if (!workSettings.backgroundColor) {
      workSettings.backgroundColor = 'white';
    }
    if (!workSettings.colors) {
      workSettings.colors = 'black';
    }
    super.setWorkSettings(workSettings, context);
  }
  moveLastPoint(fromData: ImmediateEllipseData, toData: ImmediateEllipseData): Promise<boolean> {
    const fromSetLastIndex = fromData.length - 1;
    const ellipseSet = fromData[fromSetLastIndex];
    if (ellipseSet !== undefined) {
      if (ellipseSet.points.length === 0) {
        fromData.pop();
        return this.moveLastPoint(fromData, toData);
      } else {
        const undoCenter = ellipseSet.center;
        const undoPoint = ellipseSet.points.pop();
        const toEllipse = toData[toData.length - 1];
        if (toEllipse === undefined || toEllipse.center !== undoCenter) {
          this.addEllipseSet(undoCenter, toData);
        }
        this.addEllipse(undoPoint, toData);
        return Promise.resolve(true);
      }
    } else {
      return Promise.resolve(false);
    }
  }
  undo(): void {
    const workData = this.workData;
    const undoData = this.undoData;
    this.moveLastPoint(workData, undoData).then(result => {if (result) {
      this.clearCanvas();
      this.drawAll(this.context);
    } else {
      console.log('nothing to undo');
    }});
  }
  redo(): void {
    const workData = this.workData;
    this.moveLastPoint(this.undoData, workData).then(result => {if (result) {
      const ellipseSet = workData[workData.length - 1];
      const points = ellipseSet.points;
      this.draw(this.context, ellipseSet.center, points[points.length - 1]);
      this.workDataSubject.next(workData);
    } else {
      console.log('nothing to redo');
    }});
  }
  draw(context: CanvasRenderingContext2D, center: Point, pointer: Point): void {
    const centerX = center.x;
    const centerY = center.y;
    const w = this.w;
    const h = this.h;
    context.beginPath();
    context.ellipse(
      centerX * w, centerY * h,
      Math.abs(centerX - pointer.x) * w, Math.abs(centerY - pointer.y) * h,
      0, 0, 2 * Math.PI, false
    );
    context.stroke();
  }
  drawEllipseSet(context: CanvasRenderingContext2D, ellipseSet: EllipseSet): void {
    const center = ellipseSet.center;
    const points = ellipseSet.points;
    const setLength = points.length;
    const draw = this.draw.bind(this, context, center);
    for (let i = 0; i < setLength; i++) {
      draw(points[i]);
    }
  }
  drawAll(context: CanvasRenderingContext2D): void {
    const workSettings = this.workSettings;
    context.fillStyle = workSettings.backgroundColor;
    context.strokeStyle = workSettings.colors;
    this.fill(context);
    const workData = this.workData;
    const workDataLength = workData.length;
    const drawEllipseSet = this.drawEllipseSet.bind(this, context);
    for (let i = 0; i < workDataLength; i++) {
      drawEllipseSet(workData[i]);
    }
  }
  addEllipseSet(center: Point, data: ImmediateEllipseData): void {
    data[data.length] = new EllipseSet(center);
  }
  addEllipse(pointer: Point, data: ImmediateEllipseData): void {
    const ellipseSet = data[data.length - 1];
    ellipseSet.points.push(pointer);
    this.draw(this.context, ellipseSet.center, pointer);
  }
  clearWorkData(): void {
    this.workData = [];
    this.workDataSubject.next([]);
  }
  clearUndoData(): void {
    this.undoData = [];
  }
  onPointerDown (e: PointerEvent): void {
    if ((e.target as Element).closest('.button') === null) {
      const w = this.w;
      const h = this.h;
      const offsetX = e.offsetX;
      const offsetY = e.offsetY;
      const workData = this.workData;
      this.pointerDown = true;
      this.clearUndoData();
      this.addEllipseSet(new Point(offsetX / w, offsetY / h), workData);
      this.addEllipse(new Point(offsetX / w, offsetY / h), workData);
      this.workDataSubject.next(workData);
    }
  }
  onPointerMove (e: PointerEvent): void {
    if (this.pointerDown) {
      const workData = this.workData;
      this.addEllipse(new Point(e.offsetX / this.w, e.offsetY / this.h), workData);
      this.workDataSubject.next(workData);
    }
  }
  onPointerUp (e: PointerEvent): void {
    this.pointerDown = false;
  }
}
