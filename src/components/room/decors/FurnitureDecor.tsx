import { Group, Rect, Line, Circle } from 'react-konva'

// ==================== 类型 ====================

interface FurnitureDecorProps {
  width: number    // 像素宽度（已从百分比转换）
  height: number   // 像素高度（已从百分比转换）
  decorId: string  // 家具类型标识，如 'bookshelf'、'cabinet' 等
  x: number        // 像素 x 位置
  y: number        // 像素 y 位置
}

// ==================== 调色板 ====================

const COLORS = {
  // 背景
  bgDeep: '#1a1c2c',
  bgMid: '#262b44',
  bgLight: '#333c57',
  // 主色
  blue: '#41a6f6',
  cyan: '#73eff7',
  // 暖色
  orange: '#f77622',
  gold: '#ffcd75',
  // 红粉
  red: '#b13e53',
  // 紫色
  purple: '#5d275d',
  // 绿色
  green: '#38b764',
  greenBright: '#a7f070',
  // 金属/石材
  metalDark: '#566c86',
  metalLight: '#94b0c2',
  // 文本
  white: '#f4f4f4',
  // 描边
  black: '#000000',
} as const

const STROKE_WIDTH = 3

// ==================== 书架 ====================

function Bookshelf({ w, h }: { w: number; h: number }) {
  // 比例参数
  const shelfBorder = Math.max(4, w * 0.06)
  const shelfCount = 4
  const shelfH = (h - shelfBorder * 2) / shelfCount
  const bookAreaW = w - shelfBorder * 2

  // 书脊颜色循环
  const bookColors = [COLORS.orange, COLORS.gold, COLORS.red, COLORS.purple, COLORS.green, COLORS.blue, COLORS.cyan]

  // 为每层书架生成书脊
  const shelves = Array.from({ length: shelfCount }, (_, shelfIdx) => {
    const books: { bx: number; bw: number; bh: number; color: string }[] = []
    let cursor = 0
    // 用确定性的伪随机来决定每本书的宽度
    const seed = shelfIdx * 7 + 3
    const bookCount = 5 + (shelfIdx % 3)
    for (let i = 0; i < bookCount && cursor < bookAreaW - 2; i++) {
      const bw = Math.max(4, (bookAreaW / bookCount) + (((seed + i * 13) % 7) - 3))
      const bh = shelfH - Math.max(6, shelfH * 0.2) - ((seed + i * 3) % 4) * 2
      const color = bookColors[(seed + i) % bookColors.length]
      books.push({ bx: shelfBorder + cursor, bw, bh, color })
      cursor += bw + 1
    }
    return { shelfIdx, books, shelfY: shelfBorder + shelfIdx * shelfH }
  })

  return (
    <>
      {/* 阴影 */}
      <Rect
        x={w * 0.05}
        y={h - 4}
        width={w * 0.9}
        height={6}
        fill={COLORS.black}
        opacity={0.3}
      />

      {/* 书架主体背板 */}
      <Rect
        x={0}
        y={0}
        width={w}
        height={h}
        fill={COLORS.bgDeep}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
      />

      {/* 每层书架 */}
      {shelves.map(({ shelfIdx, books, shelfY }) => (
        <Group key={`shelf-${shelfIdx}`}>
          {/* 隔板 */}
          <Rect
            x={0}
            y={shelfY + shelfH - Math.max(4, shelfH * 0.15)}
            width={w}
            height={Math.max(4, shelfH * 0.15)}
            fill={COLORS.orange}
            stroke={COLORS.black}
            strokeWidth={2}
          />

          {/* 书脊 */}
          {books.map((book, bi) => (
            <Rect
              key={`book-${shelfIdx}-${bi}`}
              x={book.bx}
              y={shelfY + (shelfH - Math.max(6, shelfH * 0.2)) - book.bh + Math.max(4, shelfH * 0.15)}
              width={book.bw}
              height={book.bh}
              fill={book.color}
              stroke={COLORS.black}
              strokeWidth={1}
            />
          ))}
        </Group>
      ))}

      {/* 顶部装饰条 */}
      <Rect
        x={0}
        y={0}
        width={w}
        height={Math.max(4, shelfBorder)}
        fill={COLORS.orange}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
      />
    </>
  )
}

// ==================== 文件柜 ====================

