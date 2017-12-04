export function programShutterDetails(el: SVGElement, wView: number, hView: number) {
  const wViewString = wView.toString();
  const hViewString = hView.toString();
  const cent = hView / 85;
  const barHeight = cent * 5 / 3;
  const barStrokeWidth = (barHeight / 2).toString();
  const barHeightString = barHeight.toString();
  const slotHeight = cent * 20;
  const topSlotY = (slotHeight + barHeight) * 3;

  const setElAttr = el.setAttributeNS.bind(el, null);
  setElAttr('viewBox', '0,0,' + wViewString + ',' + hViewString);
  // setElAttr('width', wViewString);
  setElAttr('height', hViewString);

  const barEls = el.getElementsByClassName('shutter-bars');
  for (let i = 0; i < barEls.length; i++) {
    const barEl = barEls[i] as HTMLElement;
    const setBarAttr = barEl.setAttributeNS.bind(barEl, null);
    barEl.style.strokeWidth = barStrokeWidth;
    setBarAttr('y', (hView - ((slotHeight * (i + 1)) + (barHeight * i))).toString());
    setBarAttr('height', barHeight);
  }

  const shadowTopEl = el.getElementsByClassName('shadow-top')[0];
  const setShadowTopAttr = shadowTopEl.setAttributeNS.bind(shadowTopEl, null);
  // setShadowTopAttr('width', wViewString);
  setShadowTopAttr('y', '0');
  setShadowTopAttr('height', '20%');

  const shadowBottomEl = el.getElementsByClassName('shadow-bottom')[0];
  const setShadowBottomAttr = shadowBottomEl.setAttributeNS.bind(shadowBottomEl, null);
  // setShadowBottomAttr('width', wViewString);
  setShadowBottomAttr('height', '0');
}
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
export function styleTab(elStyle: CSSStyleDeclaration,
  uLdwx6: string, uLdhx3: string, uLdwx5Offset: string): void {
  elStyle.position = 'fixed';
  // elStyle.width = uLdwx6;
  elStyle.height = uLdhx3;
  elStyle.top = '5%';
  elStyle.left = uLdwx5Offset;
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
