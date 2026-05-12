# Cloudflare Pages 部署指南

本文档介绍如何将「WalkthroughInChinese」项目部署至 Cloudflare Pages 服务，实现自动化的静态网站托管。

## 1. 前置条件

在开始配置之前，请确保满足以下条件：
- 拥有一个有效的 GitHub 账号。
- 已将代码推送至 `soarqin/WalkthroughInChinese` 仓库。
- 确认项目根目录下存在 `package.json` 且包含 `docs:build` 脚本。

## 2. 注册 Cloudflare 账号

若尚未拥有 Cloudflare 账号，请按照以下步骤操作：
1. 访问 [Cloudflare 注册页面](https://dash.cloudflare.com/sign-up)。
2. 输入您的电子邮箱地址并设置密码。
3. 点击「Sign Up」按钮。
4. 登录您的电子邮箱，查收来自 Cloudflare 的验证邮件，并点击其中的链接完成邮箱验证流程。
5. 验证完成后，您将进入 Cloudflare 控制面板（Dashboard）。

## 3. 开通 Pages 服务

Cloudflare Pages 是 Cloudflare 提供的静态网站托管服务。开通流程如下：
1. 在 Cloudflare 控制面板左侧导航栏中，点击「Workers & Pages」。
2. 在展开的菜单中选择「Overview」。
3. 点击页面中的「Create application」按钮。
4. 切换至「Pages」选项卡。
5. 点击「Connect to Git」按钮，准备关联您的代码仓库。

## 4. 授权 GitHub

为了让 Cloudflare Pages 能够读取您的代码并实现自动部署，需要进行 GitHub 授权：
1. 在「Connect to Git」页面，选择「GitHub」作为提供商。
2. 如果是首次连接，系统会弹出 GitHub 授权窗口。请按照提示登录 GitHub 并授权 Cloudflare 访问您的账号。
3. 在仓库列表中，搜索并选择 `soarqin/WalkthroughInChinese` 仓库。
4. 点击「Begin setup」进入详细配置页面。

## 5. 构建配置

在「Set up builds and deployments」页面，请严格按照下表填写构建参数。这些参数确保 VitePress 能够正确生成静态文件。

| 字段 | 值 |
|---|---|
| Production branch | `main` |
| Framework preset | `VitePress` |
| Build command | `npm run docs:build` |
| Build output directory | `.vitepress/dist` |
| Root directory (advanced) | `/` |

注意：虽然预设中可能包含 `npx vitepress build`，但建议使用 `npm run docs:build` 以保持与本地开发环境的一致性。

## 6. 环境变量配置

Cloudflare Pages 默认的 Node.js 版本可能较低，且不会自动读取项目中的 `.nvmrc` 文件。因此，必须手动指定 Node.js 版本：
1. 在构建配置页面下方，找到「Environment variables (advanced)」部分。
2. 点击「Add variable」。
3. 在「Variable name」中输入 `NODE_VERSION`。
4. 在「Value」中输入 `20`。
5. 本项目不需要设置 `DEPLOY_TARGET` 变量，因为默认的根路径 `/` 已符合 Cloudflare Pages 的预期。

## 7. 预览策略警告

默认情况下，Cloudflare Pages 会为每一个推送到 GitHub 的非生产分支（PR 分支等）生成一个公开的预览 URL，格式通常为 `https://<branch>.<project>.pages.dev`。

为了保护未完成内容的私密性或节省构建资源，建议调整预览策略：
1. 部署完成后，进入项目设置：Project → Settings → Builds & deployments。
2. 找到「Preview branch control」部分。
3. 点击「Configure preview deployments」。
4. 推荐选择「Only the production branch」，即仅对 `main` 分支进行部署。

## 8. 首次部署

完成上述所有配置后，执行以下操作：
1. 点击页面底部的「Save and Deploy」按钮。
2. 系统将进入实时构建日志界面。
3. 构建过程通常包括「Initializing build environment」、「Cloning repository」、「Building application」和「Deploying to Cloudflare's global network」四个阶段。
4. 整个过程预计耗时 1 至 3 分钟。请耐心等待直至状态显示为「Success」。

## 9. 获取访问 URL

部署成功后，Cloudflare 会分配一个默认的二级域名：
- 访问地址格式为：`https://<project-name>.pages.dev/`。
- 请记录此 URL，并将其更新至项目根目录的 `README.md` 文件中，方便他人访问。

## 10. 验证清单

部署完成后，请手动检查以下各项以确保站点运行正常：
- [ ] 首页能够正常加载，且样式无缺失。
- [ ] 导航栏链接可以正确跳转至各个攻略页面。
- [ ] 页面中的图片资源（位于 `assets/` 目录）显示正常。
- [ ] 搜索功能（VitePress 内置搜索）可以正常索引内容。
- [ ] 浏览器控制台（Console）无 404 或 500 错误。
- [ ] 移动端访问时布局适配正常。

## 11. 常见问题

如果在部署过程中遇到问题，请参考以下快速排查建议：
- **构建超时**：Cloudflare Pages 免费版有 20 分钟的构建时长限制。如果超时，请检查是否有大量的图片资源处理或递归引用。
- **Node 版本错误**：如果看到类似「Unsupported engine」的错误，请确认环境变量中 `NODE_VERSION` 是否已正确设置为 `20`。
- **路径错误**：如果部署成功但访问时显示 404，请检查「Build output directory」是否准确设置为 `.vitepress/dist`。
- **依赖安装失败**：确保 `package-lock.json` 已提交至仓库，以便 Cloudflare 使用正确的依赖版本。
