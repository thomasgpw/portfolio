import { Injectable } from '@angular/core';

@Injectable()
export class TipService {
  TIPS: string[] = [
    'Pay attention to the cursor to discover interactible objects.',
    'Right click on images you\'ve created to download them.'
  ];
}
