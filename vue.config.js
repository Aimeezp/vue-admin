module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://101.34.215.29:9000', // 对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': '',
                },
            },
        },
    },
    publicPath: './',
}