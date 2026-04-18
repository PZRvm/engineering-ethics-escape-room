import { Group, Rect, Line, Circle, Text } from 'react-konva'

// ==================== Color Palette ====================

const COLORS = {
  // Backgrounds
  bgDark: '#1a1c2c',
  bgMid: '#262b44',
  bgLight: '#333c57',
  // Primary / Screen glow
  blue: '#41a6f6',
  cyan: '#73eff7',
  // Accent
  green: '#38b764',
  greenBright: '#a7f070',
  // Warm
  orange: '#f77622',
  gold: '#ffcd75',
  // Pink / Red
  red: '#b13e53',
  // Purple
  purple: '#5d275d',
  // Text
  textPrimary: '#f4f4f4',
  textMid: '#94b0c2',
  textDark: '#566c86',
  // Borders
  border: '#000000',
  borderLight: '#566c86',
} as const

// ==================== Component Interface ====================

interface ScreenDecorProps {
  width: number    // pixel width (already converted from percentages)
  height: number   // pixel height (already converted from percentages)
  decorId: string  // e.g. 'timeline-screen', 'stone-tablet', etc.
  x: number        // pixel x position
  y: number        // pixel y position
}

// ==================== Helper: pixel-snap ====================

/** Round to nearest 2 for pixel-art alignment */
const px = (n: number): number => Math.round(n / 2) * 2

// ==================== Main Component ====================

export default function ScreenDecor({ width, height, decorId, x, y }: ScreenDecorProps) {
  const w = width
  const h = height

  // Dispatch to the correct sub-renderer based on decorId
  const renderContent = () => {
    switch (decorId) {
      case 'timeline-screen':
        return <TimelineScreen w={w} h={h} />
      case 'stone-tablet':
      case 'stone-tablet-1':
      case 'stone-tablet-2':
        return <StoneTablet w={w} h={h} decorId={decorId} />
      case 'blueprint':
        return <BlueprintDisplay w={w} h={h} />
      case 'data-node':
        return <DataNode w={w} h={h} />
      case 'legal-doc':
        return <LegalDoc w={w} h={h} />
      case 'chain-link':
      case 'chain-link-2':
        return <ChainLink w={w} h={h} />
      case 'monitor':
        return <Monitor w={w} h={h} />
      default:
        return <GenericScreen w={w} h={h} />
    }
  }

  return (
    <Group x={x} y={y}>
      {renderContent()}
    </Group>
  )
}

// =====================================================================
// 1. Timeline Screen — wall-mounted display with timeline visualization
// =====================================================================

