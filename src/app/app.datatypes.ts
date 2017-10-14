export interface AppState {
  appView: ViewState;
  shutterView: ViewState;
  texts: IterableStringMap;
  color: string;
  unitLength: number;
  isPortrait: boolean;
  workActive: number;
  workStates: {[key: string]: any};
}
// export class CommandStacks {
//   id: number;
//   functionStack: Function[];
//   paramStack: any[];
//   miscData: any[];
//   constructor(id: number, functionStack: Function[] = [], paramStack: any[] = [], miscData: any[] = []) {
//     this.id = id;
//     this.functionStack = functionStack;
//     this.paramStack = paramStack;
//     this.miscData = miscData;
//   }
// }
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
