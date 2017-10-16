import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { WorkData } from '../content/_works/work-data.datatype';
import { WorkStates } from '../content/_works/work-states.datatype';
import { WorkWrapperComponent } from '../content/work-wrapper/work-wrapper.component';
import { Work } from '../content/_works/work';
import { PointsToPoint } from '../content/_works/points-to-point';
import { ImmediateEllipse } from '../content/_works/immediateellipse';

type AllWorks
  = ImmediateEllipse
  | PointsToPoint;
@Injectable()
export class WorkManagerService {
  private readonly WORK_WRAPPERS: {[key: number]: WorkWrapperComponent};
  private active: number;
  private readonly WORKS;
  private workStates: WorkStates;
  constructor() {
    this.WORK_WRAPPERS = {};
    this.active = null;
    this.WORKS = [ImmediateEllipse, PointsToPoint];
    this.setWorkStates({
      ImmediateEllipse: [],
      PointsToPoint: {centerPoints: [], points: []}
    });
  }
  setWorkStates(workStates: WorkStates) {
    this.workStates = workStates;
  }
  checkWorkStates(): Promise<null> {
    if (!this.workStates) {
      this.setWorkStates({
        ImmediateEllipse: [],
        PointsToPoint: {centerPoints: [], points: []}
      });
      return Promise.resolve(null);
    } else {
      return Promise.resolve(null);
    }
  }
  addWorkWrapper(workWrapper: WorkWrapperComponent) {
    console.log('addworkwrapper');
    const existingKeys = Object.keys(this.WORK_WRAPPERS);
    let i = 0;
    while (existingKeys.includes(i.toString())) {i++; }
    this.WORK_WRAPPERS[i] = workWrapper;
    let work = workWrapper.work;
    work = this.assignWork(i, document.getElementsByClassName('canvasWrapper')[i]);
    this.checkWorkStates().then(() => work.setWorkData(this.workStates[work.type]));
    work.init();
  }
  getWorkWrapper(id: number): WorkWrapperComponent {
    return this.WORK_WRAPPERS[id];
  }
  assignWork(id: number, parentElement: Element): Work {
    const WORKS = this.WORKS;
    const work = WORKS[id % WORKS.length];
    return new work(parentElement);
  }
  setActive(newActive: number = null) {
    this.active = newActive;
  }
  getActive(): number {
    return this.active;
  }
  // getPosition(type: string, id?: number, w?: number, h?: number): number[] {

  // }
  // getActivePosition(w: number = window.innerWidth, h: number = window.innerHeight): number[] {

  // }
  // getGridPosition(id: number, w: number, h: number) {
  // }
}
