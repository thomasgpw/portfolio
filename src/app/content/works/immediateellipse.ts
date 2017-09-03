import { Work } from './work';

export class SpecificWork extends Work {

  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  constructor (parentElement: Element) {
    super(parentElement);
  };
}
