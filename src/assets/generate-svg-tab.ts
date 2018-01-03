export function generateSvgTab (el: HTMLElement, wView: number, unitLength: number, uLx2: number): SVGElement {
  // Sizing Variables
  const hTotal = unitLength * 4.5;
  const hTotalString = hTotal.toString();
  const wViewString = wView.toString();
  const barHeightString = (unitLength * 1.5).toString();

  el.innerHTML = '';
  // SVG Element
  const svgEl = el.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
  svgEl.classList.add('svg-tab');
  svgEl.classList.add('z-index2');
  const setSvgElAttr = svgEl.setAttributeNS.bind(svgEl);
  setSvgElAttr(null, 'width', wViewString);
  setSvgElAttr(null, 'height', hTotalString);
  setSvgElAttr(null, 'viewBox', '0 0 ' + wView + ' ' + hTotalString);

  const g = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));

  const bar = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
  const setBarAttr = bar.setAttributeNS.bind(bar);
  setBarAttr(null, 'x', '0');
  setBarAttr(null, 'y', '0');
  setBarAttr(null, 'width', wView);
  setBarAttr(null, 'height', barHeightString.toString());

  const tab = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
  tab.setAttributeNS(null, 'd', generateTabPath(wView, unitLength, uLx2, hTotal, barHeightString));
  return svgEl;
}
function generateTabPath (wView: number, unitLength: number, uLx2: number, hTotal: number, barHeightString: string): string {
  const quarterCircleBezierOffset = hTotal * (Math.sqrt(2) - 1) / 3;
  const uLString = unitLength.toString();
  return 'M ' + ((wView - (unitLength * 6)) / 2) + ',' + barHeightString +
    ' a ' + uLString + ',' + uLString + ' 0 0 1 ' + uLString + ',' + uLString +
    ' l 0,' + uLString +
    ' c 0,' + quarterCircleBezierOffset + ' ' + (unitLength - quarterCircleBezierOffset) + ',' + uLString +
      ' ' + uLString + ',' + uLString +
    ' l ' + unitLength * 2 + ',0' +
    ' c ' + -quarterCircleBezierOffset + ',0 ' + uLString + ',' + (unitLength - quarterCircleBezierOffset) +
      ' ' + uLString + ',' + -uLString +
    ' l 0,' + -unitLength +
    ' a ' + uLString + ',' + uLString + ' 0 0 1 ' + uLString + ',' + -unitLength +
    ' l ' + '0,' + -unitLength +
    ' l ' + unitLength * -5 + ',0' +
    ' l ' + '0,' + unitLength * 0.9 +
    ' z';
}
