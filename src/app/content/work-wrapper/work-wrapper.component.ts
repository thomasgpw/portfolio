import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'work-wrapper',
  templateUrl: './work-wrapper.component.html',
  styleUrls: ['./work-wrapper.component.css']
})
export class WorkWrapperComponent implements OnInit {

  @Input() work;
  constructor() { }
  active = false;
  ngOnInit() {
  }
  activate() {
  	this.active = true;
  	return true;
  }
  deactivate() {
  	this.active = false;
  	return true;
  }
  clickInteract(e:Event){
  	console.log(e);
  }

}
