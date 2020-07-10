let path = require('path')
const { override, fixBabelImports, addLessLoader, addWebpackModuleRule, addWebpackAlias } = require('customize-cra')
process.env.GENERATE_SOURCEMAP = 'false' // 去掉static文件内的map文件

module.exports = override(

    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        // 自动打包相关的样式 默认为 style:'css'
        // 当为css时，加载的是编译后的css文件，不能使用主题的变化
        // 当为ture时，则加载less文件
        style: true
    }),
    // 配置路径别名
    addWebpackAlias({
        '@': path.join(__dirname, 'src')
    }),
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
    // addLessLoader({
    //     lessOptions: {
    //         // less3.0之后，默认为false，所以需要手动开启
    //         javascriptEnabled: true,
    //         modifyVars: { '@primary-color': '#E92712' }
    //     }
    // })
    addWebpackModuleRule(
        {
            test: /\.less$/,
            use: [
                'style-loader',
                'css-loader',
                {
                    loader: 'less-loader',
                    options: {
                        lessOptions: {
                            // less3.0之后，默认为false，所以需要手动开启
                            javascriptEnabled: true,
                            modifyVars: { '@primary-color': '#5178DF' }
                        }
                    }
                },
                {
                    loader: 'style-resources-loader',
                    options: {
                        patterns: [
                            path.resolve(__dirname, './src/style/global.less')
                        ]
                    }
                }
            ]
        }
    )
)
