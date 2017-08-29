import { Component, Output, EventEmitter, ViewChild, ViewChildren, QueryList } from '@angular/core';

import { worksList } from './works-list';
import { WorkWrapperComponent } from './work-wrapper/work-wrapper.component'

@Component({
  selector: 'content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  @Output() goShutterEvent = new EventEmitter<null>();
  @ViewChildren(WorkWrapperComponent) allWorkWrapper: QueryList<WorkWrapperComponent>;

  works = worksList;
  gridButton = false;
  
  goShutterFunc() {
    this.goShutterEvent.emit(null);
  }
  forceGridClass() {
    let elArray = document.getElementsByClassName("work-wrapper");
  	let elArrayLength = elArray.length
    for (let i = 0; i < elArrayLength; ++i) {
      let classes = elArray[i].classList;
      classes.remove("wwActive");
      classes.remove("wwRow");
      classes.add("wwGrid");
  	}
  }
  viewGrid(){
  	let activeEl = document.getElementsByClassName('wwActive')[0];
	  console.log(activeEl);
	  if(this.deactivateWork(activeEl)){
  	  this.forceGridClass();
  	  this.gridButton = false;
    }
  }
  activateWork(clickedEl: Element, clickedWorkWrapper:WorkWrapperComponent) {
    console.log(clickedWorkWrapper);
		if (clickedWorkWrapper.activate()) {
		  let classes = clickedEl.classList;
		  classes.remove('wwGrid');
		  classes.remove('wwRow');
		  classes.add('wwActive');
      let elArray = document.getElementsByClassName("work-wrapper");
      let elArrayLength = elArray.length
		  for (let i = 0; i < elArrayLength; ++i) {
        let loopEl = elArray[i];
        if (clickedEl.id != loopEl.id) {
          let classes = loopEl.classList;
          classes.remove("wwGrid");
          classes.add("wwRow");
        }
  	  }
  	  this.gridButton = true;
	  }
  }
  deactivateWork(activeEl: Element){
  	let allWorkWrapperComponents=[];
  	this.allWorkWrapper.forEach(function(workWrapperComponentInstance){
  		allWorkWrapperComponents.push(workWrapperComponentInstance);
  	});
		let clickedWorkWrapper: WorkWrapperComponent = allWorkWrapperComponents.find(component => component.work.id == activeEl.id)
  	if(clickedWorkWrapper.deactivate()){
	  	let classes = activeEl.classList;
	  	classes.remove("wwActive");
	  	classes.add("wwRow");
  		return true;
  	}
  }
  workClickFunc(e:Event){
  	let clickedEl = e.srcElement;
  	let allWorkWrapperComponents=[];
  	this.allWorkWrapper.forEach(function(workWrapperComponentInstance){
  		allWorkWrapperComponents.push(workWrapperComponentInstance);
  	});
		let clickedWorkWrapper: WorkWrapperComponent = allWorkWrapperComponents.find(component => component.work.id == clickedEl.id)
  	if (clickedEl.classList.contains("wwActive")) {
  		clickedWorkWrapper.clickInteract(e);
  	}
  	else {
	  	let activeEl = document.getElementsByClassName('wwActive')[0];
	  	console.log(activeEl);
	  	if(activeEl){
				if(this.deactivateWork(activeEl)){
				  this.activateWork(clickedEl, clickedWorkWrapper);
			  }
		  }
		  else{
		  	this.activateWork(clickedEl, clickedWorkWrapper);
		  }
	  }
  }
}
