# AGENTS.md

This file provides guidance to Opencode when working with code in this repository.

## Project Overview

This is a Tauri v2 application for managing Windows Starship theme configuration files. It provides a UI to view, edit, and backup various Starship configuration files.
The overall project structure refers to https://github.com/1111mp/nvm-desktop project structure.

## Tech Stack

- **Frontend**: React 19 with TypeScript
- **Backend**: Rust with Tauri v2
- **Build Tool**: Vite with React plugin
- **Styling**: Tailwind CSS v4 via @tailwindcss/vite
- **UI Components**: shadcn/ui components
- **Data Fetching**: @tanstack/react-query
- **Forms**: react-hook-form with @hookform/resolvers and zod
- **Routing**: react-router-dom
- **Package Manager**: pnpm (required)

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm tauri dev

# Build for production
pnpm build

# Preview built app
pnpm preview

# Check TypeScript lint error

pnpm tsc --noEmit
```

## Architecture

### Frontend Structure

- `src/main.tsx` - App entry point with React Query client setup
- `src/lib/query.ts` - React Query hooks and API functions
- `src/lib/utils.ts` - Utility functions
- `src/components/ui/` - shadcn/ui components

### Backend Structure (Rust)

- `src-tauri/src/main.rs` - Tauri application entry point
- `src-tauri/src/lib.rs` - Main application setup and plugin configuration
- `src-tauri/src/commands.rs` - Tauri commands for file operations

### Data Flow

1. React Query hooks in `src/lib/query.ts` call Tauri commands
2. Tauri commands in `src-tauri/src/commands.rs` handle file I/O
3. Frontend displays config content in a textarea with JSON validation
4. Changes are saved back via mutations that invalidate relevant queries

## Code Principles

- Use functional components and hooks
- Do not use export default to export components
- Place React Query/mutation logic in `src/lib/query.ts` by default
- Write Tauri commands in `src-tauri/src/commands.rs` with well-designed names
- Do not separate components into smaller files unless explicitly requested
- Use `pnpm tsc --noEmit` instead of `pnpm tauri dev` to check TypeScript lint errors after modifying frontend code

## Important Notes

- Enterprise config files are read-only
- All file operations use async/await patterns
- JSON validation is performed client-side before saving
- DO NOT use --yes for shadcn/ui components installation
