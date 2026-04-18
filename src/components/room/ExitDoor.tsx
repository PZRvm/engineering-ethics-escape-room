import { memo } from 'react'
import { Group, Rect, Text } from 'react-konva'

// ==================== 常量 ====================

const DOOR_W = 60
const DOOR_H = 36
const SCENE_WIDTH = 960
const SCENE_HEIGHT = 640

// ==================== 组件 ====================

interface ExitDoorProps {
  x: number
  y: number
  unlocked: boolean
  onClick: (x: number, y: number) => void
}

function ExitDoorInner({ x, y, unlocked, onClick }: ExitDoorProps) {
  const px = (x / 100) * SCENE_WIDTH
  const py = (y / 100) * SCENE_HEIGHT

  return (
    <Group
      x={px}
      y={py}
      offsetX={DOOR_W / 2}
      offsetY={DOOR_H / 2}
      name="exit-door"
      onClick={() => unlocked && onClick(x, y)}
      onTap={() => unlocked && onClick(x, y)}
    >
      {/* 门主体 */}
      <Rect
        width={DOOR_W}
        height={DOOR_H}
        fill={unlocked ? '#262b44' : '#262b44'}
        stroke={unlocked ? '#41a6f6' : '#566c86'}
        strokeWidth={4}
      />
      {/* EXIT 标签 */}
      <Text
        x={0}
        y={-14}
        width={DOOR_W}
        text="EXIT"
        fontSize={10}
        fontFamily="Silkscreen, monospace"
        fill="#566c86"
        align="center"
      />
      {/* 门图标 */}
      <Text
        x={0}
        y={8}
        width={DOOR_W}
        text={unlocked ? '🚪' : '🔒'}
        fontSize={16}
        align="center"
      />
    </Group>
  )
}

export default memo(ExitDoorInner)
