import { Work } from './work';

export class GradientR extends Work {
  stopList: Array<number>;
  stopMax: number;
  equation: string;
  constructor (parentEl: HTMLElement) {
    super(parentEl);
    this.stopList = [0, 1];
    this.stopMax = 200;
    this.equation = 'sine';
  }
  setupSettings(): HTMLElement {
    return document.createElement('div');
  }
  applySettings(context: CanvasRenderingContext2D): CanvasRenderingContext2D {
    return context;
  }
  drawAll(context: CanvasRenderingContext2D): void {
    const w = this.w;
    const h = this.h;
    const stopList = this.stopList;
    const equation = this.equation;
    for (const stop of stopList) {
      const color = this.getColor(equation, stop);
      this.draw(context, stop, color, w, h);
    }
  }
  draw(context: CanvasRenderingContext2D, stop: number, color: string, w: number = this.w, h: number = this.h): void {
    context.fillStyle = color;
    context.fillRect(w / stop, 0, w, h);
  }
  getColor(equation: string, stop: number): string {
    let color = 'hsl(';
    switch (equation) {
      case 'sine':
        color += Math.floor(Math.sin(stop * Math.PI * 0.02) * 360);
        break;
      case 'random':
        color += Math.random() * 360;
        break;
      case 'sawtooth':
        break;
      case 'logarithmic':
        break;
      case 'quadratic':
        break;
      case 'cubic':
        break;
      case 'tangent':
        break;
      default:
        color += (stop * 3.6).toString();
    }
    return color + ',100%,70%)';
  }
  addStop(stopList: Array<number>): Promise<Array<number>> {
    let gaper = 0;
    let gap = 0;
    let iGap = 0;
    for (let i = 0; i < stopList.length - 1; i++) {
      const offset = stopList[i];
      const distance = Math.abs(offset - stopList[i + 1]);
      if (distance > gap) {
        gaper = offset;
        gap = distance;
        iGap = i;
      }
    }
    const newOffset = gaper + (gap / 2);
    stopList.splice(iGap, 0, newOffset);
    return Promise.resolve(stopList);
  }
  run(): void {
    const context = this.context;
    const stopMax = this.stopMax;
    let stopNum = this.stopList.length;
    while (stopNum < stopMax) {
      this.addStop(this.stopList).then();
      stopNum++;
    }
  }
  undo(): void {}
  redo(): void {}
  clearWorkData(): void {}
  clearUndoData(): void {}
  onPointerDown(e: PointerEvent): void {}
  onPointerMove(e: PointerEvent): void {}
  onPointerUp(e: PointerEvent): void {}
  // addStop(color: string, offset: number): SVGStopElement {
  //   const newStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  //   const setStopAttr = newStop.setAttributeNS.bind(newStop, null);
  //   setStopAttr('offset', offset.toString() + '%');
  //   setStopAttr('stop-color', color);
  //   return newStop;
  // }
  // insertStop(gradient: SVGGradientElement, equation: string, stopList: Array<number>): Array<number> {
  //   let gaper = 0;
  //   let gap = 0;
  //   let iGap = 0;
  //   for (let i = 0; i < stopList.length - 1; i++) {
  //     const offset = stopList[i];
  //     const distance = Math.abs(offset - stopList[i + 1]);
  //     if (distance > gap) {
  //       gaper = offset;
  //       gap = distance;
  //       iGap = i;
  //     }
  //   }
  //   const newOffset = gaper + (gap / 2);
  //   stopList.splice(iGap, 0, newOffset);
  //   let color = 'hsl(';
  //   switch (equation) {
  //     case 'sine':
  //       color += Math.floor(Math.sin(newOffset * Math.PI * 0.02) * 360);
  //       break;
  //     case 'random':
  //       color += Math.random() * 360;
  //       break;
  //     case 'sawtooth':
  //       break;
  //     case 'logarithmic':
  //       break;
  //     case 'quadratic':
  //       break;
  //     case 'cubic':
  //       break;
  //     case 'tangent':
  //       break;
  //     default:
  //       color += (newOffset * 3.6).toString();
  //   }
  //   gradient.appendChild(this.addStop(color + ',100%,70%)', newOffset));
  //   return stopList;
  // }
  // generateGradient(maxStop: number, equation: string) {
  //   const gradEl = this.gradEl;
  //   let stopList = [0, 100];
  //   const addStop = this.addStop.bind(this);
  //   addStop('hsl(0,100%,70%)', 0);
  //   addStop('hsl(360,100%,70%)', 100);
  //   const insertStop = this.insertStop.bind(this, gradEl, equation);
  //   let i = 0;
  //   while (i < maxStop) {
  //     stopList = insertStop(stopList);
  //     i++;
  //   }
  // }
}
