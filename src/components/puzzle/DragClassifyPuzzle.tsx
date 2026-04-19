import { useState, useCallback, forwardRef, useImperativeHandle, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import type { DragClassifyData } from '../../types/game'

// ==================== Handle ====================

export interface DragClassifyHandle {
  check: () => boolean
  reset: () => void
}

// ==================== Props ====================

interface DragClassifyPuzzleProps {
  data: DragClassifyData
  disabled: boolean
  correct?: boolean
  onAnswer: (isCorrect: boolean) => void
}

// ==================== Animation ====================

const blinkCursor = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`

// ==================== Component ====================

const DragClassifyPuzzle = forwardRef<DragClassifyHandle, DragClassifyPuzzleProps>(
  function DragClassifyPuzzle({ data, disabled, correct, onAnswer }, ref) {
    // assignments maps item text -> assigned category (or undefined = in pool)
    const [assignments, setAssignments] = useState<Record<string, string | undefined>>(() => {
      const initial: Record<string, string | undefined> = {}
      for (const item of data.items) {
        initial[item.text] = undefined
      }
      return initial
    })
    const [selectedItem, setSelectedItem] = useState<string | null>(null)

    // 答对后 key 变化导致组件重新挂载，此时 correct=true，直接显示正确分类
    useEffect(() => {
      if (correct) {
        const correctAssignments: Record<string, string | undefined> = {}
        for (const item of data.items) {
          correctAssignments[item.text] = item.category
        }
        setAssignments(correctAssignments)
        setSelectedItem(null)
      }
    }, [correct, data.items])

    useImperativeHandle(ref, () => ({
      check: () => {
        const correct = data.items.every(
          item => assignments[item.text] === item.category,
        )
        onAnswer(correct)
        return correct
      },
      reset: () => {
        setAssignments({})
        setSelectedItem(null)
      },
    }))

    // Pool items (unassigned)
    const poolItems = data.items.filter(item => assignments[item.text] === undefined)

    // Items assigned to each category
    const categoryItems = (category: string) =>
      data.items.filter(item => assignments[item.text] === category)

    // Click an item in the pool -> select it
    const handlePoolItemClick = useCallback(
      (text: string) => {
        if (disabled) return
        if (selectedItem === text) {
          setSelectedItem(null)
        } else {
          setSelectedItem(text)
        }
      },
      [selectedItem, disabled],
    )

    // Click a category zone -> assign selected item to it
    const handleCategoryClick = useCallback(
      (category: string) => {
        if (disabled) return
        if (selectedItem !== null) {
          setAssignments(prev => ({
            ...prev,
            [selectedItem]: category,
          }))
          setSelectedItem(null)
        }
      },
      [selectedItem, disabled],
    )

    // Click an assigned item -> return it to the pool
    const handleAssignedItemClick = useCallback(
      (text: string) => {
        if (disabled) return
        setAssignments(prev => ({
          ...prev,
          [text]: undefined,
        }))
        setSelectedItem(null)
      },
      [disabled],
    )

    // Check if all items are assigned (for visual feedback)
    const allAssigned = data.items.every(item => assignments[item.text] !== undefined)

    return (
      <Wrapper $disabled={disabled} $correct={!!correct}>
        <div className="instruction">
          {selectedItem !== null
            ? `已选择: "${selectedItem}" -- 点击下方分类区域放入`
            : '点击条目选中，再点击分类区域放入；点击已分类条目可退回'
          }
        </div>

        <div className="pool">
          <div className="pool-label">待分类 ({poolItems.length}/{data.items.length})</div>
          <div className="pool-items">
            {poolItems.map(item => (
              <button
                key={item.text}
                className={`item${selectedItem === item.text ? ' selected' : ''}`}
                onClick={() => handlePoolItemClick(item.text)}
                disabled={disabled}
                type="button"
              >
                <span className="item-text">{item.text}</span>
                {selectedItem === item.text && (
                  <span className="item-indicator" />
                )}
              </button>
            ))}
            {poolItems.length === 0 && (
              <div className="pool-empty">
                {allAssigned ? '全部已分类' : '---'}
              </div>
            )}
          </div>
        </div>

        <div className="categories">
          {data.categories.map(category => {
            const items = categoryItems(category)
            const isDropTarget = selectedItem !== null
            return (
              <div
                key={category}
                className={`category${isDropTarget ? ' droppable' : ''}`}
                onClick={() => handleCategoryClick(category)}
                role="button"
                tabIndex={0}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleCategoryClick(category)
                  }
                }}
              >
                <div className="category-label">{category} ({items.length})</div>
                <div className="category-items">
                  {items.map(item => (
                    <button
                      key={item.text}
                      className="category-item"
                      onClick={e => {
                        e.stopPropagation()
                        handleAssignedItemClick(item.text)
                      }}
                      disabled={disabled}
                      type="button"
                      title="点击退回待分类"
                    >
                      <span className="item-text">{item.text}</span>
                      <span className="return-hint">&larr;</span>
                    </button>
                  ))}
                  {items.length === 0 && (
                    <div className="category-empty">
                      {isDropTarget ? '点击放入' : '---'}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Wrapper>
    )
  },
)

export default DragClassifyPuzzle

// ==================== Styles ====================

const Wrapper = styled.div<{ $disabled: boolean; $correct: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: ${p => (p.$disabled && !p.$correct ? 0.5 : 1)};
  pointer-events: ${p => (p.$disabled ? 'none' : 'auto')};

  .instruction {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-text-muted);
    letter-spacing: 0.05em;
    padding: 0.5rem 0;
    line-height: 1.6;
    min-height: 2rem;
  }

  /* ==================== Pool ==================== */

  .pool {
    background: var(--color-bg-secondary);
    border: 3px solid var(--color-border-default);
    box-shadow: 3px 3px 0 0 #000;
    padding: 0.5rem;
    image-rendering: pixelated;
  }

  .pool-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-pixel-green);
    letter-spacing: 0.1em;
    margin-bottom: 0.5rem;
    text-transform: uppercase;
  }

  .pool-items {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    min-height: 2.5rem;
  }

  .pool-empty {
    font-family: var(--font-body);
    font-size: 0.9rem;
    color: var(--color-text-muted);
    padding: 0.5rem;
    width: 100%;
    text-align: center;
  }

  /* ==================== Item cards ==================== */

  .item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 0.65rem;
    background: var(--color-bg-secondary);
    border: 3px solid var(--color-border-default);
    box-shadow: 3px 3px 0 0 #000;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text-primary);
    text-align: left;
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

  .item-text {
    font-family: var(--font-body);
    font-size: 1rem;
    line-height: 1.4;
    word-break: break-word;
    color: var(--color-text-primary);
  }

  .item-indicator {
    width: 8px;
    height: 8px;
    background: var(--color-pixel-green);
    flex-shrink: 0;
    image-rendering: pixelated;
    animation: ${blinkCursor} 0.8s steps(2) infinite;
  }

  /* ==================== Categories ==================== */

  .categories {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 0.75rem;
  }

  .category {
    border: 3px dashed var(--color-border-default);
    background: var(--color-bg-primary);
    padding: 0.5rem;
    min-height: 100px;
    cursor: pointer;
    image-rendering: pixelated;
    transition: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    &:hover {
      border-color: var(--color-text-muted);
    }
  }

  .category.droppable {
    border-color: var(--color-pixel-green);
    background: color-mix(in srgb, var(--color-pixel-green) 5%, transparent);

    &:hover {
      border-color: var(--color-pixel-green-bright);
      background: color-mix(in srgb, var(--color-pixel-green) 10%, transparent);
    }
  }

  .category-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-pixel-cyan);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding-bottom: 0.3rem;
    border-bottom: 2px solid var(--color-border-default);
    text-align: center;
  }

  .category-items {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
  }

  .category-empty {
    font-family: var(--font-body);
    font-size: 0.85rem;
    color: var(--color-text-muted);
    text-align: center;
    padding: 0.5rem 0;
  }

  .category-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.4rem;
    padding: 0.35rem 0.55rem;
    background: var(--color-bg-secondary);
    border: 3px solid var(--color-border-default);
    box-shadow: 3px 3px 0 0 #000;
    cursor: pointer;
    font-family: var(--font-body);
    font-size: 0.95rem;
    color: var(--color-text-primary);
    text-align: left;
    width: 100%;
    image-rendering: pixelated;
    position: relative;
    transition: none;

    &:hover:not(:disabled) {
      background: var(--color-bg-card-hover);
      border-color: var(--color-pixel-pink);
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

  .return-hint {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-text-muted);
    flex-shrink: 0;
    opacity: 0;
    transition: none;

    .category-item:hover & {
      opacity: 1;
      color: var(--color-pixel-pink);
    }
  }
`
