import { Work } from './work';

export class SpecificWork extends Work {

  w: number;
  h: number;
  canvas: HTMLCanvasElement;
  context: CanvasRenderingContext2D;
  constructor (parentElement: HTMLElement) {
    super(parentElement);
  };
  init(context: CanvasRenderingContext2D,w: number,h: number): void {
    context.clearRect(0,0,w,h);
  }
  save(context: CanvasRenderingContext2D,w: number,h: number): ImageData {
  	return context.getImageData(0,0,w,h);
  }
  load(context: CanvasRenderingContext2D, imageData:ImageData): void {
  	context.putImageData(imageData,0,0);
  }
}
