import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Subject } from 'rxjs';
import { ViewState } from '../app.datatypes';
import {
  VIEW0_ALIVE,
  VIEW1_ALIVE,
  ANIMATION_STATE,
  TRANSITION_ACTIVE
} from '../app.reducers';

@Injectable()
export class ViewControlService {
  private transitionTime: number;
  public payloadStream: Subject<[string, boolean]>;
  constructor() {
    this.transitionTime = 1000;
    this.payloadStream = new Subject();
  }
  setTransitionTime(viewTransitionTime: number) {
    this.transitionTime = viewTransitionTime;
  }
  assertLogic(currentState: ViewState): ViewState {
    if (!currentState.transitionActive) {
      if (currentState.view0Alive === currentState.view1Alive) {
        currentState.view0Alive = currentState.animationState;
        currentState.view1Alive = !currentState.animationState;
      }
    }
    return currentState;
  }
  goView(view0: boolean): Promise<null> {
    // set view0Alive, viewAnimationState and transitionActive = true
    this.prepareView(view0).then(resolve => setTimeout(() => this.turnOff(!view0), this.transitionTime));
    return Promise.resolve(null);
  }
  prepareView(view0: boolean): Promise<null> {
    const view = view0 ? VIEW0_ALIVE : VIEW1_ALIVE;
    this.instantiateView(view).then(resolve => setTimeout(() => this.animateView(view0)));
    return Promise.resolve(null);
  }
  instantiateView(view: string): Promise<null> {
    this.payloadStream.next([TRANSITION_ACTIVE, true]);
    this.payloadStream.next([view, true]);
    return Promise.resolve(null);
  }
  animateView(view0: boolean): Promise<null> {
    this.payloadStream.next([ANIMATION_STATE, view0]);
    return Promise.resolve(null);
  }
  turnOff(view1: boolean): Promise<null> {
    const view = view1 ? VIEW0_ALIVE : VIEW1_ALIVE;
    this.payloadStream.next([TRANSITION_ACTIVE, false]);
    this.payloadStream.next([view, false]);
    return Promise.resolve(null);
  }
}
