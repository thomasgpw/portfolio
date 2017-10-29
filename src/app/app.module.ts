import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { CookieModule } from 'ngx-cookie';
import { InlineSVGModule } from 'ng-inline-svg';

import { AppComponent } from './app.component';
import { ShutterComponent } from './shutter/shutter.component';
import { ContentComponent } from './content/content.component';
import { WelcomeComponent } from './shutter/welcome/welcome.component';
import { AboutComponent } from './shutter/about/about.component';
import { WorkWrapperComponent } from './content/work-wrapper/work-wrapper.component';
import { WorkState } from './content/_works/work-state.datatype';
import { AppState, ViewState, IterableStringInstance } from './app.datatypes';
import { reducers, metaReducers } from './app.reducers';

// Later can grab data and overwrite initial state
// const stateFromMemory: AppState = new CookieService({null}).getObject('thomasgdotpwAppState') as AppState;
export const initialState: AppState = {
  appView: {
    view0Alive: true,
    view1Alive: false,
    animationState: true,
    transitionActive: false,
  },
  shutterView: {
    view0Alive: true,
    view1Alive: false,
    animationState: true,
    transitionActive: false,
  },
  texts: {
    greeting: null,
    name: null,
    tip: null,
    rhyme: null
  },
  color: 223,
  unitLength: null,
  isPortrait: null,
  workActive: null,
  workStates: [
    new WorkState([], 'ImmediateEllipse'),
    new WorkState({centerPoints: [], points: []}, 'PointsToPoint')
  ],
  workStatesChangeFlag: true
};
// export function getInitialState() {
//   return {...initialState, ...stateFromMemory};
// }

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
      // initialState: initialState,
      // metaReducers: metaReducers
    }),
    CookieModule.forRoot(),
    InlineSVGModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
