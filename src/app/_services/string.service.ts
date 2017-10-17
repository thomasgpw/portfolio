import { Injectable } from '@angular/core';
import { IterableStringInstance } from '../app.datatypes';

@Injectable()
export class StringService {
  private STRINGS: string[];
  private currentIndex: number;
  constructor(INSTRINGS: string[]) {
    this.STRINGS = INSTRINGS;
    this.currentIndex = 0;
  }
  setStrings(STRINGS: string[]) {
    this.STRINGS = STRINGS;
  }
  getNextString(): string {
    const STRINGS = this.STRINGS;
    const i = this.currentIndex + 1;
    let result: string;
    if (i === STRINGS.length) {
      this.currentIndex = 0;
      result = STRINGS[0];
    } else {
      this.currentIndex = i;
      result = STRINGS[(i)];
    }
    return result;
  }
  getRandomString(): string {
    const STRINGS = this.STRINGS;
    const index = Math.floor(Math.random() * STRINGS.length);
    this.currentIndex = index;
    return STRINGS[index];
  }
}
