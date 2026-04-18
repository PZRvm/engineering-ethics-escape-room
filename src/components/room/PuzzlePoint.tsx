import { memo } from 'react'
import { Group, Rect, Text } from 'react-konva'
import type { PuzzleStatus } from '../../types/game'

// ==================== 常量 ====================

const POINT_SIZE = 44
const SCENE_WIDTH = 960
const SCENE_HEIGHT = 640

// ==================== 颜色映射 ====================

const STATUS_COLORS: Record<PuzzleStatus, { border: string; fill: string }> = {
  active: { border: '#41a6f6', fill: '#333c57' },
  locked: { border: '#566c86', fill: '#262b44' },
  solved: { border: '#38b764', fill: '#333c57' },
}

// ==================== 组件 ====================

interface PuzzlePointProps {
  id: string
  x: number
  y: number
  status: PuzzleStatus
  onClick: (id: string, clickX: number, clickY: number) => void
}

function PuzzlePointInner({ id, x, y, status, onClick }: PuzzlePointProps) {
  const px = (x / 100) * SCENE_WIDTH
  const py = (y / 100) * SCENE_HEIGHT
  const colors = STATUS_COLORS[status]

  const icon = status === 'solved' ? '✓' : status === 'locked' ? '🔒' : '◆'
  const opacity = status === 'locked' ? 0.5 : 1

  return (
    <Group
      x={px}
      y={py}
      offsetX={POINT_SIZE / 2}
      offsetY={POINT_SIZE / 2}
      name="puzzle-point"
      opacity={opacity}
      onClick={() => status === 'active' && onClick(id, x, y)}
      onTap={() => status === 'active' && onClick(id, x, y)}
    >
      {/* 主方块 */}
      <Rect
        width={POINT_SIZE}
        height={POINT_SIZE}
        fill={colors.fill}
        stroke={colors.border}
        strokeWidth={3}
      />
      {/* 图标文字 */}
      <Text
        x={0}
        y={8}
        width={POINT_SIZE}
        text={icon}
        fontSize={16}
        fontFamily="Silkscreen, monospace"
        fill={status === 'solved' ? '#38b764' : status === 'active' ? '#f4f4f4' : '#566c86'}
        align="center"
      />
      {/* ID 标签 */}
      <Text
        x={0}
        y={POINT_SIZE + 4}
        width={POINT_SIZE}
        text={id}
        fontSize={10}
        fontFamily="Silkscreen, monospace"
        fill="#566c86"
        align="center"
      />
    </Group>
  )
}

export default memo(PuzzlePointInner)
