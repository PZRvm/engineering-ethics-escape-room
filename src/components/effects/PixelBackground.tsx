/* ---- 静态配置（避免每次渲染重新计算）---- */

const STAR_COLORS = [
  'var(--color-pixel-green-bright)',
  'var(--color-pixel-green)',
  'var(--color-pixel-gold-bright)',
  'var(--color-text-primary)',
  'var(--color-pixel-cyan-bright)',
]

const STARS = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: ((i * 73 + 17) % 100),
  y: ((i * 47 + 31) % 100),
  color: STAR_COLORS[i % STAR_COLORS.length],
  duration: 2 + (i % 4),
  delay: (i * 0.3) % 5,
  size: i % 5 === 0 ? 6 : i % 3 === 0 ? 4 : 2,
}))

const DRIFT_COLORS = [
  'var(--color-pixel-green)',
  'var(--color-pixel-gold)',
  'var(--color-pixel-cyan)',
  'var(--color-pixel-green-bright)',
  'var(--color-pixel-purple)',
]

const DRIFTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  x: ((i * 83 + 11) % 96) + 2,
  color: DRIFT_COLORS[i % DRIFT_COLORS.length],
  duration: 10 + (i % 8) * 2,
  delay: i * 1.5,
  size: i % 3 === 0 ? 8 : i % 2 === 0 ? 6 : 4,
}))

const RAIN_COLORS = [
  'var(--color-pixel-green)',
  'var(--color-pixel-cyan)',
  'var(--color-pixel-green-bright)',
]

const RAINS = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: ((i * 67 + 23) % 98) + 1,
  color: RAIN_COLORS[i % RAIN_COLORS.length],
  duration: 6 + (i % 6),
  delay: i * 0.8,
}))

const CIRCUITS = [
  { id: 0, x: 10, y: 15, width: 120, vertical: false },
  { id: 1, x: 85, y: 30, width: 80, vertical: false },
  { id: 2, x: 25, y: 70, width: 150, vertical: false },
  { id: 3, x: 60, y: 10, width: 100, vertical: false },
  { id: 4, x: 15, y: 5, width: 180, vertical: true },
  { id: 5, x: 75, y: 20, width: 120, vertical: true },
  { id: 6, x: 92, y: 8, width: 60, vertical: true },
]

export default function PixelBackground() {
  return (
    <>
      {/* CRT scanline overlay */}
      <div className="scanline-overlay" />

      {/* 闪烁星星 */}
      {STARS.map(star => (
        <div
          key={`star-${star.id}`}
          className="pixel-star"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: star.size,
            height: star.size,
            backgroundColor: star.color,
            '--duration': `${star.duration}s`,
            '--delay': `${star.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* 上浮像素块 */}
      {DRIFTS.map(d => (
        <div
          key={`drift-${d.id}`}
          className="pixel-drift"
          style={{
            left: `${d.x}%`,
            bottom: `-${d.size}px`,
            width: d.size,
            height: d.size,
            backgroundColor: d.color,
            '--duration': `${d.duration}s`,
            '--delay': `${d.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* 像素雨（下落小方块）*/}
      {RAINS.map(r => (
        <div
          key={`rain-${r.id}`}
          className="pixel-rain"
          style={{
            left: `${r.x}%`,
            top: 0,
            backgroundColor: r.color,
            '--duration': `${r.duration}s`,
            '--delay': `${r.delay}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* 电路脉冲装饰线 */}
      {CIRCUITS.map(c => (
        <div
          key={`circuit-${c.id}`}
          className={`circuit-line${c.vertical ? ' vertical' : ''}`}
          style={{
            left: `${c.x}%`,
            top: `${c.y}%`,
            ...(c.vertical
              ? { height: c.width }
              : { width: c.width }),
          }}
        />
      ))}
    </>
  )
}