function TimelineScreen({ w, h }: { w: number; h: number }) {
  const borderW = 4
  const screenX = borderW
  const screenY = borderW
  const screenW = w - borderW * 2
  const screenH = h - borderW * 2

  // Timeline parameters — scale proportionally
  const lineY1 = screenY + screenH * 0.25
  const lineY2 = screenY + screenH * 0.5
  const lineY3 = screenY + screenH * 0.75
  const lineStartX = screenX + px(screenW * 0.08)
  const lineEndX = screenX + screenW - px(screenW * 0.08)

  // Timeline event dots — evenly distributed
  const dotCount = 5
  const dots = Array.from({ length: dotCount }, (_, i) => ({
    x: lineStartX + ((lineEndX - lineStartX) / (dotCount - 1)) * i,
    lineIdx: i % 3,
    size: i % 2 === 0 ? px(screenH * 0.04) : px(screenH * 0.03),
  }))

  // Label positions
  const labelY = screenY + px(screenH * 0.07)

  return (
    <>
      {/* Outer frame / bezel */}
      <Rect
        x={0} y={0}
        width={w} height={h}
        fill={COLORS.borderLight}
        stroke={COLORS.border}
        strokeWidth={3}
      />

      {/* Dark screen face */}
      <Rect
        x={screenX} y={screenY}
        width={screenW} height={screenH}
        fill={COLORS.bgDark}
      />

      {/* Screen glow overlay */}
      <Rect
        x={screenX} y={screenY}
        width={screenW} height={screenH}
        fill={COLORS.blue}
        opacity={0.06}
      />

      {/* Title label */}
      <Text
        x={screenX + px(screenW * 0.04)}
        y={labelY}
        text="TIMELINE"
        fontSize={px(Math.max(10, screenH * 0.09))}
        fontFamily="Silkscreen, monospace"
        fill={COLORS.cyan}
        opacity={0.8}
      />

      {/* Three horizontal timeline lines */}
      {[lineY1, lineY2, lineY3].map((ly, idx) => (
        <Line
          key={`tl-line-${idx}`}
          points={[lineStartX, ly, lineEndX, ly]}
          stroke={COLORS.cyan}
          strokeWidth={2}
          opacity={0.5}
        />
      ))}

      {/* Event dots on timeline lines */}
      {dots.map((dot, i) => {
        const ly = dot.lineIdx === 0 ? lineY1 : dot.lineIdx === 1 ? lineY2 : lineY3
        return (
          <Rect
            key={`tl-dot-${i}`}
            x={dot.x - dot.size / 2}
            y={ly - dot.size / 2}
            width={dot.size}
            height={dot.size}
            fill={COLORS.orange}
          />
        )
      })}

      {/* Connecting vertical segments between dots and their timeline */}
      {dots.slice(0, -1).map((dot, i) => {
        const nextDot = dots[i + 1]
        const ly1 = dot.lineIdx === 0 ? lineY1 : dot.lineIdx === 1 ? lineY2 : lineY3
        const ly2 = nextDot.lineIdx === 0 ? lineY1 : nextDot.lineIdx === 1 ? lineY2 : lineY3
        if (ly1 === ly2) return null
        const midX = (dot.x + nextDot.x) / 2
        return (
          <Line
            key={`tl-seg-${i}`}
            points={[midX, ly1, midX, ly2]}
            stroke={COLORS.cyan}
            strokeWidth={1}
            opacity={0.3}
            dash={[4, 4]}
          />
        )
      })}

      {/* Small tick marks along bottom line */}
      {Array.from({ length: 8 }).map((_, i) => {
        const tx = lineStartX + ((lineEndX - lineStartX) / 7) * i
        return (
          <Line
            key={`tl-tick-${i}`}
            points={[tx, lineY3 + 2, tx, lineY3 + px(screenH * 0.04)]}
            stroke={COLORS.textDark}
            strokeWidth={1}
            opacity={0.4}
          />
        )
      })}
    </>
  )
}

// =====================================================================
// 2. Stone Tablet — ancient stone with glowing runes
// =====================================================================

