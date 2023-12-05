import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import type {Options as BlogOptions} from '@docusaurus/plugin-content-blog';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

const config: Config = {
  title: 'Norman Site',
  tagline: '骚气十足且不专注于软件开发的技术博客',
  favicon: 'img/Norman-logo.webp',
  url: 'https://zhiming.cool',
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'zhiming', // Usually your GitHub org/user name.
  projectName: 'normanSite', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'zh-Hans',
    locales: ['zh-Hans'],
  },

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  customFields: {
    websiteLogo: '/img/Norman-logo.webp',
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shareda/',
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/norman-socialcard.jpg',
    navbar: {
      hideOnScroll: true,
      title: 'Norman Site · 之明的站点',
      logo: {
        alt: 'Norman Logo',
        src: 'img/Norman-logo.webp',
      },
      items: [
        {
          type: 'dropdown',
          label: '软件工程',
          sidebarId: '100',
          position: 'left',
          items: [
            {
              to: 'docs/category/系统与规范/',
              label: '系统与规范',
            },
            {
              to: 'docs/category/前端/',
              label: '前端',
            },
            {
              to: 'docs/category/后端/',
              label: '后端',
            },
            {
              to: 'docs/category/数据库/',
              label: '数据库',
            },
          ],
        },
        {
          type: 'dropdown',
          sidebarId: '300',
          position: 'left',
          label: '系列笔记',
          items: [
            {
              to: 'docs/category/读书笔记/',
              label: '读书笔记',
            },
            {
              to: 'docs/category/知乎写作培训/',
              label: '知乎写作培训',
            },
            {
              to: 'docs/category/副业有道/',
              label: '副业有道',
            },
          ],
        },
        {
          type: 'docSidebar',
          sidebarId: '200',
          position: 'left',
          label: '视觉设计',
        },
        {to: '/blogs', label: '博客推文', position: 'left'},
        {
          href: 'https://github.com/norman-pong',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: '系列',
          items: [
            {
              label: '软件工程',
              to: '/docs/category/系统与规范',
            },
            {
              label: '读书笔记',
              to: '/docs/category/读书笔记/',
            },
            {
              label: '视觉设计',
              to: '/docs/category/广美视觉传达',
            },
          ],
        },

        {
          title: '社交站点',
          items: [
            {
              label: '知乎',
              href: 'https://www.zhihu.com/people/pang-zhi-ming',
            },
          ],
        },
        {
          title: '资源分享',
          items: [
            {
              label: 'Alist网盘',
              href: 'https://alist.zhiming.cool',
            },
          ],
        },
        {
          title: '更多',
          items: [
            {
              label: '博客',
              to: '/blogs',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/facebook/docusaurus',
            },
          ],
        },
      ],
      copyright: `
      <a style="color:white;" href="https://beian.miit.gov.cn/#/Integrated/index">粤ICP备2023120303号</a>
      <p>Copyright © ${new Date().getFullYear()} Norman Site. Built with Docusaurus.</p>
      `,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['powershell', 'bash', 'java', 'python'],
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      './src/plugins/plugin-content-blog/index.ts',
      {
        id: 'CustomBlog01',
        path: 'blog',
        showReadingTime: true,
        blogSidebarTitle: '全部推文',
        postsPerPage: 5,
        blogTitle: '博客推文',
        blogSidebarCount: 'ALL',
        feedOptions: {
          type: 'all',
          copyright: `Copyright © ${new Date().getFullYear()} Facebook, Inc.`,
          createFeedItems: async (params) => {
            const {blogPosts, defaultCreateFeedItems, ...rest} = params;
            return defaultCreateFeedItems({
              // keep only the 10 most recent blog posts in the feed
              blogPosts: blogPosts.filter((item, index) => index < 10),
              ...rest,
            });
          },
        },
        // editUrl: 'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/'
      } satisfies BlogOptions,
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        offlineModeActivationStrategies: [
          'appInstalled',
          'standalone',
          'queryString',
        ],
        pwaHead: [
          {
            tagName: 'link',
            rel: 'icon',
            href: '/img/Norman-logo.webp',
          },
          {
            tagName: 'link',
            rel: 'manifest',
            href: '/manifest.json',
          },
          /** Apple mobile config */
          {
            tagName: 'meta',
            name: 'apple-mobile-web-app-capable',
            content: 'yes',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-icon',
            href: '/img/icons/icon-white-512x512.webp',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-startup-image',
            media:
              '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)',
            href: '/img/apple-splash/apple-splash-828-1792.jpg',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-startup-image',
            media:
              '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
            href: '/img/apple-splash/apple-splash-1125-2436.jpg',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-startup-image',
            media:
              '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
            href: '/img/apple-splash/apple-splash-1170-2532.jpg',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-startup-image',
            media:
              '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
            href: '/img/apple-splash/apple-splash-1179-2556.jpg',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-startup-image',
            media:
              '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
            href: '/img/apple-splash/apple-splash-1242-2208.jpg',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-startup-image',
            media:
              '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
            href: '/img/apple-splash/apple-splash-1242-2688.jpg',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-startup-image',
            media:
              '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
            href: '/img/apple-splash/apple-splash-1284-2778.jpg',
          },
          {
            tagName: 'link',
            rel: 'apple-touch-startup-image',
            media:
              '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
            href: '/img/apple-splash/apple-splash-1290-2796.jpg',
          },
        ],
      },
    ],
  ],
};

export default config;