function Cabinet({ w, h }: { w: number; h: number }) {
  const border = Math.max(3, w * 0.04)
  const drawerCount = 3
  const drawerGap = Math.max(2, h * 0.02)
  const totalGaps = drawerGap * (drawerCount + 1)
  const drawerH = (h - border * 2 - totalGaps) / drawerCount
  const handleW = Math.max(8, w * 0.2)
  const handleH = Math.max(4, drawerH * 0.12)

  return (
    <>
      {/* 阴影 */}
      <Rect
        x={w * 0.05}
        y={h - 4}
        width={w * 0.9}
        height={6}
        fill={COLORS.black}
        opacity={0.3}
      />

      {/* 柜体 */}
      <Rect
        x={0}
        y={0}
        width={w}
        height={h}
        fill={COLORS.metalDark}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
      />

      {/* 抽屉 */}
      {Array.from({ length: drawerCount }, (_, i) => {
        const dy = border + drawerGap + i * (drawerH + drawerGap)
        const handleX = (w - handleW) / 2
        const handleY = dy + drawerH / 2 - handleH / 2
        return (
          <Group key={`drawer-${i}`}>
            {/* 抽屉面板 */}
            <Rect
              x={border}
              y={dy}
              width={w - border * 2}
              height={drawerH}
              fill={COLORS.metalLight}
              stroke={COLORS.black}
              strokeWidth={2}
            />
            {/* 抽屉拉手 */}
            <Rect
              x={handleX}
              y={handleY}
              width={handleW}
              height={handleH}
              fill={COLORS.metalDark}
              stroke={COLORS.black}
              strokeWidth={1}
            />
            {/* 把手上的小高光 */}
            <Rect
              x={handleX + 2}
              y={handleY + 1}
              width={handleW - 4}
              height={Math.max(2, handleH * 0.3)}
              fill={COLORS.white}
              opacity={0.3}
            />
          </Group>
        )
      })}

      {/* 顶部标签牌 */}
      <Rect
        x={w * 0.35}
        y={border + 2}
        width={w * 0.3}
        height={Math.max(6, h * 0.05)}
        fill={COLORS.orange}
        stroke={COLORS.black}
        strokeWidth={1}
      />
    </>
  )
}

// ==================== 祭坛 ====================

function Altar({ w, h }: { w: number; h: number }) {
  // 祭坛结构：宽底座 + 窄柱 + 平顶
  const baseW = w
  const baseH = h * 0.2
  const pillarW = w * 0.6
  const pillarH = h * 0.50
  const topW = w * 0.8
  const topH = h * 0.18
  const pillarX = (w - pillarW) / 2
  const topX = (w - topW) / 2
  const pillarY = h - baseH - pillarH
  const topY = pillarY - topH

  // 符文参数（顶面上的发光符文）
  const runeW = topW * 0.6
  const runeH = topH * 0.4
  const runeX = topX + (topW - runeW) / 2
  const runeY = topY + (topH - runeH) / 2

  return (
    <>
      {/* 阴影 */}
      <Rect
        x={w * 0.03}
        y={h - 3}
        width={w * 0.94}
        height={5}
        fill={COLORS.black}
        opacity={0.3}
      />

      {/* 底座 */}
      <Rect
        x={0}
        y={h - baseH}
        width={baseW}
        height={baseH}
        fill={COLORS.metalDark}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
      />
      {/* 底座纹理线 */}
      <Line
        points={[0, h - baseH + baseH * 0.5, baseW, h - baseH + baseH * 0.5]}
        stroke={COLORS.metalLight}
        strokeWidth={2}
        opacity={0.5}
      />

      {/* 柱身 */}
      <Rect
        x={pillarX}
        y={pillarY}
        width={pillarW}
        height={pillarH}
        fill={COLORS.metalLight}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
      />
      {/* 柱身纹理 */}
      <Line
        points={[pillarX + pillarW * 0.3, pillarY, pillarX + pillarW * 0.3, pillarY + pillarH]}
        stroke={COLORS.metalDark}
        strokeWidth={2}
        opacity={0.4}
      />
      <Line
        points={[pillarX + pillarW * 0.7, pillarY, pillarX + pillarW * 0.7, pillarY + pillarH]}
        stroke={COLORS.metalDark}
        strokeWidth={2}
        opacity={0.4}
      />

      {/* 顶面 */}
      <Rect
        x={topX}
        y={topY}
        width={topW}
        height={topH}
        fill={COLORS.metalDark}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
      />

      {/* 顶面高光 */}
      <Rect
        x={topX + 2}
        y={topY + 2}
        width={topW - 4}
        height={Math.max(2, topH * 0.15)}
        fill={COLORS.white}
        opacity={0.15}
      />

      {/* 发光符文 */}
      <Rect
        x={runeX}
        y={runeY}
        width={runeW}
        height={runeH}
        fill={COLORS.cyan}
        opacity={0.6}
      />
      {/* 符文十字细节 */}
      <Line
        points={[
          runeX + runeW * 0.2, runeY + runeH * 0.5,
          runeX + runeW * 0.8, runeY + runeH * 0.5,
        ]}
        stroke={COLORS.white}
        strokeWidth={2}
        opacity={0.8}
      />
      <Line
        points={[
          runeX + runeW * 0.5, runeY + runeH * 0.15,
          runeX + runeW * 0.5, runeY + runeH * 0.85,
        ]}
        stroke={COLORS.white}
        strokeWidth={2}
        opacity={0.8}
      />
      {/* 符文外发光 */}
      <Rect
        x={runeX - 2}
        y={runeY - 2}
        width={runeW + 4}
        height={runeH + 4}
        stroke={COLORS.cyan}
        strokeWidth={1}
        opacity={0.3}
      />
    </>
  )
}

