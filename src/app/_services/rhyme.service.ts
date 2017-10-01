import { Injectable } from '@angular/core';

@Injectable()
export class RhymeService {
  RHYMES: string[] = [
  'I love to rhyme',
  'please enjoy my website',
  'you deserve to live life',
  'computers rule',
  'you\'re tubular',
  'I\'m afraid of snakes',
  'support Local Business',
  'I love to program',
  'I accept you',
  'I\'ve lost my mind',
  'I respect my elders',
  'please get me a job'
  ];
  getNextRhyme(rhyme: string): string {
    const RHYMES = this.RHYMES;
    const index = RHYMES.indexOf(rhyme);
    if (index === RHYMES.length - 1) {
      return RHYMES[0];
    } else {
      return RHYMES[(index + 1)];
    }
  }
  getRandomRhyme(): string {
    const RHYMES = this.RHYMES;
    return RHYMES[Math.floor(Math.random() * RHYMES.length)];
  }
}

