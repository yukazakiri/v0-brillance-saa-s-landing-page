# Agent Development Guide

This document provides guidelines for AI coding agents working in this repository.

## Project Overview

Next.js 16 application for Data Center College of The Philippines, built with v0.app.
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS 4.x
- **UI Components**: Radix UI + shadcn/ui
- **CMS**: Sanity CMS
- **Deployment**: Vercel

## Build & Development Commands

```bash
# Development server with localStorage support
npm run dev
# or for standard dev
next dev

# Production build
npm run build

# Lint all files
npm run lint

# Start production server
npm start
```

**Note**: There are no test scripts configured. Tests should be run manually if added.

## Code Style Guidelines

### Import Organization

1. React and Next.js imports first
2. Third-party libraries
3. Internal utilities and libs (`@/lib/*`)
4. Components (`@/components/*`)
5. Types (use `type` keyword for type-only imports)

```typescript
import type React from "react"
import type { Metadata } from "next"

import { createClient } from "next-sanity"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Settings } from "@/lib/sanity/types"
```

### File Naming Conventions

- Components: `kebab-case.tsx` (e.g., `hero-section.tsx`)
- Pages: `page.tsx` in directory structure
- API routes: `route.ts`
- Utilities: `kebab-case.ts`
- Types: defined in dedicated `types.ts` files

### Component Structure

**Client Components**:
```typescript
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export default function MyComponent() {
  const [state, setState] = useState(false)
  return <div>...</div>
}
```

**Server Components** (default):
```typescript
import type { Settings } from "@/lib/sanity/types"

export default async function MyPage() {
  const data = await fetchData()
  return <div>...</div>
}
```

### TypeScript Guidelines

- **Strict mode enabled**: All type errors must be resolved
- Use `type` keyword for type-only imports
- Define prop interfaces inline or in types files
- Use `React.ComponentProps<"element">` for extending native elements
- Prefer `type` over `interface` for consistency

```typescript
// Good
import type React from "react"
type ButtonProps = React.ComponentProps<"button"> & {
  variant?: "primary" | "secondary"
}

// Avoid
import React from "react"
interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "primary" | "secondary"
}
```

### Styling & Tailwind

- Use the `cn()` utility from `@/lib/utils` to merge class names
- Prefer Tailwind utility classes over custom CSS
- Use CSS variables for theme colors (defined in globals.css)
- Follow mobile-first responsive design: `sm:`, `md:`, `lg:`, `xl:`, `2xl:`

```typescript
import { cn } from "@/lib/utils"

<div className={cn(
  "base-classes",
  variant === "primary" && "variant-classes",
  className
)} />
```

### Component Patterns

**shadcn/ui components**:
- Located in `components/ui/`
- Use `class-variance-authority` (cva) for variants
- Export both component and variants

**Page components**:
- Use async server components for data fetching
- Handle errors gracefully with try-catch
- Provide fallback data if external services fail

```typescript
export default async function Page() {
  let data = []
  
  try {
    data = await fetchData()
  } catch (error) {
    console.error("Error fetching data:", error)
    // Continue with empty/default data
  }
  
  return <div>...</div>
}
```

### Path Aliases

Use `@/*` alias for all internal imports:
```typescript
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { Settings } from "@/lib/sanity/types"
```

### Error Handling

- Use try-catch blocks for async operations
- Log errors with `console.error()`
- Provide graceful fallbacks for failed data fetches
- Don't throw errors that break the UI unnecessarily

### Naming Conventions

**Variables/Functions**: camelCase
```typescript
const siteSettings = settings ?? defaultSettings
const fetchLatestPosts = async () => {}
```

**Components**: PascalCase
```typescript
export default function HeroSection() {}
```

**Constants**: UPPER_SNAKE_CASE or camelCase
```typescript
const API_VERSION = "2025-11-16"
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
```

**CSS Classes**: Follow Tailwind patterns, use descriptive names for custom classes

### Environment Variables

- Prefix public vars with `NEXT_PUBLIC_`
- Provide fallback values for optional env vars
- Never commit `.env` files

```typescript
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "4pzjiopf"
const hasToken = Boolean(process.env.SANITY_API_TOKEN)
```

## Best Practices

1. **Prefer Server Components**: Only use `'use client'` when necessary (state, effects, browser APIs)
2. **Data Fetching**: Use async/await in server components, handle Promise.all for parallel requests
3. **Type Safety**: Leverage TypeScript's type inference, avoid `any`
4. **Accessibility**: Use semantic HTML, proper ARIA labels
5. **Performance**: Use Next.js Image component, lazy load when appropriate
6. **Code Reuse**: Extract common patterns into utilities and components

## Build Configuration

- **TypeScript**: Strict mode, ES6 target
- **Next.js**: ESLint and TypeScript errors ignored during builds (fix before committing)
- **Images**: Unoptimized (set to true in next.config.mjs)

## Git Workflow

- Commit messages should be descriptive
- This repo syncs automatically with v0.app deployments
- Changes made on v0.app are pushed to this repository
- Vercel automatically deploys from this repository
