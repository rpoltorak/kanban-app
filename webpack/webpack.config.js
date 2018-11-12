require("dotenv").config({ silent: true });

const HTMLWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: [path.resolve("src/index.tsx")],
  },

  output: {
    path: path.resolve("build"),
    filename: "[name].[hash].js",
    chunkFilename: "[name].[chunkhash].js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },

  plugins: [
    new webpack.EnvironmentPlugin(["NODE_ENV"]),
    new HTMLWebpackPlugin({
      template: path.resolve("src/index.html"),
    }),
  ],

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
      { test: /\.css|scss$/, loader: ["style-loader", `css-loader`, `sass-loader`] },
    ],
  },
};
