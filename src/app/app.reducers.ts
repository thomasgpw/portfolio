import { ActionReducerMap, Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppState, CommandStacks, ViewState, IterableStringMap, IterableStringInstance } from './app.datatypes';

/* ACTION TYPES */
const SET_APP_VIEW = 'SET_APP_VIEW';
const SET_SHUTTER_VIEW = 'SET_SHUTTER_VIEW';
const SET_STRING = 'SET_STRING';
const SET_COLOR = 'SET_COLOR';
const SET_UNIT_LENGTH = 'SET_UNIT_LENGTH';
const SET_WORK_ACTIVE = 'SET_WORK_ACTIVE';
const SET_COMMAND_STACKS_MAP = 'SET_COMMAND_STACKS_MAP';
const SET_COMMAND_STACKS = 'SET_COMMAND_STACKS';
const DELETE_COMMAND_STACKS = 'DELETE_COMMAND_STACKS';

/* ACTIONS */
export class DummyAction implements Action {
  readonly type: string = 'DUMMY';
  constructor(public payload?) {}
}
export class SetAppViewAction implements Action {
  readonly type: string = SET_APP_VIEW;
  constructor(public payload: [string, boolean]) {}
}
export class SetShutterViewAction implements Action {
  readonly type: string = SET_SHUTTER_VIEW;
  constructor(public payload: [string, boolean]) {}
}
export class SetStringAction implements Action {
  readonly type: string = SET_STRING;
  constructor(public payload: IterableStringInstance) {}
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
export class SetCommandStacksMapAction implements Action {
  readonly type = SET_COMMAND_STACKS_MAP;
  constructor(public payload: {[key: number]: CommandStacks}) {}
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
export function appViewReducer(state: ViewState = {view0Alive: null, view0OnScreen: null, view1Alive: null}, action: Actions): ViewState {
  switch (action.type) {
    case SET_APP_VIEW:
      const payload = action.payload;
      switch (payload[0]) {
        case 'shutterViewAlive':
          state.view0Alive = payload[1];
          state.view0OnScreen = payload[1];
          break;
        case 'contentViewAlive':
          state.view1Alive = payload[1];
          state.view0OnScreen = !payload[1];
          break;
        default:
          break;
      }
      return state;
    default:
      return state;
  }
}
export function shutterViewReducer(state: ViewState
  = {view0Alive: null, view0OnScreen: null, view1Alive: null}, action: Actions): ViewState {
  switch (action.type) {
    case SET_SHUTTER_VIEW:
      const payload = action.payload;
      switch (payload[0]) {
        case 'welcomeViewAlive':
          state.view0Alive = payload[1];
          state.view0OnScreen = payload[1];
          break;
        case 'aboutViewAlive':
          state.view1Alive = payload[1];
          state.view0OnScreen = !payload[1];
          break;
        default:
          break;
      }
      return state;
    default:
      return state;
  }
}
export function textsReducer(
  state: IterableStringMap = {
    'greeting': {payload: null, type: 'greeting'},
    'name': {payload: null, type: 'name'},
  },
  action: Actions
): IterableStringMap {
  switch (action.type) {
    case SET_STRING:
      const payload = action.payload;
      state[payload.type] = payload;
      return state;
    default:
      return state;
  }
}
export function colorReducer(state: string, action: Actions): string {
  switch (action.type) {
    case SET_COLOR:
      return action.payload;
    default:
      return state;
  }
}
export function unitLengthReducer(state: number, action: Actions): number {
  switch (action.type) {
    case SET_UNIT_LENGTH:
      return action.payload;
    default:
      return state;
  }
}
export function workActiveReducer(state: number, action: Actions): number {
  switch (action.type) {
    case SET_WORK_ACTIVE:
      return action.payload;
    default:
      return state;
  }
}
export function commandStacksMapReducer(state: {[key: number]: CommandStacks}, action: Actions): {[key: number]: CommandStacks} {
  const payload = action.payload;
  switch (action.type) {
    case SET_COMMAND_STACKS_MAP:
      return payload;
    case SET_COMMAND_STACKS:
      state[payload.id] = payload;
      return state;
    case DELETE_COMMAND_STACKS:
      state[payload] = new CommandStacks(payload);
      return state;
    default:
      return state;
  }
}

export type Actions
  = DummyAction
  | SetAppViewAction
  | SetShutterViewAction
  | SetStringAction
  | SetColorAction
  | SetUnitLengthAction
  | SetWorkActiveAction
  | SetCommandStacksAction
  | DeleteCommandStacksAction;

export const reducers: ActionReducerMap<AppState> = {
  appView: appViewReducer,
  shutterView: shutterViewReducer,
  texts: textsReducer,
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
