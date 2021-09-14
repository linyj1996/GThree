const path = require('path')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  resolve:{
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool:'source-map',
  mode:'production',
  entry:{
    main:'./src/index.ts'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist'),
    library: {
      name: 'gthree',
      type:'umd'
    }
  },
  module:{
    rules:[
      {
        test: /\.worker\.js$/,
        use: { 
          loader: 'worker-loader',
          options: { 
            inline:'fallback'
           },
        }
      },
      {
        test:/\.tsx?$/,
        use:[
          {
            loader:'ts-loader',
            options:{
              configFile: path.resolve(__dirname, './tsconfig.json')
            }
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpg|gif|eot|svg|ttf|woff|woff2)(\?\S*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            name:'assets/[name]-[hash].[ext]',
            outputPath:"assets/image",
            publicPath:'assets/image',
            limit: 8192
          }
        }
      }
    ]
  },
  plugins:[
    new CleanWebpackPlugin()
  ]
}