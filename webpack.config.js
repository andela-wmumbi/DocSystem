import webpack from 'webpack';
import path from 'path';

export default {
  debug: true,
  devtool: 'inline-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', // note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'client/index')
  ],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'client'),
  },
  plugins: [
    // replace modules without having to do a full brower refresh
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()// keep errors from breaking our hotreloading experieince
  ],
  module: {
    loaders: [
      { test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['babel'], exclude: /node_modules/ },
      { test: /(\.css)$/, loaders: ['style', 'css'] },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file?name=public/fonts/[name].[ext]' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file' }
    ],
  },
};
