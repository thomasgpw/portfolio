import { Component, Output, EventEmitter } from '@angular/core';

import { worksList } from './works-list';

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  @Output() goShutterEvent = new EventEmitter<any>();

  works = worksList;
  
  forceGridClass() {
    let elArray = document.getElementsByClassName("work-wrapper");
  	console.log(elArray);
  	console.log(elArray[0]);
  	for (let i = 0; i < elArray.length; ++i) {
  		console.log(elArray[i].classList);
  	}
  }
  goShutterFunc() {
    this.goShutterEvent.emit(null);
  }
  clickFunc(){
  	this.forceGridClass();
  }
}
