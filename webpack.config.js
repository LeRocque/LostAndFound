const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    filename: './bundle.js',
    publicPath: '/build',
    path: path.resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
    title: 'Development',
    template: 'index.html'
  }),
],
  devServer: {
    static: {
      publicPath: '/',
      directory: path.join(__dirname),
    },
    compress: true,
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  module:{
  rules: [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
          use: {
          loader: 'babel-loader',
          options: {
            presets: [
                ['@babel/preset-env', {targets: 'defaults'}], 
                ['@babel/preset-react', {targets: 'defaults'}]
            ]
        }
    }
  },
  {
    test: /s?css$/,
    exclude: /node-modules/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  }
  ]
  },
resolve: {
  extensions: ['', '.js', '.jsx', '.scss']
}
}

