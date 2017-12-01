import { Subject } from 'rxjs/Subject';
import { Work } from './work';
import { WorkState } from './work-state.datatype';
import { Perceptron, NeuralNetwork } from './neural-network';
import {
  EmptyData,
  EmptySettings
} from './work.datatypes';

export class NNCreator implements Work {
  type: string;
  w: number;
  h: number;
  active: boolean;
  workData: EmptyData;
  workSettings: EmptySettings;
  workDataSubject: Subject<EmptyData>;
  inputs = [[0, 0], [0, 1], [1, 0], [1, 1]];
  ANDtargets  = [[0], [0], [0], [1]];
  ORtargets   = [[0], [1], [1], [1]];
  NANDtargets = [[1], [1], [1], [0]];
  NORtargets  = [[1], [0], [0], [0]];
  XORtargets  = [[0], [1], [1], [0]];
  XNORtargets = [[1], [0], [0], [1]];

  constructor(parentEl: Element) {
    this.workDataSubject = new Subject();
  }
  resizeContents(parentEl: Element): void {
    const w = parentEl.clientWidth;
    const h = parentEl.clientHeight;
    this.w = w;
    this.h = h;
  }
  setupSettings(): HTMLElement {
    const settingsEl = document.createElement('div');
    return settingsEl;
  }
  activate(): Promise<null> {
    this.active = true;
    return Promise.resolve(null);
  }
  deactivate(): Promise<null> {
    this.active = false;
    return Promise.resolve(null);
  }
  init(): void {

  }
  setWorkState(workState: WorkState): void {

  }
  start(): void {
    const n = new NeuralNetwork([2, 2, 1], 0.1, 0.5, 0, 0);
    n.train(this.inputs, this.XORtargets);
  }
  onPointerDown(e: PointerEvent): void {
    console.log('clicked');
    if ((e.target as Element).closest('.button') === null) {
      this.start();
    }
  }
  onPointerMove(e: PointerEvent): void {}
  onPointerUp(e: PointerEvent): void {}
}
