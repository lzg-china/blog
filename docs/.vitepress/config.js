// const shiki = require('shiki');
// const MarkdownItShiki = require('markdown-it-shiki');
module.exports = {
    title: '国哥讲全栈',
    base:'/blog/',
    description: '由 VitePress 驱动的博客',
    themeConfig: {
      nav: [
        // { text: '主页', link: '/' },
        { text: '人工-专高6', link: '/guide/' },
        { text: '关于', link: '/about' }
        // { text: '联系', link: '/contact' }
      ],
      sidebar: {
        '/guide/': [
          {
            // text: '指南',
            items: [
              // { text: '介绍', link: '/guide/' },
              { text: '1.手写代码', link: '/guide/getting-started' },
              { text: '2.Vue3', link: '/vue3/index' },
              { text: '3.TypeScript', link: '/ts/index' },
              // { text: '高级用法', link: '/guide/advanced-usage' }
            ]
          }
        ]
      },
      // markdown: {
      //   config: async (md) => {
      //     const highlighter = await shiki.getHighlighter({ theme: 'nord' }) // 选择你喜欢的主题
      //     md.use(MarkdownItShiki, { highlighter })
      //   }
      // }
    }
  }
  