const Timestamp = new Date().getTime();
const isProduction = process.env.NODE_ENV === 'production';
const port = 5217;
const cdn = {
  css: [],
  js: ['https://cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js', 'https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js','https://cdn.bootcss.com/vuex/3.1.0/vuex.min.js','https://cdn.bootcss.com/axios/0.18.0/axios.min.js']
};
module.exports = {
  devServer: {
    port:port,
    // 设置代理
    proxy: {
      '/api': {
        // target: "", //设置你调用的接口域名和端口号 别忘了加http  
        target: `http://localhost:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '' //这里理解成用‘/api'代替target里面的地址，后面组件中我们掉接口时直接用api代替
          //比如我要调用'http://40.00.100.133:3002/user/login'，直接写‘/api/user/login'即可
        }
      },
    },
    after:require('./mock/mock-server.js')
  },
  chainWebpack: config => { //分割代码,相应的文件中存入分割后的代码
    config.optimization.minimize(true);
    config.optimization.splitChunks({
      chunks: 'all'
    });
    if (isProduction) {
      config.plugin('html')
      .tap(args => {
          args[0].cdn = cdn;
        return args;
      })
    };
  },
  css: {
    extract: true
  },
  publicPath: './', //测试或线上环境请改为对应的路径
  outputDir: undefined,
  assetsDir: undefined,
  runtimeCompiler: undefined,
  productionSourceMap: undefined,
  parallel: undefined,
  configureWebpack:{
    output: { // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
      filename: `[name].${Timestamp}.js`,
      chunkFilename: `[name].${Timestamp}.js`
    },
  },
  // 修改webpack的配置
  configureWebpack:config => {
      if (isProduction) {
        config.externals = {
          'vue': 'Vue',
          'axios': 'axios',
          'vuex': 'Vuex',
          'vue-router': 'VueRouter',
        }
      }
    }
  

};