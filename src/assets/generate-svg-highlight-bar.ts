export function generateSvgHighlightBar (el: HTMLElement, wView: number, unitLength: number): SVGElement {
  const hTotalString = (unitLength * 3).toString();

  el.innerHTML = '';
  const svgEl = el.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
  const setSvgElAttr = svgEl.setAttributeNS.bind(svgEl);
  svgEl.classList.add('svg-highlight-bar');
  setSvgElAttr(null, 'width', wView.toString());
  setSvgElAttr(null, 'height', hTotalString);
  setSvgElAttr(null, 'viewBox', '0 0 ' + wView + ' ' + hTotalString);

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
  setStop0Attr(null, 'stop-color', 'white');
  const stopPoint5 = opacityGradient.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'stop'));
  const setStopPoint5Attr = stopPoint5.setAttributeNS.bind(stopPoint5);
  setStopPoint5Attr(null, 'offset', '75%');
  setStopPoint5Attr(null, 'stop-opacity', '0.3');
  setStopPoint5Attr(null, 'stop-color', 'white');
  const stop1 = opacityGradient.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'stop'));
  const setStop1Attr = stop1.setAttributeNS.bind(stop1);
  setStop1Attr(null, 'offset', '100%');
  setStop1Attr(null, 'stop-opacity', '0.6');
  setStop1Attr(null, 'stop-color', 'white');
  const gradientMask = defs.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'mask'));
  gradientMask.setAttributeNS(null, 'id', 'gradientMask');
  const maskRect = gradientMask.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
  const setMaskAttr = maskRect.setAttributeNS.bind(maskRect);
  setMaskAttr(null, 'fill', 'url(#opacityGradient)');
  setMaskAttr(null, 'x', '0');
  setMaskAttr(null, 'y', '0');
  setMaskAttr(null, 'width', wView.toString());
  setMaskAttr(null, 'height', hTotalString);
  const g = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));
  const bar = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
  bar.classList.add('svg-highlight-rect');
  const setBarAttr = bar.setAttributeNS.bind(bar);
  setBarAttr(null, 'x', '0');
  setBarAttr(null, 'y', '0');
  setBarAttr(null, 'width', wView.toString());
  setBarAttr(null, 'height', hTotalString);
  // setBarAttr(null, 'fill', 'black');
  setBarAttr(null, 'mask', 'url(#gradientMask)');

  return svgEl;
}
