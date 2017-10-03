export function styleLeftArrow(el: SVGElement, windowInnerHeight: number, unitLength: number) {
  const leftArrowStyle = el.style;
  leftArrowStyle.position = 'fixed';
  const leftArrowHeight = unitLength * 2;
  leftArrowStyle.height = (leftArrowHeight).toString();
  leftArrowStyle.width = (unitLength * 3).toString();
  leftArrowStyle.left = '0';
  leftArrowStyle.top = ((windowInnerHeight - leftArrowHeight) / 2).toString();
  el.setAttribute('transform', 'rotate(90)');
}
export function styleRightArrow(el: SVGElement, windowInnerHeight: number, unitLength: number) {
  const rightArrowStyle = el.style;
  rightArrowStyle.position = 'fixed';
  const rightArrowHeight = unitLength * 2;
  rightArrowStyle.height = (rightArrowHeight).toString();
  rightArrowStyle.width = (unitLength * 3).toString();
  rightArrowStyle.right = '0';
  rightArrowStyle.top = ((windowInnerHeight - rightArrowHeight) / 2).toString();
  el.setAttribute('transform', 'rotate(270)');
}
export function styleDownArrowShutter(el: SVGElement, windowInnerWidth: number, unitLength: number) {
  const downArrowStyle = el.style;
  downArrowStyle.position = 'fixed';
  const downArrowWidth = unitLength * 3;
  downArrowStyle.width = (downArrowWidth).toString();
  downArrowStyle.height = (unitLength * 2).toString();
  downArrowStyle.bottom = '0';
  downArrowStyle.left = ((windowInnerWidth - downArrowWidth) / 2).toString();
}
export function styleDownArrowContent(el: SVGElement, windowInnerWidth: number, unitLength: number) {
  const downArrowStyle = el.style;
  downArrowStyle.position = 'fixed';
  const downArrowWidth = unitLength * 3;
  downArrowStyle.width = (downArrowWidth).toString();
  downArrowStyle.height = (unitLength * 2).toString();
  downArrowStyle.top = (unitLength * 3 / 2).toString();
  downArrowStyle.left = ((windowInnerWidth - downArrowWidth) / 2).toString();
  downArrowStyle.zIndex = '2';
}

export function styleGridButton(el: SVGElement, windowInnerHeight: number, unitLength: number) {
  const gridButtonStyle = el.style;
  gridButtonStyle.position = 'fixed';
  const gridButtonLength = unitLength * 3;
  gridButtonStyle.width = gridButtonLength.toString();
  gridButtonStyle.height = gridButtonLength.toString();
  gridButtonStyle.right = '0';
  gridButtonStyle.top = ((windowInnerHeight + gridButtonLength) / 2).toString();
}
