import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { primaryColor } from '../../../colors';
import { styleDownArrowShutter, styleLeftArrow } from '../../../apply-styles';

@Component({
  selector: 'welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  @Output() goContentEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleShutterEvent: EventEmitter<any> = new EventEmitter();

  arrowPath = '../../../assets/arrow.svg';
  ngOnInit() {
    (document.getElementById('welcome') as HTMLElement).style.backgroundColor = primaryColor;

    const downArrowStyle = (document.getElementById('downArrow') as HTMLElement).style;

  }
  styleLeftArrowFunc(el: SVGAElement) {
    styleLeftArrow(el);
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
