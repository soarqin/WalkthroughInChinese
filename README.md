# 中文游戏攻略合集

中文游戏攻略合集用于整理、发布和维护中文游戏攻略。项目使用 VitePress 展示 Markdown 文件，攻略文档按游戏独立归档，便于通过 Web 页面浏览，也便于在 Git 仓库中审阅和协作。

## 在线访问

- 主站（Cloudflare Pages）：`https://<待填写>.pages.dev/`
- 镜像（GitHub Pages）：https://soarqin.github.io/WalkthroughInChinese/

主站与镜像内容一致。主站全球访问稳定，镜像作为冗余备份。

部署架构与配置流程见：
- `.sisyphus/docs/cloudflare-setup.md` — Cloudflare Pages 接入引导
- `.sisyphus/docs/github-pages-setup.md` — GitHub Pages 接入引导

## 本地预览

安装依赖后启动开发服务器：

```bash
npm install
npm run docs:dev
```

默认访问地址为 `http://localhost:5173/`。VitePress 会将根目录下的 Markdown 文件和 `games/` 目录渲染为可浏览的文档站。

## 构建站点

```bash
npm run docs:build
```

构建产物位于 `.vitepress/dist/`。

## 测试方案

修改界面、导航或文档结构后，按以下顺序验证：

1. 运行 `npm run docs:build`，确认 VitePress 可以完成静态构建。
2. 运行 `npm run docs:preview`，启动本地预览服务。
3. 使用 `agent-browser` 打开首页、攻略目录页和至少 1 个被修改的 Markdown 页面。
4. 检查页面标题、导航跳转、本地搜索入口和控制台错误。
5. 测试结束后关闭 `agent-browser` 会话，并清理本次测试启动的 VitePress dev server、preview server、LSP server 等后台进程。

本项目不使用 Playwright 做浏览器验证；该工具在 Windows 环境存在已知问题。

测试不得留下占用端口或影响后续测试的 server 进程。

## 目录结构

```text
/
├── index.md
├── package.json
├── .vitepress/
│   ├── config.mts
│   └── theme/
│       ├── index.ts
│       └── style.css
├── games/
│   ├── index.md
│   └── <游戏名>/
│       ├── README.md
│       └── *.md
├── README.md
├── AGENTS.md
├── LICENSE
└── LICENSE-docs
```

每个游戏使用独立目录：

```text
games/<游戏名>/
```

建议每个游戏目录至少包含 `README.md`，用于说明游戏版本、攻略范围、章节索引和更新记录。

## 新增游戏攻略

1. 在 `games/` 下创建游戏目录，例如 `games/塞尔达传说：王国之泪/`。
2. 在游戏目录内创建 `README.md` 和具体章节文档。
3. 在 `games/index.md` 中登记游戏名称、攻略范围、入口链接和更新时间。
4. 如需侧边栏导航，在 `.vitepress/config.mts` 中为对应游戏补充导航项。
5. 本地启动 VitePress，确认首页、目录页和攻略页可以打开。

## 文档规范

- 全部可见文档使用中文编写。
- 攻略内容应标明适用的游戏版本、平台或资料片范围。
- 文件名优先使用中文，必要时可使用短横线分隔。
- Markdown 标题从一级标题开始，章节层级保持连续。
- 引用外部资料时保留来源链接和访问日期。

## 许可协议

- 代码文件采用 MIT 协议，详见 `LICENSE`。
- 攻略文档、说明文档与其他正文内容采用 CC BY-SA 4.0 协议，详见 `LICENSE-docs`。
