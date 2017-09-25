export interface AppState {
  shutterAlive: boolean;
  welcomeAlive: boolean;
  greeting: string;
  name: string;
  color: string;
  workActive: number;
  worksData: {[key: number]: CommandStacks};
}
export interface CommandStacks {
  functionStack: Function[];
  paramStack: any[];
}
