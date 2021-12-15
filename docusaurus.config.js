const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

const config = {
  title: '闲思笔记',
  tagline: '',
  url: 'https://txiz.top',
  baseUrl: '/',
  favicon: 'img/favicon.ico',
  organizationName: 'Txiz',
  projectName: 'Txiz.github.io',
  presets: [
    [
      '@docusaurus/preset-classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          routeBasePath: '/',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],
  plugins: [
    'plugin-image-zoom'
  ],
  themeConfig: {
    algolia: {
      appId: '7YQV8ZC3Y6',
      apiKey: '223a66d7fed759dfba91310b01a753d2',
      indexName: 'Txiz',
      contextualSearch: true,
    },
    navbar: {
      title: '闲思笔记',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'doc',
          docId: '指南',
          position: 'left',
          label: '指南',
        },
        {
          type: 'doc',
          docId: 'ComputerBasic/导航',
          position: 'left',
          label: '计算机基础',
        },
        {
          type: 'doc',
          docId: 'Java/导航',
          position: 'left',
          label: 'Java',
        },
        {
          type: 'doc',
          docId: 'Database/导航',
          position: 'left',
          label: '数据库',
        },
        {
          type: 'search',
          position: 'left',
        },
        {
          href: 'https://github.com/Txiz/Txiz.github.io',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'light',
      copyright: `Copyright © ${new Date().getFullYear()} Txiz, Built with <a href="https://www.docusaurus.cn/">Docusaurus</a>.`,
    },
    prism: {
      theme: darkCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['sql', 'java', 'go'],
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
  },
};

module.exports = config;
