import { Group, Rect, Line, Circle } from 'react-konva'

// ==================== 类型 ====================

interface EquipmentDecorProps {
  width: number
  height: number
  decorId: string
  x: number
  y: number
}

// ==================== 调色板 ====================

const C = {
  bgDeep: '#1a1c2c',
  bgMid: '#262b44',
  bgLight: '#333c57',
  blue: '#41a6f6',
  cyan: '#73eff7',
  green: '#38b764',
  greenBright: '#a7f070',
  orange: '#f77622',
  gold: '#ffcd75',
  red: '#b13e53',
  purple: '#5d275d',
  metalDark: '#566c86',
  metalLight: '#94b0c2',
  white: '#f4f4f4',
  black: '#000000',
}

// ==================== 子渲染器 ====================

/** 古董CRT计算机 */
function OldComputer({ w, h }: { w: number; h: number }) {
  const monW = w * 0.7
  const monH = h * 0.55
  const monX = (w - monW) / 2
  const monY = h * 0.05
  const screenPad = Math.max(2, w * 0.04)
  const baseW = w * 0.4
  const baseH = h * 0.12
  const kbW = w * 0.55
  const kbH = h * 0.1

  return (
    <>
      {/* 阴影 */}
      <Rect x={2} y={h - 4} width={w - 4} height={4} fill={C.black} opacity={0.3} />
      {/* 显示器主体 */}
      <Rect x={monX} y={monY} width={monW} height={monH} fill={C.metalLight} stroke={C.black} strokeWidth={3} />
      {/* CRT 屏幕 */}
      <Rect x={monX + screenPad} y={monY + screenPad} width={monW - screenPad * 2} height={monH - screenPad * 2} fill={C.bgDeep} stroke={C.metalDark} strokeWidth={1} />
      {/* 屏幕上的绿色文字 */}
      <Rect x={monX + screenPad + 3} y={monY + screenPad + 4} width={monW * 0.35} height={2} fill={C.green} opacity={0.8} />
      <Rect x={monX + screenPad + 3} y={monY + screenPad + 10} width={monW * 0.25} height={2} fill={C.green} opacity={0.6} />
      <Rect x={monX + screenPad + 3} y={monY + screenPad + 16} width={monW * 0.45} height={2} fill={C.green} opacity={0.5} />
      <Rect x={monX + screenPad + 3} y={monY + screenPad + 22} width={monW * 0.2} height={2} fill={C.green} opacity={0.7} />
      {/* 底座支柱 */}
      <Rect x={(w - baseW / 2) / 2} y={monY + monH} width={baseW / 2} height={baseH} fill={C.metalDark} stroke={C.black} strokeWidth={2} />
      {/* 底座 */}
      <Rect x={(w - baseW) / 2} y={monY + monH + baseH} width={baseW} height={h * 0.06} fill={C.metalLight} stroke={C.black} strokeWidth={2} />
      {/* 键盘 */}
      <Rect x={(w - kbW) / 2} y={h * 0.8} width={kbW} height={kbH} fill={C.metalDark} stroke={C.black} strokeWidth={2} />
      {/* 键盘按键行 */}
      {[0, 1, 2].map(row => (
        <Rect key={row} x={(w - kbW) / 2 + 2} y={h * 0.8 + 2 + row * (kbH / 4)} width={kbW - 4} height={1.5} fill={C.metalLight} opacity={0.5} />
      ))}
    </>
  )
}

