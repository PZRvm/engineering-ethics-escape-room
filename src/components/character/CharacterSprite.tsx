import { useState, useEffect, useCallback, useRef } from 'react'
import { Group, Rect, Text } from 'react-konva'

// ==================== 类型 ====================

type Direction = 'down' | 'up' | 'left' | 'right'

// ==================== 常量 ====================

const SCENE_WIDTH = 960
const SCENE_HEIGHT = 640

// 角色像素尺寸
const HEAD_W = 22
const HEAD_H = 22
const TORSO_W = 20
const TORSO_H = 18
const LEG_W = 6
const LEG_H = 10
const LEG_GAP = 4

// 角色整体尺寸
const BODY_W = 32
const BODY_H = 48

// ==================== Hook ====================

// eslint-disable-next-line react-refresh/only-export-components -- hook and component intentionally co-located
export function useCharacter(entryPos: { x: number; y: number }) {
  const [pos, setPos] = useState(entryPos)
  const [moving, setMoving] = useState(false)
  const [direction, setDirection] = useState<Direction>('down')
  const [flashError, setFlashError] = useState(false)
  const [scorePopup, setScorePopup] = useState<{ x: number; y: number; score: number } | null>(null)
  const rafRef = useRef<number>(0)
  // 用 ref 追踪实时位置，避免 rAF 中每帧 setState 导致 60fps 重渲染
  const posRef = useRef(entryPos)
  const movingRef = useRef(false)
  const onArriveRef = useRef<(() => void) | undefined>(undefined)

  // 同步 ref -> state（每帧调用，但只影响动态 Layer）
  const syncPos = useCallback(() => {
    setPos({ x: posRef.current.x, y: posRef.current.y })
  }, [])

  const moveToPoint = useCallback((dest: { x: number; y: number }, onArrive?: () => void) => {
    cancelAnimationFrame(rafRef.current)

    const currentPos = { x: posRef.current.x, y: posRef.current.y }
    const dx = dest.x - currentPos.x
    const dy = dest.y - currentPos.y
    if (Math.abs(dx) > Math.abs(dy)) {
      setDirection(dx > 0 ? 'right' : 'left')
    } else {
      setDirection(dy > 0 ? 'down' : 'up')
    }

    movingRef.current = true
    onArriveRef.current = onArrive
    setMoving(true)

    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < 0.1) {
      // 已在目标位置，直接完成
      posRef.current = dest
      setPos({ x: dest.x, y: dest.y })
      movingRef.current = false
      setMoving(false)
      onArrive?.()
      return
    }

    const duration = Math.max(0.3, distance / 30) * 1000
    const startX = currentPos.x
    const startY = currentPos.y
    const startTime = performance.now()

    const animate = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      posRef.current = {
        x: startX + (dest.x - startX) * t,
        y: startY + (dest.y - startY) * t,
      }
      syncPos()

      if (t < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        posRef.current = dest
        // 动画结束时强制同步最终位置（跳过节流）
        setPos({ x: dest.x, y: dest.y })
        movingRef.current = false
        setMoving(false)
        onArriveRef.current?.()
      }
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [syncPos])

  const triggerError = useCallback(() => {
    setFlashError(true)
    setTimeout(() => setFlashError(false), 400)
  }, [])

  const triggerScorePopup = useCallback((score: number) => {
    setScorePopup({ x: posRef.current.x, y: posRef.current.y - 5, score })
    setTimeout(() => setScorePopup(null), 1000)
  }, [])

  useEffect(() => () => cancelAnimationFrame(rafRef.current), [])

  return { pos, moving, direction, flashError, scorePopup, moveToPoint, triggerError, triggerScorePopup }
}

// ==================== Konva 组件 ====================

interface CharacterSpriteProps {
  pos: { x: number; y: number }
  moving: boolean
  direction: Direction
  flashError: boolean
  scorePopup: { x: number; y: number; score: number } | null
}

export default function CharacterSprite({ pos, moving, direction, flashError, scorePopup }: CharacterSpriteProps) {
  // 百分比转像素，中心锚点
  const px = (pos.x / 100) * SCENE_WIDTH
  const py = (pos.y / 100) * SCENE_HEIGHT

  // 翻转：面向左时 scaleX(-1)
  const scaleX = direction === 'left' ? -1 : 1

  // 错误闪烁时变色
  const bodyColor = flashError ? '#8b3a3a' : 'var(--color-text-primary, #f4f4f4)'
  const torsoColor = flashError ? '#6b2020' : '#41a6f6'

  // 简易行走动画：摆动腿部偏移
  const legSwing = moving ? 3 : 0

  // 眼睛：朝上时隐藏
  const showEyes = direction !== 'up'

  // 眼睛位置
  const eyeY = 8
  const leftEyeX = BODY_W / 2 - 4
  const rightEyeX = BODY_W / 2 + 4

  return (
    <>
      {/* 角色主体 - 中心锚点 */}
      <Group
        x={px}
        y={py}
        offsetX={BODY_W / 2}
        offsetY={BODY_H / 2}
        scaleX={scaleX}
      >
        {/* 头部 */}
        <Rect
          x={(BODY_W - HEAD_W) / 2}
          y={0}
          width={HEAD_W}
          height={HEAD_H}
          fill={bodyColor}
          stroke="#000"
          strokeWidth={3}
        />

        {/* 眼睛 */}
        {showEyes && (
          <>
            <Rect x={leftEyeX} y={eyeY} width={4} height={4} fill="#000" />
            <Rect x={rightEyeX} y={eyeY} width={4} height={4} fill="#000" />
          </>
        )}

        {/* 躯干 */}
        <Rect
          x={(BODY_W - TORSO_W) / 2}
          y={20}
          width={TORSO_W}
          height={TORSO_H}
          fill={torsoColor}
          stroke="#000"
          strokeWidth={3}
        />

        {/* 左腿 */}
        <Rect
          x={BODY_W / 2 - LEG_GAP / 2 - LEG_W + legSwing}
          y={BODY_H - LEG_H}
          width={LEG_W}
          height={LEG_H}
          fill={bodyColor}
          stroke="#000"
          strokeWidth={2}
        />

        {/* 右腿 */}
        <Rect
          x={BODY_W / 2 + LEG_GAP / 2 - legSwing}
          y={BODY_H - LEG_H}
          width={LEG_W}
          height={LEG_H}
          fill={bodyColor}
          stroke="#000"
          strokeWidth={2}
        />

        {/* 角色脚下阴影 */}
        <Rect
          x={(BODY_W - 28) / 2}
          y={BODY_H}
          width={28}
          height={4}
          fill="#000"
          opacity={0.3}
          cornerRadius={2}
        />
      </Group>

      {/* 分数弹出 */}
      {scorePopup && (
        <Text
          x={(scorePopup.x / 100) * SCENE_WIDTH}
          y={(scorePopup.y / 100) * SCENE_HEIGHT}
          text={`+${scorePopup.score}`}
          fontSize={14}
          fontFamily="Silkscreen, monospace"
          fill="#41a6f6"
          stroke="#000"
          strokeWidth={1}
          offsetX={12}
          offsetY={8}
        />
      )}
    </>
  )
}

export type { Direction }
