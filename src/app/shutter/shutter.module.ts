import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIRouterModule } from '@uirouter/angular';
import { WelcomeModule } from './welcome/welcome.module';
import { AboutModule } from './about/about.module';

import { ShutterComponent } from './shutter.component';

@NgModule({
  declarations: [
    ShutterComponent
  ],
  imports: [
    CommonModule,
    WelcomeModule,
    AboutModule
  ],
  providers: [],
  exports: [
    ShutterComponent
  ],
})

export class ShutterModule { }
