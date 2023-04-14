// @ts-check
const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: "development",
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset",
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [new StylableWebpackPlugin({ stcConfig: true })],
  cache: { type: "filesystem" },
};
