// const {resolve} = require('path');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // laoder de html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // loader de css

module.exports = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    resolve:{
        extensions: ['.js', '.jsx'],
    },
    mode: 'development',
    module:{
        rules:[
            {
                test: /\.(js|jsx)$/,// regla para identificar los archivos que se van a transpilar
                exclude: /node_modules/,
                use:
                {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.html$/, // regla para identificar los archivos html
                use:[
                    { loader: 'html-loader'}
                ]
            },
            {
                // test: /\.s[ac]ss$/, // tambien se puede usar esta regla para identificar los archivos css y sass
                test: /\.css|scss|sass$/, // regla para identificar los archivos css
                use:[
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: './index.html'
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            // ignoreOrder: false
        })
    ],
    devServer:{
        // contentBase: path.join(__dirname, 'dist'),
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        compress: true,
        port: 3006
    }
}