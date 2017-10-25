import { WorkData } from './work-data.datatype';
export class WorkState {
  workData: WorkData;
  readonly type: string;
  constructor(workData: WorkData, type: string) {
    this.workData = workData;
    this.type = type;
  }
}
