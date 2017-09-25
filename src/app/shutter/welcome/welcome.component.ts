import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { styleDownArrowShutter, styleLeftArrow } from '../../../apply-styles';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
  @Output() toggleShutterAliveEvent: EventEmitter<null> = new EventEmitter();
  @Output() toggleWelcomeAliveEvent: EventEmitter<null> = new EventEmitter();
  @Output() getNextGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomNameEvent: EventEmitter<null>  = new EventEmitter();
  @Output() setNameEvent: EventEmitter<string>  = new EventEmitter();
  @Input() fullGreeting: string;
  @Input() welcomeColor: string;

  arrowPath = '../../../assets/arrow.svg';

  constructor() { }

  ngOnInit() {
    (document.getElementById('welcome') as HTMLElement).style.backgroundColor = this.welcomeColor;
    this.setGreeting();
  }
  styleLeftArrowFunc(el: SVGAElement) {
    styleLeftArrow(el);
  }
  styleDownArrowShutterFunc(el: SVGAElement) {
    styleDownArrowShutter(el);
  }

  /* EVENT FUNCTIONS */
  greetingClickFunc (e: Event) {
    const elId = e.srcElement.id;
    if (elId === 'greeting') {
      this.getNextGreetingFunc();
    } else if (elId === 'name') {
      this.getRandomNameFunc();
    }
    this.setGreeting();
  }
  setGreeting(): void {
    console.log(this.fullGreeting);
    document.getElementById('greeting').innerHTML = this.fullGreeting;
  }
  toggleShutterAliveFunc(): void {
    this.toggleShutterAliveEvent.emit(null);
  }
  toggleWelcomeAliveFunc(): void {
    this.toggleWelcomeAliveEvent.emit(null);
  }
  getNextGreetingFunc(): void {
    this.getNextGreetingEvent.emit(null);
  }
  getRandomGreetingFunc(): void {
    this.getRandomGreetingEvent.emit(null);
  }
  getRandomNameFunc(): void {
    this.getRandomNameEvent.emit(null);
  }
  setNameFunc(name: string): void {
    this.setNameEvent.emit(name);
  }
}
