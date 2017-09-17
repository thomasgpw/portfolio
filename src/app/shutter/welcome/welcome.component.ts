import { Component, Output, Input, EventEmitter, OnInit } from '@angular/core';

import { WelcomeService } from './welcome.service';
import { primaryColor } from '../../../colors';
import { styleDownArrowShutter, styleLeftArrow } from '../../../apply-styles';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [WelcomeService]
})
export class WelcomeComponent implements OnInit {
  @Output() goContentEvent: EventEmitter<any> = new EventEmitter();
  @Output() toggleShutterEvent: EventEmitter<any> = new EventEmitter();
  @Input() name: string;

  arrowPath = '../../../assets/arrow.svg';
  welcome: string;

  constructor (private _welcomeService: WelcomeService) { }
  ngOnInit(): void {
    (document.getElementById('welcome') as HTMLElement).style.backgroundColor = primaryColor;
    if (!this.name) {
      this.name = this.getName();
    }
    this.welcome = this.getWelcome(this.name);
  }
  getName(): string {
    return this._welcomeService.getName();
  }
  getWelcome(name: string): string {
    return this._welcomeService.getWelcome(name);
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
