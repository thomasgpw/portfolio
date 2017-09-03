import { Component, OnInit, Input } from '@angular/core';
import { Work } from '../works/work';

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
  	// console.log(this.workData);
  	console.log(document.getElementsByClassName("canvasWrapper")[this.workData.id]);
  	this.work = new Work(document.getElementsByClassName("canvasWrapper")[this.workData.id]);
  }
}