// ==================== 办公桌 ====================

function Desk({ w, h }: { w: number; h: number }) {
  const legW = Math.max(4, w * 0.05)
  const legH = h * 0.55
  const topH = Math.max(6, h * 0.12)
  const bodyH = h - legH - topH
  const bodyY = topH

  // 显示器参数
  const monW = w * 0.3
  const monH = h * 0.35
  const monX = w * 0.55
  const monY = bodyY + bodyH * 0.1
  const monStandW = Math.max(4, monW * 0.2)
  const monStandH = bodyH * 0.15

  return (
    <>
      {/* 阴影 */}
      <Rect
        x={w * 0.05}
        y={h - 3}
        width={w * 0.9}
        height={5}
        fill={COLORS.black}
        opacity={0.3}
      />

      {/* 桌面 */}
      <Rect
        x={0}
        y={0}
        width={w}
        height={topH}
        fill={COLORS.bgLight}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
      />
      {/* 桌面高光 */}
      <Rect
        x={2}
        y={2}
        width={w - 4}
        height={Math.max(2, topH * 0.3)}
        fill={COLORS.white}
        opacity={0.1}
      />

      {/* 桌身 */}
      <Rect
        x={0}
        y={bodyY}
        width={w}
        height={bodyH}
        fill={COLORS.orange}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
      />

      {/* 抽屉 */}
      <Rect
        x={w * 0.1}
        y={bodyY + bodyH * 0.25}
        width={w * 0.35}
        height={bodyH * 0.45}
        fill={COLORS.gold}
        stroke={COLORS.black}
        strokeWidth={1}
      />
      {/* 抽屉拉手 */}
      <Rect
        x={w * 0.18}
        y={bodyY + bodyH * 0.45}
        width={w * 0.18}
        height={Math.max(3, bodyH * 0.1)}
        fill={COLORS.metalDark}
        stroke={COLORS.black}
        strokeWidth={1}
      />

      {/* 显示器外框 */}
      <Rect
        x={monX}
        y={monY}
        width={monW}
        height={monH}
        fill={COLORS.bgDeep}
        stroke={COLORS.black}
        strokeWidth={2}
      />
      {/* 显示器屏幕 */}
      <Rect
        x={monX + 2}
        y={monY + 2}
        width={monW - 4}
        height={monH - 4}
        fill={COLORS.blue}
        opacity={0.4}
      />
      {/* 显示器底座 */}
      <Rect
        x={monX + (monW - monStandW) / 2}
        y={monY + monH}
        width={monStandW}
        height={monStandH}
        fill={COLORS.metalDark}
        stroke={COLORS.black}
        strokeWidth={1}
      />

      {/* 桌腿 */}
      <Rect
        x={w * 0.06}
        y={bodyY + bodyH}
        width={legW}
        height={legH}
        fill={COLORS.orange}
        stroke={COLORS.black}
        strokeWidth={2}
      />
      <Rect
        x={w - w * 0.06 - legW}
        y={bodyY + bodyH}
        width={legW}
        height={legH}
        fill={COLORS.orange}
        stroke={COLORS.black}
        strokeWidth={2}
      />
    </>
  )
}

// ==================== 工作台 ====================

