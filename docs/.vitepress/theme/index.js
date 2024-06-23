import DefaultTheme from 'vitepress/theme'
// import '../styles/index.css' // 自定义样式
import './custom.css'
export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    // 扩展应用程序实例
    // app 是 Vue 3 的应用实例
    // router 是 VitePress 的路由实例
    // siteData 是 VitePress 的站点数据
  }
}
