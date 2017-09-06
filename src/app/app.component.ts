import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { animateConfig, onScreenYStyle, aboveScreenStyle, belowScreenStyle } from './_animations/styles';

import { ShutterModule } from './shutter/shutter.module';
import { ContentModule } from './content/content.module';

let shutterOpen:boolean = true;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('shutterView', [
      state('*', onScreenYStyle),
      transition(':enter', [
        aboveScreenStyle,
        animate(animateConfig, onScreenYStyle)
      ]),
      transition(':leave', [
        onScreenYStyle,
        animate(animateConfig, aboveScreenStyle)
      ])
    ]),
    trigger('contentView', [
      state('*', onScreenYStyle),
      transition(':enter', [
        belowScreenStyle,
        animate(animateConfig, onScreenYStyle)
      ]),
      transition(':leave', [
        onScreenYStyle,
        animate(animateConfig, belowScreenStyle)
      ])
    ])
  ]
})
export class AppComponent {
  title = 'app';
  appToggleFunc() {
    shutterOpen = !shutterOpen;
  }
  checkShutterOpen () {
  	if (shutterOpen) {return(true)} else{return(false)};
  }
}
