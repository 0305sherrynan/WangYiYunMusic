const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    devServer: {
        // proxy: {
        //     '/zwz': {
        //         target: 'http://localhost:5000/',
        //         pathRewrite: { '^/zwz': '' },
        //         ws: true, //用于支持websocket
        //         changeOrigin: true
        //     },
            // '/foo': {
            //     target: '<other_url>'
            // }
        // }
    }
})
