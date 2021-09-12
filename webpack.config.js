const path = require('path');

module.exports = {
  mode : "development",
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  // Use externals so Pixi3D dev branch can be used.
  externals: {
    "pixi.js": "PIXI",
    "pixi3d": "PIXI3D"
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'game.js',
    path: path.resolve(__dirname, 'public'),
  },
};
