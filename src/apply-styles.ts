export function styleLeftArrow(el: SVGElement) {
  el.setAttribute('transform', 'rotate(90)');
  const leftArrowStyle = el.style;
  leftArrowStyle.position = 'fixed';
  const windowInnerHeight = window.innerHeight;
  const leftArrowHeight = windowInnerHeight / 12;
  leftArrowStyle.height = (leftArrowHeight).toString();
  leftArrowStyle.width = (leftArrowHeight * 2 / 3).toString();
  leftArrowStyle.left = '0';
  leftArrowStyle.top = ((windowInnerHeight - leftArrowHeight) / 2).toString();
}
export function styleRightArrow(el: SVGElement) {
  el.setAttribute('transform', 'rotate(270)');
  const rightArrowStyle = el.style;
  rightArrowStyle.position = 'fixed';
  const windowInnerHeight = window.innerHeight;
  const rightArrowHeight = windowInnerHeight / 12;
  rightArrowStyle.height = (rightArrowHeight).toString();
  rightArrowStyle.width = (rightArrowHeight * 2 / 3).toString();
  rightArrowStyle.right = '0';
  rightArrowStyle.top = ((windowInnerHeight - rightArrowHeight) / 2).toString();
}
export function styleDownArrowShutter(el: SVGElement) {
  const downArrowStyle = el.style;
  downArrowStyle.position = 'fixed';
  const windowInnerWidth = window.innerWidth;
  const downArrowWidth = windowInnerWidth * 3 / 64;
  downArrowStyle.width = (downArrowWidth).toString();
  downArrowStyle.height = (downArrowWidth * 2 / 3).toString();
  downArrowStyle.bottom = '0';
  downArrowStyle.left = ((windowInnerWidth - downArrowWidth) / 2).toString();
}
export function styleDownArrowContent(el: SVGElement) {
  const downArrowStyle = el.style;
  downArrowStyle.position = 'fixed';
  const windowInnerWidth = window.innerWidth;
  const downArrowWidth = windowInnerWidth * 3 / 64;
  downArrowStyle.width = (downArrowWidth).toString();
  downArrowStyle.height = (downArrowWidth * 2 / 3).toString();
  downArrowStyle.top = (downArrowWidth / 2).toString();
  downArrowStyle.left = ((windowInnerWidth - downArrowWidth) / 2).toString();
  downArrowStyle.zIndex = '2';
}

export function styleGridButton(el: SVGElement) {
  const gridButtonStyle = el.style;
  gridButtonStyle.position = "fixed";
  const windowInnerHeight = window.innerHeight;
  const gridButtonLength = windowInnerHeight/12;
  gridButtonStyle.width = gridButtonLength.toString();
  gridButtonStyle.height = gridButtonLength.toString();
  gridButtonStyle.right = "0";
  gridButtonStyle.top = ((windowInnerHeight + gridButtonLength)/2).toString();
}