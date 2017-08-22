import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';

import { ShutterComponent } from './shutter.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutComponent } from './about/about.component';

let welcomeState = {
  name: 'welcome',
  url:'',
  component: WelcomeComponent
}
let aboutState = {
  name: 'about',
  component: AboutComponent
}

@NgModule({
  declarations: [
    ShutterComponent,
    WelcomeComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    UIRouterModule.forRoot({
    	states: [ welcomeState, aboutState ],
    	otherwise: '',
    	useHash: true
    })
  ],
  providers: [],
  exports: [
    ShutterComponent
  ],
})

export class ShutterModule { }
