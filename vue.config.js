module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'https://scmediapcdev.smartcinema.com.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/api': ''
                }
            },
            '/mock': {
                target: 'https://www.easy-mock.com/mock/5bcacf3d73057966af1d630d/car',
                changeOrigin: true,
                pathRewrite: {
                    '/mock': ''
                }
            }
        },
        port: 8089
    }

}