import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { styleLeftArrow } from '../../../apply-styles';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
  @Output() setShutterViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() getNextGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getNextTipEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomNameEvent: EventEmitter<null>  = new EventEmitter();
  @Output() setNameEvent: EventEmitter<string>  = new EventEmitter();
  @Input() fullGreeting: string[];
  @Input() tip: string;
  @Input() uLdwx3: string;
  @Input() uLdhx2: string;
  @Input() uLdhOffset: string;
  @Input() welcomeColor: string;
  arrowPath = '../../../assets/arrow.svg';

  constructor() { }
  ngOnInit() {
    this.updateView();
  }
  styleLeftArrowFunc(el: SVGElement) {
    styleLeftArrow(el.style, this.uLdwx3, this.uLdhx2, this.uLdhOffset);
    el.setAttribute('transform', 'rotate(90)');
  }

  /* EVENT FUNCTIONS */
  updateView(): void {
    (document.getElementById('welcome') as HTMLElement).style.backgroundColor = this.welcomeColor;
    const leftArrow = document.getElementById('leftArrow').children[0];
    if (leftArrow) {
      this.styleLeftArrowFunc(leftArrow as SVGElement);
    }
  }
  greetingClickFunc (e: Event) {
    const elId = e.srcElement.id;
    if (elId === 'prename' || elId === 'postname') {
      this.getNextGreetingFunc();
    } else if (elId === 'name') {
      this.getRandomNameFunc();
    }
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
