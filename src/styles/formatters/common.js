/** common.js */

const explodeValue = (cssValue) => {
  /**
   * Parses a CSS string and extracts value and unit, so math
   * functions can be run on the value only, without the unit
   * Examples:
   *  explodeValue("24px") => ["24", "px"]
   *  explodeValue("50%") => ["50", "%"]
   *  explodeValue("4.5em") => ["4.5", "em"]
   *  explodeValue("18") => ["18", ""]
   */

  const [, value, unit] = cssValue.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
  return [value, unit];
};

module.exports = {
  /**
   * Multiples an integer based CSS value.
   * @param  {String} cssValue Starting CSS value including unit.
   * @param  {Number} ...args Unlimited multipliers.
   * @return {String} CSS total with unit.
   */
  multiply: (cssValue, ...args) => {
    const [value, unit] = explodeValue(cssValue);
    const reducerMultiply = (a, b) => a * b;
    const result = args.reduce(reducerMultiply, Number(value));
    return result + unit;
  },

  /**
   * Divides an integer based CSS value.
   * @param  {String} cssValue Starting CSS value including unit.
   * @param  {Number} ...args Unlimited diminishers.
   * @return {String} CSS diminished total with unit.
   */
  divide: (cssValue, ...args) => {
    const [value, unit] = explodeValue(cssValue);
    const reducerDivide = (a, b) => a / b;
    const result = args.reduce(reducerDivide, Number(value));
    return result + unit;
  },

  /**
   * Constructs a CSS calc value that scales responsively.
   * Usually used in conjunction with CSS locks where we transition over to
   * fixed font size via a media query to 'lock' the size at that width.
   * @param  {String} min Min font-size, unit optional.
   * @param  {String} max Max font-size, unit optional.
   * @param  {String} transitionWidthUp Starting width where min should be true.
   * @param  {String} transitionWidthDown End width where max should be true.
   * @param  {String} unit Optional unit if min is unitless.
   * @return {String} A responsive calc value that is not limited to font-size...
   */
  respScale: (
    min,
    max,
    transitionWidthUp = "112.5", // 1800px / 16px base font.
    transitionWidthDown = "20", // 320px / 16px base font.
    unit = "em"
  ) => {
    const [minValue, minUnit] = explodeValue(min);
    const [maxValue, maxUnit] = explodeValue(max);
    const fontSizeDiff = maxValue - minValue;
    const widthRemainer = transitionWidthUp - transitionWidthDown;
    if (!minUnit) {
      // console.warn(`No min unit ${min}- ${minUnit} ${max}- ${minUnit}`);
    } else {
      unit = minUnit;
    }
    return `calc(${minValue}${unit} + ${fontSizeDiff} * (100vw - ${transitionWidthDown}${unit}) / (${widthRemainer}))`;
  },
};
