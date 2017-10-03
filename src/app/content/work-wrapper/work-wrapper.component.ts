import { Work } from '../_works/work';
import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';
import { SpecificWork } from '../_works/immediateellipse';
import { CommandStacks } from '../../app.datatypes';

@Component({
  selector: 'app-work-wrapper',
  templateUrl: './work-wrapper.component.html',
  styleUrls: ['./work-wrapper.component.css']
})
export class WorkWrapperComponent implements OnInit, OnDestroy {
  @Output() workWrapperInitEvent: EventEmitter<WorkWrapperComponent> = new EventEmitter();
  @Output() setCommandStacksEvent: EventEmitter<CommandStacks> = new EventEmitter();
  @Input() commandStacks: CommandStacks;
  work: Work;
  undoPath = '../../../assets/iconmonstr-undo-2.svg';
  settingsPath = '../../../assets/iconmonstr-gear-1.svg';
  deletePath = '../../../assets/iconmonstr-trash-can-2.svg';
  uploadPath = '../../../assets/iconmonstr-upload-17.svg';
  downloadPath = '../../../assets/iconmonstr-download-7-edited.svg';
  closePath = '../../../assets/iconmonstr-x-mark-1.svg';

  /* LIFECYCLE HOOK FUNCTIONS */
  ngOnInit(): void {
    this.work = new SpecificWork(document.getElementsByClassName('canvasWrapper')[this.commandStacks.id]);
    this.work.setCommandStacks(this.commandStacks);
    this.workWrapperInitEvent.emit(this);
  }
  ngOnDestroy(): void {
    // this.setCommandStacksEvent.emit(this.work.getCommandStacks());
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  redrawAll(values: number[]): Promise<null> {
    this.work.redrawAll();
    return Promise.resolve(null);
  }
  styleUndoFunc(el: SVGElement, unitLength: number) {

  }
  styleRedoFunc(el: SVGElement, unitLength: number) {
    
  }
  styleSettingsFunc(el: SVGElement, unitLength: number) {
    
  }
  styleDeleteFunc(el: SVGElement, unitLength: number) {
    
  }
  styleUploadFunc(el: SVGElement, unitLength: number) {
    
  }
  styleDownloadFunc(el: SVGElement, unitLength: number) {
    
  }
  styleCloseFunc(el: SVGElement, unitLength: number) {
    
  }

  /* EVENT FUNCTIONS */
  @HostListener('pointerdown', ['$event']) onPointerDown() {
    if (this.work.active) {
      this.work.onPointerDown(event);
    }
  }
  @HostListener('window: pointermove', ['$event']) onPointerMove() {
    if (this.work.active) {
      this.work.onPointerMove(event);
    }
  }
  @HostListener('window: pointerup') onPointerUp() {
    if (this.work.active) {
      this.work.onPointerUp();
      // this.setCommandStacksEvent.emit(this.work.getCommandStacks());
    }
  }
}
