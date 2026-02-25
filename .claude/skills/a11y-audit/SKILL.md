# Accessibility Audit — WCAG 2.1 AA

Audit customer-facing pages for accessibility compliance. Prioritize the primary conversion flow since accessibility directly impacts conversion on mobile.

## Priority Pages
1. Primary conversion flow (forms, checkout, booking)
2. Home / landing page
3. Feature/content pages
4. Admin dashboard (lower priority)

## Audit Checklist

### 1. Semantic HTML (Critical)
- Proper heading hierarchy: one `<h1>`, logical `h2 → h3` nesting
- Landmark elements: `<header>`, `<nav>`, `<main>`, `<footer>`
- Use semantic elements (`<button>` not `<div onClick>`, `<a>` for navigation)

### 2. ARIA Labels (Critical)
- Icon-only buttons must have `aria-label`
- Dynamic content regions use `aria-live`
- Modal dialogs use `role="dialog"` with `aria-labelledby`

### 3. Keyboard Navigation (Critical)
- Tab order matches visual order
- All interactive elements reachable by keyboard
- Modals trap focus; Escape closes them
- Skip-to-content link at top of page

### 4. Color Contrast (High)
- Normal text: 4.5:1 minimum (WCAG AA)
- Large text (18px+ or 14px+ bold): 3:1 minimum
- UI components and focus indicators: 3:1

### 5. Focus Management (High)
- `focus-visible` rings on all focusable elements
- Focus moves to modal/dialog on open
- Focus returns to trigger element on close
- Route changes reset focus to top or main content

### 6. Images & Media (Medium)
- Meaningful images have descriptive `alt` text
- Decorative images use `alt=""`
- SVG icons use `aria-hidden="true"` or `aria-label`

### 7. Form Accessibility (Critical)
- All inputs have associated `<label>` (not just placeholder)
- Error messages linked via `aria-describedby`
- Required fields marked with `aria-required`

### 8. Touch Targets (High)
- Minimum 44x44px for all interactive elements (WCAG 2.5.8)
- Adequate spacing between touch targets

### 9. Motion & Animation (Medium)
- All animations respect `prefers-reduced-motion`
- No content flashes more than 3 times per second

## Output Format

```
## Critical Issues
- [file:line] Problem → Fix (Impact: X users affected)

## High Issues
- [file:line] Problem → Fix

## Medium / Low Issues
- [file:line] Problem → Fix

## Score
- Semantic HTML: PASS/FAIL
- ARIA: PASS/FAIL
- Keyboard: PASS/FAIL
- Contrast: PASS/FAIL
- Forms: PASS/FAIL
```
