const fastTSPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const pathPlugin = require('tsconfig-paths-webpack-plugin/lib');
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  entry: {
    'js/app': path.resolve(__dirname, './assets/js/app.ts'),
    style: path.resolve(__dirname, './assets/css/style.scss')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'js/vendor',
          priority: 10,
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                postcssPresetEnv({
                  autoprefixer: { grid: true },
                  browsers: 'last 2 versions'
                })
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: { includePaths: [path.resolve(__dirname, '../css')] }
          }
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'fonts/'
            }
          }
        ]
      },
      {
        test: /\.(svg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'img/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new fastTSPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.ts', '.json'],
    modules: [path.resolve(__dirname, '../js'), 'node_modules'],
    plugins: [
      new pathPlugin({
        configFile: path.resolve(__dirname, './tsconfig.json')
      })
    ]
  }
};
