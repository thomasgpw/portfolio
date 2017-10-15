import { Component, OnInit, OnDestroy, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  @Input() shutterView0Alive: boolean;
  @Input() unitLength: number;
  @Input() uLdwx3: string;
  @Input() uLdhx2: string;
  @Input() uLdhx3: string;
  @Input() uLdwOffset: string;
  @Input() uLdhOffset: string;
  @Input() uLdcwx2: string;
  @Input() uLdchx2: string;
  @Input() uLd2cw: string;
  @Input() uLd2ch: string;
  @Input() bWPdcw: string;
  @Input() bWPdcwx2: string;
  @Input() bWPdcwx3: string;
  @Input() bWPdch: string;
  @Input() workActive: number;
  @Input() isPortrait: boolean;
  @Input() commandStacksMap: {[key: number]: CommandStacks};
  @Input() colors: {[key: string]: string};

  commandStacksKeys;
  gridButton = false;
  tab: SVGElement;
  arrowPath = '../../assets/arrow.svg';
  gridButtonPath = '../../assets/gridbutton.svg';
  readonly _workWrapperColectionService: WorkWrapperCollectionService;
  constructor() {
    this._workWrapperColectionService = new WorkWrapperCollectionService();
    this._workWrapperColectionService.setActive(this.workActive);
  }

  ngOnInit(): void {
    const contentEl = document.getElementById('content');
    (contentEl as HTMLElement).style.backgroundColor = this.colors['contentColor'];
    this.createTab();
    this.commandStacksKeys = Object.keys(this.commandStacksMap);
    if (this.workActive !== null) {
      this.workInitFunc();
    }
  }
  ngOnDestroy(): void {
    this._workWrapperColectionService.destroy();
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  updateView(): void {
    this.createTab();
    this.styleDownArrowContentFunc(document.getElementById('downArrow').children[0] as SVGElement);
    if (this.gridButton) {
      this.styleGridButtonFunc(document.getElementById('gridButton').children[0] as SVGElement);
    }
  }
  createTab(): void {
    this.tab = generateSvgTab(document.getElementById('svgTab'), window.innerWidth, this.unitLength, this.unitLength * 2);
    this.tab.firstElementChild.setAttributeNS(null, 'fill',
      this.shutterView0Alive
      ? this.colors['welcomeColor']
      : this.colors['aboutColor']
    );
  }
  styleDownArrowContentFunc(el: SVGElement): void {
    styleDownArrowContent(el.style, this.uLdwx3, this.uLdhx2, this.uLdhx3, this.uLdwOffset);
  }
  styleGridButtonFunc(el: SVGElement): void {
    styleGridButton(el.style, this.uLdwx3, this.uLdhx3, this. uLdhOffset);
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
  addWorkWrapperFunc(workWrapperComponentInstance: WorkWrapperComponent): void {
    this._workWrapperColectionService.addWorkWrapper(workWrapperComponentInstance);
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
