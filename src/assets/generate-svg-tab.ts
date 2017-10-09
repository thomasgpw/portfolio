export function generateSvgTab (wView: number, unitLength: number, uLx2: number): SVGElement {

  // Sizing Variables
  const hTotal = unitLength * 4;

  // SVG Element
  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const setSvgElAttr = svgEl.setAttributeNS.bind(svgEl);
  setSvgElAttr(null, 'width', wView.toString());
  setSvgElAttr(null, 'height', hTotal.toString());
  setSvgElAttr(null, 'viewBox', '0 0 ' + wView + ' ' + hTotal);
  const svgElStyle = svgEl.style;
  svgElStyle.position = 'fixed';
  svgElStyle.top = '0';
  svgElStyle.left = '0';
  svgElStyle.pointerEvents = 'none';

  const g = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));

  const bar = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
  const setBarAttr = bar.setAttributeNS.bind(bar);
  setBarAttr(null, 'x', '0');
  setBarAttr(null, 'y', '0');
  setBarAttr(null, 'width', wView.toString());
  setBarAttr(null, 'height', unitLength.toString());

  const tab = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
  tab.setAttributeNS(null, 'd', generateTabPath(wView, unitLength, uLx2, hTotal));
  return svgEl;
}
function generateTabPath (wView: number, unitLength: number, uLx2: number, hTotal: number): string {
  const quarterCircleBezierOffset = hTotal * (Math.sqrt(2) - 1) / 3;
  return 'M ' + ((wView - (unitLength * 6)) / 2) + ',' + unitLength +
    ' a ' + unitLength + ',' + unitLength + ' 0 0 1 ' + unitLength + ',' + unitLength +
    ' l 0,' + unitLength +
    ' c 0,' + quarterCircleBezierOffset + ' ' + (unitLength - quarterCircleBezierOffset) + ',' + unitLength +
      ' ' + unitLength + ',' + unitLength +
    ' l ' + unitLength * 2 + ',0' +
    ' c ' + -quarterCircleBezierOffset + ',0 ' + unitLength + ',' + (unitLength - quarterCircleBezierOffset) +
      ' ' + unitLength + ',' + -unitLength +
    ' l 0,' + -unitLength +
    ' a ' + unitLength + ',' + unitLength + ' 0 0 1 ' + unitLength + ',' + -unitLength +
    ' l ' + '0,' + -unitLength +
    ' l ' + unitLength * -5 + ',0' +
    ' l ' + '0,' + unitLength * 0.9 +
    ' z';
}
