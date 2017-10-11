import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { WorkWrapperComponent } from '../content/work-wrapper/work-wrapper.component';

@Injectable()
export class WorkWrapperCollectionService {
  private WORK_WRAPPERS: {[key: number]: WorkWrapperComponent};
  private active: number;
  constructor() {
    this.WORK_WRAPPERS = {};
    this.active = null;
  }
  addWorkWrapper(workWrapper: WorkWrapperComponent) {
    console.log('addworkwrapper');
    const existingKeys = Object.keys(this.WORK_WRAPPERS);
    let i = 0;
    while (existingKeys.includes(i.toString())) {i++; }
    this.WORK_WRAPPERS[i] = workWrapper;
  }
  getWorkWrapper(id: number): WorkWrapperComponent {
    return this.WORK_WRAPPERS[id];
  }
  setActive(newActive: number = null) {
    this.active = newActive;
  }
  getActive(): number {
    return this.active;
  }
  destroy(): void {
    delete this.WORK_WRAPPERS;
    console.log(this.WORK_WRAPPERS);
  }
}
