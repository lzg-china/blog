module.exports = {
    title: '我的博客',
    description: '由 VitePress 驱动的博客',
    themeConfig: {
      nav: [
        { text: '主页', link: '/' },
        { text: '指南', link: '/guide/' },
        { text: '关于', link: '/about' },
        { text: '联系', link: '/contact' }
      ],
      sidebar: {
        '/guide/': [
          {
            text: '指南',
            items: [
              { text: '介绍', link: '/guide/' },
              { text: '入门', link: '/guide/getting-started' },
              { text: '高级用法', link: '/guide/advanced-usage' }
            ]
          }
        ]
      }
    }
  }
  