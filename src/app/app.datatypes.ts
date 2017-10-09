export interface AppState {
  appView: ViewState;
  shutterView: ViewState;
  texts: IterableStringMap;
  color: string;
  unitLength: number;
  isPortrait: boolean;
  workActive: number;
  commandStacksMap: {[key: number]: CommandStacks};
}
export class CommandStacks {
  id: number;
  functionStack: Function[];
  paramStack: any[];
  constructor(id: number, functionStack: Function[] = [], paramStack: any[] = []) {
    this.id = id;
    this.functionStack = functionStack;
    this.paramStack = paramStack;
  }
}
export class IterableStringMap {
  [key: string]: IterableStringInstance;
}
export class IterableStringInstance {
  payload: string;
  type: string;
  constructor (payload: string, type: string) {
    this.payload = payload;
    this.type = type;
  }
}
export interface ViewState {
  view0Alive: boolean;
  view1Alive: boolean;
  animationState: boolean;
  transitionActive: boolean;
}
