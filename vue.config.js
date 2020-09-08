module.exports = {
    baseUrl: './',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api':{
                target:'http://192.168.3.11:8888',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}
