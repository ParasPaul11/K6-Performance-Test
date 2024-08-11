const path = require('path');

module.exports = {
  mode: 'none',
  entry: './src/test.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget: 'commonjs2', // Ensures exports are compatible with CommonJS
  },
  target: 'node', // Target Node.js environment
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  externals: /k6(\/.*)?/, // Exclude K6 imports from bundling
};
