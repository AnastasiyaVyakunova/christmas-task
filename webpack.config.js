const path = require('path');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");

const baseConfig = {
  entry: path.resolve(__dirname, './src/index.ts'),
  mode: 'development',
  module: {
    rules: [
      { test: /\.css$/i, use: ['style-loader', 'css-loader'] },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.js$/, loader: 'source-map-loader' },
      {
        test: /\.(png|svg|jpg|jpeg|gif|mp3)$/i,
        type: 'asset/resource',
        generator : {
          filename : 'assets/[hash:8][ext]',
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(),
    new CopyPlugin({
      patterns: [
      {
        from: path.resolve(__dirname, './src/assets/favicon.ico'),
        to: path.resolve(__dirname, '../dist')
      },
      {
        from: path.resolve(__dirname, './src/data.json'),
        to: path.resolve(__dirname, '../dist')
      },
      {
        from: path.resolve(__dirname, './src/assets/toys'),
        to: path.resolve(__dirname, '../dist/assets/toys')
      },
      {
        from: path.resolve(__dirname, './src/assets/tree'),
        to: path.resolve(__dirname, '../dist/assets/tree')
      },
      {
        from: path.resolve(__dirname, './src/assets/bg'),
        to: path.resolve(__dirname, '../dist/assets/bg')
      },
      {
        from: path.resolve(__dirname, './src/assets/audio'),
        to: path.resolve(__dirname, '../dist/assets/audio')
      }
      ]
    }),
    
  ],
};

module.exports = ({ mode }) => {
  const isProductionMode = mode === 'prod';
  const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

  return merge(baseConfig, envConfig);
};