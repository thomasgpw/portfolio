import { Component, Output, EventEmitter, ViewChild, ViewChildren, QueryList, OnInit } from '@angular/core';
import { trigger, state, animate, transition} from '@angular/animations';

import { primaryColor, secondaryColor, tertiaryColor } from '../../colors';
import { workTransitionConfig, gridWorkStyle, activeWorkStyle, rowWorkStyle } from '../_animations/styles';
import { worksList } from './works-list';
import { WorkWrapperComponent } from './work-wrapper/work-wrapper.component';
import { generateSvgTab } from '../../assets/generate-svg-tab';
import { styleDownArrowContent, styleGridButton } from '../../apply-styles';

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html',
  styleUrls: ['content.component.css'],
  animations: [
    trigger('workAnimations', [
      state('wwGrid', gridWorkStyle),
      state('wwActive', activeWorkStyle),
      state('wwRow', rowWorkStyle),
      transition('wwGrid<=>wwActive', animate(workTransitionConfig)),
      transition('wwGrid<=>wwRow', animate(workTransitionConfig)),
      transition('wwActive<=>wwRow', animate(workTransitionConfig))
    ])
  ]
})
export class ContentComponent implements OnInit {
  @Output() goShutterEvent = new EventEmitter<null>();
  @ViewChildren(WorkWrapperComponent) allWorkWrapper: QueryList<WorkWrapperComponent>;

  works = worksList;
  gridButton = false;
  arrowPath = '../../assets/arrow.svg';
  gridButtonPath = '../../assets/gridbutton.svg';

  ngOnInit() {
    const contentEl = document.getElementById('app-content');
    (contentEl as HTMLElement).style.backgroundColor = secondaryColor;
    const tab = contentEl.appendChild(generateSvgTab(window.innerWidth, window.innerHeight / 36));
    tab.firstElementChild.setAttributeNS(null, 'fill', primaryColor);
  }

  styleDownArrowContentFunc(el: SVGElement) {
    styleDownArrowContent(el);
  }
  styleGridButtonFunc(el: SVGElement) {
    styleGridButton(el);
  }
  goShutterFunc() {
    this.goShutterEvent.emit(null);
  }
  getStatus(i: number) {
    const pattern = /^ww/;
    const elClassList = document.getElementsByClassName('app-work-wrapper')[i].classList;
    const elClassListLength = elClassList.length;
    for (let c = 0; c < elClassListLength; ++c) {
      if (elClassList[c].match(pattern)) {
        return elClassList[c];
      }
    }
  }
  forceGridClass() {
    const elArray = document.getElementsByClassName('app-work-wrapper');
    const elArrayLength = elArray.length;
    for (let i = 0; i < elArrayLength; ++i) {
      const classes = elArray[i].classList;
      classes.remove('wwActive');
      classes.remove('wwRow');
      classes.add('wwGrid');
    }
  }
  viewGridFunc() {
    const activeEl = document.getElementsByClassName('wwActive')[0];
    if (activeEl) {
      const allWorkWrapperComponents = [];
      this.allWorkWrapper.forEach(function(workWrapperComponentInstance){
        allWorkWrapperComponents.push(workWrapperComponentInstance);
      });
      if (this.deactivateWork(activeEl, allWorkWrapperComponents)) {
        this.forceGridClass();
        this.gridButton = false;
      }
    }
  }
  resizeWork(e) {
    const allWorkWrapperComponents = [];
    this.allWorkWrapper.forEach(function(workWrapperComponentInstance){
      allWorkWrapperComponents.push(workWrapperComponentInstance);
    });
    const clickedWorkWrapper: WorkWrapperComponent = allWorkWrapperComponents.find(component => component.workData.id === e.element.id);
    clickedWorkWrapper.work.resizeCanvas();
  }
  activateWork(clickedEl: Element, clickedWorkWrapper: WorkWrapperComponent) {
    if (clickedWorkWrapper.work.activate()) {
      let classes = clickedEl.classList;
      classes.remove('wwGrid');
      classes.remove('wwRow');
      classes.add('wwActive');
      (clickedEl as HTMLElement).style.left = '7.5%';
      const elArray = document.getElementsByClassName('app-work-wrapper');
      const elArrayLength = elArray.length;
      let rowOffset = 0;
      for (let i = 0; i < elArrayLength; ++i) {
        const loopEl = elArray[i];
        if (clickedEl.id !== loopEl.id) {
          classes = loopEl.classList;
          classes.remove('wwGrid');
          classes.add('wwRow');
          (loopEl as HTMLElement).style.left = (((parseInt(loopEl.id, 10) + rowOffset) * 15) + '%');
        } else {
          rowOffset = -1;
        }
      }
      this.gridButton = true;
    }
  }
  deactivateWork(activeEl: Element, allWorkWrapperComponents) {
    const clickedWorkWrapper: WorkWrapperComponent = allWorkWrapperComponents.find(component => component.workData.id === activeEl.id);
    if (clickedWorkWrapper.work.deactivate()) {
      const classes = activeEl.classList;
      classes.remove('wwActive');
      classes.add('wwRow');
      return true;
    }
  }
  workClickFunc(e: Event) {
    const clickedEl = e.srcElement.closest('.app-work-wrapper');
    const allWorkWrapperComponents = [];
    this.allWorkWrapper.forEach(function(workWrapperComponentInstance){
      allWorkWrapperComponents.push(workWrapperComponentInstance);
    });
    const clickedWorkWrapper: WorkWrapperComponent = allWorkWrapperComponents.find(component => component.workData.id === clickedEl.id);
    if (clickedEl.classList.contains('wwActive')) {
      clickedWorkWrapper.work.clickInteract(e);
    } else {
      const activeEl = document.getElementsByClassName('wwActive')[0];
      if (activeEl) {
        if (this.deactivateWork(activeEl, allWorkWrapperComponents)) {
          this.activateWork(clickedEl, clickedWorkWrapper);
        }
      } else {
        this.activateWork(clickedEl, clickedWorkWrapper);
      }
    }
  }
}
