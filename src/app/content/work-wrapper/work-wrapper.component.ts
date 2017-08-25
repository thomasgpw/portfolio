import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'work-wrapper',
  templateUrl: './work-wrapper.component.html',
  styleUrls: ['./work-wrapper.component.css']
})
export class WorkWrapperComponent implements OnInit {

  @Input() work;
  constructor() { }

  ngOnInit() {
  }

}
