import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg';

import { WorkWrapperModule } from './work-wrapper/work-wrapper.module' 
import { ContentComponent } from './content.component';

@NgModule({
  declarations: [
    ContentComponent,
  ],
  imports: [
    CommonModule,
    WorkWrapperModule,
    InlineSVGModule
  ],
  providers: [],
  exports: [
    ContentComponent
  ],
})

export class ContentModule { }
