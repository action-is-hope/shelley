const { StylableWebpackPlugin } = require("@stylable/webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

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
          transpileOnly: true
        }
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: "asset"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new StylableWebpackPlugin({
      optimize: {
        // removeUnusedComponents: true,
        // removeComments: true,
        // removeStylableDirectives: true,
        // classNameOptimizations: false,
        // Required until https://github.com/wix/stylable/issues/1870
        shortNamespaces: false
        // minify: true
      }
    }),
    new HtmlWebpackPlugin({ title: "Stylable App" })
  ],
  cache: { type: "filesystem" }
};
