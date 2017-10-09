import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { styleDownArrowShutter, styleLeftArrow } from '../../../apply-styles';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
  @Output() setAppViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() setShutterViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() getNextGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getNextTipEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomNameEvent: EventEmitter<null>  = new EventEmitter();
  @Output() setNameEvent: EventEmitter<string>  = new EventEmitter();
  @Input() fullGreeting: string[3];
  @Input() tip: string;
  @Input() unitLength: number;
  @Input() uLx2: number;
  @Input() uLx3: number;
  @Input() welcomeColor: string;

  arrowPath = '../../../assets/arrow.svg';

  constructor() { }

  ngOnInit() {
    (document.getElementById('welcome') as HTMLElement).style.backgroundColor = this.welcomeColor;
  }
  styleLeftArrowFunc(el: SVGAElement, windowInnerHeight: number = window.innerHeight) {
    styleLeftArrow(el.style, windowInnerHeight, this.uLx2, this.uLx3);
    el.setAttribute('transform', 'rotate(90)');
  }
  styleDownArrowShutterFunc(el: SVGAElement, windowInnerWidth: number = window.innerWidth) {
    styleDownArrowShutter(el.style, windowInnerWidth, this.uLx2, this.uLx3);
  }

  /* EVENT FUNCTIONS */
  greetingClickFunc (e: Event) {
    const elId = e.srcElement.id;
    if (elId === 'prename' || elId === 'postname') {
      this.getNextGreetingFunc();
    } else if (elId === 'name') {
      this.getRandomNameFunc();
    }
  }
  setAppViewFunc(): void {
    this.setAppViewEvent.emit(null);
  }
  setShutterViewFunc(): void {
    this.setShutterViewEvent.emit(null);
  }
  getNextGreetingFunc(): void {
    this.getNextGreetingEvent.emit(null);
  }
  getRandomNameFunc(): void {
    this.getRandomNameEvent.emit(null);
  }
  setNameFunc(name: string): void {
    this.setNameEvent.emit(name);
  }
  getNextTipFunc(): void {
    this.getNextTipEvent.emit(null);
  }
}
