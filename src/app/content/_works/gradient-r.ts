import { Work } from './work';

export class GradientR extends Work {
  stopList: Array<number>;
  stopMax: number;
  equation: string;
  constructor (parentEl: Element) {
    super(parentEl);
    this.stopList = [0, 1];
    this.stopMax = 700;
    this.equation = 'arctan';
    this.run(true);
  }
  setupSettings(): HTMLElement {
    return document.createElement('div');
  }
  applySettings(context: CanvasRenderingContext2D): CanvasRenderingContext2D {
    return context;
  }
  setColors(colors: {[key: string]: string}): void {}
  drawAll(context: CanvasRenderingContext2D): void {
    const w = this.w;
    const h = this.h;
    const stopList = this.stopList;
    const equation = this.equation;
    for (const stop of stopList) {
      this.draw(context, stop, equation, w, h);
    }
  }
  draw(context: CanvasRenderingContext2D, stop: number, equation: string, w: number = this.w, h: number = this.h): void {
    const color = this.getColor(equation, stop);
    context.fillStyle = color;
    const startX = stop ? w * stop : 0;
    console.log(color, startX);
    context.fillRect(startX, 0, w, h);
  }
  getColor(equation: string, stop: number): string {
    let color = 'hsl(';
    switch (equation) {
      case 'sine':
        const hue = Math.floor(Math.sin(stop * Math.PI * 2) * 360);
        color += (hue < 0) ? 360 + hue : hue;
        break;
      case 'abssine':
        color += Math.floor(Math.abs(Math.sin(stop * Math.PI * 2) * 360));
        break;
      case 'halfsine':
        color += Math.floor(Math.sin(stop * Math.PI) * 360);
        break;
      case 'random':
        color += Math.random() * 360;
        break;
      case 'sawtooth':
        color += ((stop * Math.PI * 2) % 1) * 360;
        break;
      case 'logarithmic':
        color += Math.abs(Math.log(stop)) * 360;
        break;
      case 'quadratic':
        break;
      case 'cubic':
        break;
      case 'tangent':
        color += Math.floor(Math.abs(Math.tan(stop * Math.PI * 2) * 360) % 360);
        break;
      case'arctan':
        color += Math.atan(stop * Math.PI * 2) * (720 / Math.PI);
        break;
      default:
        color += (stop * 3.6).toString();
    }
    return color + ',100%,70%)';
  }
  addStop(listLength: number): Promise<number> {
    const stopList = this.stopList;
    if (stopList.length === listLength) {
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
          // console.log(offset, distance, iGap);
        }
      }
      const newOffset = gaper + (gap / 2);
      stopList.splice(iGap + 1, 0, newOffset);
      return Promise.resolve(newOffset);
    }
  }
  run(fastMode: boolean): void {
    const context = this.context;
    const equation = this.equation;
    const stopMax = this.stopMax;
    let stopNum = this.stopList.length;
    this.draw(context, 0, equation);
    while (stopNum < stopMax) {
      this.addStop(stopNum).then(resolve => {if (!fastMode) { setTimeout(() => this.draw(context, resolve, equation), 10); }});
      stopNum = this.stopList.length;
      // console.log(this.stopList);
    }
    this.drawAll(context);
  }
  undo(): void {}
  redo(): void {}
  clearWorkData(): void {}
  clearUndoData(): void {}
  onPointerDown(e: PointerEvent): void {
    if (e.srcElement.closest('.button') === null) {
      this.run(false);
    }
  }
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
