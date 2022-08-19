// const {resolve} = require('path');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // laoder de html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // loader de css
//------------- optimizadores
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // minimizador de css
const TerserPlugin = require('terser-webpack-plugin'); // minimizador de js
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // limpiador de dist
//------------- optimizadores
module.exports = {
    entry: './src/index.js',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: "/", // para que el router funcione correctamente
    },
    resolve:{
        extensions: ['.js', '.jsx'],
        alias:{
            '@components': path.resolve(__dirname, 'src/components/'), // alias para los componentes
            '@styles': path.resolve(__dirname, 'src/styles/'), // alias para los estilos
        }
    },
    mode: 'production',
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
        }),
        new CleanWebpackPlugin(),
    ],
    optimization:{
        minimize: true,
        minimizer:[
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ]
    }
}