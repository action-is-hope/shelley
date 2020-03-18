/* text.js */

/**
 * Enjoy the background reading, it's smashing if not head messing!
 * https://www.smashingmagazine.com/2016/05/fluid-typography/
 *
 * @todo: ask The peeps over at Wix if there is a way to include a complete solution.
 * including media queries.
 */

const explodeValue = cssValue => {
  // Parses a CSS string and extracts value and unit, so math
  // functions can be run on the value only, without the unit
  // Examples:
  //   explodeValue("24px") => ["24", "px"]
  //   explodeValue("50%") => ["50", "%"]
  //   explodeValue("4.5em") => ["4.5", "em"]
  //   explodeValue("18") => ["18", ""]
  const [, value, unit] = cssValue.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
  return [value, unit];
};

module.exports = function fontSize([
  min,
  max,
  transitionWidthUp = "112.5", // 1800px @ 16px base font.
  transitionWidthDown = "20", // 320px @ 16px base font.
  unit = "em" // Sticking with em so that we can adjust text blocks by tweaking the font-size of a container.
]) {
  const [minValue, minUnit] = explodeValue(min);
  const [maxValue, maxUnit] = explodeValue(max);
  const fontSizeDiff = maxValue - minValue;
  const widthRemainer = transitionWidthUp - transitionWidthDown;
  if (minUnit !== maxUnit) {
    // console.warn(`Unit mismatch for respScale args ${min}, ${max}`);
  } else if (!minUnit) {
    // console.warn(`Unit mismatch for respScale args ${min}, ${max}`);
  } else {
    unit = minUnit;
  }

  return {
    fontSize: `calc(${minValue}${unit} + ${fontSizeDiff} * ((100vw - ${transitionWidthDown}${unit}) / (${widthRemainer})))`
  };
};
