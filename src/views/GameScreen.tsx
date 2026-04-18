import { useState, useCallback, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import PixelBackground from '../components/effects/PixelBackground'
import RoomEntrance from '../components/room/RoomEntrance'
import RoomScene from '../components/room/RoomScene'
import { useCharacter } from '../components/character/CharacterSprite'
import PuzzleShell, { type PuzzleResult } from '../components/puzzle/PuzzleShell'
import DragSortPuzzle, { type DragSortHandle } from '../components/puzzle/DragSortPuzzle'
import DragClassifyPuzzle, { type DragClassifyHandle } from '../components/puzzle/DragClassifyPuzzle'
import MultipleChoicePuzzle, { type MultipleChoiceHandle } from '../components/puzzle/MultipleChoicePuzzle'
import ScenarioPuzzle, { type ScenarioHandle } from '../components/puzzle/ScenarioPuzzle'
import PasswordLockPuzzle, { type PasswordLockHandle } from '../components/puzzle/PasswordLockPuzzle'
import FillBlankPuzzle, { type FillBlankHandle } from '../components/puzzle/FillBlankPuzzle'
import { rooms } from '../data/rooms'
import type { Puzzle, PuzzleStatus } from '../types/game'
import type { DragSortData } from '../types/game'
import type { DragClassifyData } from '../types/game'
import type { MultipleChoiceData } from '../types/game'
import type { ScenarioData } from '../types/game'
import type { PasswordLockData } from '../types/game'
import type { FillBlankData } from '../types/game'

// ==================== Styled ====================

const Wrapper = styled.div`
  min-height: 100vh;
  background: var(--color-bg-primary);
  position: relative;
  overflow: hidden;

  /* ---- Content Area ---- */
  .content-area {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 1rem;
    padding-top: 4rem;
  }

  /* ---- Game Header ---- */
  .game-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 48px;
    background: var(--color-bg-secondary);
    border-bottom: 4px solid var(--color-pixel-green);
    box-shadow: 0 4px 0px 0px #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 1rem;
    z-index: 40;
    image-rendering: pixelated;
  }

  .header-left {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-text-secondary);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .header-left .back-link {
    cursor: pointer;
    color: var(--color-text-muted);
  }

  .header-left .back-link:hover {
    color: var(--color-text-primary);
  }

  .header-center {
    display: flex;
    gap: 0.35rem;
    align-items: center;
  }

  .progress-dot {
    width: 10px;
    height: 10px;
    image-rendering: pixelated;
  }

  .progress-dot[data-state="done"] {
    border: 2px solid var(--color-pixel-cyan);
    background: var(--color-pixel-cyan);
  }

  .progress-dot[data-state="current"] {
    border: 2px solid var(--color-pixel-green);
    background: var(--color-pixel-green);
    animation: neon-pulse 2s steps(2) infinite;
  }

  .progress-dot[data-state="future"] {
    border: 2px solid var(--color-border-default);
    background: transparent;
  }

  .header-right {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    display: flex;
    gap: 1rem;
  }

  .header-right .score {
    color: var(--color-pixel-gold);
  }

  .header-right .timer {
    color: var(--color-text-secondary);
  }

  /* ---- Status Bar ---- */
  .status-bar {
    margin-top: 1rem;
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-text-muted);
    letter-spacing: 0.1em;
  }
`

// ==================== 谜题渲染 ====================

type PuzzleHandle = DragSortHandle | DragClassifyHandle | MultipleChoiceHandle | ScenarioHandle | PasswordLockHandle | FillBlankHandle

function PuzzleContent({
  puzzle,
  disabled,
  ref_,
}: {
  puzzle: Puzzle
  disabled: boolean
  ref_: React.RefObject<PuzzleHandle | null>
}) {
  switch (puzzle.data.type) {
    case 'drag-sort':
      return <DragSortPuzzle ref={ref_ as React.RefObject<DragSortHandle | null>} data={puzzle.data as DragSortData} disabled={disabled} onAnswer={() => {}} />
    case 'drag-classify':
      return <DragClassifyPuzzle ref={ref_ as React.RefObject<DragClassifyHandle | null>} data={puzzle.data as DragClassifyData} disabled={disabled} onAnswer={() => {}} />
    case 'multiple-choice':
      return <MultipleChoicePuzzle ref={ref_ as React.RefObject<MultipleChoiceHandle | null>} data={puzzle.data as MultipleChoiceData} disabled={disabled} onAnswer={() => {}} />
    case 'scenario':
      return <ScenarioPuzzle ref={ref_ as React.RefObject<ScenarioHandle | null>} data={puzzle.data as ScenarioData} disabled={disabled} onAnswer={() => {}} />
    case 'password-lock':
      return <PasswordLockPuzzle ref={ref_ as React.RefObject<PasswordLockHandle | null>} data={puzzle.data as PasswordLockData} disabled={disabled} onAnswer={() => {}} />
    case 'fill-blank':
      return <FillBlankPuzzle ref={ref_ as React.RefObject<FillBlankHandle | null>} data={puzzle.data as FillBlankData} disabled={disabled} onAnswer={() => {}} />
    default:
      return null
  }
}

// ==================== 组件 ====================

type Phase = 'entrance' | 'exploring' | 'cleared'

export default function GameScreen() {
  const navigate = useNavigate()
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('entrance')
  const [puzzleStatuses, setPuzzleStatuses] = useState<Record<string, PuzzleStatus>>(() => {
    const statuses: Record<string, PuzzleStatus> = {}
    const firstRoom = rooms[0]
    firstRoom.puzzles.forEach((p, i) => {
      statuses[p.id] = i === 0 ? 'active' : 'locked'
    })
    return statuses
  })
  const [totalScore, setTotalScore] = useState(0)

  // 答题弹窗状态
  const [activePuzzleId, setActivePuzzleId] = useState<string | null>(null)
  const [puzzleResult, setPuzzleResult] = useState<PuzzleResult>('none')
  const [showHint, setShowHint] = useState(false)
  const puzzleRef = useRef<PuzzleHandle | null>(null)

  // 用 ref 追踪弹窗状态，使回调保持稳定引用
  const isPuzzleOpenRef = useRef(false)
  useEffect(() => {
    isPuzzleOpenRef.current = activePuzzleId !== null
  })

  const room = rooms[currentRoomIndex]
  const character = useCharacter(room.layout.entryPosition)
  const activePuzzle = activePuzzleId ? room.puzzles.find(p => p.id === activePuzzleId) : null

  // ===== 进入密室 =====
  const handleEnter = useCallback(() => {
    character.moveToPoint(room.layout.entryPosition)
    setPhase('exploring')
  }, [character, room])

  // ===== 点击答题点 =====
  const handlePuzzleClick = useCallback((puzzleId: string, clickX: number, clickY: number) => {
    if (isPuzzleOpenRef.current) return
    const status = puzzleStatuses[puzzleId]
    if (status !== 'active') return

    const point = room.layout.puzzlePoints[puzzleId]
    if (!point) return

    // 角色走到玩家实际点击的位置
    character.moveToPoint(
      { x: clickX, y: clickY },
      () => {
        // 到达后弹出答题弹窗
        setActivePuzzleId(puzzleId)
        setPuzzleResult('none')
        setShowHint(false)
      }
    )
  }, [character, puzzleStatuses, room])

  // ===== 点击空白区域 =====
  const handleEmptyClick = useCallback((x: number, y: number) => {
    if (isPuzzleOpenRef.current) return
    character.moveToPoint({ x, y })
  }, [character])

  // ===== 出口门 =====
  const handleExit = useCallback((doorX: number, doorY: number) => {
    if (isPuzzleOpenRef.current) return
    character.moveToPoint({ x: doorX, y: doorY }, () => {
      const nextIndex = currentRoomIndex + 1
      if (nextIndex >= rooms.length) {
        navigate(`/victory?score=${totalScore}`)
        return
      }

      const nextRoom = rooms[nextIndex]
      setPuzzleStatuses(prev => {
        const next = { ...prev }
        nextRoom.puzzles.forEach((p, i) => {
          next[p.id] = i === 0 ? 'active' : 'locked'
        })
        return next
      })
      setCurrentRoomIndex(nextIndex)
      setPhase('entrance')
    })
  }, [character, currentRoomIndex, navigate, totalScore])

  // ===== 提交答案 =====
  const handleSubmit = useCallback(() => {
    // 防止快速双击重复提交
    if (puzzleResult !== 'none') return
    if (!puzzleRef.current || !activePuzzleId) return

    const isCorrect = puzzleRef.current.check()
    setPuzzleResult(isCorrect ? 'correct' : 'wrong')

    if (isCorrect) {
      const puzzle = room.puzzles.find(p => p.id === activePuzzleId)
      if (!puzzle) return
      const score = puzzle.score

      setPuzzleStatuses(prev => {
        const next = { ...prev, [activePuzzleId]: 'solved' as PuzzleStatus }
        const currentIndex = room.puzzles.findIndex(p => p.id === activePuzzleId)
        const nextPuzzle = room.puzzles[currentIndex + 1]
        if (nextPuzzle && prev[nextPuzzle.id] === 'locked') {
          next[nextPuzzle.id] = 'active'
        }
        return next
      })

      setTotalScore(prev => prev + score)
      character.triggerScorePopup(score)
    } else {
      character.triggerError()
    }
  }, [activePuzzleId, character, puzzleResult, room])

  // ===== 关闭弹窗 =====
  const handleClosePuzzle = useCallback(() => {
    setActivePuzzleId(null)
    setPuzzleResult('none')
    setShowHint(false)
  }, [])

  // ===== 返回房间（答对后） =====
  const handleBackToRoom = useCallback(() => {
    setActivePuzzleId(null)
    setPuzzleResult('none')
    setShowHint(false)
  }, [])

  // ===== 重试 =====
  const handleRetry = useCallback(() => {
    puzzleRef.current?.reset()
    setPuzzleResult('none')
    setShowHint(false)
    // 扣 2 分
    setTotalScore(prev => Math.max(0, prev - 2))
  }, [])

  // ===== 提示 =====
  const handleHint = useCallback(() => {
    if (!showHint) {
      setShowHint(true)
      setTotalScore(prev => Math.max(0, prev - 5))
    }
  }, [showHint])

  const solvedCount = room.puzzles.filter(p => puzzleStatuses[p.id] === 'solved').length

  return (
    <Wrapper>
      <PixelBackground />

      {phase === 'exploring' && (
        <header className="game-header">
          <div className="header-left">
            <span className="back-link">←</span>
            密室 {room.id}/7
          </div>
          <div className="header-center">
            {rooms.map((_, i) => (
              <div
                key={i}
                className="progress-dot"
                data-state={
                  i < currentRoomIndex ? 'done' :
                  i === currentRoomIndex ? 'current' :
                  'future'
                }
              />
            ))}
          </div>
          <div className="header-right">
            <span className="score">⭐ {totalScore}</span>
            <span className="timer">⏱ --:--</span>
          </div>
        </header>
      )}

      {phase === 'entrance' && (
        <RoomEntrance room={room} onEnter={handleEnter} />
      )}

      {phase === 'exploring' && (
        <div className="content-area">
          <RoomScene
            room={room}
            puzzleStatuses={puzzleStatuses}
            onPuzzleClick={handlePuzzleClick}
            onEmptyClick={handleEmptyClick}
            onExitClick={handleExit}
            characterPos={character.pos}
            characterMoving={character.moving}
            characterDirection={character.direction}
            characterFlashError={character.flashError}
            characterScorePopup={character.scorePopup}
          />
          <div className="status-bar">
            密室{room.id}: {room.name} | 谜题: {solvedCount}/{room.puzzles.length}
          </div>
        </div>
      )}

      {/* 答题弹窗 */}
      {activePuzzle && (
        <PuzzleShell
          puzzle={activePuzzle}
          resultState={puzzleResult}
          showHint={showHint}
          onClose={handleClosePuzzle}
          onSubmit={handleSubmit}
          onHint={handleHint}
          onRetry={handleRetry}
          onBack={handleBackToRoom}
          canSubmit={puzzleResult === 'none'}
        >
          <PuzzleContent
            puzzle={activePuzzle}
            disabled={puzzleResult !== 'none'}
            ref_={puzzleRef}
          />
        </PuzzleShell>
      )}
    </Wrapper>
  )
}
