import { useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react'
import styled from 'styled-components'
import type { DragSortData } from '../../types/game'

// ==================== Handle ====================

export interface DragSortHandle {
  check: () => boolean
  getAnswers: () => string[]
  reset: () => void
}

// ==================== Props ====================

interface DragSortPuzzleProps {
  data: DragSortData
  disabled: boolean
  correct?: boolean
  onAnswer: (isCorrect: boolean) => void
}

// ==================== Component ====================

const DragSortPuzzle = forwardRef<DragSortHandle, DragSortPuzzleProps>(
  function DragSortPuzzle({ data, disabled, correct, onAnswer }, ref) {
    const [currentOrder, setCurrentOrder] = useState<string[]>([...data.items])
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    // 答对后 key 变化导致组件重新挂载，此时 correct=true，直接显示正确顺序
    useEffect(() => {
      if (correct) {
        setCurrentOrder([...data.correctOrder])
        setSelectedIndex(null)
      }
    }, [correct, data.correctOrder])

    useImperativeHandle(ref, () => ({
      check: () => {
        const isCorrect =
          currentOrder.length === data.correctOrder.length &&
          currentOrder.every((item, i) => item === data.correctOrder[i])
        onAnswer(isCorrect)
        if (isCorrect) {
          // 答对后按正确顺序显示
          setCurrentOrder([...data.correctOrder])
          setSelectedIndex(null)
        }
        return isCorrect
      },
      getAnswers: () => [...currentOrder],
      reset: () => {
        setCurrentOrder([...data.items])
        setSelectedIndex(null)
      },
    }))

    const handleItemClick = useCallback(
      (index: number) => {
        if (disabled) return

        if (selectedIndex === null) {
          setSelectedIndex(index)
          return
        }

        if (selectedIndex === index) {
          setSelectedIndex(null)
          return
        }

        // Swap the two items
        setCurrentOrder(prev => {
          const next = [...prev]
          const temp = next[selectedIndex]
          next[selectedIndex] = next[index]
          next[index] = temp
          return next
        })

        setSelectedIndex(null)
      },
      [selectedIndex, disabled],
    )

    return (
      <Wrapper $disabled={disabled} $correct={!!correct}>
        <div className="instruction">
          点击两个条目交换顺序，将它们排列为正确顺序
        </div>
        <div className="item-list">
          {currentOrder.map((item, index) => (
            <button
              key={`${item}-${index}`}
              className={`item${selectedIndex === index ? ' selected' : ''}`}
              onClick={() => handleItemClick(index)}
              disabled={disabled}
              type="button"
            >
              <span className="item-number">{index + 1}</span>
              <span className="item-text">{item}</span>
              {selectedIndex === index && (
                <span className="item-indicator" />
              )}
            </button>
          ))}
        </div>
      </Wrapper>
    )
  },
)

export default DragSortPuzzle

// ==================== Styles ====================

const Wrapper = styled.div<{ $disabled: boolean; $correct: boolean }>`
  opacity: ${p => (p.$disabled && !p.$correct ? 0.5 : 1)};
  pointer-events: ${p => (p.$disabled ? 'none' : 'auto')};
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  .instruction {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-text-muted);
    letter-spacing: 0.05em;
    padding: 0.5rem 0;
  }

  .item-list {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.6rem 0.75rem;
    background: var(--color-bg-secondary);
    border: 3px solid var(--color-border-default);
    box-shadow: 3px 3px 0 0 #000;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 1.1rem;
    color: var(--color-text-primary);
    text-align: left;
    width: 100%;
    image-rendering: pixelated;
    position: relative;
    transition: none;

    &:hover:not(:disabled) {
      background: var(--color-bg-card-hover);
      border-color: var(--color-text-muted);
    }

    &:active:not(:disabled) {
      transform: translate(3px, 3px);
      box-shadow: none;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .item.selected {
    border-color: var(--color-pixel-green);
    box-shadow: 3px 3px 0 0 #000, 0 0 0 2px var(--color-pixel-green);
    background: var(--color-bg-card);
  }

  .item-number {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-pixel-green);
    min-width: 1.5rem;
    text-align: center;
    flex-shrink: 0;
  }

  .item-text {
    flex: 1;
    font-family: var(--font-body);
    font-size: 1.1rem;
    line-height: 1.4;
    word-break: break-word;
  }

  .item-indicator {
    width: 8px;
    height: 8px;
    background: var(--color-pixel-green);
    flex-shrink: 0;
    image-rendering: pixelated;
    animation: blink-indicator 0.8s steps(2) infinite;
  }

  @keyframes blink-indicator {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`
