const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const tsImportPluginFactory = require("ts-import-plugin");

module.exports = {
    context: path.resolve(__dirname),
    entry: {
        app: ['./entry/index.tsx']
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: path.resolve(__dirname, 'dist')
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    name: "common",
                    test: /[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    minSize: 30000,   //  注释掉的话也不会打出来
                    minChunks: 1,   //  如果是2的话一个也抽不出来，因为好多只用了一次
                    priority: 8 // 优先级
                }
            },
        },
    },
    plugins: [
        new MiniCssExtractPlugin({      //对css进行打包，webpack4推荐语法
            filename: "[name].css",
            chunkFilename: "[name].css"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(css|scss)$/,
                exclude: /node_modules/,
                use: [
                    'isomorphic-style-loader',
                    {
                        loader: 'typings-for-css-modules-loader',
                        options: {
                            modules: true,
                            namedExport: true
                        }
                    }
                ]
            },
            {
                //  专门处理antd的css样式
                test: /\.(less)$/,
                include: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true
                            }
                        }
                    }
                ],
            },
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                options: {
                  useCache: true,
                  useBabel: false, // !important!
                  getCustomTransformers: () => ({
                    before: [tsImportPluginFactory({
                      libraryName: 'antd',
                      libraryDirectory: 'lib',
                      style: true
                    })]
                  }),
                },
                exclude: [
                    /node_modules/
                ]
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts', '.tsx', '.js', '.json'
        ],
        alias: {
            // "@xxxx/util": path.resolve(__dirname, 'utils'),
            // "@polkadot/react-api": path.resolve(__dirname, "package/react-api/src"),
            // "@polkadot/react-api/*": path.resolve(__dirname, "package/react-api/src/*"),
            // "@polkadot/react-components": path.resolve(__dirname, "package/react-components/src"),
            // "@polkadot/react-components/*": path.resolve(__dirname, "package/react-components/src/*"),
            // "@polkadot/react-hooks": path.resolve(__dirname, "package/react-hooks/src"),
            // "@polkadot/react-hooks/*": path.resolve(__dirname, "package/react-hooks/src/*"),
            "@utils": path.resolve(__dirname, "utils"),
            "@constants": path.resolve(__dirname, "constants")
          },
    },
    mode:"development",
    //mode:"production",
}