function Workbench({ w, h }: { w: number; h: number }) {
  const topH = Math.max(8, h * 0.15)
  const legW = Math.max(6, w * 0.07)
  const legH = h * 0.6
  const bodyY = topH
  const bodyH = h * 0.2
  const legY = bodyY + bodyH

  // 挂在侧面的工具参数
  const toolW = Math.max(4, w * 0.04)
  const toolH = h * 0.25
  const toolGap = Math.max(4, h * 0.06)

  return (
    <>
      {/* 阴影 */}
      <Rect
        x={w * 0.05}
        y={h - 3}
        width={w * 0.9}
        height={5}
        fill={COLORS.black}
        opacity={0.3}
      />

      {/* 桌面 */}
      <Rect
        x={0}
        y={0}
        width={w}
        height={topH}
        fill={COLORS.orange}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
      />
      {/* 桌面纹理条纹 */}
      <Line
        points={[0, topH * 0.5, w, topH * 0.5]}
        stroke={COLORS.gold}
        strokeWidth={1}
        opacity={0.5}
      />

      {/* 桌身裙板 */}
      <Rect
        x={0}
        y={bodyY}
        width={w}
        height={bodyH}
        fill={COLORS.orange}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
        opacity={0.85}
      />

      {/* 左腿 */}
      <Rect
        x={w * 0.08}
        y={legY}
        width={legW}
        height={legH}
        fill={COLORS.orange}
        stroke={COLORS.black}
        strokeWidth={2}
      />
      {/* 右腿 */}
      <Rect
        x={w - w * 0.08 - legW}
        y={legY}
        width={legW}
        height={legH}
        fill={COLORS.orange}
        stroke={COLORS.black}
        strokeWidth={2}
      />

      {/* 横撑 */}
      <Rect
        x={w * 0.08 + legW}
        y={legY + legH * 0.6}
        width={w - 2 * (w * 0.08 + legW)}
        height={Math.max(3, legH * 0.06)}
        fill={COLORS.orange}
        stroke={COLORS.black}
        strokeWidth={1}
      />

      {/* 侧面挂的工具（3件） */}
      {[0, 1, 2].map(i => {
        const tx = w * 0.12 + i * (toolW + toolGap)
        const ty = bodyY + bodyH * 0.15
        // 不同工具颜色
        const toolColors = [COLORS.metalLight, COLORS.metalDark, COLORS.gold]
        return (
          <Group key={`tool-${i}`}>
            {/* 工具手柄 */}
            <Rect
              x={tx}
              y={ty}
              width={toolW}
              height={toolH}
              fill={toolColors[i]}
              stroke={COLORS.black}
              strokeWidth={1}
            />
            {/* 工具头（稍微宽一些） */}
            <Rect
              x={tx - 1}
              y={ty}
              width={toolW + 2}
              height={Math.max(4, toolH * 0.2)}
              fill={COLORS.metalLight}
              stroke={COLORS.black}
              strokeWidth={1}
            />
          </Group>
        )
      })}

      {/* 桌面上的小物件（像素方块代表零件） */}
      <Rect
        x={w * 0.6}
        y={topH * 0.2}
        width={Math.max(4, w * 0.06)}
        height={topH * 0.6}
        fill={COLORS.green}
        stroke={COLORS.black}
        strokeWidth={1}
      />
      <Rect
        x={w * 0.75}
        y={topH * 0.3}
        width={Math.max(4, w * 0.05)}
        height={topH * 0.5}
        fill={COLORS.red}
        stroke={COLORS.black}
        strokeWidth={1}
      />
    </>
  )
}

// ==================== 保险箱 ====================

