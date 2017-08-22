import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.css']
})
export class ShutterComponent {
  title = 'shutter';
  goContent() {
  	console.log("shutter recieved")
  }
}
