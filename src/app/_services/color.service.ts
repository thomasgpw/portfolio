import { Injectable } from '@angular/core';

@Injectable()
export class ColorService {
  a = 30;
  b = 13.5;
  c = 6.5;
  hue: number;
  constructor() {
    this.hue = 223;
  }
  setHue(inputHue: number): void {
    if (inputHue >= 360) {
      inputHue %= 360;
    }
    this.hue = inputHue;
  }
  getSaturation(i: number): number {
    const saturation =  this.a + this.b * i + this.c * Math.pow(i, 2);
    if (saturation > 100) {
      return 100;
    } else if (saturation < 0) {
      return 0;
    } else {
      return saturation;
    }
  }
  getColor(i: number): string {
    let lightness = i * 12 + 58;
    if (lightness > 100) {lightness = 100; } else if (lightness < 0) {lightness = 0; }
    return 'hsl('
    + this.hue + ','
    + (i === 0 ? this.a : this.getSaturation(i)) + '%,'
    + lightness + '%)';
  }
}
