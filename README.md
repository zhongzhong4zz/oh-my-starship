<div align="center">
  <img src="./readme-icon.png" width="96" height="96" />
</div>
<p align="center"><a href="https://github.com/zhongzhong4zz/oh-my-starship/blob/main/LICENSE"><img alt="" src="https://img.shields.io/badge/License-MIT-blue"></a></p>

# oh-my-starship

`oh-my-starship` is a desktop application that helps you manage your [Starship](https://starship.rs/) prompt configuration through a visual interface. The application is built using [Tauri](https://v2.tauri.app/) and supports `Windows` systems.

It provides an easy-to-use graphical interface for configuring your Starship prompt, including:

- **Preset Selection** - 9 built-in themes (Nerd Font Symbols, Pastel Powerline, Tokyo Night, etc.)
- **Module Editor** - Configure individual prompt modules (Character, Directory, Git, Time, Languages)
- **TOML Editor** - Edit the raw `starship.toml` file directly
- **Backup Management** - Create, restore, rename, and delete configuration backups

English | [繁體中文](./README-zh_TW.md) | [简体中文](./README-zh_CN.md)

## Table of Contents

- [Screenshot](#screenshot)
- [Install](#install)
  - [Download](#download)
- [Uninstall](#uninstall)
  - [Windows Uninstall](#windows-uninstall)
- [Develop and Build](#develop-and-build)
  - [Development](#development)
  - [Build and Package](#build-and-package)
- [Features](#features)

## Screenshot

| Presets | Character Modules |
| :-----: | :-----: |
| ![Presets](readme_img/Presets.png) | ![Character Modules](readme_img/Character-Modules.png) |

| Git Modules | Backup Management |
| :-----: | :-----: |
| ![Git Modules](readme_img/Git-Modules.png) | ![Backup Management](readme_img/Backup-Management.png) |

<details>
  <summary><h2 style="display:inline-block;">Maybe somethings you need to know</h2></summary>

All files related to `oh-my-starship` are located in your system's config directory:

- **Config Directory**: `%APPDATA%\oh-my-starship\` (Windows)
  - `settings.json` - Stores application settings (theme, language)
  - `backups/` - Contains all Starship configuration backups

- **Starship Config**: `%USERPROFILE%\.config\starship.toml` (the actual Starship configuration file that gets modified)

### Backup Files

Backups are named with timestamp format: `starship_YYYYMMDD_HHMMSS.toml` (e.g., `starship_20240118_143025.toml`)

Custom backup names are stored in browser localStorage and do not affect the actual file names.

</details>

## Install

### Download

You can download the source code and build it yourself, or download the built version from GitHub releases.

- [oh-my-starship Releases](https://github.com/zhongzhong4zz/oh-my-starship/releases)

## Uninstall

### Windows Uninstall

1. Uninstall the `oh-my-starship` application
2. Remove the config directory: `%APPDATA%\oh-my-starship\`
3. Optionally, remove the Starship config: `%USERPROFILE%\.config\starship.toml`

## Develop and Build

### Prerequisites

- **Rust** - Required for the Tauri backend. Install from [rust-lang.org](https://www.rust-lang.org/learn/get-started)
- **Node.js** - Required for the frontend. Install from [nodejs.org](https://nodejs.org/)
- **pnpm** - Package manager. Install from [pnpm.io](https://pnpm.io/)

### Development

Clone the project code to your local machine, navigate to the project's root directory, and run the following commands in your terminal:

```bash
# Install dependencies
pnpm install

# Start development server
pnpm tauri dev
```

Alternatively, you can press `F5` in VSCode to start in debug mode (if you have the Tauri extension installed).

### Build and Package

```bash
# Build for production
pnpm tauri build
```

If everything goes well, the packaged files will be in the `./src-tauri/target/release/bundle/` directory.

## Features

- [x] **9 Built-in Presets** - Quickly apply beautiful themes (Nerd Font Symbols, Pastel Powerline, Tokyo Night, Gruvbox Rainbow, etc.)
- [x] **Module Editor** - Configure individual Starship modules with intuitive forms:
  - Character - Customize success/error/vim symbols and style
  - Directory - Configure truncation, style, home symbol
  - Git - Set git branch and status symbols
  - Time - Display current time in prompt
  - Languages - Manage runtime versions (Node.js, Python, Rust, Go, etc.)
- [x] **TOML Editor** - Raw editing of `starship.toml` with backup/restore functionality
- [x] **Backup Management** - Create, restore, rename, and delete backups with ease
- [x] **Real-time Preview** - See changes immediately in your terminal (requires terminal restart)
- [x] **Multi-language Support** - English and Simplified Chinese
- [x] **Theme Support** - Light, Dark, and System themes
- [x] **TypeScript** - Full TypeScript support for type safety
- [x] **Modern UI** - Built with React 19, Tailwind CSS 4, and shadcn/ui components

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Backend**: Rust with Tauri v2
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (Radix UI)
- **Data Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Package Manager**: pnpm

## License

MIT License - see [LICENSE](./LICENSE) file for details

## Acknowledgments

- [Starship](https://starship.rs/) - The minimal, blazing-fast, and extremely customizable prompt for any shell
- [Tauri](https://tauri.app/) - Build smaller, faster, and more secure desktop applications
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components built with Radix UI
- [nvm-desktop](https://github.com/1111mp/nvm-desktop) - Project structure and architecture reference
