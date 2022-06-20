本站点是使用 Facebook 开源的 [Docusaurus](https://docusaurus.io/) 构建的。如果国外的官网访问速度太慢，可以访问 [Docusaurus 中文站点](https://www.docusaurus.cn/docs/)。

🧐 [Docusaurus](https://www.docusaurus.cn/docs/) 是一个静态网站生成器。它发挥了 [React](https://reactjs.org/) 的全部功能来构建具有快速客户端导航的单页应用，从而赋予你的网站交互性。它提供了开箱即用的文档功能，还能用于创建任何类型的网站（例如个人网站、产品介绍、博客、营销页等等）。

🎯 本站点部署在 Github Pages 的免费服务器上，使用 Github Actions 自动部署，并且使用 Cloudflare 进行免费的 CDN 加速。

## **搭建步骤**

要求电脑上安装有有 Node.js，如果不会安装的话可以百度，网上有大量的教程。

可以使用 `npm -v` 命令检查计算机上是否安装了 Node 环境。

打开终端切换到一个空目录下，然后使用如下命令构建一个最基本的脚手架项目。
 
```npm
npx create-docusaurus@latest [name] [template]
```

例如：使用 classic 预设（经典默认预设）创建一个项目，项目名称是 website。

```npm
npx create-docusaurus@latest website classic
```

详细步骤可以参考 [Docusaurus](https://www.docusaurus.cn/docs/) 官方文档。

### 如何实现 Github Actions 自动部署

根据预设创建好的项目大概是这么一个基本的目录结构。

```javascript
website
├── blog
│   ├── 2019-05-28-hola.md
│   ├── 2019-05-29-hello-world.md
│   └── 2020-05-30-welcome.md
├── docs
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   └── mdx.md
├── src
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── styles.module.css
│       └── index.js
├── static
│   └── img
├── docusaurus.config.js
├── package.json
├── package-lock.json
├── README.md
└── sidebars.js
```

我一般使用 VSCode 来编写博客，VSCode 能够比较方便的使用 Git 进行源代码管理。写博客的手感不如 Typora，但是也还行（为什么不用呢，因为 Typora 收费啦 🐶）

首先需要自己的 Github 账户，然后登录 Github 并创建一个项目仓库，我的仓库名是 Txiz.github.io，然后将本地的文件推送上去，**请注意你的推送分支，我的主分支叫做 main，但是 VSCode 的默认命名时 master**。

要想使用 Github Actions，其实非常简单，只需要在 website 目录下创建 ./.github/workflows/deploy.yml 文件（**注意目录名为 .github**）即可，新的目录结构如下。

```javascript
website
|── .github
|   └── workflows
|       └── deploy.yml
├── blog
│   ├── 2019-05-28-hola.md
│   ├── 2019-05-29-hello-world.md
│   └── 2020-05-30-welcome.md
├── docs
│   ├── doc1.md
│   ├── doc2.md
│   ├── doc3.md
│   └── mdx.md
├── src
│   ├── css
│   │   └── custom.css
│   └── pages
│       ├── styles.module.css
│       └── index.js
├── static
│   └── img
├── docusaurus.config.js
├── package.json
├── package-lock.json
├── README.md
└── sidebars.js
```

关于 Github Actions 的配置文件，可以直接复制下面的代码，只需要修改三个个地方，第一个便是 branches 后面的分支，要和你自己的推送分支保持一致，然后就是 user_name 和 user_email，改成自己的就行。

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: 14.x
          cache: npm
      - name: Build static file
        run: |
          npm install
          npm run build
      - name: Deploy to gh-pages branch
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          user_name: Txiz[bot]
          user_email: xiongzhaoxi@qq.com
```

将新的文件再次推送到 Github 仓库，就可以实现自动部署了。以后每次推送内容给仓库的时候都会自动部署。

### 开启 Github Pages

选择你的项目，在 Github 上点击右侧的 **Settings**，再找到 **Pages**，选择部署分支以及分支下的部署目录（如果你是直接复制的上面的脚本，那么部署分支选择 gh-pages 分支，目录为根目录），就可以开启 Github Pages，等待一分钟左右，刷新页面，可以看到 `Your site is published at http://txiz.github.io`，在勾选下方的 Enforce HTTPS，就可以通过域名 `https://txiz.github.io` 访问部署的网站了。

### 使用 Github Pages 并配置自己的域名

可以看到项目已经部署到 Github Pages 上了，但是此时项目的访问域名是 `https://txiz.github.io`，没有设置自己的域名。

如果希望使用 txiz.top 这个域名来访问项目，只需要在 Github Pages 的设置页面下方的 Custom domain 里输入自己的域名即可。

![](Image/使用%20Github%20Pages%20搭建知识库/GithubPages.png)

:::info 如何获取自己的域名
关于如何获取自己的域名，你需要去阿里云（或者别的云厂商）上购买域名，但是如果你从来没有购买过自己的域名的话，那么会耗费大概一天到一周左右的时间，因为首先要完成个人的信息登记，个人信息登记成功以后才能购买域名。

购买域名以后就可以直接用了，不需要备案什么的，但是还是尽可能的备案比较好，如果嫌麻烦就算了，国内的服务器是必须要备案的，但是 Github Pages 是国外的，所以不需要备案也能通过域名访问。
:::

接着是在自己的域名厂商中配置对应的 DNS 解析，比如我是用的阿里云购买的 txiz.top 这个域名，那么登录阿里云，进入控制台，找到**云解析 DNS / 域名解析 / 解析设置**，然后添加 www 和 @ 两条主机记录，如下图所示。

![](Image/使用%20Github%20Pages%20搭建知识库/域名解析.png)

这样设置其实已经成功配置了自己的域名，但是当推送新的代码到 Github 仓库的时候，就会发现配置的域名失效了。

解决这个问题的方法很简单，就是在项目根目录下的 static 文件夹下**创建一个没有扩展名且文件名为 CNAME 的文件**，并在其中写入 txiz.top，这样就可以让 Github Pages 自动把项目的域名设置为 txiz.top，以后每次都可以通过域名 `http://txiz.top` 访问项目了。

:::info 自己的域名使用 HTTPS 协议
如果使用自己的域名，使用 HTTPS 协议是需要申请证书的，当然各大云厂商都有免费的证书可以用，步骤并不复杂，这里就不过多说明了。
:::

### 使用 Cloudflare 进行免费的 CDN 加速

因为使用的 Github Pages，所以会导致有的时候网站访问不了，就像有时候也访问不了 Github 一样，当然可以通过某种科学手段来实现访问，但是你的网站是给别人看的，别人可不见得能够科学上网，所以这个时候就需要使用 CDN 加速了。

国内的几家大的云服务厂商，比如阿里云、腾讯云，其实都有 CDN 服务，只不过它们都不能白嫖，而且使用起来其实还是比较麻烦的，所以我们选择国外的云服务厂商，比如 Cloudflare，这个云服务厂商的 CDN 服务是免费的，所以可以直接使用它来加速网站。

Cloudflare 的 CDN 加速非常简单，首先访问他们的官方网站 [Cloudflare](https://www.cloudflare.com/zh-cn/)，然后注册一个账号，进入控制台，选择网站，然后输入你的加速域名，比如我的 txiz.top，然后添加站点。

![](Image/使用%20Github%20Pages%20搭建知识库/Cloudflare.png)

接着 Cloudflare 会要求你选择付费计划，选择免费的使用计划就行，然后就是添加 DNS 记录，这个需要到你的域名购买厂商去添加，还是刚才我们自己的域名配置 DNS 解析的地方，添加第三条解析，按照 Cloudflare 的提示，主机记录叫做 _dnsauth，记录类型 txt，如下图所示的第三个记录。

![](Image/使用%20Github%20Pages%20搭建知识库/域名解析.png)

添加以后，回到 Cloudflare 页面，点击检测，如果暂时检测不到就等一会，Cloudflare 会和你发邮件的，成功以后就可以实现 CDN 加速了，Cloudflare 的控制台里应该有加速的域名，并显示有效。可以通过使用 F12 查看自己的网站的请求来源来进一步确定是否加速成功。

![](Image/使用%20Github%20Pages%20搭建知识库/Cloudflare设置成功.png)

![](Image/使用%20Github%20Pages%20搭建知识库/F12查看结果.jpg)