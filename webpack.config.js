import webpack from 'webpack'
import path from 'path'

export default {
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, './bin'),
    publicPath: './bin',
    filename: 'server.js',
  },
  resolve: {
    extensions: ['', '.js'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      __DEV__: false,
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false,
      },
    }),
  ],
  externals: [
  ],
  target: 'node',
}
