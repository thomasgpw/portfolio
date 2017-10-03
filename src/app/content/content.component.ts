import { Component, OnInit, OnDestroy, Output, Input, EventEmitter, ViewChildren, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, animate, transition} from '@angular/animations';

import { WorkWrapperCollectionService } from '../_services/work-wrapper-collection.service';
import { CommandStacks } from '../app.datatypes';
import { generateSvgTab } from '../../assets/generate-svg-tab';
import { styleDownArrowContent, styleGridButton } from '../../apply-styles';
import { workTransitionConfig, gridWorkStyle, activeWorkStyle, rowWorkStyle } from '../_animations/styles';
import { worksList } from './works-list';
import { WorkWrapperComponent } from './work-wrapper/work-wrapper.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [
    WorkWrapperCollectionService
  ],
  // changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Output() setAppViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() setWorkActiveEvent: EventEmitter<number> = new EventEmitter();
  @Output() setCommandStacksEvent: EventEmitter<CommandStacks> = new EventEmitter();
  @Output() deleteComandStacksEvent: EventEmitter<number> = new EventEmitter();
  @Input() welcomeAlive: boolean;
  @Input() unitLength: number;
  @Input() workActive: number;
  @Input() commandStacksMap: {[key: number]: CommandStacks};
  @Input() colors: {[key: string]: string};

  commandStacksKeys;
  gridButton = false;
  tab: SVGElement;
  arrowPath = '../../assets/arrow.svg';
  gridButtonPath = '../../assets/gridbutton.svg';
  readonly _workWrapperColectionService: WorkWrapperCollectionService;
  constructor() {
    this._workWrapperColectionService = new WorkWrapperCollectionService(this.workActive);
  }

  ngOnInit(): void {
    const contentEl = document.getElementById('content');
    (contentEl as HTMLElement).style.backgroundColor = this.colors['contentColor'];
    this.stylePage(contentEl);
    this.commandStacksKeys = Object.keys(this.commandStacksMap);
    if (this.welcomeAlive) {
      this.tab.firstElementChild.setAttributeNS(null, 'fill', this.colors['welcomeColor']);
    } else {
      this.tab.firstElementChild.setAttributeNS(null, 'fill', this.colors['aboutColor']);
    }
    if (this.workActive !== null) {
      this.workInitFunc();
    }
  }
  ngOnDestroy(): void {
    this._workWrapperColectionService.destroy();
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  stylePage(contentEl: HTMLElement): void {
    this.tab = contentEl.appendChild(generateSvgTab(window.innerWidth, this.unitLength));
  }
  styleDownArrowContentFunc(el: SVGElement, unitLength: number, windowInnerWidth: number = window.innerWidth): void {
    styleDownArrowContent(el, windowInnerWidth, unitLength);
  }
  styleGridButtonFunc(el: SVGElement, unitLength: number, windowInnerHeight: number = window.innerHeight): void {
    styleGridButton(el, windowInnerHeight, unitLength);
  }
  addWorkWrapperFunc(workWrapperComponentInstance: WorkWrapperComponent): void {
    this._workWrapperColectionService.addWorkWrapper(workWrapperComponentInstance);
  }
  getWorkWrapper(id: number): WorkWrapperComponent {
    return this._workWrapperColectionService.getWorkWrapper(id);
  }
  getStatus(i: string): string {
    const pattern = /^ww/;
    const elClassList = document.getElementsByClassName('work-wrapper-view-container')[i].classList;
    const elClassListLength = elClassList.length;
    for (let c = 0; c < elClassListLength; ++c) {
      if (elClassList[c].match(pattern)) {
        return elClassList[c];
      }
    }
  }

  /* EVENT FUNCTIONS */
  workInitFunc(): void {
    const workActive = this.workActive;
    const activeEl = document.getElementsByClassName('work-wrapper-view-container')[workActive];
    console.log(document.getElementsByClassName('work-wrapper-view-container'));
    this.activateWorkHandler(activeEl);
  }
  setAppViewFunc(): void {
    this.setAppViewEvent.emit(null);
  }
  setWorkActiveFunc(id: number): void {
    this.setWorkActiveEvent.emit(id);
  }
  setCommandStacksFunc(commandStacks: CommandStacks): void {
    this.setCommandStacksEvent.emit(commandStacks);
  }
  deleteCommandStacksFunc(id: number): void {
    this.deleteComandStacksEvent.emit(id);
  }
  forceGridClass(): void {
    const elArray = document.getElementsByClassName('work-wrapper-view-container');
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
      this.deactivateWorkHandler(activeEl).then(resolve => this.forceGridClass());
    }
  }
  resizeWork(e): void {
    this.getWorkWrapper(e.element.id.toString()).work.resizeCanvas();
  }
  activateWorkHandler(clickedEl: Element): void {
    const id = parseInt(clickedEl.id, 10);
    this.getWorkWrapper(id).work.activate().then(resolve => this.activateWorkActuator(clickedEl, id));
  }

  // FUNCTION SHOULD BE SPLIT. VIEW SETTING AWAY FROM MODEL LOGIC
  activateWorkActuator(clickedEl: Element, id: number): void {
    let classes = clickedEl.classList;
    this.setWorkActiveFunc(id);
    classes.remove('wwGrid');
    classes.remove('wwRow');
    classes.add('wwActive');
    (clickedEl as HTMLElement).style.left = '7.5%';
    const elArray = document.getElementsByClassName('work-wrapper-view-container');
    const elArrayLength = elArray.length;
    let rowOffset = 0;
    for (let i = 0; i < elArrayLength; ++i) {
      const loopEl = elArray[i];
      const loopId = parseInt(loopEl.id, 10);
      if (id !== loopId) {
        classes = loopEl.classList;
        classes.remove('wwGrid');
        classes.add('wwRow');
        (loopEl as HTMLElement).style.left = (((loopId + rowOffset) * 15) + '%');
      } else {
        rowOffset = -1;
      }
    }
    this.gridButton = true;
  }
  deactivateWorkHandler(activeEl: Element): Promise<null> {
    this.getWorkWrapper(parseInt(activeEl.id, 10)).work.deactivate().then(resolve => this.deactivateWorkActuator(activeEl));
    return Promise.resolve(null);
  }
  deactivateWorkActuator(activeEl: Element): void {
    const classes = activeEl.classList;
    classes.remove('wwActive');
    classes.add('wwRow');
    this.setWorkActiveFunc(null);
  }
  workClickFunc(e: Event): void {
    const clickedEl = e.srcElement.closest('.work-wrapper-view-container');
    const clickedWorkWrapper = this.getWorkWrapper(parseInt(clickedEl.id, 10));
    if (clickedEl.classList.contains('wwActive')) {
      // clickedWorkWrapper.work.clickInteract(e);
    } else {
      const activeEl = document.getElementsByClassName('wwActive')[0];
      if (activeEl) {
        this.deactivateWorkHandler(activeEl)
          .then(resolve => this.activateWorkHandler(clickedEl));
      } else {
        this.activateWorkHandler(clickedEl);
      }
    }
  }
}
