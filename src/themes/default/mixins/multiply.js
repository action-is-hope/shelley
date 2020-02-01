const parseCssValue = cssValue => {
  // Parses a CSS string and extracts value and unit, so math
  // functions can be run on the value only, without the unit
  // Examples:
  //   parseCssValue("24px") => ["24", "px"]
  //   parseCssValue("50%") => ["50", "%"]
  //   parseCssValue("4.5em") => ["4.5", "em"]
  //   parseCssValue("18") => ["18", ""]
  const [, value, unit] = cssValue.match(/^([+-]?(?:\d+|\d*\.\d+))([a-z]*|%)$/);
  return [value, unit];
};

module.exports = {
  multiply: function (cssValue, ...args) {
    const [value, unit] = parseCssValue(cssValue);
    const reducerMultiply = (a, b) => a * b;
    const result = args.reduce(reducerMultiply, Number(value));
    return result + unit;
  },

  divide: function (cssValue, ...args) {
    const [value, unit] = parseCssValue(cssValue);
    const reducerDivide = (a, b) => a / b;
    const result = args.reduce(reducerDivide, Number(value));
    return result + unit;
  },

  respScale: function (
    min,
    max,
    transitionWidthUp = "112.5", // 1800px / 16px base font.
    transitionWidthDown = "20", // 320px / 16px base font.
    unit = "em" // Sticking with em so that we can adjust text blocks by tweaking the font-size of a container.
  ) {
    const [minValue, minUnit] = parseCssValue(min);
    const [maxValue, maxUnit] = parseCssValue(max);
    const fontSizeDiff = maxValue - minValue;
    const widthRemainer = transitionWidthUp - transitionWidthDown;
    if (!minUnit) {
      console.warn(`No min unit ${min}- ${minUnit} ${max}- ${minUnit}`);
    } else if (minUnit != maxUnit) {
      console.warn(
        `Unit mismatch for respScale args $${min}- ${minUnit} ${max}- ${minUnit}`
      );
    } else {
      unit = minUnit;
    }
    return `calc(${minValue}${unit} + ${fontSizeDiff} * ((100vw - ${transitionWidthDown}${unit}) / (${widthRemainer})))`;
  }
};