function StoneTablet({ w, h, decorId }: { w: number; h: number; decorId: string }) {
  // Slightly trapezoidal shape: top wider than bottom
  const topInset = px(w * 0.02)
  const bottomInset = px(w * 0.08)
  const bodyW = w - 6 // account for border stroke

  // Stone surface dimensions
  const stoneX = 3
  const stoneY = 3
  const stoneW = bodyW
  const stoneH = h - 6

  // Rune patterns vary by tablet variant
  const variantOffset = decorId === 'stone-tablet-1' ? 0 : decorId === 'stone-tablet-2' ? 3 : 6

  // Generate rune-like small rectangles arranged in a grid
  const runeCols = 4
  const runeRows = 5
  const runeAreaX = stoneX + stoneW * 0.1
  const runeAreaY = stoneY + stoneH * 0.12
  const runeAreaW = stoneW * 0.8
  const runeAreaH = stoneH * 0.76
  const cellW = runeAreaW / runeCols
  const cellH = runeAreaH / runeRows

  // Each rune is a set of small rects; we use a deterministic pattern based on position + variant
  const runes: { rx: number; ry: number; rw: number; rh: number }[] = []
  for (let r = 0; r < runeRows; r++) {
    for (let c = 0; c < runeCols; c++) {
      const seed = (r * 7 + c * 13 + variantOffset * 3) % 10
      if (seed < 6) {
        // Draw a rune block
        const cx = runeAreaX + c * cellW + cellW * 0.2
        const cy = runeAreaY + r * cellH + cellH * 0.2
        const rw = cellW * (seed < 3 ? 0.6 : 0.3)
        const rh = cellH * (seed < 3 ? 0.3 : 0.6)
        runes.push({ rx: px(cx), ry: px(cy), rw: px(rw), rh: px(rh) })
      }
    }
  }

  return (
    <>
      {/* Main stone body — wider at top, narrower at bottom */}
      <Rect
        x={topInset} y={0}
        width={w - topInset * 2} height={h}
        fill={COLORS.borderLight}
        stroke={COLORS.border}
        strokeWidth={3}
      />
      {/* Bottom narrower portion — overlay two rects to approximate trapezoid */}
      <Rect
        x={bottomInset} y={h * 0.6}
        width={w - bottomInset * 2} height={h * 0.4}
        fill={COLORS.borderLight}
      />
      {/* Bottom border for narrower section */}
      <Line
        points={[bottomInset, h * 0.6, topInset, h * 0.6]}
        stroke={COLORS.border}
        strokeWidth={2}
      />
      <Line
        points={[w - bottomInset, h * 0.6, w - topInset, h * 0.6]}
        stroke={COLORS.border}
        strokeWidth={2}
      />

      {/* Inner stone surface */}
      <Rect
        x={stoneX + 4} y={stoneY + 4}
        width={stoneW - 8} height={stoneH - 8}
        fill={COLORS.bgLight}
        opacity={0.5}
      />

      {/* Stone texture lines — horizontal scratches */}
      {[0.2, 0.4, 0.55, 0.7, 0.85].map((pct, i) => (
        <Line
          key={`stone-scratch-${i}`}
          points={[stoneX + 8, stoneY + stoneH * pct, stoneX + stoneW - 8, stoneY + stoneH * pct]}
          stroke={COLORS.textDark}
          strokeWidth={1}
          opacity={0.15}
        />
      ))}

      {/* Rune glow underlayer */}
      {runes.map((rune, i) => (
        <Rect
          key={`rune-glow-${i}`}
          x={rune.rx - 2}
          y={rune.ry - 2}
          width={rune.rw + 4}
          height={rune.rh + 4}
          fill={COLORS.cyan}
          opacity={0.12}
        />
      ))}

      {/* Rune characters */}
      {runes.map((rune, i) => (
        <Rect
          key={`rune-${i}`}
          x={rune.rx}
          y={rune.ry}
          width={rune.rw}
          height={rune.rh}
          fill={COLORS.cyan}
          opacity={0.7}
        />
      ))}

      {/* Top edge decoration — carved line */}
      <Line
        points={[topInset + 8, stoneY + 6, w - topInset - 8, stoneY + 6]}
        stroke={COLORS.textDark}
        strokeWidth={2}
        opacity={0.4}
      />
      {/* Bottom edge decoration */}
      <Line
        points={[bottomInset + 6, h - 6, w - bottomInset - 6, h - 6]}
        stroke={COLORS.textDark}
        strokeWidth={2}
        opacity={0.4}
      />
    </>
  )
}

// =====================================================================
// 3. Blueprint Display — digital blueprint with grid and shapes
// =====================================================================

