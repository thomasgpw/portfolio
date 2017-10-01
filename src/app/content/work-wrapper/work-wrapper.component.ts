import { Component, Input, Output, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Work } from '../_works/work';
import { SpecificWork } from '../_works/immediateellipse';

@Component({
  selector: 'app-work-wrapper',
  templateUrl: './work-wrapper.component.html',
  styleUrls: ['./work-wrapper.component.css']
})
export class WorkWrapperComponent implements OnInit, OnDestroy {
  @Input() commandStacks;
  work: Work;

  /* LIFECYCLE HOOK FUNCTIONS */
  ngOnInit(): void {
    console.log(this.commandStacks);
    this.work = new SpecificWork(document.getElementsByClassName('canvasWrapper')[this.commandStacks.id]);
  }
  ngOnDestroy(): void {

  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  redrawAll(values: number[]): Promise<null> {
    this.work.redrawAll();
    return Promise.resolve(null);
  }

  /* EVENT FUNCTIONS */
  @HostListener('pointerdown', ['$event']) onPointerDown() {
    if (this.work.active) {
      this.work.onPointerDown(event);
    }
  }
  @HostListener('window: pointermove', ['$event']) onPointerMove() {
    if (this.work.active) {
      this.work.onPointerMove(event);
    }
  }
  @HostListener('window: pointerup') onPointerUp() {
    if (this.work.active) {
      this.work.onPointerUp();
    }
  }
}
