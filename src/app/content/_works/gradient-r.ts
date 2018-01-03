import { Subject } from 'rxjs/Subject';
import { Work } from './work';
import { WorkState } from './work-state.datatype';
import {
  EmptyData,
  GradientRSettings
} from './work.datatypes';

export class GradientR implements Work {
  type: string;
  w: number;
  h: number;
  workData: EmptyData;
  workSettings: GradientRSettings;
  workDataSubject: Subject<EmptyData>;
  stopList: Array<number>;
  valList: Array<number>;
  stopMax: number;
  equation: string;
  variable: string;
  gradEl: SVGGradientElement;
  constructor (parentEl: Element) {
    const svgEl = parentEl.appendChild(
      document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    );
    svgEl.setAttributeNS(null, 'viewBox', '0 0 1 1');
    const svgStyle = svgEl.style;
    svgStyle.height = '100%';
    svgStyle.width = '100%';
    const defsEl = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
    const gradEl = defsEl.appendChild(
      document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient')
    );
    const setGradAttr = gradEl.setAttributeNS.bind(gradEl, null);
    setGradAttr('id', 'gradient');
    setGradAttr('x1', '0');
    setGradAttr('y1', '0');
    setGradAttr('x2', '1');
    setGradAttr('y2', '0');
    this.gradEl = gradEl;
    const rectEl = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
    const setRectAttr = rectEl.setAttributeNS.bind(rectEl, null);
    setRectAttr('fill', 'url(#gradient)');
    setRectAttr('width', '1');
    setRectAttr('height', '1');
    setRectAttr('preserveAspectRatio', 'none');
    this.workDataSubject = new Subject();
    this.type = 'GradientR';
    this.stopMax = 700;
    this.equation = 'arctan';
    this.variable = 'fullhue';
  }
  resizeContents(parentEl: Element): void {
    const w = parentEl.clientWidth;
    const h = parentEl.clientHeight;
    this.w = w;
    this.h = h;
  }
  setupSettings(): HTMLElement {
    const settingsEl = document.createElement('div');
    const equationLable = settingsEl.appendChild(document.createElement('label'));
    equationLable.setAttribute('for', 'equationInput');
    equationLable.innerHTML = 'Gradient Equation Type';
    const equationInput = settingsEl.appendChild(document.createElement('input'));
    equationInput.id = 'equationInput';
    // equationInput.type = ''
    const variableLable = settingsEl.appendChild(document.createElement('label'));
    variableLable.setAttribute('for', 'variableInput');
    variableLable.innerHTML = 'Color Variation Type';
    const variableInput = settingsEl.appendChild(document.createElement('input'));
    variableInput.id = 'variableInput';
    return settingsEl;
  }
  init(): void {

  }
  setWorkState(workState: WorkState): void {

  }
  addStop(
    variable: string,
    offset: number,
    val: number
  ): SVGStopElement {
    const color = this.concatColor(val, variable);
    const newStop = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    const setStopAttr = newStop.setAttributeNS.bind(newStop, null);
    setStopAttr('offset', offset.toString());
    setStopAttr('stop-color', color);
    return newStop;
  }
  concatColor(val: number, variable: string = this.variable): string {
    let color = '';
    switch (variable) {
      case 'fullhue':
        color = 'hsl(' + Math.floor(val * 360).toString() + ',100%,70%)';
        break;
      case 'grayscale':
        color = 'hsl(0,0%,' + (val * 100).toString() + '%)';
        break;
      default:
        break;
    }
    return color;
  }
  calcValue(stop: number, equation: string = this.equation): number {
    switch (equation) {
      case 'arctan':
        return Math.atan(stop * Math.PI * 2) * 2 / Math.PI;
      default:
        return NaN;
    }
  }
  findNextStop(stopList: Array<number> = this.stopList): [number, number] {
    let gaper = 0;
    let gap = 0;
    let iGap = 0;
    for (let i = 0; i < stopList.length - 1; i++) {
      const offset = stopList[i];
      const distance = Math.abs(offset - stopList[i + 1]);
      if (distance > gap) {
        gaper = offset;
        gap = distance;
        iGap = i + 1;
      }
    }
    const newOffset = gaper + (gap / 2);
    // console.log(stopList, iGap, newOffset);
    // stopList.splice(iGap, 0, newOffset);
    return [iGap, newOffset];
  }
  epoch(
    gradEl: SVGGradientElement = this.gradEl,
    equation: string = this.equation,
    variable: string = this.variable,
    stopList: Array<number> = this.stopList,
    valList: Array<number> = this.valList
  ): void {
    const newStopNums = this.findNextStop(stopList);
    const iGap = newStopNums[0];
    const offset = newStopNums[1];
    const val = this.calcValue(offset, equation);
    stopList.splice(iGap, 0, offset);
    valList.splice(iGap, 0, val);
    // gradEl.appendChild(this.addStop(offset, val, variable));
  }
  run(
    stopList: Array<number> = this.stopList,
    valList: Array<number> = this.valList
  ): void {
    const gradEl = this.gradEl;
    const equation = this.equation;
    const variable = this.variable;
    const stopMax = this.stopMax;
    const calcValue = this.calcValue.bind(this);
    const epoch = this.epoch.bind(this, gradEl, equation, variable);
    if (!stopList) {
      stopList = [0, 1];
      valList = [calcValue(0, equation), calcValue(1, equation)];
    }
    let stopNum = stopList.length;
    while (stopNum < stopMax) {
      epoch(stopList, valList);
      stopNum++;
    }
    this.stopList = stopList;
    this.valList = valList;
    this.appendAllStops(gradEl, 0, stopMax, stopList, valList);
  }
  appendAllStops(
    gradEl: SVGGradientElement,
    stopNum: number,
    stopMax: number,
    stopList: Array<number> = this.stopList,
    valList: Array<number> = this.valList
  ) {
    stopNum++;
    const appendGrad = gradEl.appendChild.bind(gradEl);
    const addStop = this.addStop.bind(this, this.variable);
    if (stopNum < stopMax) {
      appendGrad(addStop(stopList[stopNum], valList[stopNum]));
      setTimeout(() => this.appendAllStops(gradEl, stopNum, stopMax, stopList, valList));
    }
  }
  // applySettings(context: CanvasRenderingContext2D): CanvasRenderingContext2D {
  //   return context;
  // }
  // setColors(colors: {[key: string]: string}): void {}
  // drawAll(context: CanvasRenderingContext2D): void {
  //   const w = this.w;
  //   const h = this.h;
  //   const stopList = this.stopList;
  //   const equation = this.equation;
  //   for (const stop of stopList) {
  //     this.draw(context, stop, equation, w, h);
  //   }
  // }
  // draw(context: CanvasRenderingContext2D, stop: number, equation: string, w: number = this.w, h: number = this.h): void {
  //   const color = this.getColor(equation, stop);
  //   context.fillStyle = color;
  //   const startX = stop ? w * stop : 0;
  //   console.log(color, startX);
  //   context.fillRect(startX, 0, w, h);
  // }
  // getColor(equation: string, stop: number): string {
  //   let color = 'hsl(';
  //   switch (equation) {
  //     case 'sine':
  //       const hue = Math.floor(Math.sin(stop * Math.PI * 2) * 360);
  //       color += (hue < 0) ? 360 + hue : hue;
  //       break;
  //     case 'abssine':
  //       color += Math.floor(Math.abs(Math.sin(stop * Math.PI * 2) * 360));
  //       break;
  //     case 'halfsine':
  //       color += Math.floor(Math.sin(stop * Math.PI) * 360);
  //       break;
  //     case 'random':
  //       color += Math.random() * 360;
  //       break;
  //     case 'sawtooth':
  //       color += ((stop * Math.PI * 2) % 1) * 360;
  //       break;
  //     case 'logarithmic':
  //       color += Math.abs(Math.log(stop)) * 360;
  //       break;
  //     case 'quadratic':
  //       break;
  //     case 'cubic':
  //       break;
  //     case 'tangent':
  //       color += Math.floor(Math.abs(Math.tan(stop * Math.PI * 2) * 360) % 360);
  //       break;
  //     case'arctan':
  //       color += Math.atan(stop * Math.PI * 2) * (720 / Math.PI);
  //       break;
  //     default:
  //       color += (stop * 3.6).toString();
  //   }
  //   return color + ',100%,70%)';
  // }
  // run(fastMode: boolean): void {
  //   const context = this.context;
  //   const equation = this.equation;
  //   const stopMax = this.stopMax;
  //   let stopNum = this.stopList.length;
  //   this.draw(context, 0, equation);
  //   while (stopNum < stopMax) {
  //     this.addStop(stopNum).then(resolve => {if (!fastMode) { setTimeout(() => this.draw(context, resolve, equation), 10); }});
  //     stopNum = this.stopList.length;
  //     // console.log(this.stopList);
  //   }
  //   this.drawAll(context);
  // }
  undo(): void {}
  redo(): void {}
  clearWorkData(): void {}
  clearUndoData(): void {}
  onPointerDown(e: PointerEvent): void {
    if ((e.target as Element).closest('.button') === null) {
      this.run();
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
