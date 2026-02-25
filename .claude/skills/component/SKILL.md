# Scaffold React Component

Create a new component: $ARGUMENTS

## Arguments

Parse `$ARGUMENTS`:
- First arg = ComponentName in PascalCase (e.g., `PromoCodeInput`)
- `--admin` → place in `components/admin/`, use admin layout patterns
- `--booking` → place in `components/booking/`, use customer-facing patterns
- `--page` → create as a page component in `app/`, includes metadata export
- No flag → place in `components/` root or infer from name

## Before Scaffolding

1. Check if a similar component already exists:
   - Search `components/` for related names
   - If something close exists, suggest extending it instead of creating a new one

2. Look at neighboring components in the target directory to match the local style and imports.

## Component Template

Generate with these project conventions:

### Imports
```typescript
'use client' // only if component uses hooks, event handlers, or browser APIs

import { useState, useEffect } from 'react' // only what's needed
// Radix UI primitives over custom implementations
// Lucide icons: import { IconName } from 'lucide-react'
```

### Styling Rules
- Use Tailwind classes exclusively — no inline styles, no CSS modules
- **Primary color** → use `bg-emerald-500` (gets overridden by theme system via CSS variables)
- **Text on primary backgrounds** → use `text-[var(--color-on-primary)]`, NOT `text-white`
- **Text on accent backgrounds** → use `text-[var(--color-on-accent)]`
- **Borders** → `border-zinc-800` or `border-white/10`
- **Glass effect** → `bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl`

### Mobile Responsiveness
- Touch targets: minimum 44px (`min-h-[44px] min-w-[44px]`)
- Use responsive Tailwind: `text-sm md:text-base`, `p-3 md:p-4`, `gap-2 md:gap-3`
- Stack on mobile, row on desktop: `flex flex-col md:flex-row`

### TypeScript
- Define props interface above the component
- Export as named export (not default) unless it's a page
- Use `React.FC` sparingly — prefer explicit return types or let inference work

### Structure
```typescript
interface ComponentNameProps {
  // props
}

export function ComponentName({ ...props }: ComponentNameProps) {
  // hooks first
  // derived state
  // handlers
  // render
}
```

## After Scaffolding

Tell the user:
- Where the file was created
- What props it accepts
- If any new Tailwind color classes were used, whether they need CSS overrides in `globals.css`
- Suggested next steps (wire up data, add to a page, etc.)
