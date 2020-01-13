const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const config= require('./config.json');

var resources = config.Tasks;
var mode = process.env.NODE_ENV || 'development';

module.exports = {
	performance: {
    	hints: false
  	},
    watch: true,
   entry: 
        resources
    ,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
    },

  module: {
       rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/react']
        }
      }
    ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      },
           {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: 'css/',
             
            },
          },
          'css-loader',
          'sass-loader',
        ],
      },
	   {
        test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              publicPath: '../assets/font/',
              outputPath: 'assets/font/'
            }
          }
        ]
      }, 
	   {
        test: /\.(png|jp(e*)g|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
				name: '[name].[ext]',
				limit: 8000,
				publicPath: '../assets/images/',
				outputPath: 'assets/images/'
            }
          }
        ]
      },

    ]
    },
   plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
   new HtmlWebPackPlugin({
	  hash: true,
      template: "./src/index.html",
      filename: "./index.html"
    }),
   new CopyPlugin([
      {
        from: 'src/assets/images',
        to: 'assets/images',
      },
    ]),
  ]
};
