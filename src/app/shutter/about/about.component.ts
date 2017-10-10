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
  @Input() uLdwx3: string;
  @Input() uLdhx2: string;
  @Input() uLdwOffset: string;
  @Input() uLdhOffset: string;
  @Input() aboutColor: string;

  arrowPath = '../../../assets/arrow.svg';

  constructor() { }

  ngOnInit(): void {
    (document.getElementById('about') as HTMLElement).style.backgroundColor = this.aboutColor;
  }
  styleRightArrowFunc(el: SVGAElement) {
    styleRightArrow(el.style, this.uLdwx3, this.uLdhx2, this.uLdhOffset);
    el.setAttribute('transform', 'rotate(270)');
  }
  styleDownArrowShutterFunc(el: SVGAElement) {
    styleDownArrowShutter(el.style, this.uLdwx3, this.uLdhx2, this. uLdwOffset);
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
