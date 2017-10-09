export function styleLeftArrow(elStyle: CSSStyleDeclaration, windowInnerHeight: number, uLx2: number, uLx3: number): void {
  elStyle.position = 'fixed';
  elStyle.height = uLx2.toString();
  elStyle.width = uLx3.toString();
  elStyle.left = '0';
  elStyle.top = ((windowInnerHeight - uLx2) / 2).toString();
}
export function styleRightArrow(elStyle: CSSStyleDeclaration, windowInnerHeight: number, uLx2: number, uLx3: number): void {
  elStyle.position = 'fixed';
  elStyle.height = uLx2.toString();
  elStyle.width = uLx3.toString();
  elStyle.right = '0';
  elStyle.top = ((windowInnerHeight - uLx2) / 2).toString();
}
export function styleDownArrowShutter(elStyle: CSSStyleDeclaration, windowInnerWidth: number, uLx2: number, uLx3: number): void {
  elStyle.position = 'fixed';
  elStyle.width = uLx3.toString();
  elStyle.height = uLx2.toString();
  elStyle.bottom = '0';
  elStyle.left = ((windowInnerWidth - uLx3) / 2).toString();
}
export function styleDownArrowContent(elStyle: CSSStyleDeclaration, windowInnerWidth: number, uLx2: number, uLx3: number): void {
  elStyle.position = 'fixed';
  elStyle.width = uLx3.toString();
  elStyle.height = uLx2.toString();
  elStyle.top = (uLx3 / 2).toString();
  elStyle.left = ((windowInnerWidth - uLx3) / 2).toString();
  elStyle.zIndex = '2';
}
export function styleGridButton(elStyle: CSSStyleDeclaration, windowInnerHeight: number, uLx3: number): void {
  elStyle.position = 'fixed';
  const uLx3String = uLx3.toString();
  elStyle.width = uLx3String;
  elStyle.height = uLx3String;
  elStyle.right = '0';
  elStyle.top = ((windowInnerHeight + uLx3) / 2).toString();
}
export function styleWorkWrapperButton(elStyle: CSSStyleDeclaration, uLx2String: string, uLd2String: string, topOffset: string): void {
  elStyle.width = uLx2String;
  elStyle.height = uLx2String;
  elStyle.paddingTop = uLd2String;
  elStyle.position = 'absolute';
  elStyle.top = topOffset;
}
export function styleRightOffset(elStyle: CSSStyleDeclaration, uLd2String: string, rightOffset: string) {
  elStyle.right = rightOffset;
  elStyle.paddingRight = uLd2String;
}
export function styleLeftOffset(elStyle: CSSStyleDeclaration, uLd2String: string, leftOffset: string) {
  elStyle.left = leftOffset;
  elStyle.paddingLeft = uLd2String;
}
export function styleRedoOffset(elStyle: CSSStyleDeclaration, uLd2String: string, rightOffset: string) {
  elStyle.right = rightOffset;
  elStyle.paddingLeft = uLd2String;
}
