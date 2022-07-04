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
  themeConfig: {
    navbar: {
      title: '闲思笔记',
      // logo: {
      //   alt: 'My Site Logo',
      //   src: 'img/logo.svg',
      // },
      items: [
        {
          type: 'doc',
          docId: 'Home/指南',
          position: 'right',
          label: '指南',
        },
        // {
        //   type: 'doc',
        //   docId: 'ComputerBasic/导航',
        //   position: 'right',
        //   label: '计算机基础',
        // },
        // {
        //   type: 'doc',
        //   docId: 'Java/导航',
        //   position: 'right',
        //   label: 'Java',
        // },
        // {
        //   type: 'doc',
        //   docId: 'Database/导航',
        //   position: 'right',
        //   label: '数据库',
        // },
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
      copyright: `Copyright © ${new Date().getFullYear()} 打呆呆兽的小锤子`,
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
