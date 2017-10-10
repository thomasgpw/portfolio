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
  @Input() uLdcwx2: string;
  @Input() uLdchx2: string;
  @Input() uLd2cw: string;
  @Input() uLd2ch: string;
  @Input() bWPdcw: string;
  @Input() bWPdcwx2: string;
  @Input() bWPdcwx3: string;
  @Input() bWPdch: string;
  @Input() isPortrait: boolean;
  @Input() commandStacks: CommandStacks;
  work: Work;
  undoPath = '../../../assets/iconmonstr-undo-2.svg';
  settingsPath = '../../../assets/iconmonstr-gear-1.svg';
  deletePath = '../../../assets/iconmonstr-trash-can-2.svg';
  uploadPath = '../../../assets/iconmonstr-upload-17.svg';
  downloadPath = '../../../assets/iconmonstr-download-7-edited.svg';

  /* LIFECYCLE HOOK FUNCTIONS */
  ngOnInit(): void {
    this.work = new SpecificWork(document.getElementsByClassName('canvasWrapper')[this.commandStacks.id]);
    this.work.setCommandStacks(this.commandStacks);
    this.work.init();
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
  styleUndoFunc(el: SVGElement) {
    styleWorkWrapperButton(el.style, this.uLdcwx2, this.uLdchx2, this.uLd2ch, '0');
    const rightOffset: string = this.isPortrait ? this.bWPdcwx3 : this.bWPdcwx2;
    styleRightOffset(el.style, this.uLd2ch, rightOffset);
  }
  styleRedoFunc(el: SVGElement) {
    el.setAttribute('transform', 'scale(-1, 1)');
    styleWorkWrapperButton(el.style, this.uLdcwx2, this.uLdchx2, this.uLd2ch, '0');
    const redoOffset: string = this.isPortrait ? this.bWPdcwx2 : this.bWPdcw;
    styleRedoOffset(el.style, this.uLd2cw, redoOffset);
  }
  styleSettingsFunc(el: SVGElement) {
    styleWorkWrapperButton(el.style, this.uLdcwx2, this.uLdchx2, this.uLd2ch, '0');
    styleRightOffset(el.style, this.uLd2cw, '0');
  }
  styleDeleteFunc(el: SVGElement) {
    const topOffset: string = this.isPortrait ? '0' : this.bWPdch;
    styleWorkWrapperButton(el.style, this.uLdcwx2, this.uLdchx2, this.uLd2ch, topOffset);
    const rightOffset: string = this.isPortrait ? this.bWPdcw : '0';
    styleRightOffset(el.style, this.uLd2cw, rightOffset);
  }
  styleUploadFunc(el: SVGElement) {
    styleWorkWrapperButton(el.style, this.uLdcwx2, this.uLdchx2, this.uLd2ch, '0');
    styleLeftOffset(el.style, this.uLd2cw, '0');
  }
  styleDownloadFunc(el: SVGElement) {
    const topOffset: string = this.isPortrait ? '0' : this.bWPdch;
    styleWorkWrapperButton(el.style, this.uLdcwx2, this.uLdchx2, this.uLd2ch, topOffset);
    const leftOffset: string = this.isPortrait ? this.bWPdcw : '0';
    styleLeftOffset(el.style, this.uLd2cw, leftOffset);
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
    }
  }
}
