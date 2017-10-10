/* WRITE FOR UNIT LENGTH AS PERENTAGE OF WIDTH N HIGHT aka uLdw & uLdh */

export function styleLeftArrow(elStyle: CSSStyleDeclaration,
  uLdwx3: string, uLdhx2: string, uLdhOffset: string): void {
  elStyle.position = 'fixed';
  elStyle.width = uLdwx3;
  elStyle.height = uLdhx2;
  elStyle.left = '0';
  elStyle.top = uLdhOffset;
}
export function styleDownArrowShutter(elStyle: CSSStyleDeclaration,
  uLdwx3: string, uLdhx2: string, uLdwOffset: string): void {
  elStyle.position = 'fixed';
  elStyle.width = uLdwx3;
  elStyle.height = uLdhx2;
  elStyle.bottom = '0';
  elStyle.left = uLdwOffset;
}
export function styleRightArrow(elStyle: CSSStyleDeclaration,
  uLdwx3: string, uLdhx2: string, uLdhOffset: string): void {
  elStyle.position = 'fixed';
  elStyle.width = uLdwx3;
  elStyle.height = uLdhx2;
  elStyle.right = '0';
  elStyle.top = uLdhOffset;
}
export function styleDownArrowContent(elStyle: CSSStyleDeclaration,
  uLdwx3: string, uLdhx2: string, uLdhx3: string, uLdwOffset: string): void {
  elStyle.position = 'fixed';
  elStyle.width = uLdwx3;
  elStyle.height = uLdhx2;
  elStyle.top = uLdhx3;
  elStyle.left = uLdwOffset;
  elStyle.zIndex = '2';
}
export function styleGridButton(elStyle: CSSStyleDeclaration,
  uLdwx3: string, uLdhx3: string, uLdhOffset: string): void {
  elStyle.position = 'fixed';
  elStyle.width = uLdwx3;
  elStyle.height = uLdhx3;
  elStyle.right = '0';
  elStyle.top = uLdhOffset;
}
export function styleWorkWrapperButton(elStyle: CSSStyleDeclaration,
  uLdwx2: string, uLdhx2: string, uLd2h: string, topOffset: string): void {
  elStyle.width = uLdwx2;
  elStyle.height = uLdhx2;
  elStyle.paddingTop = uLd2h;
  elStyle.position = 'absolute';
  elStyle.top = topOffset;
}
export function styleRightOffset(elStyle: CSSStyleDeclaration,
  uLd2w: string, rightOffset: string) {
  elStyle.right = rightOffset;
  elStyle.paddingRight = uLd2w;
}export function styleLeftOffset(elStyle: CSSStyleDeclaration,
  uLd2w: string, leftOffset: string) {
  elStyle.left = leftOffset;
  elStyle.paddingLeft = uLd2w;
}
export function styleRedoOffset(elStyle: CSSStyleDeclaration,
  uLd2w: string, rightOffset: string) {
  elStyle.right = rightOffset;
  elStyle.paddingLeft = uLd2w;
}
