import { Subject } from 'rxjs';
import { WorkState } from './work-state.datatype';
import { WorkData } from './work-data.datatype';
import { WorkSettings } from './work-settings.datatype';

export interface Work {
  type: string;
  w: number;
  h: number;
  workData: WorkData;
  workDataSubject: Subject<WorkData>;
  // undoData: WorkData;
  workSettings: WorkSettings;
  resizeContents(parentEl: Element): void;
  init(): void;
  setWorkState(workState: WorkState): void;
  setupSettings(): HTMLElement;
  // setWorkData(workData: WorkData): void;
  // setWorkSettings(workSettings: WorkSettings): void;
  onPointerDown(e: PointerEvent): void;
  onPointerMove(e: PointerEvent): void;
  onPointerUp(e: PointerEvent): void;
}
