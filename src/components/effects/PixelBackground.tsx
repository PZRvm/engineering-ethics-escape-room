import { useRef, useEffect } from 'react'

// ==================== 颜色常量 ====================

const C = {
  green: '#41a6f6',
  greenBright: '#73eff7',
  gold: '#f77622',
  goldBright: '#ffcd75',
  cyan: '#38b764',
  cyanBright: '#a7f070',
  purple: '#5d275d',
  white: '#f4f4f4',
} as const

// ==================== 静态粒子数据 ====================

interface Star { x: number; y: number; color: string; duration: number; delay: number; size: number }
interface Drift { x: number; color: string; duration: number; delay: number; size: number }
interface Rain { x: number; color: string; duration: number; delay: number }
interface Circuit { x: number; y: number; length: number; vertical: boolean }

const STAR_COLORS = [C.greenBright, C.green, C.goldBright, C.white, C.cyanBright]
const STARS: Star[] = Array.from({ length: 60 }, (_, i) => ({
  x: ((i * 73 + 17) % 100) / 100,
  y: ((i * 47 + 31) % 100) / 100,
  color: STAR_COLORS[i % STAR_COLORS.length],
  duration: (2 + (i % 4)) * 1000,
  delay: ((i * 0.3) % 5) * 1000,
  size: i % 5 === 0 ? 6 : i % 3 === 0 ? 4 : 2,
}))

const DRIFT_COLORS = [C.green, C.gold, C.cyan, C.greenBright, C.purple]
const DRIFTS: Drift[] = Array.from({ length: 12 }, (_, i) => ({
  x: (((i * 83 + 11) % 96) + 2) / 100,
  color: DRIFT_COLORS[i % DRIFT_COLORS.length],
  duration: (10 + (i % 8) * 2) * 1000,
  delay: i * 1500,
  size: i % 3 === 0 ? 8 : i % 2 === 0 ? 6 : 4,
}))

const RAIN_COLORS = [C.green, C.cyan, C.greenBright]
const RAINS: Rain[] = Array.from({ length: 15 }, (_, i) => ({
  x: (((i * 67 + 23) % 98) + 1) / 100,
  color: RAIN_COLORS[i % RAIN_COLORS.length],
  duration: (6 + (i % 6)) * 1000,
  delay: i * 800,
}))

const CIRCUITS: Circuit[] = [
  { x: 0.10, y: 0.15, length: 120, vertical: false },
  { x: 0.85, y: 0.30, length: 80, vertical: false },
  { x: 0.25, y: 0.70, length: 150, vertical: false },
  { x: 0.60, y: 0.10, length: 100, vertical: false },
  { x: 0.15, y: 0.05, length: 180, vertical: true },
  { x: 0.75, y: 0.20, length: 120, vertical: true },
  { x: 0.92, y: 0.08, length: 60, vertical: true },
]

// ==================== 动画数学 ====================

/** 计算 star 的 steps(2) 闪烁透明度 */
function starOpacity(now: number, star: Star): number {
  const t = ((now + star.delay) % star.duration) / star.duration
  // steps(2): 前半段 opacity=0.15, 后半段 opacity=0.9
  return t < 0.5 ? 0.15 : 0.9
}

/** 计算 drift-up 粒子的位置和透明度 */
function driftState(now: number, drift: Drift, h: number): { x: number; y: number; opacity: number } {
  const cycle = drift.duration
  const progress = ((now + drift.delay) % cycle) / cycle
  const y = h * (1 - progress)
  const x = progress * 20
  const opacity = progress < 0.1 ? progress / 0.1 * 0.6
    : progress > 0.9 ? (1 - progress) / 0.1 * 0.6
    : 0.6
  return { x, y, opacity }
}

/** 计算 rain 下落粒子的位置和透明度 */
function rainState(now: number, rain: Rain, h: number): { y: number; opacity: number } {
  const cycle = rain.duration
  const progress = ((now + rain.delay) % cycle) / cycle
  const y = -20 + (h + 20) * progress
  const opacity = progress < 0.1 ? progress / 0.1 * 0.5
    : progress > 0.9 ? (1 - progress) / 0.1 * 0.5
    : 0.5
  return { y, opacity }
}

// ==================== 绘制函数 ====================

function drawStars(ctx: CanvasRenderingContext2D, w: number, h: number, now: number) {
  for (const star of STARS) {
    ctx.globalAlpha = starOpacity(now, star)
    ctx.fillStyle = star.color
    const px = star.x * w
    const py = star.y * h
    ctx.fillRect(Math.round(px), Math.round(py), star.size, star.size)
  }
}

function drawDrifts(ctx: CanvasRenderingContext2D, w: number, h: number, now: number) {
  for (const drift of DRIFTS) {
    const { x, y, opacity } = driftState(now, drift, h)
    ctx.globalAlpha = opacity
    ctx.fillStyle = drift.color
    const px = drift.x * w + x
    ctx.fillRect(Math.round(px), Math.round(y), drift.size, drift.size)
  }
}

function drawRain(ctx: CanvasRenderingContext2D, w: number, h: number, now: number) {
  for (const rain of RAINS) {
    const { y, opacity } = rainState(now, rain, h)
    ctx.globalAlpha = opacity
    ctx.fillStyle = rain.color
    const px = rain.x * w
    ctx.fillRect(Math.round(px), Math.round(y), 4, 4)
  }
}

function drawCircuits(ctx: CanvasRenderingContext2D, w: number, h: number, now: number) {
  const pulseCycle = 4000
  const progress = (now % pulseCycle) / pulseCycle

  for (const circuit of CIRCUITS) {
    ctx.globalAlpha = 0.15
    const cx = circuit.x * w
    const cy = circuit.y * h

    if (circuit.vertical) {
      const len = circuit.length
      const grad = ctx.createLinearGradient(cx, cy, cx, cy + len)
      const center = progress
      grad.addColorStop(Math.max(0, center - 0.3), 'transparent')
      grad.addColorStop(Math.max(0, center - 0.15), C.green)
      grad.addColorStop(center, C.greenBright)
      grad.addColorStop(Math.min(1, center + 0.15), C.green)
      grad.addColorStop(Math.min(1, center + 0.3), 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(cx, cy, 2, len)
    } else {
      const len = circuit.length
      const grad = ctx.createLinearGradient(cx, cy, cx + len, cy)
      const center = progress
      grad.addColorStop(Math.max(0, center - 0.3), 'transparent')
      grad.addColorStop(Math.max(0, center - 0.15), C.green)
      grad.addColorStop(center, C.greenBright)
      grad.addColorStop(Math.min(1, center + 0.15), C.green)
      grad.addColorStop(Math.min(1, center + 0.3), 'transparent')
      ctx.fillStyle = grad
      ctx.fillRect(cx, cy, len, 2)
    }
  }
}

// ==================== 组件 ====================

const CANVAS_STYLE: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  zIndex: 0,
  pointerEvents: 'none',
  imageRendering: 'pixelated',
}

export default function PixelBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = window.innerWidth + 'px'
      canvas.style.height = window.innerHeight + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()

    const ro = new ResizeObserver(resize)
    ro.observe(document.documentElement)

    const animate = (now: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)
      ctx.globalAlpha = 1

      drawStars(ctx, w, h, now)
      drawDrifts(ctx, w, h, now)
      drawRain(ctx, w, h, now)
      drawCircuits(ctx, w, h, now)

      rafRef.current = requestAnimationFrame(animate)
    }
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} style={CANVAS_STYLE} />
      {/* CRT 扫描线覆盖层（保持 DOM，需要 z-index: 9999） */}
      <div className="scanline-overlay" />
    </>
  )
}
