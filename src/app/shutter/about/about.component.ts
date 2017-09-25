import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { styleDownArrowShutter, styleRightArrow } from '../../../apply-styles';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Output() toggleShutterAliveEvent: EventEmitter<null> = new EventEmitter();
  @Output() toggleWelcomeAliveEvent: EventEmitter<null> = new EventEmitter();
  @Input() aboutColor: string;

  arrowPath = '../../../assets/arrow.svg';

  constructor() { }

  ngOnInit(): void {
    (document.getElementById('about') as HTMLElement).style.backgroundColor = this.aboutColor;
  }
  styleRightArrowFunc(el: SVGAElement) {
    styleRightArrow(el);
  }
  styleDownArrowShutterFunc(el: SVGAElement) {
    styleDownArrowShutter(el);
  }

  /* EVENT FUNCTIONS */
  shutterToggleFunc() {
    this.toggleWelcomeAliveEvent.emit(null);
  }
  goContentFunc() {
    this.toggleShutterAliveEvent.emit(null);
  }
}
