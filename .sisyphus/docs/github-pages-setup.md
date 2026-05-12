# GitHub Pages 启用与首次部署指南

本文档旨在指导维护者如何为 `WalkthroughInChinese` 项目配置 GitHub Pages 服务，并完成首次自动化部署。本项目使用 VitePress 构建，通过 GitHub Actions 实现持续集成与部署。

## 1. 前置条件

在开始配置之前，请确保满足以下条件：

- 源代码已成功推送至 GitHub 仓库 `soarqin/WalkthroughInChinese`。
- 自动化部署配置文件 `.github/workflows/deploy-github-pages.yml` 已合并至 `main` 分支。该文件定义了构建环境、依赖安装、VitePress 静态站点生成以及向 GitHub Pages 推送产物的逻辑。
- 仓库根目录下的 `package.json` 和 `package-lock.json` 处于最新状态，确保构建环境的一致性。

## 2. 仓库可见性检查

GitHub Pages 的服务可用性受仓库可见性影响。请按照以下步骤确认：

1. 访问仓库设置页面：`https://github.com/soarqin/WalkthroughInChinese/settings`。
2. 在页面底部的 「Danger Zone」 区域，确认当前仓库状态为 「Public」。
3. **限制说明**：若仓库设置为 「Private」，GitHub Pages 功能通常需要 GitHub Pro、GitHub Team 或 GitHub Enterprise 计划支持。对于开源项目，建议保持 「Public」 状态以直接使用免费的 Pages 服务。

## 3. 启用 GitHub Pages

启用过程需明确指定部署来源为 GitHub Actions，这是确保 VitePress 站点正确构建的关键。

1. 进入仓库的 「Settings」 选项卡。
2. 在左侧导航栏中，点击 「Code and automation」 下的 「Pages」 菜单。
3. 在 「Build and deployment」 区域，找到 「Source」 下拉菜单。
4. **关键步骤**：选择 「GitHub Actions」。
   - **注意**：请勿选择 「Deploy from a branch」。虽然这是传统的部署方式，但对于需要复杂构建流程的 VitePress 项目，直接使用 Actions 部署更加高效且易于维护。
5. 系统会自动保存设置。此时，GitHub Pages 已准备好接收来自 Actions 的部署产物。

## 4. 首次触发部署

配置完成后，需要手动或通过推送代码触发第一次部署流程。

- **手动触发**：
  1. 点击仓库顶部的 「Actions」 选项卡。
  2. 在左侧工作流列表中选择 「Deploy GitHub Pages」。
  3. 点击右侧的 「Run workflow」 下拉按钮。
  4. 确认分支选择为 `main`，然后点击 「Run workflow」 按钮。
- **自动触发**：
  - 向 `main` 分支推送任何新的 commit 都会自动启动该工作流。

## 5. 等待部署完成

部署过程通常需要 1-3 分钟，具体取决于依赖安装和静态页面生成的耗时。

1. 在 「Actions」 页面中，点击正在运行的 「Deploy GitHub Pages」 任务。
2. 观察各个阶段的执行情况，包括 「Build with VitePress」 和 「Upload artifact」。
3. 当所有步骤均显示绿色对勾，且任务状态变为 「Success」 时，表示部署已完成。

## 6. 获取访问 URL

部署成功后，站点将通过 GitHub 的二级域名发布。

- 本项目的默认访问地址为：`https://soarqin.github.io/WalkthroughInChinese/`。
- 由于本项目配置了子路径（Subpath），所有资源引用均已基于 `/WalkthroughInChinese/` 进行调整。

## 7. 验证清单

部署完成后，请务必执行以下检查以确保站点功能完整：

- [ ] 首页 `https://soarqin.github.io/WalkthroughInChinese/` 能够正常打开。
- [ ] 攻略目录页 `/games/` 能够正常打开且样式正确。
- [ ] 具体游戏攻略页（如 `/games/chrono-cross/`）内容显示完整。
- [ ] 打开浏览器开发者工具（DevTools），在 「Network」 面板中确认 `/WalkthroughInChinese/logo.svg` 加载状态为 200。
- [ ] 检查控制台（Console），确认无 4xx 或 5xx 错误。
- [ ] 测试本地搜索功能，确保索引已正确生成且可检索。
- [ ] 验证不同攻略页面的 「最后更新」 时间。由于工作流中配置了 `fetch-depth: 0`，不同文件的更新时间应根据其实际 Git 提交历史显示，而非全部显示为当前部署时间。
- [ ] 验证 `cleanUrls` 配置：直接访问不带 `.html` 后缀的 URL（如 `/games/index`）应能正常返回 200 状态码。

## 8. 常见问题排查

若部署后出现异常，请参考以下常见问题进行排查：

- **页面显示 404 或样式丢失**：
  - 检查 「Settings」 -> 「Pages」 中的 「Source」 是否误选为 「Deploy from a branch」。如果选择了分支部署，GitHub 会尝试使用内置的 Jekyll 引擎处理文件，这会导致 VitePress 生成的静态资源路径失效。
- **推送代码后未触发部署**：
  - 检查仓库可见性设置。
  - 检查 「Settings」 -> 「Actions」 -> 「General」 中是否禁用了 Actions 功能。
  - 确认 `.github/workflows/deploy-github-pages.yml` 文件中的触发条件配置正确。
- **Favicon 或 Logo 无法显示**：
  - 检查 `.vitepress/config.mts` 中的 `head` 配置。确保资源路径使用了动态 base 路径，或手动包含了 `/WalkthroughInChinese/` 前缀。
- **「最后更新」 时间在所有页面均相同**：
  - 检查 GitHub Actions 工作流文件。确保在 `actions/checkout` 步骤中设置了 `fetch-depth: 0`。默认情况下，Checkout 深度为 1，这会导致 Git 丢失历史时间戳信息。
- **搜索功能失效**：
  - 确认构建过程中没有报错。VitePress 的搜索索引是在构建阶段生成的，如果构建环境内存不足或配置错误，可能导致索引文件缺失。
