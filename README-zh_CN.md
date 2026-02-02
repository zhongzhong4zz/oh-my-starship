<div align="center">
  <img src="./readme-icon.png" width="96" height="96" />
</div>

# Starship 配置管理器

`oh-my-starship` 是一个桌面应用程序，通过可视化界面帮助您管理 [Starship](https://starship.rs/) 提示符配置。该应用程序使用 [Tauri](https://v2.tauri.app/) 构建，支持 `Windows` 系统。

它提供了一个简单易用的图形界面来配置您的 Starship 提示符，包括：

- **预设选择** - 9 个内置主题（Nerd Font Symbols、Pastel Powerline、Tokyo Night 等）
- **模块编辑器** - 配置单个提示符模块（字符、目录、Git、时间、语言）
- **TOML 编辑器** - 直接编辑原始 `starship.toml` 文件
- **备份管理** - 创建、恢复、重命名和删除配置备份

[English](./README.md) | [繁體中文](./README-zh_TW.md) | 简体中文

## 目录

- [截图](#截图)
- [安装](#安装)
  - [下载](#下载)
- [卸载](#卸载)
  - [Windows 卸载](#windows-卸载)
- [开发和构建](#开发和构建)
  - [开发](#开发)
  - [构建和打包](#构建和打包)
- [功能特性](#功能特性)

## 截图

<div align="center">
  <img src="./readme_img/img-1.png" width="800" />
</div>
<div align="center">
  <img src="./readme_img/img-2.png" width="800" />
</div>

<details>
  <summary><h2 style="display:inline-block;">您需要了解的内容</h2></summary>

与 `oh-my-starship` 相关的所有文件都位于系统的配置目录中：

- **配置目录**：`%APPDATA%\oh-my-starship\` (Windows)
  - `settings.json` - 存储应用程序设置（主题、语言）
  - `backups/` - 包含所有 Starship 配置备份

- **Starship 配置**：`%USERPROFILE%\.config\starship.toml`（实际被修改的 Starship 配置文件）

### 备份文件

备份使用时间戳格式命名：`starship_YYYYMMDD_HHMMSS.toml`（例如：`starship_20240118_143025.toml`）

自定义备份名称存储在浏览器的 localStorage 中，不会影响实际的文件名。

</details>

## 安装

### 下载

您可以下载源代码并自行构建，或者从 GitHub 发布页面下载构建好的版本。

- [oh-my-starship 发布页面](https://github.com/YOUR_USERNAME/oh-my-starship/releases)

## 卸载

### Windows 卸载

1. 卸载 `oh-my-starship` 应用程序
2. 删除配置目录：`%APPDATA%\oh-my-starship\`
3. 可选：删除 Starship 配置：`%USERPROFILE%\.config\starship.toml`

## 开发和构建

### 前置条件

- **Rust** - Tauri 后端所需。从 [rust-lang.org](https://www.rust-lang.org/learn/get-started) 安装
- **Node.js** - 前端所需。从 [nodejs.org](https://nodejs.org/) 安装
- **pnpm** - 包管理器。从 [pnpm.io](https://pnpm.io/) 安装

### 开发

将项目代码克隆到本地，导航到项目根目录，然后在终端中运行以下命令：

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

或者，如果您安装了 Tauri 扩展，可以在 VSCode 中按 `F5` 以调试模式启动。

### 构建和打包

```bash
# 生产构建
pnpm build
```

如果一切正常，打包文件将位于 `./src-tauri/target/release/bundle/` 目录中。

## 功能特性

- [x] **9 个内置预设** - 快速应用精美主题（Nerd Font Symbols、Pastel Powerline、Tokyo Night、Gruvbox Rainbow 等）
- [x] **模块编辑器** - 使用直观的表单配置各个 Starship 模块：
  - 字符 - 自定义成功/错误/vim 符号和样式
  - 目录 - 配置截断、样式、主目录符号
  - Git - 设置 git 分支和状态符号
  - 时间 - 在提示符中显示当前时间
  - 语言 - 管理运行时版本（Node.js、Python、Rust、Go 等）
- [x] **TOML 编辑器** - 直接编辑 `starship.toml` 并支持备份/恢复功能
- [x] **备份管理** - 轻松创建、恢复、重命名和删除备份
- [x] **实时预览** - 在终端中立即查看更改（需要重启终端）
- [x] **多语言支持** - 英语和简体中文
- [x] **主题支持** - 浅色、深色和系统主题
- [x] **TypeScript** - 完整的 TypeScript 支持以提供类型安全
- [x] **现代 UI** - 使用 React 19、Tailwind CSS 4 和 shadcn/ui 组件构建

## 技术栈

- **前端**：React 19 + TypeScript
- **后端**：Rust + Tauri v2
- **构建工具**：Vite
- **样式**：Tailwind CSS v4
- **UI 组件**：shadcn/ui (Radix UI)
- **数据管理**：TanStack Query (React Query)
- **表单**：React Hook Form + Zod
- **图标**：Lucide React
- **包管理器**：pnpm

## 许可证

MIT 许可证 - 详细信息请参阅 [LICENSE](./LICENSE) 文件

## 致谢

- [Starship](https://starship.rs/) - 适用于任何 shell 的最小、极速且极其可定制的提示符
- [Tauri](https://tauri.app/) - 构建更小、更快、更安全的桌面应用程序
- [shadcn/ui](https://ui.shadcn.com/) - 使用 Radix UI 构建的精美设计组件
- [nvm-desktop](https://github.com/1111mp/nvm-desktop) - 项目结构和架构参考
