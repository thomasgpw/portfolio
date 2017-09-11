import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { tertiaryColor } from "../../../colors";
import { styleDownArrowShutter, styleRightArrow } from "../../../apply-styles";

@Component({
  selector: 'about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Output() goContentEvent = new EventEmitter<any>();
  @Output() toggleShutterEvent = new EventEmitter<any>();
  
  arrowPath = "../../../assets/arrow.svg";
  ngOnInit() {
    (document.getElementById("about") as HTMLElement).style.backgroundColor = tertiaryColor;
  }

  styleRightArrowFunc(el: SVGAElement) {
    styleRightArrow(el);
  }
  styleDownArrowShutterFunc(el: SVGAElement) {
    styleDownArrowShutter(el);
  }
  shutterToggleFunc() {
    this.toggleShutterEvent.emit(null);
  }
  goContentFunc() {
  	this.goContentEvent.emit(null);
  }
}
