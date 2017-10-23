import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { styleRightArrow } from '../../../apply-styles';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  @Output() setShutterViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() getNextRhymeEvent: EventEmitter<null> = new EventEmitter();
  @Output() setColorEvent: EventEmitter<number> = new EventEmitter();
  @Input() rhyme: string;
  @Input() uLdwx3: string;
  @Input() uLdhx2: string;
  @Input() uLdwOffset: string;
  @Input() uLdhOffset: string;
  @Input() color: number;
  @Input() aboutColor: string;
  arrowPath = '../../../assets/arrow.svg';

  constructor() { }

  ngOnInit(): void {
    this.updateView();
    console.log(this.color);
    (document.getElementById('hueRange') as HTMLInputElement).defaultValue = this.color.toString();
  }
  updateView(): void {
    (document.getElementById('about') as HTMLElement).style.backgroundColor = this.aboutColor;
    const rightArrow = document.getElementById('rightArrow').children[0];
    if (rightArrow) {
      this.styleRightArrowFunc(rightArrow as SVGElement);
    }
  }
  styleRightArrowFunc(el: SVGElement) {
    styleRightArrow(el.style, this.uLdwx3, this.uLdhx2, this.uLdhOffset);
    el.setAttribute('transform', 'rotate(270)');
  }

  /* EVENT FUNCTIONS */
  shutterToggleFunc() {
    this.setShutterViewEvent.emit(null);
  }
  getNextRhymeFunc(): void {
    this.getNextRhymeEvent.emit(null);
  }
  setColorFunc(color: number): void {
    this.setColorEvent.emit(color);
  }
}
