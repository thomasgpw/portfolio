export function generateSvgTab (wView:number, hView:number): SVGSVGElement {
  let unitLength = wView/64;
  let wArrow = unitLength*3;
  let hArrow = unitLength*2;
  let hTotal = unitLength*4;

  let svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgEl.setAttributeNS(null, "width", wView.toString());
  svgEl.setAttributeNS(null, "height", hTotal.toString());
  svgEl.setAttributeNS(null, "viewBox", "0 0 " + wView + " " + hTotal);
  svgEl.style.position = "fixed";
  svgEl.style.top = "0";
  svgEl.style.left = "0";

  let g = svgEl.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'g'));

  let bar = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'rect'));
  bar.setAttributeNS(null, "x", "0");
  bar.setAttributeNS(null, "y", "0");
  bar.setAttributeNS(null, "width", wView.toString());
  bar.setAttributeNS(null, "height", (unitLength).toString());

  let tab = g.appendChild(document.createElementNS('http://www.w3.org/2000/svg', 'path'));
  const quarterCircleBezierOffset = 4*unitLength*(Math.sqrt(2)-1)/3;
  tab.setAttributeNS(null,"d",
  	"M " + ((wView - wArrow)/2).toString() + "," + unitLength.toString() + 
  	" a " + unitLength + "," + unitLength + " 0 0 1 " + unitLength + "," + unitLength +
 	  " l 0," + unitLength +
 	  " c 0," + quarterCircleBezierOffset + " " + (unitLength-quarterCircleBezierOffset) + "," + unitLength + " " + unitLength + "," + unitLength + " " +
 	  " l " + unitLength*2 + ",0" +
 	  " c " + quarterCircleBezierOffset + ",0 " + unitLength + "," + (unitLength-quarterCircleBezierOffset) + " " + unitLength + "," + -(unitLength) +
 	  " l 0," + -(unitLength) +
 	  " a " + unitLength + "," + unitLength + " 0 0 1 " + unitLength + "," + -(unitLength) +
 	  " l " + unitLength*(-5) + ",0" +
 	  " z"
 	 );

  return svgEl;
}