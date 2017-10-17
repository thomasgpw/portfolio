import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { InlineSVGModule } from 'ng-inline-svg';

import { AppComponent } from './app.component';
import { ShutterComponent } from './shutter/shutter.component';
import { ContentComponent } from './content/content.component';
import { WelcomeComponent } from './shutter/welcome/welcome.component';
import { AboutComponent } from './shutter/about/about.component';
import { WorkWrapperComponent } from './content/work-wrapper/work-wrapper.component';
import { reducers, metaReducers } from './app.reducers';
import { AppState, ViewState } from './app.datatypes';

// Later can grab data and overwrite initial state
const stateFromMemory: AppState = undefined;
export const initialState: AppState = {
  appView: {
    view0Alive: null,
    view1Alive: null,
    animationState: null,
    transitionActive: null,
  },
  shutterView: {
    view0Alive: null,
    view1Alive: null,
    animationState: null,
    transitionActive: null,
  },
  texts: {
    greeting: null,
    name: null,
    tip: null,
    rhyme: null
  },
  color: '#7486B4',
  unitLength: null,
  isPortrait: null,
  workActive: null,
  workStates: {
    ImmediateEllipse: [],
    PointsToPoint: {centerPoints: [], points: []}
  }
};
export function getInitialState() {
  return {...initialState, ...stateFromMemory};
}

@NgModule({
  declarations: [
    AppComponent,
    ShutterComponent,
    ContentComponent,
    WelcomeComponent,
    AboutComponent,
    WorkWrapperComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers,
    {
      initialState: getInitialState,
      // metaReducers: metaReducers
    }),
    InlineSVGModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
