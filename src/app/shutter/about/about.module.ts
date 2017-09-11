import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AboutComponent } from './about.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [
    AboutComponent,
  ],
  imports: [
    CommonModule,
    InlineSVGModule
  ],
  providers: [],
  exports: [
    AboutComponent
  ],
})

export class AboutModule { }