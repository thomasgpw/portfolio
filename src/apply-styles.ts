export function styleLeftArrow(el: SVGElement) {
  el.setAttribute("transform", "rotate(90)");
  let leftArrowStyle = el.style;
  leftArrowStyle.position = "fixed";
  let windowInnerHeight = window.innerHeight;
  let leftArrowHeight = windowInnerHeight / 12;
  leftArrowStyle.height = (leftArrowHeight).toString();
  leftArrowStyle.width = (leftArrowHeight*2/3).toString();
  leftArrowStyle.left = "0";
  leftArrowStyle.top = ((windowInnerHeight-leftArrowHeight)/2).toString();
}
export function styleRightArrow(el: SVGElement) {
  el.setAttribute("transform", "rotate(270)");
  let rightArrowStyle = el.style;
  rightArrowStyle.position = "fixed";
  let windowInnerHeight = window.innerHeight;
  let rightArrowHeight = windowInnerHeight / 12;
  rightArrowStyle.height = (rightArrowHeight).toString();
  rightArrowStyle.width = (rightArrowHeight*2/3).toString();
  rightArrowStyle.right = "0";
  rightArrowStyle.top = ((windowInnerHeight-rightArrowHeight)/2).toString();
}
export function styleDownArrowShutter(el: SVGElement) {
  let downArrowStyle = el.style;
  downArrowStyle.position = "fixed";
  let windowInnerWidth = window.innerWidth;
  let downArrowWidth = windowInnerWidth*3/64;
  downArrowStyle.width = (downArrowWidth).toString();
  downArrowStyle.height = (downArrowWidth*2/3).toString();
  downArrowStyle.bottom = "0";
  downArrowStyle.left = ((windowInnerWidth-downArrowWidth)/2).toString();
}
export function styleDownArrowContent(el: SVGElement) {
  let downArrowStyle = el.style;
  downArrowStyle.position = "fixed";
  let windowInnerWidth = window.innerWidth;
  let downArrowWidth = windowInnerWidth*3/64;
  downArrowStyle.width = (downArrowWidth).toString();
  downArrowStyle.height = (downArrowWidth*2/3).toString();
  downArrowStyle.top = (downArrowWidth/2).toString();
  downArrowStyle.left = ((windowInnerWidth-downArrowWidth)/2).toString();
  downArrowStyle.zIndex = "2";
}