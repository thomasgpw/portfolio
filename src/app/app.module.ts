import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { InlineSVGModule } from 'ng-inline-svg';

import { AppComponent } from './app.component';
import { ShutterComponent } from './shutter/shutter.component';
import { reducers, metaReducers } from './app.reducers';
import { AppState } from './app.datatypes';
import { GreetingService} from './_services/greeting.service';
import { RhymeService} from './_services/rhyme.service';
import { ContentComponent } from './content/content.component';
import { WelcomeComponent } from './shutter/welcome/welcome.component';
import { AboutComponent } from './shutter/about/about.component';
import { WorkWrapperComponent } from './content/work-wrapper/work-wrapper.component';

const _greetingService = new GreetingService();
const _rhymeService = new RhymeService();
// Later can grab data and overwrite initial state
const stateFromMemory: AppState = undefined;
export const initialState: AppState = {
  appView: true,
  shutterView: true,
  greeting: _greetingService.getRandomGreeting(),
  name: _greetingService.getRandomName(),
  rhyme: _rhymeService.getRandomRhyme(),
  color: '#7486B4',
  unitLength: null,
  workActive: null,
  commandStacksMap: {}
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
    {initialState: getInitialState, metaReducers: metaReducers}),
    InlineSVGModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
