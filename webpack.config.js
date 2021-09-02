const path = require('path')
const webpackCleanPlugin = require('clean-webpack-plugin')
module.exports = {
  resolve:['.js','.ts','.json'],
  devtool:'source-map',
  mode:'production',
  entry:{
    main:'./src/index.ts'
  },
  output:{
    filename:'[name].js',
    path:path.resolve(__dirname,'dist'),
    libraryTarget:'commonjs'
  },
  module:{
    rules:[
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
      }
    ]
  },
  plugins:[
    new webpackCleanPlugin(
      ['dist'],
      {
        root:path.resolve(__dirname),
        verbose:true,
        day:false
      }
    )
  ]
}