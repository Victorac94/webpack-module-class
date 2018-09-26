// Aquí tenemos que importar y exportar con la sintaxis de Node.js
const path = require("path"); // Path ya viene con Node.js
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  devtool: "cheap-module-source-map", /* de este devtool hemos quitado el -eval- */
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    chunkFilename: "[id].js",
    publicPath: ''
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1, /* Esto indica que hemos cargado un loader (postcss-loader) antes que css-loader. Solo es necesario ponerlo para 'css-loader'. Más info en clase 368*/
              modules: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }, /* es importante ponerlos en este orden pues webpack lee los loaders (el array) desde el
                final al principio (o sea, de abajo a arriba). Necesita leer primero el 'css-loader'
                antes del 'style-loader' para que funcionen los import de css y no lanze un error. */
          {
            loader: 'postcss-loader', /* Esto es para el autoprefixer para que funcionen bien el css en diferentes browsers. Más info en clase 368*/
            options: {
              ident: 'postcss',
              plugins: () => [
                autoprefixer({
                  browsers: [
                    "> 1%",
                    "last 2 versions"
                  ]
                })
              ]
            }
          }
        ]
      },
      {
        /* Más info en clase 369 */
        test: /\.(png|jpe?g|gif)$/,
        loader: 'url-loader?limit=8000&images/[name].[ext]'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body"
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
};

/*
  module.rules.loader se usa para seleccionar un único loader, si queremos poner varios loaders o
  configurar uno a nuestro gusto es mejor usar '.use' en vez de '.loader'
*/
