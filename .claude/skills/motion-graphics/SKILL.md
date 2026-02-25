---
name: motion-graphics
description: Create motion graphics — Lottie animations, animated SVGs, Canvas graphics, particle effects, confetti, data visualizations
user-invocable: true
argument-hint: "<what-to-create>"
---

# Motion Graphics

Create rich visual effects using Lottie, animated SVGs, HTML5 Canvas, and programmatic graphics.

**Target:** $ARGUMENTS

## Library Options

| Library | Best For | Bundle Size |
|---------|---------|-------------|
| **Lottie** (`lottie-react`) | After Effects animations as JSON, complex character animations, premium loading states | ~50KB |
| **SVG + CSS** | Animated icons, progress indicators, morphing shapes, line draws | 0KB (native) |
| **Canvas** (`react-konva`) | Floor plan rendering, image manipulation, custom paint tools | ~150KB |
| **Confetti** (`canvas-confetti`) | Celebration effects on booking confirmation | ~6KB |
| **Rive** (`@rive-app/react-canvas`) | Interactive state-based animations, animated buttons | ~150KB |

## Lottie Animations

```bash
npm install lottie-react
```

```typescript
'use client'
import dynamic from 'next/dynamic'
const Lottie = dynamic(() => import('lottie-react'), { ssr: false })
import successAnimation from '@/public/animations/success.json'

export function SuccessAnimation() {
  return (
    <Lottie
      animationData={successAnimation}
      loop={false}
      autoplay
      style={{ width: 200, height: 200 }}
    />
  )
}
```

Store JSON files in `public/animations/`. Keep under 100KB for mobile.

## Animated SVGs

### Line Draw Animation
```tsx
export function AnimatedCheckmark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 52 52">
      <circle
        cx="26" cy="26" r="25"
        fill="none" stroke="currentColor" strokeWidth="2"
        style={{ strokeDasharray: 157, strokeDashoffset: 157 }}
        className="animate-[circle-draw_0.6s_ease-in-out_forwards]"
      />
      <path
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
        fill="none" stroke="currentColor" strokeWidth="3"
        strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 36, strokeDashoffset: 36 }}
        className="animate-[check-draw_0.3s_0.6s_ease-in-out_forwards]"
      />
    </svg>
  )
}
// Add to globals.css:
// @keyframes circle-draw { to { stroke-dashoffset: 0; } }
// @keyframes check-draw { to { stroke-dashoffset: 0; } }
```

### Animated Progress Ring
```tsx
export function ProgressRing({ progress, size = 120 }: { progress: number; size?: number }) {
  const strokeWidth = 8
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const offset = circumference - (progress / 100) * circumference

  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size/2} cy={size/2} r={radius} fill="none"
        stroke="rgba(255,255,255,0.1)" strokeWidth={strokeWidth} />
      <circle cx={size/2} cy={size/2} r={radius} fill="none"
        stroke="var(--color-primary)" strokeWidth={strokeWidth}
        strokeLinecap="round" strokeDasharray={circumference}
        strokeDashoffset={offset}
        className="transition-[stroke-dashoffset] duration-500 ease-out" />
    </svg>
  )
}
```

## Confetti Effect

```bash
npm install canvas-confetti
```

```typescript
'use client'
import confetti from 'canvas-confetti'

export function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#10b981', '#f59e0b', '#ffffff'],
  })
}
```

## File Organization
- Lottie JSON: `public/animations/{name}.json`
- Animated SVG components: `components/graphics/{Name}.tsx`
- Canvas utilities: `lib/canvas/{name}.ts`

## Performance Rules
- **Dynamic import** all heavy libraries
- **Lazy render** — only render when visible (IntersectionObserver)
- **Mobile**: reduce particle counts, disable Canvas animations on low-end devices

## Accessibility
- `canvas` elements need `aria-label` or `role="img"` with description
- Animated SVGs should respect `prefers-reduced-motion`
- Don't convey critical information solely through animation