function BlueprintDisplay({ w, h }: { w: number; h: number }) {
  const borderW = 4
  const screenX = borderW
  const screenY = borderW
  const screenW = w - borderW * 2
  const screenH = h - borderW * 2

  // Grid spacing
  const gridSpacing = px(Math.max(8, Math.min(screenW, screenH) * 0.1))

  // Blueprint shapes — two rect outlines representing floor plans
  const plan1X = screenX + screenW * 0.1
  const plan1Y = screenY + screenH * 0.15
  const plan1W = screenW * 0.35
  const plan1H = screenH * 0.5

  const plan2X = screenX + screenW * 0.55
  const plan2Y = screenY + screenH * 0.25
  const plan2W = screenW * 0.35
  const plan2H = screenH * 0.4

  return (
    <>
      {/* Outer frame */}
      <Rect
        x={0} y={0}
        width={w} height={h}
        fill={COLORS.borderLight}
        stroke={COLORS.border}
        strokeWidth={3}
      />

      {/* Screen face */}
      <Rect
        x={screenX} y={screenY}
        width={screenW} height={screenH}
        fill={COLORS.bgDark}
      />

      {/* Blue tint */}
      <Rect
        x={screenX} y={screenY}
        width={screenW} height={screenH}
        fill={COLORS.blue}
        opacity={0.04}
      />

      {/* Internal grid lines — vertical */}
      {Array.from({ length: Math.ceil(screenW / gridSpacing) }).map((_, i) => (
        <Line
          key={`bp-gv-${i}`}
          points={[screenX + i * gridSpacing, screenY, screenX + i * gridSpacing, screenY + screenH]}
          stroke={COLORS.blue}
          strokeWidth={1}
          opacity={0.15}
        />
      ))}

      {/* Internal grid lines — horizontal */}
      {Array.from({ length: Math.ceil(screenH / gridSpacing) }).map((_, i) => (
        <Line
          key={`bp-gh-${i}`}
          points={[screenX, screenY + i * gridSpacing, screenX + screenW, screenY + i * gridSpacing]}
          stroke={COLORS.blue}
          strokeWidth={1}
          opacity={0.15}
        />
      ))}

      {/* Floor plan 1 */}
      <Rect
        x={plan1X} y={plan1Y}
        width={plan1W} height={plan1H}
        stroke={COLORS.blue}
        strokeWidth={2}
        opacity={0.6}
      />

      {/* Interior wall in plan 1 */}
      <Line
        points={[plan1X + plan1W * 0.5, plan1Y, plan1X + plan1W * 0.5, plan1Y + plan1H * 0.7]}
        stroke={COLORS.blue}
        strokeWidth={2}
        opacity={0.5}
      />
      <Line
        points={[plan1X, plan1Y + plan1H * 0.5, plan1X + plan1W * 0.4, plan1Y + plan1H * 0.5]}
        stroke={COLORS.blue}
        strokeWidth={2}
        opacity={0.5}
      />

      {/* Floor plan 2 */}
      <Rect
        x={plan2X} y={plan2Y}
        width={plan2W} height={plan2H}
        stroke={COLORS.cyan}
        strokeWidth={2}
        opacity={0.5}
      />

      {/* Interior wall in plan 2 */}
      <Line
        points={[plan2X + plan2W * 0.6, plan2Y, plan2X + plan2W * 0.6, plan2Y + plan2H]}
        stroke={COLORS.cyan}
        strokeWidth={2}
        opacity={0.4}
      />

      {/* Dimension line — below plan 1 */}
      <Line
        points={[plan1X, plan1Y + plan1H + 6, plan1X + plan1W, plan1Y + plan1H + 6]}
        stroke={COLORS.textMid}
        strokeWidth={1}
        opacity={0.5}
      />
      {/* Dimension ticks */}
      <Line
        points={[plan1X, plan1Y + plan1H + 2, plan1X, plan1Y + plan1H + 10]}
        stroke={COLORS.textMid}
        strokeWidth={1}
        opacity={0.5}
      />
      <Line
        points={[plan1X + plan1W, plan1Y + plan1H + 2, plan1X + plan1W, plan1Y + plan1H + 10]}
        stroke={COLORS.textMid}
        strokeWidth={1}
        opacity={0.5}
      />

      {/* Connection line between plans */}
      <Line
        points={[plan1X + plan1W, plan1Y + plan1H * 0.3, plan2X, plan2Y + plan2H * 0.3]}
        stroke={COLORS.gold}
        strokeWidth={1}
        opacity={0.4}
        dash={[4, 4]}
      />

      {/* Small label text */}
      <Text
        x={screenX + 4}
        y={screenY + 4}
        text="BLUEPRINT"
        fontSize={px(Math.max(8, screenH * 0.07))}
        fontFamily="Silkscreen, monospace"
        fill={COLORS.textDark}
        opacity={0.6}
      />
    </>
  )
}

