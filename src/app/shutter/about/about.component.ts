import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { tertiaryColor } from "../../../colors";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Output() goContentEvent = new EventEmitter<any>();
  @Output() toggleShutterEvent = new EventEmitter<any>();
  
  ngOnInit() {
    (document.getElementById("about") as HTMLElement).style.backgroundColor = tertiaryColor;
  }

  shutterToggleFunc() {
    this.toggleShutterEvent.emit(null);
  }
  goContentFunc() {
  	this.goContentEvent.emit(null);
  }
}
