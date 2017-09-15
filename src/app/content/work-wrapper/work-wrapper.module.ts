import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkWrapperComponent } from './work-wrapper.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    WorkWrapperComponent
  ],
  exports: [
    WorkWrapperComponent
  ]
})
export class WorkWrapperModule { }
