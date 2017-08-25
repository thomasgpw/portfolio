import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

import { ShutterModule } from './shutter/shutter.module';
import { ContentModule } from './content/content.module';

let shutterOpen:boolean = true;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  appToggleFunc() {
    shutterOpen = !shutterOpen;
  }
  checkShutterOpen () {
  	if (shutterOpen) {return(true)} else{return(false)};
  }
}
