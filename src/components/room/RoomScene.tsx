import { Stage, Layer, Rect } from 'react-konva'
import type { KonvaEventObject } from 'konva/lib/Node'
import type { Room, PuzzleStatus } from '../../types/game'
import type { Direction } from '../character/CharacterSprite'
import PuzzlePoint from './PuzzlePoint'
import ExitDoor from './ExitDoor'
import CharacterSprite from '../character/CharacterSprite'
import DecorRenderer from './decors'

// ==================== Konva 常量 ====================

const SCENE_WIDTH = 960
const SCENE_HEIGHT = 640
const GRID_SIZE = 40

// ==================== 组件 ====================

interface RoomSceneProps {
  room: Room
  puzzleStatuses: Record<string, PuzzleStatus>
  onPuzzleClick: (puzzleId: string, clickX: number, clickY: number) => void
  onEmptyClick: (x: number, y: number) => void
  onExitClick: (x: number, y: number) => void
  characterPos: { x: number; y: number }
  characterMoving: boolean
  characterDirection: Direction
  characterFlashError: boolean
  characterScorePopup: { x: number; y: number; score: number } | null
}

export default function RoomScene({
  room,
  puzzleStatuses,
  onPuzzleClick,
  onEmptyClick,
  onExitClick,
  characterPos,
  characterMoving,
  characterDirection,
  characterFlashError,
  characterScorePopup,
}: RoomSceneProps) {
  const allSolved = room.puzzles.every(p => puzzleStatuses[p.id] === 'solved')

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    // 忽略点击在答题点或出口门上的事件
    if (e.target.name() === 'puzzle-point' || e.target.name() === 'exit-door') return
    // 也检查父级 Group 的 name
    const parent = e.target.getParent()
    if (parent && (parent.name() === 'puzzle-point' || parent.name() === 'exit-door')) return

    const stage = e.target.getStage()
    if (!stage) return
    const pos = stage.getPointerPosition()
    if (!pos) return

    // 点击位置转换为百分比坐标（代表点击点的中心）
    const x = (pos.x / SCENE_WIDTH) * 100
    const y = (pos.y / SCENE_HEIGHT) * 100
    onEmptyClick(x, y)
  }

  return (
    <Stage
      width={SCENE_WIDTH}
      height={SCENE_HEIGHT}
      onClick={handleStageClick}
      onTap={handleStageClick as unknown as (e: KonvaEventObject<TouchEvent>) => void}
      style={{
        border: '4px solid var(--color-border-default)',
        boxShadow: '4px 4px 0px 0px #000',
        imageRendering: 'pixelated',
        maxWidth: '100%',
        height: 'auto',
      }}
    >
      {/* 静态层：背景、网格、装饰物、答题点、出口门 */}
      <Layer>
        {/* 背景 */}
        <Rect
          x={0} y={0}
          width={SCENE_WIDTH} height={SCENE_HEIGHT}
          fill="#262b44"
        />

        {/* 网格线 */}
        {Array.from({ length: Math.ceil(SCENE_WIDTH / GRID_SIZE) }).map((_, i) => (
          <Rect
            key={`vx-${i}`}
            x={i * GRID_SIZE} y={0}
            width={1} height={SCENE_HEIGHT}
            fill="#566c86"
            opacity={0.15}
          />
        ))}
        {Array.from({ length: Math.ceil(SCENE_HEIGHT / GRID_SIZE) }).map((_, i) => (
          <Rect
            key={`hz-${i}`}
            x={0} y={i * GRID_SIZE}
            width={SCENE_WIDTH} height={1}
            fill="#566c86"
            opacity={0.15}
          />
        ))}

        {/* 装饰物 - 像素风格绘制 */}
        {room.layout.decors.map(d => (
          <DecorRenderer key={d.id} decor={d} />
        ))}

        {/* 出口门 - 中心锚点 */}
        <ExitDoor
          x={room.layout.exitDoorPosition.x}
          y={room.layout.exitDoorPosition.y}
          unlocked={allSolved}
          onClick={onExitClick}
        />

        {/* 答题点 - 中心锚点 */}
        {room.puzzles.map(p => {
          const point = room.layout.puzzlePoints[p.id]
          if (!point) return null
          return (
            <PuzzlePoint
              key={p.id}
              id={p.id}
              x={point.x}
              y={point.y}
              status={puzzleStatuses[p.id] ?? 'locked'}
              onClick={onPuzzleClick}
            />
          )
        })}
      </Layer>

      {/* 动态层：角色（每帧移动，独立渲染不影响静态层） */}
      <Layer>
        <CharacterSprite
          pos={characterPos}
          moving={characterMoving}
          direction={characterDirection}
          flashError={characterFlashError}
          scorePopup={characterScorePopup}
        />
      </Layer>
    </Stage>
  )
}