/** 正义天平 */
function Scale({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  const pillarW = Math.max(4, w * 0.06)
  const pillarH = h * 0.55
  const beamY = h * 0.15
  const beamLen = w * 0.7
  const panW = w * 0.2
  const panH = h * 0.06

  return (
    <>
      {/* 阴影 */}
      <Rect x={2} y={h - 4} width={w - 4} height={4} fill={C.black} opacity={0.3} />
      {/* 底座 */}
      <Rect x={cx - w * 0.15} y={h * 0.75} width={w * 0.3} height={h * 0.08} fill={C.metalDark} stroke={C.black} strokeWidth={3} />
      {/* 支柱 */}
      <Rect x={cx - pillarW / 2} y={h * 0.75 - pillarH} width={pillarW} height={pillarH} fill={C.metalLight} stroke={C.black} strokeWidth={2} />
      {/* 横梁 */}
      <Rect x={cx - beamLen / 2} y={beamY} width={beamLen} height={h * 0.04} fill={C.metalDark} stroke={C.black} strokeWidth={2} />
      {/* 顶部三角装饰 */}
      <Rect x={cx - pillarW} y={beamY - h * 0.04} width={pillarW * 2} height={h * 0.04} fill={C.gold} stroke={C.black} strokeWidth={2} />
      {/* 左吊索 */}
      <Line points={[cx - beamLen / 3, beamY + h * 0.04, cx - beamLen / 3, h * 0.55]} stroke={C.metalDark} strokeWidth={2} />
      {/* 右吊索 */}
      <Line points={[cx + beamLen / 3, beamY + h * 0.04, cx + beamLen / 3, h * 0.55]} stroke={C.metalDark} strokeWidth={2} />
      {/* 左托盘 */}
      <Rect x={cx - beamLen / 3 - panW / 2} y={h * 0.55} width={panW} height={panH} fill={C.orange} stroke={C.black} strokeWidth={2} />
      {/* 右托盘 */}
      <Rect x={cx + beamLen / 3 - panW / 2} y={h * 0.55} width={panW} height={panH} fill={C.orange} stroke={C.black} strokeWidth={2} />
    </>
  )
}

/** 漂浮简历 */
function FloatingResume({ w, h }: { w: number; h: number }) {
  const padW = w * 0.75
  const padH = h * 0.8
  const padX = (w - padW) / 2
  const padY = h * 0.05

  return (
    <>
      {/* 发光效果 */}
      <Rect x={padX - 3} y={padY - 3} width={padW + 6} height={padH + 6} fill={C.blue} opacity={0.1} />
      {/* 文档主体 */}
      <Rect x={padX} y={padY} width={padW} height={padH} fill={C.bgLight} stroke={C.blue} strokeWidth={2} />
      {/* 标题栏 */}
      <Rect x={padX + 3} y={padY + 3} width={padW * 0.5} height={3} fill={C.cyan} opacity={0.7} />
      {/* 文字行 */}
      {[0, 1, 2, 3, 4, 5, 6].map(i => (
        <Rect key={i} x={padX + 3} y={padY + 12 + i * (padH / 10)} width={padW * (0.4 + (i * 17 % 5) * 0.1)} height={2} fill={C.metalLight} opacity={0.5} />
      ))}
      {/* 照片占位 */}
      <Rect x={padX + padW * 0.7} y={padY + 6} width={padW * 0.2} height={padH * 0.2} fill={C.metalDark} stroke={C.metalLight} strokeWidth={1} />
    </>
  )
}

/** 魁北克大桥模型 */
function BridgeModel({ w, h }: { w: number; h: number }) {
  const deckY = h * 0.5
  const towerW = Math.max(4, w * 0.05)
  const towerH = h * 0.45

  return (
    <>
      {/* 阴影 */}
      <Rect x={2} y={h - 4} width={w - 4} height={4} fill={C.black} opacity={0.3} />
      {/* 桥面 */}
      <Rect x={w * 0.05} y={deckY} width={w * 0.9} height={h * 0.08} fill={C.metalLight} stroke={C.black} strokeWidth={2} />
      {/* 左塔 */}
      <Rect x={w * 0.25 - towerW / 2} y={deckY - towerH} width={towerW} height={towerH} fill={C.metalDark} stroke={C.black} strokeWidth={2} />
      {/* 右塔 */}
      <Rect x={w * 0.75 - towerW / 2} y={deckY - towerH} width={towerW} height={towerH} fill={C.metalDark} stroke={C.black} strokeWidth={2} />
      {/* 左塔顶横梁 */}
      <Rect x={w * 0.25 - towerW} y={deckY - towerH} width={towerW * 2} height={h * 0.04} fill={C.metalLight} stroke={C.black} strokeWidth={1} />
      {/* 右塔顶横梁 */}
      <Rect x={w * 0.75 - towerW} y={deckY - towerH} width={towerW * 2} height={h * 0.04} fill={C.metalLight} stroke={C.black} strokeWidth={1} />
      {/* 桥面下方支撑斜杆 */}
      <Line points={[w * 0.15, deckY + h * 0.08, w * 0.35, h * 0.8]} stroke={C.metalDark} strokeWidth={2} />
      <Line points={[w * 0.85, deckY + h * 0.08, w * 0.65, h * 0.8]} stroke={C.metalDark} strokeWidth={2} />
      {/* 中间斜拉线 */}
      <Line points={[w * 0.25, deckY - towerH, w * 0.5, deckY]} stroke={C.blue} strokeWidth={1} opacity={0.4} />
      <Line points={[w * 0.75, deckY - towerH, w * 0.5, deckY]} stroke={C.blue} strokeWidth={1} opacity={0.4} />
    </>
  )
}

/** 工具箱 */
function Toolbox({ w, h }: { w: number; h: number }) {
  const bodyH = h * 0.6
  const bodyY = h * 0.3

  return (
    <>
      {/* 阴影 */}
      <Rect x={2} y={h - 4} width={w - 4} height={4} fill={C.black} opacity={0.3} />
      {/* 箱体 */}
      <Rect x={w * 0.05} y={bodyY} width={w * 0.9} height={bodyH} fill={C.orange} stroke={C.black} strokeWidth={3} />
      {/* 把手 */}
      <Rect x={w * 0.3} y={bodyY - h * 0.12} width={w * 0.4} height={h * 0.08} fill={C.metalLight} stroke={C.black} strokeWidth={2} />
      {/* 把手支柱 */}
      <Rect x={w * 0.3} y={bodyY - h * 0.04} width={3} height={h * 0.04} fill={C.metalDark} />
      <Rect x={w * 0.7 - 3} y={bodyY - h * 0.04} width={3} height={h * 0.04} fill={C.metalDark} />
      {/* 锁扣 */}
      <Rect x={w * 0.47} y={bodyY + bodyH * 0.3} width={w * 0.06} height={h * 0.06} fill={C.metalLight} stroke={C.black} strokeWidth={1} />
      {/* 金属条装饰 */}
      <Rect x={w * 0.05} y={bodyY + bodyH * 0.5} width={w * 0.9} height={h * 0.04} fill={C.metalDark} opacity={0.5} />
      {/* 露出的工具 */}
      <Rect x={w * 0.7} y={bodyY - h * 0.08} width={2} height={h * 0.1} fill={C.metalLight} />
      <Rect x={w * 0.78} y={bodyY - h * 0.12} width={2} height={h * 0.14} fill={C.metalLight} />
      <Rect x={w * 0.86} y={bodyY - h * 0.06} width={2} height={h * 0.08} fill={C.gold} />
    </>
  )
}

/** 树干 */
function TreeTrunk({ w, h }: { w: number; h: number }) {
  const trunkW = w * 0.4
  const baseW = w * 0.55
  const trunkX = (w - trunkW) / 2
  const baseX = (w - baseW) / 2

  return (
    <>
      {/* 树干主体 */}
      <Rect x={trunkX} y={h * 0.05} width={trunkW} height={h * 0.9} fill={C.orange} stroke={C.black} strokeWidth={3} />
      {/* 树干底部加宽 */}
      <Rect x={baseX} y={h * 0.75} width={baseW} height={h * 0.2} fill={C.orange} stroke={C.black} strokeWidth={3} />
      {/* 树皮纹理横线 */}
      {[0, 1, 2, 3, 4, 5].map(i => (
        <Rect key={i} x={trunkX + 2} y={h * 0.1 + i * (h * 0.12)} width={trunkW - 4} height={2} fill={C.bgLight} opacity={0.4} />
      ))}
      {/* 根部 */}
      <Rect x={baseX - w * 0.05} y={h * 0.85} width={w * 0.12} height={h * 0.1} fill={C.orange} stroke={C.black} strokeWidth={2} />
      <Rect x={baseX + baseW - w * 0.07} y={h * 0.85} width={w * 0.12} height={h * 0.1} fill={C.orange} stroke={C.black} strokeWidth={2} />
    </>
  )
}

/** 树枝 */
function TreeBranch({ w, h }: { w: number; h: number }) {
  return (
    <>
      {/* 主枝干 - 从左侧粗到右侧细 */}
      <Rect x={0} y={h * 0.3} width={w * 0.7} height={h * 0.35} fill={C.orange} stroke={C.black} strokeWidth={2} />
      <Rect x={w * 0.6} y={h * 0.35} width={w * 0.25} height={h * 0.25} fill={C.orange} stroke={C.black} strokeWidth={2} />
      <Rect x={w * 0.8} y={h * 0.4} width={w * 0.2} height={h * 0.15} fill={C.orange} stroke={C.black} strokeWidth={1} />
      {/* 叶簇 */}
      <Rect x={w * 0.5} y={h * 0.05} width={w * 0.18} height={h * 0.2} fill={C.green} stroke={C.black} strokeWidth={1} />
      <Rect x={w * 0.65} y={h * 0.1} width={w * 0.15} height={h * 0.18} fill={C.greenBright} stroke={C.black} strokeWidth={1} />
      <Rect x={w * 0.78} y={h * 0.15} width={w * 0.15} height={h * 0.15} fill={C.green} stroke={C.black} strokeWidth={1} />
      <Rect x={w * 0.35} y={h * 0.1} width={w * 0.15} height={h * 0.15} fill={C.greenBright} stroke={C.black} strokeWidth={1} />
    </>
  )
}

/** 指纹扫描仪 */
function FingerprintScanner({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  const cy = h * 0.45
  const scanR = Math.min(w, h) * 0.22

  return (
    <>
      {/* 面板背景 */}
      <Rect x={0} y={0} width={w} height={h} fill={C.bgLight} stroke={C.metalDark} strokeWidth={3} />
      {/* 扫描区域圆形 */}
      <Circle x={cx} y={cy} radius={scanR} fill={C.bgDeep} stroke={C.blue} strokeWidth={2} />
      {/* 指纹纹路 (同心弧线近似) */}
      <Circle x={cx} y={cy} radius={scanR * 0.7} stroke={C.cyan} strokeWidth={1} opacity={0.3} />
      <Circle x={cx} y={cy} radius={scanR * 0.45} stroke={C.cyan} strokeWidth={1} opacity={0.4} />
      <Circle x={cx} y={cy} radius={scanR * 0.2} stroke={C.cyan} strokeWidth={1} opacity={0.5} />
      {/* 扫描线 */}
      <Rect x={cx - scanR} y={cy - 1} width={scanR * 2} height={2} fill={C.cyan} opacity={0.6} />
      {/* 指示灯 */}
      <Rect x={cx - w * 0.08} y={h * 0.8} width={w * 0.06} height={w * 0.06} fill={C.green} stroke={C.black} strokeWidth={1} />
      <Rect x={cx + w * 0.02} y={h * 0.8} width={w * 0.06} height={w * 0.06} fill={C.red} stroke={C.black} strokeWidth={1} opacity={0.5} />
    </>
  )
}

/** 全息锁 */
function HoloLock({ w, h }: { w: number; h: number }) {
  const cx = w / 2
  const lockW = w * 0.4
  const lockH = h * 0.4
  const shackleW = lockW * 0.5
  const shackleH = h * 0.25

  return (
    <>
      {/* 发光光晕 */}
      <Rect x={cx - lockW / 2 - 4} y={h * 0.25 - 4} width={lockW + 8} height={lockH + 8} fill={C.blue} opacity={0.08} />
      {/* 锁扣 (U形) */}
      <Rect x={cx - shackleW / 2} y={h * 0.08} width={shackleW * 0.2} height={shackleH + h * 0.05} fill={C.cyan} stroke={C.blue} strokeWidth={2} opacity={0.8} />
      <Rect x={cx + shackleW / 2 - shackleW * 0.2} y={h * 0.08} width={shackleW * 0.2} height={shackleH + h * 0.05} fill={C.cyan} stroke={C.blue} strokeWidth={2} opacity={0.8} />
      <Rect x={cx - shackleW / 2} y={h * 0.08} width={shackleW} height={shackleW * 0.2} fill={C.cyan} stroke={C.blue} strokeWidth={2} opacity={0.8} />
      {/* 锁体 */}
      <Rect x={cx - lockW / 2} y={h * 0.35} width={lockW} height={lockH} fill={C.blue} stroke={C.cyan} strokeWidth={2} opacity={0.7} />
      {/* 锁孔 */}
      <Circle x={cx} y={h * 0.5} radius={Math.max(2, lockW * 0.1)} fill={C.bgDeep} stroke={C.cyan} strokeWidth={1} />
      {/* 像素闪光点 */}
      <Rect x={cx - lockW / 2 - w * 0.1} y={h * 0.2} width={3} height={3} fill={C.cyan} opacity={0.5} />
      <Rect x={cx + lockW / 2 + w * 0.05} y={h * 0.35} width={3} height={3} fill={C.cyan} opacity={0.4} />
      <Rect x={cx - w * 0.05} y={h * 0.1} width={2} height={2} fill={C.cyan} opacity={0.6} />
      <Rect x={cx + w * 0.08} y={h * 0.15} width={2} height={2} fill={C.cyan} opacity={0.3} />
    </>
  )
}

/** 区块链区块 */
function Block(id: string) {
  return function BlockRenderer({ w, h }: { w: number; h: number }) {
    const isGenesis = id === 'block-3'
    const borderCol = isGenesis ? C.gold : C.metalDark
    const faceTop = C.bgLight
    const faceFront = C.bgMid
    const faceSide = C.bgDeep

    return (
      <>
        {/* 3D 顶面 */}
        <Rect x={w * 0.1} y={0} width={w * 0.8} height={h * 0.25} fill={faceTop} stroke={borderCol} strokeWidth={isGenesis ? 3 : 2} />
        {/* 3D 正面 */}
        <Rect x={0} y={h * 0.2} width={w * 0.8} height={h * 0.7} fill={faceFront} stroke={borderCol} strokeWidth={isGenesis ? 3 : 2} />
        {/* 3D 侧面 */}
        <Rect x={w * 0.8} y={h * 0.05} width={w * 0.2} height={h * 0.85} fill={faceSide} stroke={borderCol} strokeWidth={1} />
        {/* 连接顶面到侧面 */}
        <Line points={[w * 0.8, h * 0.2, w, h * 0.05]} stroke={borderCol} strokeWidth={1} />
        <Line points={[w * 0.8, h * 0.9, w, h * 0.9]} stroke={borderCol} strokeWidth={1} />
        <Line points={[w, h * 0.05, w, h * 0.9]} stroke={borderCol} strokeWidth={1} />
        {/* 哈希文本行 */}
        <Rect x={4} y={h * 0.3} width={w * 0.5} height={2} fill={C.metalLight} opacity={0.4} />
        <Rect x={4} y={h * 0.4} width={w * 0.6} height={2} fill={C.metalLight} opacity={0.3} />
        <Rect x={4} y={h * 0.5} width={w * 0.35} height={2} fill={C.metalLight} opacity={0.4} />
        <Rect x={4} y={h * 0.6} width={w * 0.55} height={2} fill={C.metalLight} opacity={0.3} />
        {/* 创世区块发光边 */}
        {isGenesis && <Rect x={-2} y={-2} width={w * 0.82 + 4} height={h * 0.72 + 4} stroke={C.gold} strokeWidth={1} opacity={0.3} />}
      </>
    )
  }
}

// ==================== 路由映射 ====================

function getRenderer(decorId: string) {
  if (decorId.startsWith('block')) return Block(decorId)
  switch (decorId) {
    case 'old-computer': return OldComputer
    case 'scale': return Scale
    case 'floating-resume': return FloatingResume
    case 'bridge-model': return BridgeModel
    case 'toolbox': return Toolbox
    case 'tree-trunk': return TreeTrunk
    case 'tree-branch':
    case 'tree-branch-1':
    case 'tree-branch-2':
      return TreeBranch
    case 'fingerprint-scanner': return FingerprintScanner
    case 'holo-lock': return HoloLock
    default: return null
  }
}

/** 通用兜底 */
function GenericEquipment({ w, h }: { w: number; h: number }) {
  return (
    <>
      <Rect x={0} y={0} width={w} height={h} fill={C.bgLight} stroke={C.metalDark} strokeWidth={3} />
      <Rect x={w * 0.3} y={h * 0.4} width={w * 0.4} height={h * 0.2} fill={C.metalDark} stroke={C.black} strokeWidth={1} />
    </>
  )
}

// ==================== 主组件 ====================

export default function EquipmentDecor({ width, height, decorId, x, y }: EquipmentDecorProps) {
  const Renderer = getRenderer(decorId) ?? GenericEquipment

  return (
    <Group x={x} y={y}>
      {Renderer({ w: width, h: height })}
    </Group>
  )
}
