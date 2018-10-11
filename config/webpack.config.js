/* global process, __dirname, module */
const postcssConfig = './config/postcss/postcss.config.js';
/* const px2rem = require('postcss-px2rem');
const postcss = require('postcss') */
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const projectDir = path.resolve(`${__dirname}/..`);
const webpack = require('webpack');

const isDev = process.env.NODE_ENV !== 'production';
const prod = process.env.NODE_ENV === 'production';
const isBrowserSync = process.env.browsersync === 'true';
/**
 *  Settings chapter
 */

const additionalPlugins = [];

/**
 * UglifyJS only in prod mode
 */
if (prod) {
    /*additionalPlugins.push(
        new UglifyJSPlugin({
            test: /\.js($|\?)/i,
            parallel: true,
            sourceMap: isDev,
            uglifyOptions: {
                mangle: true
            }
        }));*/
}

// Set a random Public URL to share your website with anyone
// Or you can use a custom URL "http://mysuperwebsite.localtunnel.me"
// const tunnel = 'mysuperwebsite';
const tunnel = false;

/**
 * Browsercync only if needed
 */
if (isBrowserSync) {
    additionalPlugins.push(
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 8288,
            proxy: 'http://localhost:3000/',
            ghostMode: { // Disable interaction features between different browsers
                clicks: false,
                forms: false,
                scroll: false
            },
            tunnel,
        }, {
            // prevent BrowserSync from reloading the page
            // and let Webpack Dev Server take care of this
            reload: false
        })
    );
}

console.log('NODE_ENV:', process.env.NODE_ENV);
const config = {
    context: projectDir + '/src',
    // 左边是chuncks名称，右边是入口地址
    entry: {
        'index': './js/index.js',
        'xiangqingye': './js/index.js',
        'weixinpay': './js/weixinpay.js',
        'weixincg': './js/weixinpay.js',
        'zhifubaopay': './js/zhifubaopay.js',
        'zhifubaocg': './js/zhifubaopay.js',
    },
    output: {
        filename: isDev ? '[name].js' : '[name].js',
        path: path.resolve(projectDir, 'build'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: [{ loader: 'babel-loader', options: { cacheDirectory: true } }],
                exclude: /node_modules(?!\/webpack-dev-server)/,
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: isDev,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: { path: postcssConfig },
                                sourceMap: isDev,
                            }
                        }
                    ],
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                importLoaders: 1,
                                sourceMap: isDev
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                config: {
                                    path: postcssConfig,
                                },
                                sourceMap: isDev ? 'inline' : false
                               
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: isDev
                               
                            },

                        }
                    ],
                })
            },
/*            {
                test: /\.(png|jpeg|jpg|gif|woff|woff2|eot|otf|ttf|svg)$/,
                use: 'file-loader?name=assets/[name].[ext]',
            },*/
            // 以下图片loader和上面注释功能一样 但是更灵活指定现网后台地址
            // 此外 打包后 还另外保存了 所有图片，目录结构为 assets/img, 未被转为为base64格式的图片则按要求存放在指定目录了
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 51200, //base64格式限制最大时候进行转换
                   /* name: 'assets/[name].[ext]'*/
                   name:'./defaultSite/images/a/320x480/activity/930/assets/[name].[ext]' //线上正式地址
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            }
        ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build'),
        compress: true,
        port: 3000,
        // 开发环境跨域问题https://blog.csdn.net/qq_39083004/article/details/80860675
        proxy: {
            '**': {
                target:'https://api.douban.com',
                changeOrigin: true,
                secure: false,
            }
        },
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production') // default value if not specified
            }
        }),
        new ExtractTextPlugin('[name].css'),
        new CleanWebpackPlugin(['build/'], {
            root: projectDir
        }), // avoid Duplicated CSS files with different hash

        // YOUR PROJECT PAGES 每页对应的html和js入口
        new HtmlWebpackPlugin({
            chunks: ['index'],
            template: './index.html',
            filename: 'index.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['xiangqingye'],
            template: './xiangqingye.html',
            filename: 'xiangqingye.html'
        }
        ),
        new HtmlWebpackPlugin({
            chunks: ['weixinpay'],
            template: './weixinpay.html',
            filename: 'weixinpay.html'
        }
        ),
        new HtmlWebpackPlugin({
             chunks: ['zhifubaopay'],
             template: './zhifubaopay.html',
             filename: 'zhifubaopay.html'
            }
        ),
        new HtmlWebpackPlugin({
            chunks: ['weixincg'],
            template: './weixincg.html',
            filename: 'weixincg.html'
        }
        ),
        new HtmlWebpackPlugin({
            chunks: ['zhifubaocg'],
            template: './zhifubaocg.html',
            filename: 'zhifubaocg.html'
            }
        ),
        new LodashModuleReplacementPlugin,
        new CopyWebpackPlugin([
            {
                'context': '../src',
                /*'to': '',*/ // 打包后图片输出的目标路径
                // 以下图片loader和上面注释功能一样 但是更灵活指定现网后台地址
                // 此外 打包后 还另外保存了 所有图片，目录结构为 assets/img, 未被转为为base64格式的图片则按要求存放在指定目录了
                'to':'./defaultSite/images/a/320x480/activity/930/assets',
                'from': {
                    'glob': 'assets/img/**/*',
                    'dot': true
                }
            },
        ], {
            'ignore': [
                '.gitkeep'
            ],
            'debug': 'warning'
        }),
        ...additionalPlugins
    ],

};

module.exports = config;
