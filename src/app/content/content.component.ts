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
  	this.allWorkWrapper.forEach(function(workWrapperComponentInstance){
  		workWrapperComponentInstance.work.resizeCanvas();
  	});
  }
  viewGrid(){
  	let activeEl = document.getElementsByClassName('wwActive')[0];
	  if (activeEl) {
	  	let allWorkWrapperComponents=[];
	  	this.allWorkWrapper.forEach(function(workWrapperComponentInstance){
	  		allWorkWrapperComponents.push(workWrapperComponentInstance);
	  	});
		  if(this.deactivateWork(activeEl, allWorkWrapperComponents)){
	  	  this.forceGridClass();
	  	  this.gridButton = false;
      }
    }
  }
  resizeWorks(){

  }
  activateWork(clickedEl: Element, clickedWorkWrapper:WorkWrapperComponent) {
    console.log(clickedWorkWrapper);
		if (clickedWorkWrapper.work.activate()) {
		  let classes = clickedEl.classList;
		  classes.remove('wwGrid');
		  classes.remove('wwRow');
		  classes.add('wwActive');
		  (clickedEl as HTMLElement).style.left = "7.5%"
      let elArray = document.getElementsByClassName("work-wrapper");
      let elArrayLength = elArray.length
		  for (let i = 0; i < elArrayLength; ++i) {
        let loopEl = elArray[i];
        if (clickedEl.id != loopEl.id) {
          let classes = loopEl.classList;
          classes.remove("wwGrid");
          classes.add("wwRow");
          (loopEl as HTMLElement).style.left = ((parseInt(loopEl.id) * 15) + "%");
        }
  	  }
  	  this.gridButton = true;
	  }
  }
  deactivateWork(activeEl: Element, allWorkWrapperComponents){
		let clickedWorkWrapper: WorkWrapperComponent = allWorkWrapperComponents.find(component => component.workData.id == activeEl.id);
  	if(clickedWorkWrapper.work.deactivate()){
	  	let classes = activeEl.classList;
	  	classes.remove("wwActive");
	  	classes.add("wwRow");
  		return true;
  	}
  }
  workClickFunc(e:Event){
  	let clickedEl = e.srcElement.closest('.work-wrapper');
  	let allWorkWrapperComponents=[];
  	this.allWorkWrapper.forEach(function(workWrapperComponentInstance){
  		allWorkWrapperComponents.push(workWrapperComponentInstance);
  	});
		let clickedWorkWrapper: WorkWrapperComponent = allWorkWrapperComponents.find(component => component.workData.id == clickedEl.id)
  	if (clickedEl.classList.contains("wwActive")) {
  		clickedWorkWrapper.work.clickInteract(e);
  	}
  	else {
	  	let activeEl = document.getElementsByClassName('wwActive')[0];
	  	if(activeEl){
				if(this.deactivateWork(activeEl, allWorkWrapperComponents)){
				  this.activateWork(clickedEl, clickedWorkWrapper);
			  }
		  }
		  else{
		  	this.activateWork(clickedEl, clickedWorkWrapper);
		  }
		  this.allWorkWrapper.forEach(function(workWrapperComponentInstance){
  		  workWrapperComponentInstance.work.resizeCanvas();
  	  });
	  }
  }
}
