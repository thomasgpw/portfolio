import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { WorkData } from '../content/_works/work-data.datatype';
import { WorkState } from '../content/_works/work-state.datatype';
import { WorkStates } from '../content/_works/work-states.datatype';
import { WorkWrapperComponent } from '../content/work-wrapper/work-wrapper.component';
import { Work } from '../content/_works/work';
import { ImmediateEllipse } from '../content/_works/immediate-ellipse';
import { PointsToPoint } from '../content/_works/points-to-point';

@Injectable()
export class WorkManagerService {
  private readonly WORK_WRAPPERS: Array<WorkWrapperComponent>;
  // private workStates: WorkStates;
  constructor(
    // workStates: WorkStates
  ) {
    // this.setWorkStates(workStates);
    this.WORK_WRAPPERS = [];
  }
  addWorkWrapper(workWrapper: WorkWrapperComponent) {
    console.log('addworkwrapper');
    const WORK_WRAPPERS = this.WORK_WRAPPERS;
    const i = WORK_WRAPPERS.length;
    WORK_WRAPPERS[i] = workWrapper;
    workWrapper.work = this.assignWork(workWrapper.type, document.getElementsByClassName('canvasWrapper')[i]);
    const work = workWrapper.work;
    work.resizeCanvas();
    work.drawAll(work.context);
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
      default:
        return null;
    }
  }
  activate(id: number): Promise<null> {
    this.WORK_WRAPPERS[id].activate();
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
  // getWorkData(id: number): WorkData {
  //   return this.workStates[id].workData;
  // }
  // getWorkType(id: number): string {
  //   return this.workStates[id].type;
  // }
  // setWorkStates(workStates: WorkStates) {
  //   this.workStates = workStates;
  // }
  // checkWorkStates(): Promise<null> {
  //   if (!this.workStates) {
  //     this.setWorkStates([
  //       new WorkState([], 'ImmediateEllipse'),
  //       new WorkState({centerPoints: [], points: []}, 'PointsToPoint')
  //     ]);
  //     return Promise.resolve(null);
  //   } else {
  //     return Promise.resolve(null);
  //   }
  // }
  // getPosition(type: string, id?: number, w?: number, h?: number): number[] {

  // }
  // getActivePosition(w: number = window.innerWidth, h: number = window.innerHeight): number[] {

  // }
  // getGridPosition(id: number, w: number, h: number) {
  // }
}
