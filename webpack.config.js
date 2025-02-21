const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // 'production' или 'development'
  entry: './scripts/main.js',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource' // добавит файлы в dist и вернёт URL
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource'
      },
      {
        test: /\.css$/i, // Регулярное выражение для обработки .css файлов
        use: [
          'style-loader', // Вставляет CSS в DOM через <style> теги
          {
            loader: 'css-loader', // Обрабатывает @import и url() в CSS
            options: { importLoaders: 1 } // Указывает, что postcss-loader должен применяться к @import
          },
          'postcss-loader' // Обрабатывает CSS с помощью PostCSS (например, autoprefixer)
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', // исходный HTML-шаблон
      filename: 'index.html'        // имя выходного HTML-файла
    })
  ],

// Понадобится для автоматической пересборки проекта
devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true, // Включает Hot Module Replacement
  }

};
