import { Component, OnInit, OnDestroy, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, state, animate, transition} from '@angular/animations';

import { WorkState } from './_works/work-state.datatype';
import { WorkStates } from './_works/work-states.datatype';
import { WorkManagerService } from '../_services/work-manager.service';
import {
  styleGridButton,
  styleTab
  } from '../../apply-styles';
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
  @Input() uLdwx6: string;
  @Input() uLdhx2: string;
  @Input() uLdhx3: string;
  @Input() uLdwx5Offset: string;
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
  tabPath = '../../assets/tab.svg';
  gridButtonPath = '../../assets/gridbutton.svg';
  constructor(readonly _workManagerService: WorkManagerService) {
  }

  ngOnInit(): void {
    const contentEl = document.getElementById('content');
    (contentEl as HTMLElement).style.backgroundColor = this.colors['contentColor'];
    this.workInitFunc();
  }
  ngOnDestroy(): void {
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  updateView(): void {
    this.styleTabFunc(document.getElementById('svgTab').children[0] as SVGElement);
    this.updateIsPortrait();
    if (this.gridButton) {
      this.styleGridButtonFunc(
        document.getElementById('gridButton').children[0] as SVGElement
      );
    }
  }
  updateIsPortrait(): void {
    const workWrapperViewContainers = document.getElementsByClassName('work-wrapper-view-container');
    let classList = workWrapperViewContainers[0].classList;
    if (!classList.contains('wwGrid')) {
      const isPortrait = this.isPortrait;
      const oldIsPortrait = classList.contains('wwRowP') || classList.contains('wwActiveP');
      console.log('oldIsPortrait', oldIsPortrait);
      console.log('isPortrait', isPortrait);
      if (oldIsPortrait !== isPortrait) {
        const frontPattern = /^ww.*/;
        const toReplace = oldIsPortrait ? 'P' : 'L';
        const replacement = isPortrait ? 'P' : 'L';
        for (let iWrapper = 0; iWrapper < workWrapperViewContainers.length; iWrapper++) {
          if (iWrapper !== 0) {
            classList = workWrapperViewContainers[iWrapper].classList;
          }
          for (let iClass = 0; iClass < classList.length; iClass++) {
            const classFocus = classList[iClass];
            if (classFocus.match(frontPattern)) {
              classFocus.replace(toReplace, replacement);
            }
          }
        }
      }
    }
  }
  styleTabFunc(el: SVGElement): void {
    styleTab(el.style, this.uLdwx6, this.uLdhx3, this.uLdwx5Offset);
    const color =
      this.shutterView0Alive
      ? this.colors['welcomeColor']
      : this.colors['aboutColor'];
    el.setAttributeNS(null, 'fill', color);
    (document.getElementsByClassName('shutter-bar')[0] as HTMLElement).style.backgroundColor = color;
  }
  styleGridButtonFunc(el: SVGElement): void {
    const elStyle = el.style;
    styleGridButton(elStyle, this.uLdwx3, this.uLdhx3);
    console.log('gridIsPortrait', this.isPortrait);
    if (this.isPortrait) {
      elStyle.right = '85%';
      elStyle.top = '90%';
    } else {
      elStyle.right = '5%';
      elStyle.top = '10%';
    }
  }
  getWorkWrappers(): any {
    return this._workManagerService.getWorkWrappers();
  }
  getStatus(id: number): string {
    const pattern = /^ww.*/;
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
      .then(resolve => this.activateClass(workActive, this.isPortrait));
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
      classes.remove('wwActiveL');
      classes.remove('wwActiveP');
      classes.remove('wwRow');
      classes.remove('wwRowL');
      classes.remove('wwRowP');
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
    const count = this._workManagerService.addWorkWrapper(workWrapperComponentInstance);
    if (count === this.workStates.length) {
      this._workManagerService.marryWorkWappers();
      this.workInitFunc();
    }
  }
  deactivateClass(id: number, isPortrait: boolean): void {
    console.log('deactivate class', id);
    const classes = document.getElementsByClassName('work-wrapper-view-container')[id].classList;
    classes.remove('wwActive');
    classes.remove('wwActiveL');
    classes.remove('wwActiveP');
    classes.add('wwRow');
    classes.add(isPortrait ? 'wwRowP' : 'wwRowL');
  }
  activateClass(id: number, isPortrait: boolean): void {
    const classes = document.getElementsByClassName('work-wrapper-view-container')[id].classList;
    this.gridButton = true;
    classes.remove('wwRow');
    classes.remove('wwRowL');
    classes.remove('wwRowP');
    classes.remove('wwGrid');
    classes.add('wwActive');
    classes.add(isPortrait ? 'wwActiveP' : 'wwActiveL');
    this.setRowClass(id, isPortrait);
  }
  setRowClass(exceptionId: number, isPortrait: boolean): void {
    const elList = document.getElementsByClassName('work-wrapper-view-container');
    const elListLength = elList.length;
    const rowClass = isPortrait ? 'wwRowP' : 'wwRowL';
    for (let c = 0; c < elListLength; ++c) {
      if (c !== exceptionId) {
        const classes = elList[c].classList;
        classes.remove('wwGrid');
        classes.add('wwRow');
        classes.add(rowClass);
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
        const isPortrait = this.isPortrait;
        console.log(isPortrait);
        if (workActive !== null) {
          this._workManagerService.deactivate(workActive)
          .then(resolve => this.deactivateClass(workActive, isPortrait));
        }
        this._workManagerService.activate(id)
        .then(resolve => this.activateClass(id, isPortrait));
      }
    }
  }
}
