import { Work } from '../_works/work';
import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';
import { SpecificWork } from '../_works/points-to-point';
import { CommandStacks } from '../../app.datatypes';
import {
  styleWorkWrapperButton,
  styleRightOffset,
  styleLeftOffset,
  styleRedoOffset
} from '../../../apply-styles';

@Component({
  selector: 'app-work-wrapper',
  templateUrl: './work-wrapper.component.html',
  styleUrls: ['./work-wrapper.component.css']
})
export class WorkWrapperComponent implements OnInit, OnDestroy {
  @Output() workWrapperInitEvent: EventEmitter<WorkWrapperComponent> = new EventEmitter();
  @Output() setCommandStacksEvent: EventEmitter<CommandStacks> = new EventEmitter();
  @Input() unitLength: number;
  @Input() uLx2: number;
  @Input() uLd2: number;
  @Input() bWP: number;
  @Input() isPortrait: boolean;
  @Input() commandStacks: CommandStacks;
  work: Work;
  undoPath = '../../../assets/iconmonstr-undo-2.svg';
  settingsPath = '../../../assets/iconmonstr-gear-1.svg';
  deletePath = '../../../assets/iconmonstr-trash-can-2.svg';
  uploadPath = '../../../assets/iconmonstr-upload-17.svg';
  downloadPath = '../../../assets/iconmonstr-download-7-edited.svg';
  uLx2String: string;
  uLd2String: string;
  bWPString: string;
  bWPx2String: string;

  /* LIFECYCLE HOOK FUNCTIONS */
  ngOnInit(): void {
    this.work = new SpecificWork(document.getElementsByClassName('canvasWrapper')[this.commandStacks.id]);
    this.work.setCommandStacks(this.commandStacks);
    this.work.init();
    this.workWrapperInitEvent.emit(this);
    this.uLx2String = this.uLx2.toString();
    this.uLd2String = this.uLd2.toString();
    this.bWPString = this.bWP.toString();
    this.bWPx2String = (this.bWP * 2).toString();
  }
  ngOnDestroy(): void {
    // this.setCommandStacksEvent.emit(this.work.getCommandStacks());
  }

  /* ON CHANGE SPECIFIC FUNCTIONS */
  redrawAll(values: number[]): Promise<null> {
    this.work.redrawAll();
    return Promise.resolve(null);
  }
  styleUndoFunc(el: SVGElement) {
    styleWorkWrapperButton(el.style, this.uLx2String, this.uLd2String, '0');
    const rightOffset: string = this.isPortrait ? (this.bWP * 3).toString() : this.bWPx2String;
    styleRightOffset(el.style, this.uLd2String, rightOffset);
  }
  styleRedoFunc(el: SVGElement) {
    el.setAttribute('transform', 'scale(-1, 1)');
    styleWorkWrapperButton(el.style, this.uLx2String, this.uLd2String, '0');
    const rightOffset: string = this.isPortrait ? this.bWPx2String : this.bWPString;
    styleRedoOffset(el.style, this.uLd2String, rightOffset);
  }
  styleSettingsFunc(el: SVGElement) {
    styleWorkWrapperButton(el.style, this.uLx2String, this.uLd2String, '0');
    styleRightOffset(el.style, this.uLd2String, '0');
  }
  styleDeleteFunc(el: SVGElement) {
    const topOffset: string = this.isPortrait ? '0' : this.bWPString;
    styleWorkWrapperButton(el.style, this.uLx2String, this.uLd2String, topOffset);
    const rightOffset: string = this.isPortrait ? this.bWPString : '0';
    styleRightOffset(el.style, this.uLd2String, rightOffset);
  }
  styleUploadFunc(el: SVGElement) {
    styleWorkWrapperButton(el.style, this.uLx2String, this.uLd2String, '0');
    styleLeftOffset(el.style, this.uLd2String, '0');
  }
  styleDownloadFunc(el: SVGElement) {
    const topOffset: string = this.isPortrait ? '0' : this.bWPString;
    styleWorkWrapperButton(el.style, this.uLx2String, this.uLd2String, topOffset);
    const leftOffset: string = this.isPortrait ? this.bWPString : '0';
    styleLeftOffset(el.style, this.uLd2String, leftOffset);
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
