var webpack = require('webpack');
var path = require('path');

var config = {
   entry: './reactMain.jsx',
	
   output: {
      filename: './static/js/reactMain.js',
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            include: /react/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   },
   plugins:[
      new webpack.DefinePlugin({ // <-- key to reducing React's size
         'process.env': {
            'NODE_ENV': JSON.stringify('production')
         }
      }),
      new webpack.optimize.UglifyJsPlugin({
         uglifyOptions:{
            output: {comments: false,beautify: false},
            compress:true
         },
         exclude:/static/,
         test: /\.js?$/
      })
   ]
}

module.exports = config;
