import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { styleRightArrow } from '../../../apply-styles';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements OnInit {
  @Output() setShutterViewEvent: EventEmitter<null> = new EventEmitter();
  @Output() getNextRhymeEvent: EventEmitter<null> = new EventEmitter();
  @Output() setColorEvent: EventEmitter<number> = new EventEmitter();
  @Input() rhyme: string;
  @Input() uLdwx3: string;
  @Input() uLdhx2: string;
  @Input() uLdhOffset: string;
  @Input() color: number;
  @Input() colors: {[key: string]: string};
  arrowPath = '../../../assets/arrow.svg';

  constructor() { }

  ngOnInit(): void {
    this.updateView();
    console.log(this.color);
    (document.getElementById('hueRange') as HTMLInputElement).defaultValue = this.color.toString();
  }
  updateView(): void {
    this.updateColors();
    const rightArrow = document.getElementById('rightArrow').children[0];
    if (rightArrow) {
      this.styleRightArrowFunc(rightArrow as SVGElement);
    }
  }
  updateColors(): void {
    document.getElementById('about').style.backgroundColor = this.colors.aboutColor;
    document.getElementById('welcomeColor').style.backgroundColor = this.colors.welcomeColor;
    document.getElementById('contentColor').style.backgroundColor = this.colors.contentColor;
    document.getElementById('pColor0').style.backgroundColor = this.colors.pColor0;
    document.getElementById('pColor1').style.backgroundColor = this.colors.pColor1;
    document.getElementById('pColor2').style.backgroundColor = this.colors.pColor2;
    document.getElementById('pColor3').style.backgroundColor = this.colors.pColor3;
  }
  styleRightArrowFunc(el: SVGElement) {
    styleRightArrow(el.style, this.uLdwx3, this.uLdhx2, this.uLdhOffset);
    el.setAttribute('transform', 'rotate(270)');
  }

  /* EVENT FUNCTIONS */
  shutterToggleFunc() {
    this.setShutterViewEvent.emit(null);
  }
  getNextRhymeFunc(): void {
    this.getNextRhymeEvent.emit(null);
  }
  setColorFunc(color: number): void {
    this.setColorEvent.emit(color);
  }
}
