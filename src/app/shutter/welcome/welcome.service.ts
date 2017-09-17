import { Injectable } from '@angular/core';

@Injectable()
export class WelcomeService {
  WELCOMES: string[] = [
    'Welcome |name|!',
    'Greetings |name|!',
    'Nice to see you |name|!',
    'Howdy |name|!',
    'Howdy partner!',
    'Salutations |name|!',
    'How\'s it going |name|?',
    'How\'s it going |name|? \n Just start talking, I can hear you.',
    'Hello |name|!',
    'Glad you made it |name|!',
    'Ahoy |name|!',
    'Ahoy Sailor!',
    'Welcome Aboard |name|!',
  ];
  NAMES: string[] = [
    'Amigo',
    'Befroe',
    'Boss',
    'Breb',
    'Bud',
    'Buddy',
    'Captain',
    'Commander',
    'Cool Cat',
    'Doc',
    'Dude',
    'Fam',
    'Friend',
    'G',
    'Guy/Gal/Gull',
    'Habibi',
    '(Insert Name)',
    'Love',
    'Liz Lemon',
    'Ma\'m/Man/Mallcop',
    'Poe, the Kung-Fu Panda',
    'Partner',
    'Queen',
    'Scooby Doo',
    'Sailor',
    'Sir/Madam/Nobleperson',
    'Skipper',
    'Your Holiness',
    'Your Majesty',
    'Your Eminence',
    'Your Honor',
  ];
  getWelcome(name: string): string {
    const WELCOMES = this.WELCOMES;
    const namePattern = /\|name\|/;
    return WELCOMES[Math.floor(Math.random() * WELCOMES.length)].replace(namePattern, name);
  }
  getName(): string {
    const NAMES = this.NAMES;
    return NAMES[Math.floor(Math.random() * NAMES.length)];
  }
}

