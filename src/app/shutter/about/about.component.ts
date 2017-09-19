import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import { tertiaryColor } from '../../../colors';
import { styleDownArrowShutter, styleRightArrow } from '../../../apply-styles';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, OnDestroy {
  @Output() goContentEvent: EventEmitter<null> = new EventEmitter();
  @Output() toggleShutterEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveAboutDataEvent: EventEmitter<string[]> = new EventEmitter();
  @Input() aboutData: string[];

  arrowPath = '../../../assets/arrow.svg';

  /* LIFECYCLE HOOK FUNCTIONS */
  ngOnInit(): void {
    (document.getElementById('about') as HTMLElement).style.backgroundColor = tertiaryColor;
  }
  styleRightArrowFunc(el: SVGAElement) {
    styleRightArrow(el);
  }
  styleDownArrowShutterFunc(el: SVGAElement) {
    styleDownArrowShutter(el);
  }
  ngOnDestroy(): void {
    this.saveAboutDataEvent.emit(this.aboutData);
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  redrawAll(): Promise<null> {
    return Promise.resolve(null);
  }

  /* EVENT FUNCTIONS */
  shutterToggleFunc() {
    this.toggleShutterEvent.emit(null);
  }
  goContentFunc() {
    this.goContentEvent.emit(null);
  }
}
