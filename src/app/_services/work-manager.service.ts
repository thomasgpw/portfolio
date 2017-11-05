import { Injectable } from '@angular/core';
import { WorkData } from '../content/_works/work-data.datatype';
import { WorkState } from '../content/_works/work-state.datatype';
import { WorkStates } from '../content/_works/work-states.datatype';
import { WorkWrapperComponent } from '../content/work-wrapper/work-wrapper.component';
import { Work } from '../content/_works/work';
import { ImmediateEllipse } from '../content/_works/immediate-ellipse';
import { PointsToPoint } from '../content/_works/points-to-point';
import { FractalExplorer } from '../content/_works/fractal-explorer';

@Injectable()
export class WorkManagerService {
  private readonly WORK_WRAPPERS: Array<WorkWrapperComponent>;
  constructor() {
    this.WORK_WRAPPERS = [];
  }
  addWorkWrapper(workWrapper: WorkWrapperComponent): number {
    const WORK_WRAPPERS = this.WORK_WRAPPERS;
    const i = WORK_WRAPPERS.length;
    workWrapper.id = i;
    workWrapper.work = this.assignWork(workWrapper.type, document.getElementsByClassName('canvas-wrapper')[i]);
    WORK_WRAPPERS[i] = workWrapper;
    console.log(WORK_WRAPPERS);
    const work = workWrapper.work;
    work.setWorkState(workWrapper.workState);
    this.attachSubscription(i, workWrapper, work);
    work.resizeCanvas();
    work.setup(work.context, document.getElementById('settingsWrapper'));
    return WORK_WRAPPERS.length;
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
      default:
        return null;
    }
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
    const work = this.WORK_WRAPPERS[id].work;
    work.resizeCanvas();
    work.drawAll(work.context);
  }
}
