import { defineConfig } from 'vitepress'

declare const process: { env: { DEPLOY_TARGET?: string } }

const isGitHubPages = process.env.DEPLOY_TARGET === 'github'
const base = isGitHubPages ? '/WalkthroughInChinese/' : '/'

export default defineConfig({
  lang: 'zh-CN',
  base: base,
  title: '中文游戏攻略合集',
  description: '按游戏归档的中文 Markdown 攻略合集',
  cleanUrls: true,
  lastUpdated: true,
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: `${base}logo.svg` }]],
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: '首页', link: '/' },
      { text: '攻略目录', link: '/games/' },
      { text: '项目说明', link: '/README' }
    ],
    sidebar: {
      '/games/chrono-cross/': [
        {
          text: 'CHRONO CROSS',
          items: [
            { text: '攻略首页', link: '/games/chrono-cross/' },
            { text: '流程 01：开局与三次分支', link: '/games/chrono-cross/流程-01-开局与三次分支' },
            { text: '流程 02：Fort Dragonia 前后', link: '/games/chrono-cross/流程-02-Fort-Dragonia-前后' },
            { text: '流程 03：Dragon\'s Blessing 与终盘准备', link: '/games/chrono-cross/流程-03-Dragon-Blessing-与终盘准备' },
            { text: '流程 04：终盘成就与额外系统', link: '/games/chrono-cross/流程-04-终盘成就与额外系统' },
            { text: '快速全成就路线', link: '/games/chrono-cross/快速全成就路线' },
            { text: 'Radical Dreamers 路线', link: '/games/chrono-cross/Radical-Dreamers-路线与致谢' }
          ]
        }
      ],
      '/games/tales-of-symphonia/': [
        {
          text: 'Tales of Symphonia',
          items: [
            { text: '攻略首页', link: '/games/tales-of-symphonia/' },
            { text: '一周目 01：序章与火之封印', link: '/games/tales-of-symphonia/第一周目流程-01-序章与火之封印' },
            { text: '一周目 02：水与风封印', link: '/games/tales-of-symphonia/第一周目流程-02-水之封印与风之封印' },
            { text: '一周目 03：光封印与提瑟亚拉', link: '/games/tales-of-symphonia/第一周目流程-03-光之封印与提瑟亚拉初到' },
            { text: '一周目 04：精灵神殿与孤岛牧场', link: '/games/tales-of-symphonia/第一周目流程-04-提瑟亚拉精灵神殿与孤岛牧场' },
            { text: '一周目 05：弗拉诺尔与终盘', link: '/games/tales-of-symphonia/第一周目流程-05-弗拉诺尔事件与终盘' },
            { text: '二周目：克拉特斯路线', link: '/games/tales-of-symphonia/第二周目流程-克拉特斯路线' },
            { text: '三周目：杰洛斯路线', link: '/games/tales-of-symphonia/第三周目流程-杰洛斯路线' },
            { text: '四周目：专家级与总清算', link: '/games/tales-of-symphonia/第四周目流程-专家级与总清算' },
            { text: '白金路线', link: '/games/tales-of-symphonia/白金路线' },
            { text: '流程与战斗奖杯', link: '/games/tales-of-symphonia/奖杯攻略-流程与战斗' },
            { text: '称号与收集奖杯', link: '/games/tales-of-symphonia/奖杯攻略-称号与收集' },
            {
              text: '收集自查表',
              items: [
                { text: '宝箱自查表', link: '/games/tales-of-symphonia/宝箱自查表' },
                { text: '道具图鉴自查表', link: '/games/tales-of-symphonia/道具图鉴自查表' },
                { text: '魔物图鉴自查表', link: '/games/tales-of-symphonia/魔物图鉴自查表' }
              ]
            },
            { text: '支线与挑战奖杯', link: '/games/tales-of-symphonia/奖杯攻略-支线与挑战' },
            { text: '名词对照表', link: '/games/tales-of-symphonia/名词对照表' }
          ]
        }
      ],
      '/games/tales-of-graces-f-remastered/': [
        {
          text: 'Tales of Graces f Remastered',
          items: [
            { text: '攻略首页', link: '/games/tales-of-graces-f-remastered/' },
            { text: '流程 01：少年时代与兰特领主篇', link: '/games/tales-of-graces-f-remastered/流程-01-少年时代与兰特领主篇' },
            { text: '流程 02：夺回兰特与史特拉塔', link: '/games/tales-of-graces-f-remastered/流程-02-夺回兰特与史特拉塔计谋篇' },
            { text: '流程 03：芬迪尔与佛铎拉', link: '/games/tales-of-graces-f-remastered/流程-03-芬迪尔攻防与佛铎拉篇' },
            { text: '流程 04：最终决战与通关后', link: '/games/tales-of-graces-f-remastered/流程-04-最终决战与通关后' },
            { text: '流程 05：迈向未来的系谱篇', link: '/games/tales-of-graces-f-remastered/流程-05-迈向未来的系谱篇' },
            { text: '全成就', link: '/games/tales-of-graces-f-remastered/全成就' },
            { text: '名词对照表', link: '/games/tales-of-graces-f-remastered/名词对照表' }
          ]
        }
      ],
      '/games/': [
        {
          text: '攻略目录',
          items: [
            { text: '全部游戏', link: '/games/' },
            { text: 'CHRONO CROSS', link: '/games/chrono-cross/' },
            { text: 'Tales of Symphonia', link: '/games/tales-of-symphonia/' },
            { text: 'Tales of Graces f Remastered', link: '/games/tales-of-graces-f-remastered/' }
          ]
        }
      ],
      '/': [
        {
          text: '项目',
          items: [
            { text: '首页', link: '/' },
            { text: '项目说明', link: '/README' },
            { text: '攻略目录', link: '/games/' }
          ]
        }
      ]
    },
    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            displayDetails: '显示详情',
            resetButtonTitle: '清除搜索',
            backButtonTitle: '关闭搜索',
            noResultsText: '没有找到结果',
            footer: {
              selectText: '选择',
              selectKeyAriaLabel: '回车键',
              navigateText: '切换',
              navigateUpKeyAriaLabel: '上方向键',
              navigateDownKeyAriaLabel: '下方向键',
              closeText: '关闭',
              closeKeyAriaLabel: 'Esc 键'
            }
          }
        }
      }
    },
    editLink: {
      pattern: 'https://github.com/soarqin/WalkthroughInChinese/edit/master/:path',
      text: '编辑此页'
    },
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '本页目录'
    },
    lastUpdated: {
      text: '最后更新',
      formatOptions: {
        dateStyle: 'medium',
        timeStyle: 'short'
      }
    },
    footer: {
      message: '代码采用 MIT 协议。攻略文档采用 CC BY-SA 4.0 协议。',
      copyright: 'Copyright © 2026 WalkthroughInChinese contributors'
    }
  }
})
