export function generateSvgHighlightBar (wView: number, unitLength: number): SVGElement {
  const hTotal = unitLength * 4;

  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttributeNS(null, 'width', wView.toString());
  svgEl.setAttributeNS(null, 'height', hTotal.toString());
  svgEl.setAttributeNS(null, 'viewBox', '0 0 ' + wView + ' ' + hTotal);
  svgEl.style.position = 'fixed';
  svgEl.style.bottom = '0';
  svgEl.style.left = '0';

  const defs = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
  const opacityGradient = defs.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient'));
  opacityGradient.setAttributeNS(null, 'id', 'opacityGradient');
  const stop0 = opacityGradient.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'stop'));
  stop0.setAttributeNS(null, 'offset', '0%');
  stop0.setAttributeNS(null, 'stop-opacity', '1');
  const stop1 = opacityGradient.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'stop'));
  stop1.setAttributeNS(null, 'offset', '100%');
  stop1.setAttributeNS(null, 'stop-opacity', '0');

  const g = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
  const bar = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
  bar.setAttributeNS(null, 'x', '0');
  bar.setAttributeNS(null, 'y', '0');
  bar.setAttributeNS(null, 'width', wView.toString());
  bar.setAttributeNS(null, 'height', hTotal.toString());
  bar.setAttributeNS(null, 'fill', 'url(#opacityGradient');

  return svgEl;
}
