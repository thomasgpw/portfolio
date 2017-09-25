import { shutterAliveReducer, welcomeAliveReducer, greetingReducer, nameReducer, Actions, GetRandomGreetingAction } from './app.reducers';
describe('View Reducer', () => {
  it('should toggle a boolean', () => {
    const initialState = true;
    const toggleShutterAction = {
      type: 'TOGGLE_SHUTTER_ALIVE'
    };
    const toggleWelcomeAction = {
      type: 'TOGGLE_WELCOME_ALIVE'
    };
    const toggledShutterState: boolean = shutterAliveReducer(initialState, toggleShutterAction);
    const toggledWelcomeState: boolean = welcomeAliveReducer(initialState, toggleWelcomeAction);
    expect(initialState === !toggledShutterState);
    expect(initialState === !toggledWelcomeState);
  });
});
describe('Welcome Reducer', () => {
  it('should grab a greeting', () => {

    expect(greetingReducer('', new GetRandomGreetingAction)).toBeTruthy();
  });
});
