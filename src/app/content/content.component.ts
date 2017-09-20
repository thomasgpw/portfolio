import { Component, Input, Output, EventEmitter, ViewChildren, QueryList, OnInit, OnDestroy } from '@angular/core';
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
export class ContentComponent implements OnInit, OnDestroy {
  @Output() goShutterEvent: EventEmitter<null> = new EventEmitter();
  @Output() saveContentDataEvent: EventEmitter<any[]> = new EventEmitter();
  @Output() setWorkActiveEvent: EventEmitter<number> = new EventEmitter();
  @Input() contentData: any[];
  @Input() workActive: number;
  @ViewChildren(WorkWrapperComponent) allWorkWrapper: QueryList<WorkWrapperComponent>;

  works: Object[];
  gridButton = false;
  arrowPath = '../../assets/arrow.svg';
  gridButtonPath = '../../assets/gridbutton.svg';

  /* LIFECYCLE HOOK FUNCTIONS */
  ngOnInit(): void {
    this.works = this.assembleWorksList();
    const contentEl = document.getElementById('app-content');
    (contentEl as HTMLElement).style.backgroundColor = secondaryColor;
    const tab = contentEl.appendChild(generateSvgTab(window.innerWidth, window.innerHeight / 36));
    tab.firstElementChild.setAttributeNS(null, 'fill', primaryColor);
  }
  assembleWorksList(): Object[] {
    for (let i = 0; i < worksList.length; i++) {
      worksList[i].data = this.contentData[i];
    }
    return worksList;
  }
  styleDownArrowContentFunc(el: SVGElement): void {
    styleDownArrowContent(el);
  }
  styleGridButtonFunc(el: SVGElement): void {
    styleGridButton(el);
  }
  ngOnDestroy(): void {

  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  redrawAll(values: number[]): Promise<null> {
    // More to be done here
    return Promise.resolve(null);
  }

  /* EVENT FUNCTIONS */
  goShutterFunc(): void {
    this.goShutterEvent.emit(null);
  }
  getStatus(i: number): string {
    const pattern = /^ww/;
    const elClassList = document.getElementsByClassName('app-work-wrapper')[i].classList;
    const elClassListLength = elClassList.length;
    for (let c = 0; c < elClassListLength; ++c) {
      if (elClassList[c].match(pattern)) {
        return elClassList[c];
      }
    }
  }
  forceGridClass(): void {
    const elArray = document.getElementsByClassName('app-work-wrapper');
    const elArrayLength = elArray.length;
    for (let i = 0; i < elArrayLength; ++i) {
      const classes = elArray[i].classList;
      classes.remove('wwActive');
      classes.remove('wwRow');
      classes.add('wwGrid');
    }
  }
  viewGridFunc(): void {
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
  resizeWork(e): void {
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
      this.workActive = parseInt(clickedEl.id, 10);
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
  deactivateWork(activeEl: Element, allWorkWrapperComponents): true {
    const clickedWorkWrapper: WorkWrapperComponent = allWorkWrapperComponents.find(component => component.workData.id === activeEl.id);
    if (clickedWorkWrapper.work.deactivate()) {
      const classes = activeEl.classList;
      classes.remove('wwActive');
      classes.add('wwRow');
      this.workActive = null;
      return true;
    }
  }
  workClickFunc(e: Event): void {
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
