import { Component, OnInit, Input } from '@angular/core';
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
}
