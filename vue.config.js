module.exports = {
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8011/api', // 目标服务器地址
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' // 将 /api 替换为空字符串
        }
      }
    },
    client: {
      webSocketURL: 'ws://localhost:80/ws',
    },
    allowedHosts: 'all',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }
}
