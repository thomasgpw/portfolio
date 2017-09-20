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
  @Input() welcomeAlive: boolean;
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
    if (this.welcomeAlive) {
      tab.firstElementChild.setAttributeNS(null, 'fill', primaryColor);
    } else {
      tab.firstElementChild.setAttributeNS(null, 'fill', tertiaryColor);
    }
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
    this.saveContentDataEvent.emit(this.contentData);
    this.setWorkActiveEvent.emit(this.workActive);
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  redrawAll(values: number[]): Promise<null> {
    // More to be done here
    return Promise.resolve(null);
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

  /* EVENT FUNCTIONS */
  // workInitFunc(e: WorkWrapperComponent): void {
  //   const workActive = this.workActive;
  //   if (workActive === parseInt(e.workData.id, 10)) {
  //     const activeEl = document.getElementsByClassName('work-wrapper')[workActive];
  //     console.log(document.getElementsByClassName('work-wrapper'));
  //     this.activateWorkHandler(activeEl, e);
  //   }
  // }
  goShutterFunc(): void {
    this.goShutterEvent.emit(null);
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
    this.gridButton = false;
  }
  viewGridFunc(): void {
    const activeEl = document.getElementsByClassName('wwActive')[0];
    if (activeEl) {
      const allWorkWrapperComponents = [];
      this.allWorkWrapper.forEach(function(workWrapperComponentInstance){
        allWorkWrapperComponents.push(workWrapperComponentInstance);
      });
      this.deactivateWorkHandler(activeEl, allWorkWrapperComponents).then(resolve => this.forceGridClass());
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
  activateWorkHandler(clickedEl: Element, clickedWorkWrapper: WorkWrapperComponent): void {
    clickedWorkWrapper.work.activate().then(resolve => this.activateWorkActuator(clickedEl, clickedWorkWrapper));
  }
  activateWorkActuator(clickedEl: Element, clickedWorkWrapper: WorkWrapperComponent): void {
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
  deactivateWorkHandler(activeEl: Element, allWorkWrapperComponents): Promise<null> {
    const clickedWorkWrapper: WorkWrapperComponent = allWorkWrapperComponents.find(component => component.workData.id === activeEl.id);
    clickedWorkWrapper.work.deactivate().then(resolve => this.deactivateWorkActuator(activeEl));
    return Promise.resolve(null);
  }
  deactivateWorkActuator(activeEl: Element): void {
    const classes = activeEl.classList;
    classes.remove('wwActive');
    classes.add('wwRow');
    this.workActive = null;
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
        this.deactivateWorkHandler(activeEl, allWorkWrapperComponents)
          .then(resolve => this.activateWorkHandler(clickedEl, clickedWorkWrapper));
      } else {
        this.activateWorkHandler(clickedEl, clickedWorkWrapper);
      }
    }
  }
}
