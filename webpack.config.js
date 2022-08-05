const path = require('path'); // path ya esta isntalada en node
const HtmlWebpackPlugin = require('html-webpack-plugin'); // plugin para generar el index.html
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // plugin para extraer el css a un archivo aparte
const CopyPlugin = require('copy-webpack-plugin'); // plugin para copiar archivos
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin'); // plugin para
const TerserPlugin = require('terser-webpack-plugin'); // plugin para minimizar el css y el js
const Dotenv =require('dotenv-webpack'); // plugin para leer variables de entorno
const CleanWebpackPlugin = require('clean-webpack-plugin'); // plugin para borrar el output anterior

module.exports={ // exportamos un objeto con las configuraciones
    entry: './src/index.js', //punto de entrada de nuestro proyecto
    output: { // configuraciones de salida
        path: path.resolve(__dirname, 'dist'), // ruta de salida
        filename: '[name].[contenthash].js', // nombre del archivo de salida
        assetModuleFilename: 'assets/images/[hash][ext][query]' // nombre del archivo de salida de las imagenes
    },
    resolve:{ // configuraciones de resolucion de dependencias
        extensions: ['.js', '.jsx'], // extensiones que podemos usar
        alias: { // alias para las dependencias
            '@utils': path.resolve(__dirname, 'src/utils/'), // alias para la carpeta utils
            '@templates': path.resolve(__dirname, 'src/templates/'), // alias para la carpeta utils
            '@images': path.resolve(__dirname, 'src/assets/images/'), // alias para la carpeta utils
            '@styles': path.resolve(__dirname, 'src/styles/'), // alias para la carpeta utils
        }
    },
    module: { // configuraciones de modulos
        rules:[ // configuraciones de reglas
            {
                test: /\.m?js$/, // expresion regular para buscar archivos js y modulos
                exclude: /node_modules/, // excluimos los archivos de node_modules
                use: {
                    loader: 'babel-loader', // cargador de babel
                }
            },
            {
                test: /\.css$/i, // expresion regular para buscar archivos css
                use:[
                    MiniCssExtractPlugin.loader, // cargador de css
                    'css-loader', // cargador de css
                ],
            },
            {
                test: /\.png$/, // expresion regular para buscar archivos png
                type: 'asset/resource' // tipo de archivo
            },
            {
                test: /\.(woff|woff2)$/, // expresion regular para buscar archivos woff
                use: { // cargador de woff
                    loader: 'url-loader', // cargador de url
                    options: { // opciones del cargador de url
                        limit: 10000, // limite de archivos a cargar
                        mimetype: 'application/font-woff', // tipo de archivo
                        name: "[name].[contenthash].[ext]", // nombre del archivo de salida
                        outputPath: "./assets/fonts", // ruta de salida del archivo
                        publicPath: "./assets/fonts", // ruta de salida del archivo de salida
                        esModule: false, // modulo de babel 
                    },
                }
            }
        ]
    },
    plugins: [ // configuraciones de plugins
        new HtmlWebpackPlugin({ // plugin para generar un html
            inject: true, // injectar codigo js en el html
            template: './public/index.html', // plantilla del html
            filename:'./index.html' // nombre del archivo de salida
            
        }),
        new MiniCssExtractPlugin(), // plugin para extraer el css a un archivo aparte
        new CopyPlugin({ // plugin para copiar archivos
            patterns:[ // configuraciones de copia
                {
                    from: path.resolve(__dirname, "src", "assets/images"),  // ruta de origen
                    to: "assets/images" // ruta de destino
                }
            ]
        }),
        new Dotenv(), // plugin para leer variables de entorno
        new CleanWebpackPlugin(), // plugin para borrar el output anterior
    ],
    optimization: { // configuraciones de optimizacion
        minimize: true, // minimizar el codigo
        minimizer: [ // minimizadores
            new CssMinimizerPlugin(), // minimizador de css
            new TerserPlugin() // minimizador de js
        ]
    }
}