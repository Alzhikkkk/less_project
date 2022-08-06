const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const path = require('path');
const Dotenv = require("dotenv-webpack");

module.exports = {
  mode: 'development',
    devServer:{
        static:{
           directory: path.join(__dirname, '')
        },
        compress:true,
        port: 3005
     },
    entry: ["./less/all.less"],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
          { // a loader loads file with matching extension no matter
            // if it is listed in entry: or imported inside js
            test: /\.less$/i,
                use: [ MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ],
          },
        ],
      },
      optimization: {
        minimize: true,
        minimizer: [
          // Для webpack @ 5 вы можете использовать синтаксис `...` для расширения существующих минимизаторов (например, `terser-webpack-plugin`), раскомментируйте следующую строку
          // `...`,
          new CssMinimizerPlugin(),
        ],
      },
      plugins: [new MiniCssExtractPlugin({
        filename: 'all.less',
        chunkFilename: 'all.less'}),
        new Dotenv(),
    ]
}