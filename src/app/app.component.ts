import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { trigger, state, animate, transition} from '@angular/animations';
import { viewTransitionTime, viewTransitionConfig, onScreenYStyle, aboveScreenStyle, belowScreenStyle } from './_animations/styles';

import { ShutterModule } from './shutter/shutter.module';
import { ContentModule } from './content/content.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('shutterView', [
      state('true', onScreenYStyle),
      state('false', aboveScreenStyle),
      transition('true<=>false', [
        animate(viewTransitionConfig)
      ])
    ]),
    trigger('contentView', [
      state('true', onScreenYStyle),
      state('false', onScreenYStyle),
      transition('true<=>false', [
        animate(viewTransitionConfig)
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'app';
  name: string = null;
  shutterOpen = true;
  contentOpen = false;
  shutterAnimate = true;
  contentAnimate = false;
  width: number;
  height: number;

  ngOnInit(): void {
    this.initGraphics();
  }
  initGraphics(): void {
    this.calcAspectLengths().then(result => this.redrawAll());
  }
  calcAspectLengths(): Promise<true> {
    return Promise.resolve(true);
  }
  redrawAll(): void {
    const width = this.width;
    const height = this.height;
  }
  goShutterFunc() {
    this.shutterOpen = true;
    this.shutterAnimate = true;
    this.contentAnimate = false;
    window.setTimeout(this.turnOffContent, viewTransitionTime);
  }
  goContentFunc() {
    this.contentOpen = true;
    this.shutterAnimate = false;
    this.contentAnimate = true;
    window.setTimeout(this.turnOffShutter, viewTransitionTime);
  }
  turnOffContent() {
    this.contentOpen = false;
  }
  turnOffShutter() {
    this.shutterOpen = false;
  }
  checkShutterOpen () {
    return this.shutterOpen;
  }
  checkContentOpen () {
    return this.contentOpen;
  }
}
