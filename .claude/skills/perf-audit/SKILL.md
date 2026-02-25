# Next.js Performance Audit

Systematically evaluate Next.js app performance across seven dimensions.

## Audit Dimensions

### 1. Build Analysis
- Run `npm run build` and review output
- Flag routes exceeding 200KB first-load JS
- Identify static routes that could be statically generated

### 2. Client Component Audit
- Search for unnecessary `'use client'` directives
- Components only need `'use client'` for: React hooks, event handlers, browser APIs, context consumers
- Flag large client components (>300 lines) for potential splitting

### 3. Image Optimization
- Find raw `<img>` tags that should use `next/image`
- Check for missing `priority` attribute on above-the-fold images
- Review `public/` for unoptimized assets

### 4. Data Fetching Patterns
- Find async page components missing Suspense boundaries
- Identify client-side data fetching that could move server-side
- Surface caching opportunities via `unstable_cache` or `revalidate`

### 5. Bundle Optimization
- Identify heavy dependencies not wrapped in `dynamic()`
- Good candidates: calendars, chart libs, image editors, maps, chat widgets
- Check for tree-shaking opportunities in barrel exports

### 6. Rendering Performance
- Find inline object/array creation in JSX props (causes re-renders)
- Identify missing `useMemo`/`useCallback` on expensive computations
- Flag unvirtualized lists rendering 50+ items

### 7. CSS Performance
- Check animations use `transform`/`opacity` only (not `width`/`height`)
- Review Tailwind safelist for unused entries

## Report Format

```
## Critical Issues (fix immediately)
- [file:line] Issue → Fix

## Optimization Opportunities
- [file:line] Issue → Estimated impact

## Strengths
- [what's already well-optimized]

## Metrics Summary
- First Load JS: X KB (target: <200KB)
- Lighthouse Performance: X (target: 95+)
```
