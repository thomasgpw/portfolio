import { ActionReducerMap, Action, ActionReducer, MetaReducer } from '@ngrx/store';
import { environment } from '../environments/environment';
import { AppState, CommandStacks, IterableStringMap, IterableStringList } from './app.datatypes';
import { StringService } from './_services/string.service';

/* ACTION TYPES */
const SET_APP_VIEW = 'SET_APP_VIEW';
const SET_SHUTTER_VIEW = 'SET_SHUTTER_VIEW';
const GET_NEXT_STRING = 'GET_NEXT_STRING';
const GET_RANDOM_STRING = 'GET_RANDOM_STRING';
const SET_STRING = 'SET_STRING';
const SET_COLOR = 'SET_COLOR';
const SET_UNIT_LENGTH = 'SET_UNIT_LENGTH';
const SET_WORK_ACTIVE = 'SET_WORK_ACTIVE';
const SET_COMMAND_STACKS_MAP = 'SET_COMMAND_STACKS_MAP';
const SET_COMMAND_STACKS = 'SET_COMMAND_STACKS';
const DELETE_COMMAND_STACKS = 'DELETE_COMMAND_STACKS';

/* ACTIONS */
export class DummyAction implements Action {
  readonly type: string = 'dummy';
  constructor(public payload?) {}
}
export class SetAppViewAction implements Action {
  readonly type: string = SET_APP_VIEW;
  constructor(public payload: boolean) {}
}
export class SetShutterViewAction implements Action {
  readonly type: string = SET_SHUTTER_VIEW;
  constructor(public payload: boolean) {}
}
export class GetNextStringAction implements Action {
  readonly type: string = GET_NEXT_STRING;
  constructor(public payload: [StringService, string]) {}
}
export class GetRandomStringAction implements Action {
  readonly type: string = GET_RANDOM_STRING;
  constructor(public payload: [StringService, string]) {}
}
export class SetStringAction implements Action {
  readonly type: string = SET_STRING;
  constructor(public payload: [string, string]) {}
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
function textsReducer(
state: IterableStringMap = {
  'greeting': new IterableStringList(null, null, 'greeting'),
  'name': new IterableStringList(null, null, 'name'),
  'tip': new IterableStringList(null, null, 'tip'),
  'rhyme': new IterableStringList(null, null, 'rhyme')
},
action: Actions
): IterableStringMap {
  const payload = action.payload;
  let mainPayload;
  let type;
  if (payload) {
    mainPayload = payload[0];
    type = payload[1];
  } else {
    mainPayload = null;
    type = null;
  }
  switch (action.type) {
    case GET_NEXT_STRING:
      state[type] = mainPayload.getNextString(state[type]);
      return state;
    case GET_RANDOM_STRING:
      const returns = mainPayload.getRandomString();
      if (state[type]) {
        state[type].instance = returns[0];
        state[type].index = returns[1];
      } else {
        state[type] = new IterableStringList(returns[0], returns[1], type);
      }
      return state;
    case SET_STRING:
      state[type].instance = mainPayload;
      return state;
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
  | GetNextStringAction
  | GetRandomStringAction
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
