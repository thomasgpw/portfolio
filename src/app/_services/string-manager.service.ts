import { Injectable } from '@angular/core';

import { IterableStringInstance } from '../app.datatypes';
import { StringService } from './string.service';
import { GREETINGS } from '../_text/greetings';
import { NAMES } from '../_text/names';
import { TIPS } from '../_text/tips';
import { RHYMES } from '../_text/rhymes';

@Injectable()
export class StringManagerService {
  private _stringServiceMap: {
    [key: string]: StringService
  } = {};
  constructor() {
    this._stringServiceMap.greeting = new StringService(GREETINGS);
    this._stringServiceMap.name = new StringService(NAMES);
    this._stringServiceMap.tip = new StringService(TIPS);
    this._stringServiceMap.rhyme = new StringService(RHYMES);
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
