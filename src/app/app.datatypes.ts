export interface AppState {
  appView: boolean;
  shutterView: boolean;
  greeting: string;
  name: string;
  rhyme: string;
  color: string;
  unitLength: number;
  workActive: number;
  commandStacksMap: {[key: number]: CommandStacks};
}
export interface CommandStacks {
  id: number;
  functionStack: Function[];
  paramStack: any[];
}
// export interface ViewState {
//   view0Alive: boolean;
//   view1Alive: boolean;
//   view0OnScreen: boolean;
// }
