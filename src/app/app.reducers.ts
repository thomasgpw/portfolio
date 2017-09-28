import { ActionReducerMap, Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppState, CommandStacks } from './app.datatypes';
import { GreetingService } from './_services/greeting.service';
import { RhymeService } from './_services/rhyme.service';
/* ACTION TYPES */
const SET_APP_VIEW = 'SET_APP_VIEW';
const SET_SHUTTER_VIEW = 'SET_SHUTTER_VIEW';
const GET_NEXT_GREETING = 'GET_NEXT_GREETING';
const GET_RANDOM_GREETING = 'GET_RANDOM_GREETING';
const GET_RANDOM_NAME = 'GET_RANDOM_NAME';
const SET_NAME = 'SET_NAME';
const GET_NEXT_RHYME = 'GET_NEXT_RHYME';
const GET_RANDOM_RHYME = 'GET_RANDOM_RHYME';
const SET_COLOR = 'SET_COLOR';
const SET_UNIT_LENGTH = 'SET_UNIT_LENGTH';
const SET_WORK_ACTIVE = 'SET_WORK_ACTIVE';
const SET_COMMAND_STACKS = 'SET_COMMAND_STACKS';
const DELETE_COMMAND_STACKS = 'DELETE_COMMAND_STACKS';

/* ACTIONS */
export class SetAppViewAction implements Action {
  readonly type: string = SET_APP_VIEW;
  constructor(public payload: boolean) {}
}
export class SetShutterViewAction implements Action {
  readonly type: string = SET_SHUTTER_VIEW;
  constructor(public payload: boolean) {}
}
export class GetNextGreetingAction implements Action {
  readonly type: string = GET_NEXT_GREETING;
  constructor(public payload: string) {}
}
export class GetRandomGreetingAction implements Action {
  readonly type: string = GET_RANDOM_GREETING;
  constructor(public payload?) {}
}
export class GetRandomNameAction implements Action {
  readonly type: string = GET_RANDOM_NAME;
  constructor(public payload?) {}
}
export class SetNameAction implements Action {
  readonly type: string = SET_NAME;
  constructor(public payload: string) {}
}
export class GetNextRhymeAction implements Action {
  readonly type: string = GET_NEXT_RHYME;
  constructor(public payload: string) {}
}
export class GetRandomRhymeAction implements Action {
  readonly type: string = GET_RANDOM_RHYME;
  constructor(public payload?) {}
}
export class SetColorAction implements Action {
  readonly type = SET_COLOR;
  constructor(public payload: string) {}
}
export class SetUnitLengthAction implements Action {
  readonly type = SET_UNIT_LENGTH;
  constructor(public payload: number) {}
}
export class SetWorkActiveAction implements Action {
  readonly type = SET_WORK_ACTIVE;
  constructor(public payload: number) {}
}
export class SetCommandStacksAction implements Action {
  readonly type = SET_COMMAND_STACKS;
  constructor(public payload: CommandStacks) {}
}
export class DeleteCommandStacksAction implements Action {
  readonly type = DELETE_COMMAND_STACKS;
  constructor(public payload: number) {}
}

/* REDUCERS */
function appViewReducer(state: boolean, action: Actions): boolean {
  switch (action.type) {
    case SET_APP_VIEW:
      return action.payload;
    default:
      return state;
  }
}
function shutterViewReducer(state: boolean, action: Actions): boolean {
  switch (action.type) {
    case SET_SHUTTER_VIEW:
      return action.payload;
    default:
      return state;
  }
}
const _greetingService = new GreetingService();
function greetingReducer(state: string, action: Actions): string {
  switch (action.type) {
    case GET_NEXT_GREETING:
      return _greetingService.getNextGreeting(action.payload);
    case GET_RANDOM_GREETING:
      return _greetingService.getRandomGreeting();
    default:
      return state;
  }
}
function nameReducer(state: string, action: Actions): string {
  switch (action.type) {
    case GET_RANDOM_NAME:
      return _greetingService.getRandomName();
    case SET_NAME:
      return action.payload;
    default:
      return state;
  }
}
const _rhymeService = new RhymeService();
function rhymeReducer(state: string, action: Actions): string {
  switch (action.type) {
    case GET_NEXT_RHYME:
      return _rhymeService.getNextRhyme(action.payload);
    case GET_RANDOM_RHYME:
      return _rhymeService.getRandomRhyme();
    default:
      return state;
  }
}
function colorReducer(state: string, action: Actions): string {
  switch (action.type) {
    case SET_COLOR:
      return action.payload;
    default:
      return state;
  }
}
function unitLengthReducer(state: number, action: Actions): number {
  switch (action.type) {
    case SET_UNIT_LENGTH:
      return action.payload;
    default:
      return state;
  }
}
function workActiveReducer(state: number, action: Actions): number {
  switch (action.type) {
    case SET_WORK_ACTIVE:
      return action.payload;
    default:
      return state;
  }
}
function commandStacksMapReducer(state: {[key: number]: CommandStacks}, action: Actions): {[key: number]: CommandStacks} {
  const payload = action.payload;
  switch (action.type) {
    case SET_COMMAND_STACKS:
      state[payload.key] = payload.commandStack;
      return state;
    case DELETE_COMMAND_STACKS:
      state[payload] = {id: payload, functionStack: [], paramStack: []};
      return state;
    default:
      return state;
  }
}

export type Actions
  = SetAppViewAction
  | SetShutterViewAction
  | GetNextGreetingAction
  | GetRandomGreetingAction
  | GetRandomNameAction
  | SetNameAction
  | GetNextRhymeAction
  | GetRandomRhymeAction
  | SetColorAction
  | SetUnitLengthAction
  | SetWorkActiveAction
  | SetCommandStacksAction
  | DeleteCommandStacksAction;

export const reducers: ActionReducerMap<AppState> = {
  appView: appViewReducer,
  shutterView: shutterViewReducer,
  greeting: greetingReducer,
  name: nameReducer,
  rhyme: rhymeReducer,
  color: colorReducer,
  unitLength: unitLengthReducer,
  workActive: workActiveReducer,
  commandStacksMap: commandStacksMapReducer
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
