import { IterableStringList } from '../app.datatypes';
import { Injectable } from '@angular/core';

@Injectable()
export class StringService {
  STRINGS: string[];
  constructor(STRINGS: string[]) {
    this.STRINGS = STRINGS;
  }
  getNextString(state: IterableStringList): IterableStringList {
    const STRINGS = this.STRINGS;
    const i = state.index;
    if (i === STRINGS.length - 1) {
      state.index = 0;
      state.instance = STRINGS[0];
    } else {
      state.index = i + 1;
      state.instance = STRINGS[(i + 1)];
    }
    return state;
  }
  getRandomString(): [string, number] {
    const STRINGS = this.STRINGS;
    const index = Math.floor(Math.random() * STRINGS.length);
    return [STRINGS[index], index];
  }
}
