---
name: 3d-scene
description: Build interactive 3D web experiences — Three.js, React Three Fiber, WebGL shaders, 3D floor maps, product showcases, immersive hero sections
user-invocable: true
argument-hint: "<what-to-build>"
---

# 3D Web Experiences

Build interactive 3D scenes for the web using Three.js and React Three Fiber.

**Target:** $ARGUMENTS

## When to Use 3D

### Good use cases:
- **3D Floor Map** — interactive venue layout with camera orbit, clickable tables, ambient lighting
- **Product Showcase** — rotating 3D models with lighting effects
- **Immersive Hero** — parallax 3D background for the homepage
- **Data Visualization** — 3D bar charts, revenue landscapes

### Avoid 3D when:
- Simple 2D layout works fine
- Mobile performance is critical (3D is GPU-heavy)
- The content is text-heavy (3D adds no value)
- Load time is more important than visual impact

## Setup

```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

### Dynamic Import (REQUIRED)
3D components are heavy — always dynamically import:

```typescript
import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('@/components/3d/Scene3D'), {
  ssr: false,
  loading: () => <div className="h-[400px] bg-zinc-900 animate-pulse rounded-xl" />,
})
```

## React Three Fiber Patterns

### Basic Scene Setup
```typescript
'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei'

export function Scene3D() {
  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={50} />
        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2.2}
          minDistance={5}
          maxDistance={20}
        />
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#10b981" />
        <Environment preset="night" />
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color="#10b981" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[50, 50]} />
          <meshStandardMaterial color="#18181b" metalness={0.5} roughness={0.8} />
        </mesh>
      </Canvas>
    </div>
  )
}
```

### Immersive Hero Background
```typescript
'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Sparkles } from '@react-three/drei'
import { useRef, useMemo } from 'react'
import * as THREE from 'three'

function ParticleField() {
  const points = useRef<THREE.Points>(null)

  useFrame((state) => {
    if (points.current) {
      points.current.rotation.y = state.clock.elapsedTime * 0.05
    }
  })

  const positions = useMemo(() => {
    const pos = new Float32Array(1000 * 3)
    for (let i = 0; i < 1000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 40
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40
    }
    return pos
  }, [])

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={1000}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#10b981" transparent opacity={0.6} />
    </points>
  )
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <color attach="background" args={['#09090b']} />
        <fog attach="fog" args={['#09090b', 10, 40]} />
        <ambientLight intensity={0.1} />
        <Stars radius={50} depth={50} count={2000} factor={4} fade speed={1} />
        <Sparkles count={100} scale={20} size={2} speed={0.3} color="#10b981" />
        <ParticleField />
      </Canvas>
    </div>
  )
}
```

## Performance Rules
- **Always use `dynamic()` import with `ssr: false`**
- **Provide loading fallback** — shimmer placeholder while 3D loads
- **Mobile**: reduce polygon count, particle count, disable shadows
- **Lazy load** — only render Canvas when scrolled into view
- **Dispose resources** — Three.js doesn't garbage collect; clean up on unmount

## Accessibility
- 3D scenes are decorative — add `aria-hidden="true"` to the container
- Provide a non-3D fallback for `prefers-reduced-motion`
- Don't put critical information only in 3D
- Interactive 3D elements need keyboard alternatives

## Model Assets
- Store .glb files in `public/models/`
- Keep models under 2MB for mobile performance
- Use Draco compression for large models
