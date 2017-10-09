export function generateSvgHighlightBar (wView: number, unitLength: number): SVGElement {
  const hTotal = unitLength * 2.5;

  const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const setSvgElAttr = svgEl.setAttributeNS.bind(svgEl);
  const svgElStyle = svgEl.style;
  setSvgElAttr(null, 'width', wView.toString());
  setSvgElAttr(null, 'height', hTotal.toString());
  setSvgElAttr(null, 'viewBox', '0 0 ' + wView + ' ' + hTotal);
  svgElStyle.position = 'fixed';
  svgElStyle.bottom = '0';
  svgElStyle.left = '0';
  svgElStyle.pointerEvents = 'none';
  svgElStyle.zIndex = '2';

  const defs = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'defs'));
  const opacityGradient = defs.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient'));
  const setOpGradAttr = opacityGradient.setAttributeNS.bind(opacityGradient);
  setOpGradAttr(null, 'id', 'opacityGradient');
  setOpGradAttr(null, 'x1', '0');
  setOpGradAttr(null, 'x2', '0');
  setOpGradAttr(null, 'y1', '0');
  setOpGradAttr(null, 'y2', '1');
  const stop0 = opacityGradient.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'stop'));
  const setStop0Attr = stop0.setAttributeNS.bind(stop0);
  setStop0Attr(null, 'offset', '0%');
  setStop0Attr(null, 'stop-opacity', '0');
  const stopPoint5 = opacityGradient.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'stop'));
  const setStopPoint5Attr = stopPoint5.setAttributeNS.bind(stopPoint5);
  setStopPoint5Attr(null, 'offset', '75%');
  setStopPoint5Attr(null, 'stop-opacity', '0.3');
  const stop1 = opacityGradient.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'stop'));
  const setStop1Attr = stop1.setAttributeNS.bind(stop1);
  setStop1Attr(null, 'offset', '100%');
  setStop1Attr(null, 'stop-opacity', '0.6');

  const g = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
  const bar = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
  const setBarAttr = bar.setAttributeNS.bind(bar);
  setBarAttr(null, 'x', '0');
  setBarAttr(null, 'y', '0');
  setBarAttr(null, 'width', wView.toString());
  setBarAttr(null, 'height', hTotal.toString());
  setBarAttr(null, 'fill', 'url(#opacityGradient');

  return svgEl;
}
