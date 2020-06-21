const {override,fixBabelImports,addLessLoader} = require('customize-cra');
console.log(addLessLoader)
module.exports = override(
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        // 自动打包相关的样式 默认为 style:'css'
        // 当为css时，加载的是编译后的css文件，不能使用主题的变化
        // 当为ture时，则加载less文件
        style: true,
    }),
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
    addLessLoader({
        lessOptions: {
            // less3.0之后，默认为false，所以需要手动开启
            javascriptEnabled: true,
            modifyVars:{'@primary-color':'#1DA57A'},
        }
    })
);
