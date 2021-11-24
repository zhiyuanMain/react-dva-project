const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    proxy('/api', {
      // target: 'http://42.192.150.24:39118',
      // target: 'http://39.99.41.238',
      target: 'http://nyj.yl.gov.cn/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }),
    proxy('/upload/image', {
      // target: 'http://42.192.150.24:39118',
      // target: 'http://39.99.41.238',
      target: 'http://nyj.yl.gov.cn/',
      changeOrigin: true
    })
  )
}
