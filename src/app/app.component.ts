import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { viewTransitionConfig, onScreenYStyle, aboveScreenStyle, belowScreenStyle } from './_animations/styles';

import { ShutterModule } from './shutter/shutter.module';
import { ContentModule } from './content/content.module';

let shutterOpen:boolean = true;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    // trigger('shutterView', [
    //   state('*', onScreenYStyle),
    //   state('void', aboveScreenStyle),
    //   transition(':enter', [
    //     animate(viewTransitionConfig)
    //   ]),
    //   transition(':leave', [
    //     animate(viewTransitionConfig)
    //   ])
    // ]),
    trigger('contentView', [
      state('*', onScreenYStyle),
      transition(':enter', [
        onScreenYStyle,
        animate(viewTransitionConfig, onScreenYStyle)
      ]),
      transition(':leave', [
        onScreenYStyle,
        animate(viewTransitionConfig, onScreenYStyle)
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
    return shutterOpen;
  }
}
