const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = (env) => {
  const isProd = env.production;

  return {
    entry: './src/index.js',
    output: {
      filename: isProd ? 'bundle.[contenthash].js' : 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
      clean: true,
    },
    devServer: {
      static: './dist',
      open: true,
      port: 8080,
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
        inject: 'body',
        minify: isProd
          ? {
              collapseWhitespace: true,
              removeComments: true,
              removeRedundantAttributes: true,
            }
          : false,
      }),
    ],
    mode: isProd ? 'production' : 'development',
    devtool: isProd ? 'source-map' : 'eval-source-map',
  };
};
