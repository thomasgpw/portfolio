import { Injectable } from '@angular/core';

import { IterableStringInstance } from '../app.datatypes';
import { GREETINGS } from '../_text/greetings';
import { NAMES } from '../_text/names';
import { TIPS } from '../_text/tips';
import { RHYMES } from '../_text/rhymes';
import { StringService } from './string.service';

@Injectable()
export class StringManagerService {
  private _stringServiceMap: {
    [key: string]: StringService
  } = {};
  constructor() {
    this._stringServiceMap.greeting = new StringService();
    this._stringServiceMap.greeting.setStrings(GREETINGS);
    this._stringServiceMap.name = new StringService();
    this._stringServiceMap.name.setStrings(NAMES);
    this._stringServiceMap.tip = new StringService();
    this._stringServiceMap.tip.setStrings(TIPS);
    this._stringServiceMap.rhyme = new StringService();
    this._stringServiceMap.rhyme.setStrings(RHYMES);
  }
  getNextString(type: string): IterableStringInstance {
    return (new IterableStringInstance(
      this._stringServiceMap[type].getNextString(), type
    ));
  }
  getRandomString(type: string): IterableStringInstance {
    return (new IterableStringInstance(
      this._stringServiceMap[type].getRandomString(), type
    ));
  }
  setString(value: string, type: string): IterableStringInstance {
    return new IterableStringInstance(value, type);
  }
}