// =====================================================================
// 4. Data Node — floating holographic data visualization
// =====================================================================

function DataNode({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  const cy = h / 2

  // Concentric rectangles with decreasing opacity
  const rings = 4
  const maxRingW = w * 0.85
  const maxRingH = h * 0.85
  const stepW = maxRingW / rings
  const stepH = maxRingH / rings

  // Scatter data dots inside
  const dotCount = 12
  const dots = Array.from({ length: dotCount }, (_, i) => {
    const seed = (i * 37 + 11) % 100
    const dx = (seed % 50) / 50 // 0..1 range within inner area
    const dy = ((seed * 3 + 7) % 50) / 50
    return {
      x: cx - maxRingW * 0.3 + dx * maxRingW * 0.6,
      y: cy - maxRingH * 0.3 + dy * maxRingH * 0.6,
      size: i % 3 === 0 ? 4 : 2,
    }
  })

  return (
    <>
      {/* Outer glow */}
      <Rect
        x={0} y={0}
        width={w} height={h}
        fill={COLORS.blue}
        opacity={0.05}
      />

      {/* Concentric rectangular rings */}
      {Array.from({ length: rings }).map((_, i) => {
        const rw = maxRingW - stepW * i
        const rh = maxRingH - stepH * i
        return (
          <Rect
            key={`dn-ring-${i}`}
            x={cx - rw / 2}
            y={cy - rh / 2}
            width={rw}
            height={rh}
            stroke={COLORS.cyan}
            strokeWidth={2}
            opacity={0.5 - i * 0.1}
          />
        )
      })}

      {/* Inner solid core */}
      <Rect
        x={cx - stepW * 0.3}
        y={cy - stepH * 0.3}
        width={stepW * 0.6}
        height={stepH * 0.6}
        fill={COLORS.blue}
        opacity={0.3}
      />

      {/* Scattered data dots */}
      {dots.map((d, i) => (
        <Rect
          key={`dn-dot-${i}`}
          x={px(d.x)}
          y={px(d.y)}
          width={d.size}
          height={d.size}
          fill={i % 2 === 0 ? COLORS.cyan : COLORS.blue}
          opacity={0.6}
        />
      ))}

      {/* Corner accent marks */}
      {[
        { x: 2, y: 2 },
        { x: w - 6, y: 2 },
        { x: 2, y: h - 6 },
        { x: w - 6, y: h - 6 },
      ].map((pos, i) => (
        <Rect
          key={`dn-corner-${i}`}
          x={pos.x}
          y={pos.y}
          width={4}
          height={4}
          fill={COLORS.cyan}
          opacity={0.4}
        />
      ))}

      {/* Crosshair lines through center */}
      <Line
        points={[cx, cy - h * 0.1, cx, cy + h * 0.1]}
        stroke={COLORS.cyan}
        strokeWidth={1}
        opacity={0.3}
      />
      <Line
        points={[cx - w * 0.1, cy, cx + w * 0.1, cy]}
        stroke={COLORS.cyan}
        strokeWidth={1}
        opacity={0.3}
      />
    </>
  )
}

// =====================================================================
// 5. Legal Doc — holographic document with text lines and seal
// =====================================================================

function LegalDoc({ w, h }: { w: number; h: number }) {
  const margin = px(w * 0.06)

  // Paper body
  const paperX = margin
  const paperY = margin
  const paperW = w - margin * 2
  const paperH = h - margin * 2

  // Text lines parameters
  const textStartY = paperY + px(paperH * 0.1)
  const lineCount = 8
  const lineSpacing = (paperH * 0.75) / lineCount
  const lineStartX = paperX + px(paperW * 0.08)
  const lineEndX = paperX + paperW - px(paperW * 0.08)

  // Seal — bottom-right corner
  const sealR = px(Math.min(paperW, paperH) * 0.08)
  const sealCx = paperX + paperW - px(paperW * 0.15)
  const sealCy = paperY + paperH - px(paperH * 0.12)

  return (
    <>
      {/* Holographic background glow */}
      <Rect
        x={0} y={0}
        width={w} height={h}
        fill={COLORS.blue}
        opacity={0.04}
      />

      {/* Paper rectangle */}
      <Rect
        x={paperX} y={paperY}
        width={paperW} height={paperH}
        fill={COLORS.bgLight}
        stroke={COLORS.textDark}
        strokeWidth={2}
        opacity={0.9}
      />

      {/* Title bar at top of document */}
      <Rect
        x={paperX + 2} y={paperY + 2}
        width={paperW - 4} height={px(paperH * 0.08)}
        fill={COLORS.textDark}
        opacity={0.3}
      />

      {/* Text lines */}
      {Array.from({ length: lineCount }).map((_, i) => {
        // Vary line lengths for realism
        const shorten = ((i * 7 + 3) % 5) / 10
        const lx = lineStartX
        const lw = (lineEndX - lineStartX) * (1 - shorten * 0.3)
        const ly = textStartY + i * lineSpacing
        const lineH = i % 3 === 0 ? 3 : 2
        return (
          <Rect
            key={`ld-line-${i}`}
            x={px(lx)}
            y={px(ly)}
            width={px(lw)}
            height={lineH}
            fill={COLORS.textMid}
            opacity={0.5}
          />
        )
      })}

      {/* Red seal / stamp circle */}
      <Circle
        x={sealCx}
        y={sealCy}
        radius={sealR}
        fill={COLORS.red}
        opacity={0.7}
      />
      {/* Inner seal ring */}
      <Circle
        x={sealCx}
        y={sealCy}
        radius={sealR * 0.6}
        stroke={COLORS.textPrimary}
        strokeWidth={1}
        opacity={0.4}
      />
      {/* Seal center dot */}
      <Rect
        x={sealCx - 2}
        y={sealCy - 2}
        width={4}
        height={4}
        fill={COLORS.textPrimary}
        opacity={0.5}
      />
    </>
  )
}

// =====================================================================
// 6. Chain Link — blockchain visualization with connected blocks
// =====================================================================

function ChainLink({ w, h }: { w: number; h: number }) {
  const blockCount = 4
  const blockW = px(w / (blockCount * 2.2))
  const blockH = px(h * 0.35)
  const gap = (w - blockW * blockCount) / (blockCount - 1)
  const blockY = (h - blockH) / 2

  // Build block positions
  const blocks = Array.from({ length: blockCount }, (_, i) => ({
    x: px(i * (blockW + gap)),
    y: blockY,
  }))

  return (
    <>
      {/* Subtle background */}
      <Rect
        x={0} y={0}
        width={w} height={h}
        fill={COLORS.blue}
        opacity={0.03}
      />

      {/* Connecting lines between blocks */}
      {blocks.slice(0, -1).map((block, i) => {
        const nextBlock = blocks[i + 1]
        const lineY = block.y + blockH / 2
        return (
          <Line
            key={`cl-link-${i}`}
            points={[
              block.x + blockW, lineY,
              nextBlock.x, lineY,
            ]}
            stroke={COLORS.blue}
            strokeWidth={2}
            opacity={0.6}
          />
        )
      })}

      {/* Chain blocks */}
      {blocks.map((block, i) => (
        <Group key={`cl-block-${i}`}>
          {/* Block body */}
          <Rect
            x={block.x}
            y={block.y}
            width={blockW}
            height={blockH}
            fill={COLORS.bgLight}
            stroke={COLORS.textDark}
            strokeWidth={2}
          />
          {/* Inner block content — small hash-like lines */}
          <Rect
            x={block.x + 4}
            y={block.y + 4}
            width={blockW - 8}
            height={2}
            fill={COLORS.cyan}
            opacity={0.5}
          />
          <Rect
            x={block.x + 4}
            y={block.y + 8}
            width={blockW * 0.6}
            height={2}
            fill={COLORS.cyan}
            opacity={0.3}
          />
          <Rect
            x={block.x + 4}
            y={block.y + 12}
            width={blockW * 0.4}
            height={2}
            fill={COLORS.textMid}
            opacity={0.3}
          />
          {/* Block index label */}
          <Text
            x={block.x}
            y={block.y + blockH - px(Math.max(8, blockH * 0.25))}
            width={blockW}
            text={`#${i}`}
            fontSize={px(Math.max(7, blockH * 0.18))}
            fontFamily="Silkscreen, monospace"
            fill={COLORS.textDark}
            align="center"
          />
        </Group>
      ))}

      {/* Connection dots at link midpoints */}
      {blocks.slice(0, -1).map((block, i) => {
        const nextBlock = blocks[i + 1]
        const midX = block.x + blockW + (nextBlock.x - block.x - blockW) / 2
        const midY = block.y + blockH / 2
        return (
          <Rect
            key={`cl-dot-${i}`}
            x={midX - 2}
            y={midY - 2}
            width={4}
            height={4}
            fill={COLORS.blue}
            opacity={0.8}
          />
        )
      })}
    </>
  )
}

// =====================================================================
// 7. Monitor — computer monitor with stand and UI elements
// =====================================================================

function Monitor({ w, h }: { w: number; h: number }) {
  const borderW = 4
  // Monitor screen takes upper 75% of total height
  const screenH = h * 0.72
  const screenW = w
  const screenX = 0
  const screenY = 0

  // Stand dimensions
  const standTopY = screenH
  const standNeckW = px(w * 0.12)
  const standNeckH = px(h * 0.12)
  const standBaseW = px(w * 0.35)
  const standBaseH = px(h * 0.08)
  const standNeckX = (w - standNeckW) / 2
  const standBaseX = (w - standBaseW) / 2
  const standBaseY = standTopY + standNeckH

  // UI elements inside screen
  const uiMargin = borderW + 4
  const uiW = screenW - uiMargin * 2
  const uiH = screenH - borderW * 2 - 8

  return (
    <>
      {/* Monitor bezel */}
      <Rect
        x={screenX} y={screenY}
        width={screenW} height={screenH}
        fill={COLORS.borderLight}
        stroke={COLORS.border}
        strokeWidth={3}
      />

      {/* Screen face */}
      <Rect
        x={borderW} y={borderW}
        width={screenW - borderW * 2} height={screenH - borderW * 2}
        fill={COLORS.bgDark}
      />

      {/* Screen glow */}
      <Rect
        x={borderW} y={borderW}
        width={screenW - borderW * 2} height={screenH - borderW * 2}
        fill={COLORS.blue}
        opacity={0.05}
      />

      {/* Title bar */}
      <Rect
        x={uiMargin} y={uiMargin}
        width={uiW} height={px(uiH * 0.12)}
        fill={COLORS.borderLight}
        opacity={0.6}
      />
      {/* Title bar dots */}
      {[0, 1, 2].map(i => (
        <Rect
          key={`mon-dot-${i}`}
          x={uiMargin + 4 + i * 8}
          y={uiMargin + px(uiH * 0.04)}
          width={4}
          height={4}
          fill={i === 0 ? COLORS.red : i === 1 ? COLORS.orange : COLORS.green}
          opacity={0.8}
        />
      ))}

      {/* Content area — sidebar */}
      <Rect
        x={uiMargin}
        y={uiMargin + px(uiH * 0.16)}
        width={uiW * 0.25}
        height={uiH * 0.7}
        fill={COLORS.borderLight}
        opacity={0.25}
      />
      {/* Sidebar items */}
      {[0, 1, 2, 3].map(i => (
        <Rect
          key={`mon-sidebar-${i}`}
          x={uiMargin + 4}
          y={uiMargin + px(uiH * 0.2) + i * px(uiH * 0.15)}
          width={uiW * 0.17}
          height={3}
          fill={COLORS.textMid}
          opacity={0.4}
        />
      ))}

      {/* Main content area — bar chart */}
      {[
        { xPct: 0.32, hPct: 0.25, color: COLORS.blue },
        { xPct: 0.44, hPct: 0.4, color: COLORS.cyan },
        { xPct: 0.56, hPct: 0.55, color: COLORS.blue },
        { xPct: 0.68, hPct: 0.35, color: COLORS.cyan },
        { xPct: 0.80, hPct: 0.48, color: COLORS.green },
      ].map((bar, i) => {
        const barW = px(uiW * 0.08)
        const barX = uiMargin + uiW * bar.xPct
        const barMaxH = uiH * 0.5
        const barH = barMaxH * bar.hPct
        const barBaseY = uiMargin + uiH * 0.75
        return (
          <Rect
            key={`mon-bar-${i}`}
            x={px(barX)}
            y={px(barBaseY - barH)}
            width={barW}
            height={px(barH)}
            fill={bar.color}
            opacity={0.5}
          />
        )
      })}

      {/* Stand neck */}
      <Rect
        x={standNeckX}
        y={standTopY}
        width={standNeckW}
        height={standNeckH}
        fill={COLORS.borderLight}
        stroke={COLORS.border}
        strokeWidth={2}
      />

      {/* Stand base */}
      <Rect
        x={standBaseX}
        y={standBaseY}
        width={standBaseW}
        height={standBaseH}
        fill={COLORS.borderLight}
        stroke={COLORS.border}
        strokeWidth={2}
      />
    </>
  )
}

// =====================================================================
// Fallback: Generic Screen — for unknown decorIds
// =====================================================================

function GenericScreen({ w, h }: { w: number; h: number }) {
  const borderW = 4
  const screenX = borderW
  const screenY = borderW
  const screenW = w - borderW * 2
  const screenH = h - borderW * 2

  return (
    <>
      {/* Frame */}
      <Rect
        x={0} y={0}
        width={w} height={h}
        fill={COLORS.borderLight}
        stroke={COLORS.border}
        strokeWidth={3}
      />

      {/* Screen face */}
      <Rect
        x={screenX} y={screenY}
        width={screenW} height={screenH}
        fill={COLORS.bgDark}
      />

      {/* Glow */}
      <Rect
        x={screenX} y={screenY}
        width={screenW} height={screenH}
        fill={COLORS.blue}
        opacity={0.06}
      />

      {/* Placeholder scan lines */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Line
          key={`gs-scan-${i}`}
          points={[
            screenX + screenW * 0.1,
            screenY + screenH * (0.2 + i * 0.2),
            screenX + screenW * 0.9,
            screenY + screenH * (0.2 + i * 0.2),
          ]}
          stroke={COLORS.textDark}
          strokeWidth={1}
          opacity={0.2}
        />
      ))}

      {/* Center question mark */}
      <Text
        x={screenX}
        y={screenY + screenH * 0.35}
        width={screenW}
        text="?"
        fontSize={px(Math.max(12, screenH * 0.3))}
        fontFamily="Silkscreen, monospace"
        fill={COLORS.textDark}
        align="center"
        opacity={0.4}
      />
    </>
  )
}
