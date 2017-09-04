import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Work } from '../works/work';
import { SpecificWork } from '../works/immediateellipse';

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
  @HostListener('mousedown', ['$event']) onMouseDown() {
  	this.work.onMouseDown(event);
  }
  @HostListener('mousemove', ['$event']) onMouseMove() {
  	this.work.onMouseMove(event);
  }
  @HostListener('mouseup') onMouseUp() {
  	this.work.onMouseUp();
  }
}
