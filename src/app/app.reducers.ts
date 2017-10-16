import { ActionReducerMap, Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { WorkData } from './content/_works/work-data.datatype';
import { WorkStates } from './content/_works/work-states.datatype';
import { AppState, ViewState, IterableStringMap, IterableStringInstance } from './app.datatypes';

/* ACTION TYPES */
const SET_APP_VIEW = 'SET_APP_VIEW';
const SET_SHUTTER_VIEW = 'SET_SHUTTER_VIEW';
const SET_STRING = 'SET_STRING';
const SET_COLOR = 'SET_COLOR';
const SET_UNIT_LENGTH = 'SET_UNIT_LENGTH';
const SET_IS_PORTRAIT = 'SET_IS_PORTRAIT';
const SET_WORK_ACTIVE = 'SET_WORK_ACTIVE';
const SET_WORK_STATES = 'SET_WORK_STATES';
const SET_WORK_DATA = 'SET_WORK_DATA';
const DELETE_WORK_DATA = 'DELETE_WORK_DATA';

export const VIEW0_ALIVE = 'VIEW0_ALIVE';
export const VIEW1_ALIVE = 'VIEW1_ALIVE';
export const ANIMATION_STATE = 'ANIMATION_STATE';
export const TRANSITION_ACTIVE = 'TRANSITION_ACTIVE';

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
export class SetIsPortraitAction implements Action {
  readonly type = SET_IS_PORTRAIT;
  constructor(public payload: boolean) {}
}
export class SetWorkActiveAction implements Action {
  readonly type = SET_WORK_ACTIVE;
  constructor(public payload: number) {}
}
export class SetWorkStatesAction implements Action {
  readonly type = SET_WORK_STATES;
  constructor(public payload: WorkStates) {}
}
export class SetWorkDataAction implements Action {
  readonly type = SET_WORK_DATA;
  constructor(public payload: WorkData) {}
}
export class DeleteWorkDataAction implements Action {
  readonly type = DELETE_WORK_DATA;
  constructor(public payload: string) {}
}

/* REDUCERS */
export function appViewReducer(state: ViewState =
  {view0Alive: null, animationState: null, view1Alive: null, transitionActive: null},
  action: Actions): ViewState {
  switch (action.type) {
    case SET_APP_VIEW:
      const payload = action.payload;
      switch (payload[0]) {
        case VIEW0_ALIVE:
          state.view0Alive = payload[1];
          break;
        case VIEW1_ALIVE:
          state.view1Alive = payload[1];
          break;
        case ANIMATION_STATE:
          state.animationState = payload[1];
          break;
        case TRANSITION_ACTIVE:
          state.transitionActive = payload[1];
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
  = {view0Alive: null, animationState: null, view1Alive: null, transitionActive: null}, action: Actions): ViewState {
  switch (action.type) {
    case SET_SHUTTER_VIEW:
      const payload = action.payload;
      switch (payload[0]) {
        case VIEW0_ALIVE:
          state.view0Alive = payload[1];
          break;
        case VIEW1_ALIVE:
          state.view1Alive = payload[1];
          break;
        case ANIMATION_STATE:
          state.animationState = payload[1];
          break;
        case TRANSITION_ACTIVE:
          state.transitionActive = payload[1];
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
export function isPortraitReducer(state: boolean, action: Actions): boolean {
  switch (action.type) {
    case SET_IS_PORTRAIT:
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
export function workStatesReducer(state: WorkStates, action: Actions): WorkStates {
  const payload = action.payload;
  switch (action.type) {
    case SET_WORK_STATES:
      return payload;
    case SET_WORK_DATA:
      state[payload.key] = payload.workData;
      return state;
    case DELETE_WORK_DATA:
      delete state[payload];
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
  | SetIsPortraitAction
  | SetWorkActiveAction
  | SetWorkStatesAction
  | SetWorkDataAction
  | DeleteWorkDataAction;

export const reducers: ActionReducerMap<AppState> = {
  appView: appViewReducer,
  shutterView: shutterViewReducer,
  texts: textsReducer,
  color: colorReducer,
  unitLength: unitLengthReducer,
  isPortrait: isPortraitReducer,
  workActive: workActiveReducer,
  workStates: workStatesReducer
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
