const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api', {
      target: 'http://42.192.150.24:39118',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    }),
    proxy('/upload/image', {
      target: 'http://42.192.150.24:39118',
      changeOrigin: true
    })
  )
}
