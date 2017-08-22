import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { WelcomeComponent } from './welcome.component';

@NgModule({
  declarations: [
    WelcomeComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [
    WelcomeComponent
  ],
})

export class WelcomeModule { }