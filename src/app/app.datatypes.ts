export interface AppState {
  appView: boolean;
  shutterView: boolean;
  texts: IterableStringMap;
  color: string;
  unitLength: number;
  workActive: number;
  commandStacksMap: {[key: number]: CommandStacks};
}
export class CommandStacks {
  constructor(id: number, functionStack: Function[] = [], paramStack: any[] = []) {
    this.id = id;
    this.functionStack = functionStack;
    this.paramStack = paramStack;
  }
  id: number;
  functionStack: Function[];
  paramStack: any[];
}
export class IterableStringMap {
  [key: string]: IterableStringList;
}
export class IterableStringList {
  constructor (instance: string, index: number, type: string) {
    this.instance = instance;
    this.index = index;
    this.type = type;
  }
  instance: string;
  index: number;
  type: string;
}
// export interface ViewState {
//   view0Alive: boolean;
//   view1Alive: boolean;
//   view0OnScreen: boolean;
// }
