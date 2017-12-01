import { Component, OnInit, OnDestroy, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, animate, transition} from '@angular/animations';

import { WorkState } from './_works/work-state.datatype';
import { WorkStates } from './_works/work-states.datatype';
import { WorkManagerService } from '../_services/work-manager.service';
import { generateSvgTab } from '../../assets/generate-svg-tab';
import { styleGridButton } from '../../apply-styles';
import { workTransitionConfig, gridWorkStyle, activeWorkStyle, rowWorkStyle } from '../_animations/styles';
import { WorkWrapperComponent } from './work-wrapper/work-wrapper.component';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css'],
  providers: [
    WorkManagerService
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
  @Output() setWorkStateEvent: EventEmitter<[number, WorkState]> = new EventEmitter();
  @Output() deleteWorkStateEvent: EventEmitter<string> = new EventEmitter();
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
  @Input() workStates: WorkStates;
  @Input() colors: {[key: string]: string};

  gridButton = false;
  tab: SVGElement;
  gridButtonPath = '../../assets/gridbutton.svg';
  constructor(readonly _workManagerService: WorkManagerService) {
  }

  ngOnInit(): void {
    const contentEl = document.getElementById('content');
    (contentEl as HTMLElement).style.backgroundColor = this.colors['contentColor'];
    this.createTab();
    this.workInitFunc();
  }
  ngOnDestroy(): void {
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  updateView(): void {
    this.createTab();
    if (this.gridButton) {
      this.styleGridButtonFunc(
        document.getElementById('gridButton').children[0] as SVGElement
      );
    }
  }
  createTab(): void {
    this.tab = generateSvgTab(
      document.getElementById('svgTab'),
      window.innerWidth,
      this.unitLength,
      this.unitLength * 2
    );
    this.tab.firstElementChild.setAttributeNS(null, 'fill',
      this.shutterView0Alive
      ? this.colors['welcomeColor']
      : this.colors['aboutColor']
    );
  }
  styleGridButtonFunc(el: SVGElement): void {
    styleGridButton(el.style, this.uLdwx3, this.uLdhx3, this. uLdhOffset);
  }
  getWorkWrappers(): any {
    return this._workManagerService.getWorkWrappers();
  }
  getStatus(id: number): string {
    const pattern = /^ww/;
    const elClassList = document.getElementsByClassName('work-wrapper-view-container')[id].classList;
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
    if (workActive !== null) {
      this._workManagerService.activate(workActive)
      .then(resolve => this.activateClass(workActive));
    }
  }
  setAppViewFunc(): void {
    this.setAppViewEvent.emit(null);
  }
  setWorkActiveFunc(id: number): void {
    this.setWorkActiveEvent.emit(id);
  }
  setWorkStateFunc(payload: [number, WorkState]): void {
    this.setWorkStateEvent.emit(payload);
  }
  deleteWorkStateFunc(key: string): void {
    this.deleteWorkStateEvent.emit(key);
  }
  requestColorsFunc(id: number) {
    this._workManagerService.sendColors(id, this.colors);
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
    this._workManagerService.deactivate(this.workActive)
    .then(resolve => this.forceGridClass());
  }
  resizeWork(e): void {
    this._workManagerService.resizeWork(parseInt(e.element.id, 10));
  }
  addWorkWrapperFunc(workWrapperComponentInstance: WorkWrapperComponent): void {
    console.log(workWrapperComponentInstance);
    const count = this._workManagerService.addWorkWrapper(workWrapperComponentInstance);
    if (count === this.workStates.length) {
      this.workInitFunc();
    }
  }
  deactivateClass(id: number): void {
    console.log('deactivate class', id);
    const classes = document.getElementsByClassName('work-wrapper-view-container')[id].classList;
    classes.remove('wwActive');
    classes.add('wwRow');
  }
  activateClass(id: number): void {
    const classes = document.getElementsByClassName('work-wrapper-view-container')[id].classList;
    this.gridButton = true;
    classes.remove('wwRow');
    classes.remove('wwGrid');
    classes.add('wwActive');
    this.setRowClass(id);
  }
  setRowClass(exceptionId: number): void {
    const elList = document.getElementsByClassName('work-wrapper-view-container');
    const elListLength = elList.length;
    for (let c = 0; c < elListLength; ++c) {
      if (c !== exceptionId) {
        const classes = elList[c].classList;
        classes.remove('wwGrid');
        classes.add('wwRow');
      }
    }
  }
  workClickFunc(e: Event): void {
    const clickedEl = (e.target as Element).closest('.work-wrapper-view-container');
    if (clickedEl) {
      const id = parseInt(clickedEl.id, 10);
      const workActive = this.workActive;
      if (id === workActive) {
        // this._workManagerService.handleClick(workActive, e);
      } else {
        if (workActive !== null) {
          this._workManagerService.deactivate(workActive)
          .then(resolve => this.deactivateClass(workActive));
        }
        this._workManagerService.activate(id)
        .then(resolve => this.activateClass(id));
      }
    }
  }
    // const workWrapperInstance = this.getWorkWrapper(this.workTypes.indexOf(e.element.id.toString()));
    // console.log(e);
    // if (workWrapperInstance.work) {
    //   const work = workWrapperInstance.work;
    //   work.resizeCanvas();
    //   work.drawAll(work.context);
    // }
  // activateWorkHandler(clickedEl: Element): void {
  //   const id = parseInt(clickedEl.id, 10);
  //   this.getWorkWrapper(id).work.activate().then(resolve => this.activateWorkActuator(clickedEl, id));
  // }

  // FUNCTION SHOULD BE SPLIT. VIEW SETTING AWAY FROM MODEL LOGIC
  // activateWorkActuator(clickedEl: Element, id: number): void {
  //   let classes = clickedEl.classList;
  //   this.setWorkActiveFunc(id);
  //   classes.remove('wwGrid');
  //   classes.remove('wwRow');
  //   classes.add('wwActive');
  //   (clickedEl as HTMLElement).style.left = '7.5%';
  //   const elArray = document.getElementsByClassName('work-wrapper-view-container');
  //   const elArrayLength = elArray.length;
  //   let rowOffset = 0;
  //   for (let i = 0; i < elArrayLength; ++i) {
  //     const loopEl = elArray[i];
  //     const loopId = parseInt(loopEl.id, 10);
  //     if (id !== loopId) {
  //       classes = loopEl.classList;
  //       classes.remove('wwGrid');
  //       classes.add('wwRow');
  //       (loopEl as HTMLElement).style.left = (((loopId + rowOffset) * 15) + '%');
  //     } else {
  //       rowOffset = -1;
  //     }
  //   }
  //   this.gridButton = true;
  // }
  // deactivateWorkHandler(activeEl: Element): Promise<null> {
  //   this.getWorkWrapper(parseInt(activeEl.id, 10)).work.deactivate().then(resolve => this.deactivateWorkActuator(activeEl));
  //   return Promise.resolve(null);
  //   this.setWorkActiveFunc(null);
  // }
    // const clickedWorkWrapper = this.getWorkWrapper(parseInt(clickedEl.id, 10));
    // if (clickedEl.classList.contains('wwActive')) {
    //   // clickedWorkWrapper.work.clickInteract(e);
    // } else {
    //   const activeEl = document.getElementsByClassName('wwActive')[0];
    //   if (activeEl) {
    //     this.deactivateWorkHandler(activeEl)
    //       .then(resolve => this.activateWorkHandler(clickedEl));
    //   } else {
    //     this.activateWorkHandler(clickedEl);
    //   }
    // }
}
