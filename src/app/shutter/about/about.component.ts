import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { styleDownArrowShutter, styleRightArrow } from '../../../apply-styles';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  @Output() setAppViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() setShutterViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() getNextRhymeEvent: EventEmitter<null> = new EventEmitter();
  @Input() rhyme: string;
  @Input() unitLength: number;
  @Input() uLx2: number;
  @Input() uLx3: number;
  @Input() aboutColor: string;

  arrowPath = '../../../assets/arrow.svg';

  constructor() { }

  ngOnInit(): void {
    (document.getElementById('about') as HTMLElement).style.backgroundColor = this.aboutColor;
  }
  styleRightArrowFunc(el: SVGAElement, windowInnerHeight: number = window.innerHeight) {
    styleRightArrow(el.style, windowInnerHeight, this.uLx2, this.uLx3);
    el.setAttribute('transform', 'rotate(270)');
  }
  styleDownArrowShutterFunc(el: SVGAElement, windowInnerWidth: number = window.innerWidth) {
    styleDownArrowShutter(el.style, windowInnerWidth, this.uLx2, this.uLx3);
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
