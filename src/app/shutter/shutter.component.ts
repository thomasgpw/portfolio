import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { Observable } from 'rxjs/Rx';
import { viewTransitionTime, viewTransitionConfig, onScreenXStyle, leftOfScreenStyle, rightOfScreenStyle } from '../_animations/styles';
import { generateSvgHighlightBar } from '../../assets/generate-svg-highlight-bar';

@Component({
  selector: 'app-shutter',
  templateUrl: './shutter.component.html',
  styleUrls: ['./shutter.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('welcomeView', [
      state('truestate', onScreenXStyle),
      state('falsestate', rightOfScreenStyle),
      transition('falsestate <=> truestate', [
        animate(viewTransitionConfig)
      ])
    ]),
    trigger('aboutView', [
      state('truestate', onScreenXStyle),
      state('falsestate', leftOfScreenStyle),
      transition('falsestate <=> truestate', [
        animate(viewTransitionConfig)
      ])
    ])
  ]
})
export class ShutterComponent implements OnInit {
  @Output() setAppViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() setShutterViewEvent: EventEmitter<[string, boolean]> = new EventEmitter();
  @Output() getNextGreetingEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getRandomNameEvent: EventEmitter<null>  = new EventEmitter();
  @Output() setNameEvent: EventEmitter<string>  = new EventEmitter();
  @Output() getNextTipEvent: EventEmitter<null>  = new EventEmitter();
  @Output() getNextRhymeEvent: EventEmitter<null> = new EventEmitter();
  @Input() shutterView0Alive: boolean;
  @Input() shutterAnimationState: boolean;
  @Input() shutterView1Alive: boolean;
  @Input() fullGreeting: string[3];
  @Input() tip: string;
  @Input() rhyme: string;
  @Input() unitLength: number;
  @Input() uLx2: number;
  @Input() uLx3: number;
  @Input() colors: {[key: string]: string};

  bar: SVGElement;

  /* LIFECYCLE HOOK FUNCTIONS */
  constructor() {
  }
  ngOnInit(): void {
    this.bar = document.getElementById('shutter').appendChild(generateSvgHighlightBar(window.innerWidth, this.unitLength));
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  logData(param: any) {
    console.log(param);
  }

  /* EVENT FUNCTIONS */
  setAppViewFunc(): void {
    this.setAppViewEvent.emit(null);
  }
  setShutterViewFunc(viewSetting: [string, boolean]): void {
    this.setShutterViewEvent.emit(viewSetting);
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
  getNextRhymeFunc(): void {
    this.getNextRhymeEvent.emit(null);
  }
}
