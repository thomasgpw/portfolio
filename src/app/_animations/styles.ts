import { style, AnimationStyleMetadata } from '@angular/animations';

/*
*  Constants to use in animation declarations in components.
*/

/* Configuration constants. */
// The length in time, in miliseconds, of animations between the different page screens.
export const viewTransitionTime = 1000;
// Extra options for animations between the different page screens.
export const viewTransitionConfig = viewTransitionTime + 'ms ease-in-out';
// The length in time, in miliseconds, of animations between the states of work wrappers.
export const workTransitionTime = 1000;
// Extra options for animations between the states of work wrappers.
export const workTransitionConfig = workTransitionTime + 'ms ease-in-out';

/* Vertical transition animation styles. */
// Animation style defining an element on the screen that can be moved vertically.
export const onScreenYStyle = style({ transform: 'translateY(0)' });
// Animation style defining an element above the screen.
export const aboveScreenStyle = style({ transform: 'translateY(-100%)' });
// Animation style defining an element below the screen.
export const belowScreenStyle = style({ transform: 'translateY(100%)' });

/* Horizontal transition animation styles. */
// Animation style defining an element on the screen that can be moved horizontally.
export const onScreenXStyle = style({ transform: 'translateX(0)' });
// Animation style defining an element to the left of the screen.
export const leftOfScreenStyle = style({ transform: 'translateX(-100%)' });
// Animation style defining an element to the right of the screen.
export const rightOfScreenStyle = style({ transform: 'translateX(100%)' });

/* work wrapper state transition animation styles */
// Animation style defining the size of work wrapper elements when in the grid state.
export const gridWorkStyle = style({ height: '25%', width: '25%' });
// Animation style defining the size of work wrapper elements when in the active state.
export const activeWorkStyle = style({ height: '80%', width: '80%' });
// Animation style defining the size of work wrapper elements when in the row state.
export const rowWorkStyle = style({ height: '10%', width: '10%' });

export function downArrowShutterStyle(): AnimationStyleMetadata {
  return style({
  transform: 'translateY('
  + (100 - (100 * Math.sqrt(5 / 6) * Math.pow(window.innerWidth * window.innerHeight, 1 / 4) / window.innerHeight))
  + '%)'
}); }
export function downArrowContentStyle(): AnimationStyleMetadata {
  return style({
  transform: 'translateY('
  + (100 * Math.sqrt(5 / 6) * Math.pow(window.innerWidth * window.innerHeight, 1 / 4) / window.innerHeight)
  + '%)'
}); }