function Safe({ w, h }: { w: number; h: number }) {
  const border = Math.max(4, w * 0.05)
  const doorW = w - border * 2
  const doorH = h - border * 2

  // 转盘参数
  const dialR = Math.min(doorW, doorH) * 0.22
  const dialCX = border + doorW * 0.5
  const dialCY = border + doorH * 0.45

  // 铰链参数
  const hingeW = Math.max(6, w * 0.06)
  const hingeH = Math.max(10, h * 0.1)

  // 把手参数
  const handleW = Math.max(10, doorW * 0.15)
  const handleH = Math.max(4, doorH * 0.05)

  return (
    <>
      {/* 阴影 */}
      <Rect
        x={w * 0.03}
        y={h - 3}
        width={w * 0.94}
        height={5}
        fill={COLORS.black}
        opacity={0.35}
      />

      {/* 保险箱外壳 */}
      <Rect
        x={0}
        y={0}
        width={w}
        height={h}
        fill={COLORS.metalDark}
        stroke={COLORS.black}
        strokeWidth={STROKE_WIDTH}
      />

      {/* 门面板 */}
      <Rect
        x={border}
        y={border}
        width={doorW}
        height={doorH}
        fill={COLORS.bgLight}
        stroke={COLORS.black}
        strokeWidth={2}
      />

      {/* 门板内凹效果 */}
      <Rect
        x={border + 3}
        y={border + 3}
        width={doorW - 6}
        height={doorH - 6}
        stroke={COLORS.metalDark}
        strokeWidth={1}
        opacity={0.4}
      />

      {/* 铰链（左侧上下） */}
      <Rect
        x={border}
        y={h * 0.2 - hingeH / 2}
        width={hingeW}
        height={hingeH}
        fill={COLORS.metalLight}
        stroke={COLORS.black}
        strokeWidth={1}
      />
      <Rect
        x={border}
        y={h * 0.8 - hingeH / 2}
        width={hingeW}
        height={hingeH}
        fill={COLORS.metalLight}
        stroke={COLORS.black}
        strokeWidth={1}
      />

      {/* 转盘外圈 */}
      <Circle
        x={dialCX}
        y={dialCY}
        radius={dialR + 2}
        stroke={COLORS.black}
        strokeWidth={2}
        fill={COLORS.metalDark}
      />
      {/* 转盘主体 */}
      <Circle
        x={dialCX}
        y={dialCY}
        radius={dialR}
        fill={COLORS.metalLight}
        stroke={COLORS.black}
        strokeWidth={2}
      />
      {/* 转盘中心 */}
      <Circle
        x={dialCX}
        y={dialCY}
        radius={dialR * 0.2}
        fill={COLORS.black}
      />
      {/* 转盘刻度线（8个方向的短线） */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * Math.PI * 2) / 8
        const innerR = dialR * 0.4
        const outerR = dialR * 0.85
        return (
          <Line
            key={`dial-tick-${i}`}
            points={[
              dialCX + Math.cos(angle) * innerR,
              dialCY + Math.sin(angle) * innerR,
              dialCX + Math.cos(angle) * outerR,
              dialCY + Math.sin(angle) * outerR,
            ]}
            stroke={COLORS.metalDark}
            strokeWidth={2}
          />
        )
      })}
      {/* 转盘指针（顶部） */}
      <Line
        points={[
          dialCX,
          dialCY - dialR * 0.2,
          dialCX - 2,
          dialCY - dialR * 0.55,
          dialCX + 2,
          dialCY - dialR * 0.55,
        ]}
        fill={COLORS.red}
        closed
        stroke={COLORS.black}
        strokeWidth={1}
      />

      {/* 把手 */}
      <Rect
        x={dialCX - handleW / 2}
        y={dialCY + dialR + doorH * 0.08}
        width={handleW}
        height={handleH}
        fill={COLORS.metalLight}
        stroke={COLORS.black}
        strokeWidth={2}
      />
      {/* 把手高光 */}
      <Rect
        x={dialCX - handleW / 2 + 2}
        y={dialCY + dialR + doorH * 0.08 + 1}
        width={handleW - 4}
        height={Math.max(1, handleH * 0.3)}
        fill={COLORS.white}
        opacity={0.25}
      />

      {/* 装饰铆钉（四角） */}
      {[
        { rx: border + 6, ry: border + 6 },
        { rx: border + doorW - 6, ry: border + 6 },
        { rx: border + 6, ry: border + doorH - 6 },
        { rx: border + doorW - 6, ry: border + doorH - 6 },
      ].map((pos, i) => (
        <Rect
          key={`rivet-${i}`}
          x={pos.rx - 2}
          y={pos.ry - 2}
          width={4}
          height={4}
          fill={COLORS.metalLight}
          stroke={COLORS.black}
          strokeWidth={1}
        />
      ))}
    </>
  )
}

// ==================== 家具路由 ====================

function getFurnitureRenderer(decorId: string) {
  // 统一处理 desk / desk-1 / desk-2 为同一种渲染
  if (decorId.startsWith('desk')) return Desk
  switch (decorId) {
    case 'bookshelf': return Bookshelf
    case 'cabinet': return Cabinet
    case 'altar': return Altar
    case 'workbench': return Workbench
    case 'safe': return Safe
    default: return null
  }
}

// ==================== 主组件 ====================

export default function FurnitureDecor({ width, height, decorId, x, y }: FurnitureDecorProps) {
  const Renderer = getFurnitureRenderer(decorId)

  // 如果是不认识的 decorId，渲染一个通用的像素方块占位
  if (!Renderer) {
    return (
      <Group x={x} y={y}>
        {/* 阴影 */}
        <Rect
          x={width * 0.05}
          y={height - 3}
          width={width * 0.9}
          height={5}
          fill={COLORS.black}
          opacity={0.3}
        />
        {/* 占位方块 */}
        <Rect
          x={0}
          y={0}
          width={width}
          height={height}
          fill={COLORS.bgLight}
          stroke={COLORS.black}
          strokeWidth={STROKE_WIDTH}
          opacity={0.6}
        />
      </Group>
    )
  }

  return (
    <Group x={x} y={y}>
      {Renderer({ w: width, h: height })}
    </Group>
  )
}
