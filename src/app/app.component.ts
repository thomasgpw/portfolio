import { Component } from '@angular/core';
import { NgIf } from '@angular/common';

let shutterOpen:boolean = true;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  appToggleFunc() {
    shutterOpen = !shutterOpen;
  }
  checkShutterOpen () {
  	if (shutterOpen) {return(true)} else{return(false)};
  }
}
