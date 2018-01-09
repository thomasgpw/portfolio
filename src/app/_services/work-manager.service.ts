import { Injectable } from '@angular/core';
import { WorkData } from '../content/_works/work-data.datatype';
import { WorkState } from '../content/_works/work-state.datatype';
import { WorkStates } from '../content/_works/work-states.datatype';
import { WorkWrapperComponent } from '../content/work-wrapper/work-wrapper.component';
import { Work } from '../content/_works/work';
import { CanvasWork } from '../content/_works/canvas-work';
import { ImmediateEllipse } from '../content/_works/immediate-ellipse';
import { PointsToPoint } from '../content/_works/points-to-point';
import { FractalExplorer } from '../content/_works/fractal-explorer';
import { NNCreator } from '../content/_works/nn-creator';
import { GradientR } from '../content/_works/gradient-r';

@Injectable()
export class WorkManagerService {
  private readonly WORK_WRAPPERS: Array<WorkWrapperComponent>;
  constructor() {
    this.WORK_WRAPPERS = [];
  }
  addWorkWrapper(workWrapper: WorkWrapperComponent): number {
    const WORK_WRAPPERS = this.WORK_WRAPPERS;
    const i = WORK_WRAPPERS.length;
    // workWrapper.id = i;
    // workWrapper.work = this.assignWork(workWrapper.type, document.getElementsByClassName('work-wrapper')[i]);
    WORK_WRAPPERS[i] = workWrapper;
    console.log(WORK_WRAPPERS);
    // const work = workWrapper.work;
    // work.setWorkData(workWrapper.workData);
    // this.attachSubscription(i, workWrapper, work);
    // work.resizeCanvas();
    // work.drawAll(work.context);
    return WORK_WRAPPERS.length;
  }
  marryWorkWappers(): void {
    const WORK_WRAPPERS = this.WORK_WRAPPERS;
    for (let i = 0; i < WORK_WRAPPERS.length; i++) {
      const workWrapper = WORK_WRAPPERS[i];
      workWrapper.id = i;
      const parentEl = document.getElementsByClassName('work-wrapper')[i];
      workWrapper.work = this.assignWork(workWrapper.type, parentEl);
      const work = workWrapper.work;
      work.setWorkState(workWrapper.workState);
      this.attachSubscription(i, workWrapper, work);
      work.resizeContents(parentEl);
    }
  }
  attachSubscription(id: number, workWrapper: WorkWrapperComponent, work: Work): void {
    work.workDataSubject.subscribe(
      state => workWrapper.setWorkStateFunc(id, {
          type: work.type,
          workData: state,
          workSettings: work.workSettings
      })
    );
  }
  getWorkWrappers(): Array<WorkWrapperComponent> {
    return this.WORK_WRAPPERS;
  }
  assignWork(type: string, parentElement: Element): Work {
    switch (type) {
      case 'ImmediateEllipse':
        return new ImmediateEllipse(parentElement);
      case 'PointsToPoint':
        return new PointsToPoint(parentElement);
      case 'FractalExplorer':
        return new FractalExplorer(parentElement);
      case 'NNCreator':
        return new NNCreator(parentElement);
      case 'GradientR':
        return new GradientR(parentElement);
      default:
        return null;
    }
  }
  sendColors(id: number, colors: {[key: string]: string}) {
    (this.WORK_WRAPPERS[id].work as CanvasWork).setColors(colors);
  }
  activate(id: number): Promise<null> {
    const WORK_WRAPPERS = this.WORK_WRAPPERS;
    if (WORK_WRAPPERS[id]) {
      WORK_WRAPPERS[id].activate();
    }
    return Promise.resolve(null);
  }
  deactivate(id: number): Promise<null> {
    this.WORK_WRAPPERS[id].deactivate();
    return Promise.resolve(null);
  }
  resizeWork(id: number): void {
    console.log(id, this.WORK_WRAPPERS);
    const work = this.WORK_WRAPPERS[id].work;
    if (work) {
      work.resizeContents(
        document.getElementsByClassName('work-wrapper')[id]
      );
    }
    // work.drawAll(work.applySettings(work.context));
  }
}
