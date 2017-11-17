import { Component, Input, Output, EventEmitter, HostListener, OnInit, OnDestroy } from '@angular/core';
import { WorkState } from '../_works/work-state.datatype';
import { Work } from '../_works/work';
import { CanvasWork } from '../_works/canvas-work';
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
  @Output() setActiveEvent: EventEmitter<null> = new EventEmitter();
  @Output() unsetActiveEvent: EventEmitter<null> = new EventEmitter();
  @Output() setWorkStateEvent: EventEmitter<[number, WorkState]> = new EventEmitter();
  @Output() requestColorsEvent: EventEmitter<null> = new EventEmitter();
  @Input() uLdcwx2: string;
  @Input() uLdchx2: string;
  @Input() uLd2cw: string;
  @Input() uLd2ch: string;
  @Input() bWPdcw: string;
  @Input() bWPdcwx2: string;
  @Input() bWPdcwx3: string;
  @Input() bWPdch: string;
  @Input() isPortrait: boolean;
  @Input() workState: WorkState;
  @Input() type: string;
  id: number;
  work: Work;
  settingsOpen = false;
  undoPath = '../../../assets/iconmonstr-undo-2.svg';
  settingsPath = '../../../assets/iconmonstr-volume-control-9.svg';
  closePath = '../../../assets/iconmonstr-x-mark-1.svg';
  deletePath = '../../../assets/iconmonstr-trash-can-2.svg';
  uploadPath = '../../../assets/iconmonstr-upload-17.svg';
  downloadPath = '../../../assets/iconmonstr-download-7-edited.svg';

  /* LIFECYCLE HOOK FUNCTIONS */
  ngOnInit(): void {
    this.workWrapperInitEvent.emit(this);
  }
  ngOnDestroy(): void {
    // this.setWorkDataEvent.emit(this.work.getWorkData());
  }
  // getWorkActive(): boolean {
  //   if (!this.work) {
  //     return false;
  //   } else {
  //     return this.work.active;
  //   }
  // }
  /* ON CHANGE SPECIFIC FUNCTIONS */
  setWorkStateFunc(id: number, workState: WorkState): void {
    this.setWorkStateEvent.emit([id, workState]);
  }
  activate(): void {
    this.work.activate().then(resolve => this.setActiveEvent.emit(null));
  }
  deactivate(): void {
    this.work.deactivate().then(resolve => this.unsetActiveEvent.emit(null));
  }
  download(): void {
    (this.work as CanvasWork).download(document.getElementById('downloadLink') as HTMLAnchorElement);
  }
  openSettings(): void {
    const work = this.work;
    if (work.active) {
      this.activateSettings()
      .then(resolve => setTimeout(() => this.attachSettings(work)));
    }
  }
  activateSettings(): Promise<null> {
    this.settingsOpen = true;
    return Promise.resolve(null);
  }
  attachSettings(work: Work): void {
    const settingsEl = work.setupSettings();
    document.getElementById('settingsWrapper').appendChild(settingsEl);
  }
  closeSettings(): void {
    const work = this.work;
    // const context = work.context;
    this.setWorkStateFunc(this.id, {
      type: work.type,
      workData: work.workData,
      workSettings: work.workSettings
    });
    // work.drawAll(work.applySettings(context));
    this.settingsOpen = false;
  }
  // drawAll(values: number[]): Promise<null> {
  //   const work = this.work;
  //   work.drawAll(work.context);
  //   return Promise.resolve(null);
  // }
  styleUndoFunc(el: SVGElement): void {
    const elStyle = el.style;
    styleWorkWrapperButton(elStyle, this.uLdcwx2, this.uLdchx2, this.uLd2ch, '0');
    const rightOffset: string = this.isPortrait ? this.bWPdcwx3 : this.bWPdcwx2;
    styleRightOffset(elStyle, this.uLd2ch, rightOffset);
    this.outlineSVG(el);
  }
  styleRedoFunc(el: SVGElement): void {
    const elStyle = el.style;
    el.setAttribute('transform', 'scale(-1, 1)');
    styleWorkWrapperButton(elStyle, this.uLdcwx2, this.uLdchx2, this.uLd2ch, '0');
    const redoOffset: string = this.isPortrait ? this.bWPdcwx2 : this.bWPdcw;
    styleRedoOffset(elStyle, this.uLd2cw, redoOffset);
    this.outlineSVG(el);
  }
  styleSettingsFunc(el: SVGElement): void {
    const elStyle = el.style;
    styleWorkWrapperButton(elStyle, this.uLdcwx2, this.uLdchx2, this.uLd2ch, '0');
    styleRightOffset(elStyle, this.uLd2cw, '0');
    this.outlineSVG(el);
  }
  styleDeleteFunc(el: SVGElement): void {
    const elStyle = el.style;
    const topOffset: string = this.isPortrait ? '0' : this.bWPdch;
    styleWorkWrapperButton(elStyle, this.uLdcwx2, this.uLdchx2, this.uLd2ch, topOffset);
    const rightOffset: string = this.isPortrait ? this.bWPdcw : '0';
    styleRightOffset(elStyle, this.uLd2cw, rightOffset);
    this.outlineSVG(el);
  }
  styleUploadFunc(el: SVGElement): void {
    const elStyle = el.style;
    styleWorkWrapperButton(elStyle, this.uLdcwx2, this.uLdchx2, this.uLd2ch, '0');
    styleLeftOffset(elStyle, this.uLd2cw, '0');
    this.outlineSVG(el);
  }
  styleDownloadFunc(el: SVGElement): void {
    const elStyle = el.style;
    const topOffset: string = this.isPortrait ? '0' : this.bWPdch;
    styleWorkWrapperButton(elStyle, this.uLdcwx2, this.uLdchx2, this.uLd2ch, topOffset);
    const leftOffset: string = this.isPortrait ? this.bWPdcw : '0';
    styleLeftOffset(elStyle, this.uLd2cw, leftOffset);
    this.outlineSVG(el);
  }
  styleCloseFunc(el: SVGElement): void {
    const elStyle = el.style;
    styleWorkWrapperButton(elStyle, this.uLdcwx2, this.uLdchx2, this.uLd2ch, '0');
    styleRightOffset(elStyle, this.uLd2cw, '0');
    this.outlineSVG(el);
  }
  outlineSVG(el: SVGElement): void {
    el.setAttributeNS(null, 'fill', '#000');
    el.setAttributeNS(null, 'stroke', '#888');
  }

  /* EVENT FUNCTIONS */
  @HostListener('pointerdown', ['$event']) onPointerDown() {
    const work = this.work;
    if (work.active) {
      work.onPointerDown(event as PointerEvent);
    }
  }
  @HostListener('window: pointermove', ['$event']) onPointerMove() {
    const work = this.work;
    if (work.active) {
      work.onPointerMove(event as PointerEvent);
    }
  }
  @HostListener('window: pointerup', ['$event']) onPointerUp() {
    const work = this.work;
    if (work.active) {
      work.onPointerUp(event as PointerEvent);
    }
  }
}
