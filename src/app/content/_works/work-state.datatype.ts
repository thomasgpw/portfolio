import { WorkData } from './work-data.datatype';
import { WorkSettings } from './work-settings.datatype';
export class WorkState {
  readonly type: string;
  workData: WorkData;
  workSettings: WorkSettings;
  constructor(type: string, workData: WorkData, workSettings: WorkSettings) {
    this.type = type;
    this.workData = workData;
    this.workSettings = workSettings;
  }
}
