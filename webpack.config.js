const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const isEnvProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.jsx',
  mode: isEnvProduction ? 'production' : 'development',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.jsx', '.js'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 3000,
    compress: true,
    hot: true,
  },
};

if (process.env.ANALYZER === 'true') {
  module.exports.plugins = [new BundleAnalyzerPlugin()];
}
