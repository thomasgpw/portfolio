import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Work } from '../_works/work';
import { SpecificWork } from '../_works/immediateellipse';

@Component({
  selector: 'work-wrapper',
  templateUrl: './work-wrapper.component.html',
  styleUrls: ['./work-wrapper.component.css']
})
export class WorkWrapperComponent implements OnInit {
  @Input() workData;
  work: Work;
  constructor() {
  }
  ngOnInit() {
  	this.work = new SpecificWork(document.getElementsByClassName("canvasWrapper")[this.workData.id]);
  }
  @HostListener('pointerdown', ['$event']) onPointerDown() {
  	this.work.onPointerDown(event);
  }
  @HostListener('window: pointermove', ['$event']) onPointerMove() {
  	this.work.onPointerMove(event);
  }
  @HostListener('window: pointerup') onPointerUp() {
  	this.work.onPointerUp();
  }
}
