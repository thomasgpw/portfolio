export function styleDownArrow(elStyle: CSSStyleDeclaration, parentStyle: CSSStyleDeclaration,
  uLdwx3: string, uLdhx2: string, uLdwOffset: string): void {
  elStyle.width = '100%';
  elStyle.height = '100%';
  parentStyle.left = uLdwOffset;
  parentStyle.width = uLdwx3;
  parentStyle.height = uLdhx2;
}
export function styleLeftArrow(elStyle: CSSStyleDeclaration,
  uLdwx3: string, uLdhx2: string, uLdhOffset: string): void {
  elStyle.position = 'fixed';
  elStyle.width = uLdwx3;
  elStyle.height = uLdhx2;
  elStyle.left = '0';
  elStyle.top = uLdhOffset;
}
export function styleRightArrow(elStyle: CSSStyleDeclaration,
  uLdwx3: string, uLdhx2: string, uLdhOffset: string): void {
  elStyle.position = 'fixed';
  elStyle.width = uLdwx3;
  elStyle.height = uLdhx2;
  elStyle.right = '0';
  elStyle.top = uLdhOffset;
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
  elStyle.marginTop = uLd2h;
  elStyle.position = 'absolute';
  elStyle.top = topOffset;
}
export function styleRightOffset(elStyle: CSSStyleDeclaration,
  uLd2w: string, rightOffset: string) {
  elStyle.right = rightOffset;
  elStyle.marginRight = uLd2w;
}export function styleLeftOffset(elStyle: CSSStyleDeclaration,
  uLd2w: string, leftOffset: string) {
  elStyle.left = leftOffset;
  elStyle.marginLeft = uLd2w;
}
export function styleRedoOffset(elStyle: CSSStyleDeclaration,
  uLd2w: string, rightOffset: string) {
  elStyle.right = rightOffset;
  elStyle.marginLeft = uLd2w;
}
