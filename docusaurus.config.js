const darkCodeTheme = require('prism-react-renderer/themes/vsDark');

const config = {
  title: 'Txiz Note',
  tagline: 'Txiz Note',
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

  themeConfig:
    ({
      navbar: {
        title: 'Txiz Note',
        // logo: {
        //   alt: 'My Site Logo',
        //   src: 'img/logo.svg',
        // },
        items: [
          {
            type: 'doc',
            docId: '指南',
            position: 'right',
            label: '指南',
          },
          {
            type: 'doc',
            docId: 'ComputerBasic/导航',
            position: 'right',
            label: '计算机基础',
          },
          {
            type: 'doc',
            docId: 'Java/导航',
            position: 'right',
            label: 'Java',
          },
          {
            type: 'doc',
            docId: 'Database/导航',
            position: 'right',
            label: '数据库',
          },
          {
            href: 'https://github.com/Txiz/Txiz.github.io',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'search',
            position: 'left',
          },
        ],
      },
      footer: {
        style: 'light',
        copyright: `Copyright © ${new Date().getFullYear()} Txiz, All Rights Reserved.<br />本知识库使用 <a href="https://www.docusaurus.cn/">Docusaurus</a> 构建。`,
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
    }),
};

module.exports = config;
