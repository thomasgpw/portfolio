import { Injectable } from '@angular/core';

@Injectable()
export class WelcomeService {
  GREETINGS: string[] = [
    'Welcome |name|!',
    'Greetings |name|!',
    'Nice to see you |name|!',
    'Howdy |name|!',
    'Salutations |name|!',
    'How\'s it going |name|?',
    'How\'s it going |name|? \n Just start talking, I can hear you.',
    'Hello |name|!',
    'Glad you made it |name|!',
    'Ahoy |name|!',
    'Welcome Aboard |name|!',
    'Thanks for coming |name|!',
    'It\'s an honor to have you here |name|!',
    'It\'s great to see you |name|!',
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
  getGreeting(greeting: string, name: string): string {
    const namePattern = /\|name\|/;
    return greeting.replace(namePattern, name);
  }
  getRandomGreeting(): string {
    const GREETINGS = this.GREETINGS;
    return GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
  }
  getRandomName(): string {
    const NAMES = this.NAMES;
    return '<span id=\'name\'>' + NAMES[Math.floor(Math.random() * NAMES.length)] + '</span>';
  }
}

