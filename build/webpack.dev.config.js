const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '..');
const PORT = 8083;

module.exports = {
  target: 'web',
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  entry: {
    index: [path.resolve(ROOT_PATH, 'src/main.tsx')]
  },
  output: {
    filename: 'js/[name]-[contenthash].js',
    chunkFilename: 'js/[name]-[contenthash].js',
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.resolve(ROOT_PATH, 'src')
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css', '.less']
  },
  devServer: {
    contentBase: './dist'
  },
  devServer: {
    historyApiFallback: true, // 在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    host: '127.0.0.1',
    hot: true,
    port: PORT,
    inline: true, // 设置为true，当源文件改变时会自动刷新页面
    progress: true,
    open: true,
    disableHostCheck: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [
    // 进度条
    new ProgressBarPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} (:elapsed s)`
    }),
    new HtmlWebpackPlugin({
      title: 'Syreo',
      filename: 'index.html',
      hash: true,
      favicon: path.resolve(ROOT_PATH, 'public/logo_artist.ico'),
      template: path.resolve(ROOT_PATH, 'public/index.html'),
      inject: true,
      myStaticPath: '/'
    })
  ],
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        },
        exclude: /node_modules/,
        include: path.resolve(ROOT_PATH, 'src')
      },
      {
        test: /\.scss/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader', options: { sourceMap: true } },
          { loader: 'postcss-loader', options: { sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        type: 'asset/resource'
      }
    ]
  }
};
