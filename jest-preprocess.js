// const babelOptions = {
//   presets: ["babel-preset-gatsby"]
// };

// module.exports = require("babel-jest").createTransformer(babelOptions);
const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-typescript"]
};

module.exports = require("babel-jest").createTransformer(babelOptions);
