import { ActionReducerMap, Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppState, CommandStacks } from './app.datatypes';
import { WelcomeService} from './_services/welcome.service';

/* ACTION TYPES */
const TOGGLE_SHUTTER_ALIVE = 'TOGGLE_SHUTTER_ALIVE';
const TOGGLE_WELCOME_ALIVE = 'TOGGLE_WELCOME_ALIVE';
const GET_NEXT_GREETING = 'GET_NEXT_GREETING';
const GET_RANDOM_GREETING = 'GET_RANDOM_GREETING';
const GET_RANDOM_NAME = 'GET_RANDOM_NAME';
const SET_NAME = 'SET_NAME';
const SET_COLOR = 'SET_COLOR';
const SET_WORK_ACTIVE = 'SET_WORK_ACTIVE';

/* ACTIONS */
export class ToggleShutterAliveAction implements Action {
  readonly type: string = TOGGLE_SHUTTER_ALIVE;
  constructor(public payload?) {}
}
export class ToggleWelcomeAliveAction implements Action {
  readonly type: string = TOGGLE_WELCOME_ALIVE;
  constructor(public payload?) {}
}
export class GetNextGreetingAction implements Action {
  readonly type: string = GET_NEXT_GREETING;
  constructor(public payload: string) {}
}
export class GetRandomGreetingAction implements Action {
  readonly type: string = GET_RANDOM_GREETING;
  constructor(public payload?) {}
}
const welcomeService = new WelcomeService();
export class GetRandomNameAction implements Action {
  readonly type: string = GET_RANDOM_NAME;
  constructor(public payload?) {}
}
export class SetNameAction implements Action {
  readonly type: string = SET_NAME;
  constructor(public payload: string) {}
}
export class SetColorAction implements Action {
  readonly type = SET_COLOR;
  constructor(public payload: string) {}
}
export class SetWorkActiveAction implements Action {
  readonly type = SET_WORK_ACTIVE;
  constructor(public payload: number) {}
}

/* REDUCERS */
export function shutterAliveReducer(state: boolean, action: Actions): boolean {
  switch (action.type) {
    case TOGGLE_SHUTTER_ALIVE:
      return !state;
    default:
      return state;
  }
}
export function welcomeAliveReducer(state: boolean, action: Actions): boolean {
  switch (action.type) {
    case TOGGLE_WELCOME_ALIVE:
      return !state;
    default:
      return state;
  }
}
export function greetingReducer(state: string, action: Actions): string {
  switch (action.type) {
    case GET_NEXT_GREETING:
      return welcomeService.getNextGreeting(action.payload);
    case GET_RANDOM_GREETING:
      return welcomeService.getRandomGreeting();
    default:
      return state;
  }
}
export function nameReducer(state: string, action: Actions): string {
  switch (action.type) {
    case GET_RANDOM_NAME:
      return welcomeService.getRandomName();
    case SET_NAME:
      return action.payload;
    default:
      return state;
  }
}
export function colorReducer(state: string, action: Actions) {
  switch (action.type) {
    case SET_COLOR:
      return action.payload;
    default:
      return state;
  }
}
export function workActiveReducer(state: number, action: Actions) {
  switch (action.type) {
    case SET_WORK_ACTIVE:
      return action.payload;
    default:
      return state;
  }
}
export function worksDataReducer(state: {[key: number]: CommandStacks}, action: Actions): {[key: number]: CommandStacks} {
  return state;
}

export type Actions
  = ToggleShutterAliveAction
  | ToggleWelcomeAliveAction
  | GetNextGreetingAction
  | GetRandomGreetingAction
  | GetRandomNameAction
  | SetNameAction
  | SetColorAction
  | SetWorkActiveAction;

export const reducers: ActionReducerMap<AppState> = {
  shutterAlive: shutterAliveReducer,
  welcomeAlive: welcomeAliveReducer,
  greeting: greetingReducer,
  name: nameReducer,
  color: colorReducer,
  workActive: workActiveReducer,
  worksData: worksDataReducer
};


/* FROM NGRX EXAMPLE APP */
// console.log all actions
export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];
