import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  providers: [],
  exports: [
    WelcomeComponent
  ],
})

export class WelcomeModule { }