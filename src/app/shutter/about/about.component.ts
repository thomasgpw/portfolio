import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  @Output() goContentEvent = new EventEmitter<any>();
  @Output() toggleShutterEvent = new EventEmitter<any>();
  shutterToggleFunc() {
    this.toggleShutterEvent.emit(null);
  }
  goContentFunc() {
  	this.goContentEvent.emit(null);
  }
}
