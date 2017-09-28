import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { styleDownArrowShutter, styleRightArrow } from '../../../apply-styles';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  @Output() setAppViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() setShutterViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() getNextRhymeEvent: EventEmitter<null> = new EventEmitter();
  @Input() aboutColor: string;
  @Input() rhyme: string;

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
  getNextRhymeFunc(): void {
    this.getNextRhymeEvent.emit(null);
  }
  shutterToggleFunc() {
    this.setShutterViewEvent.emit(null);
  }
  goContentFunc() {
    this.setAppViewEvent.emit(null);
  }
}
