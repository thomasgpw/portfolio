export function generateSvgTab (wView: number, unitLength: number): SVGElement {

  // Sizing Variables
  const wArrow = unitLength * 3;
  const hArrow = unitLength * 2;
  const hTotal = unitLength * 4;

  // SVG Element
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttributeNS(null, 'width', wView.toString());
  svgEl.setAttributeNS(null, 'height', hTotal.toString());
  svgEl.setAttributeNS(null, 'viewBox', '0 0 ' + wView + ' ' + hTotal);
  svgEl.style.position = 'fixed';
  svgEl.style.top = '0';
  svgEl.style.left = '0';

  const g = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));

  const bar = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
  bar.setAttributeNS(null, 'x', '0');
  bar.setAttributeNS(null, 'y', '0');
  bar.setAttributeNS(null, 'width', wView.toString());
  bar.setAttributeNS(null, 'height', unitLength.toString());

  const tab = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
  tab.setAttributeNS(null, 'd', generateTabPath(wView, unitLength));
  return svgEl;
}
function generateTabPath (wView: number, unitLengthY: number): string {
  const unitLengthX = wView / 64;
  const quarterCircleBezierOffsetX = 4 * unitLengthX * (Math.sqrt(2) - 1) / 3;
  const quarterCircleBezierOffsetY = 4 * unitLengthY * (Math.sqrt(2) - 1) / 3;
  return 'M ' + ((wView - (unitLengthX * 6)) / 2) + ',' + unitLengthY +
    ' a ' + unitLengthX + ',' + unitLengthY + ' 0 0 1 ' + unitLengthX + ',' + unitLengthY +
    ' l 0,' + unitLengthY +
    ' c 0,' + quarterCircleBezierOffsetY + ' ' + (unitLengthX - quarterCircleBezierOffsetX) + ',' + unitLengthY +
      ' ' + unitLengthX + ',' + unitLengthY +
    ' l ' + unitLengthX * 2 + ',0' +
    ' c ' + -quarterCircleBezierOffsetX + ',0 ' + unitLengthX + ',' + (unitLengthY - quarterCircleBezierOffsetY) +
      ' ' + unitLengthX + ',' + -unitLengthY +
    ' l 0,' + -unitLengthY +
    ' a ' + unitLengthX + ',' + unitLengthY + ' 0 0 1 ' + unitLengthX + ',' + -unitLengthY +
    ' l ' + '0,' + -unitLengthY +
    ' l ' + unitLengthX * -5 + ',0' +
    ' l ' + '0,' + unitLengthY * 0.9 +
    ' z';
}
