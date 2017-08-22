import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ShutterModule } from './shutter/shutter.module';
import { ContentModule } from './content/content.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShutterModule,
    ContentModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
