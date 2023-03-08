const { attachHook } = require("@stylable/node");
const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");
const path = require("path");

attachHook();

module.exports = {
  webpackFinal: (config) => {
    /* find all css loaders and add exclude .st.css files from them */
    const indexOfCssRules = config.module.rules.findIndex(
      (rule) => rule.test.toString() === "/\\.css$/"
    );

    if (indexOfCssRules != -1) {
      config.module.rules.splice(indexOfCssRules, 1);
    }
    // Add CSS loader back but excluding stylable files.
    config.module.rules.push({
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
      include: path.resolve(__dirname, "../"),
      exclude: /\.st\.css$/,
    });

    /* inject StylableWebpackPlugin */
    config.plugins.push(new StylableWebpackPlugin({ stcConfig: true }));
    return config;
  },
};
