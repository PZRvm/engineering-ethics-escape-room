import { forwardRef, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'
import type { MultipleChoiceData } from '../../types/game'

// ==================== Handle ====================

export interface MultipleChoiceHandle {
  check: () => boolean
  reset: () => void
}

// ==================== Props ====================

interface MultipleChoicePuzzleProps {
  data: MultipleChoiceData
  disabled: boolean
  onAnswer: (isCorrect: boolean) => void
}

// ==================== Component ====================

const MultipleChoicePuzzle = forwardRef<MultipleChoiceHandle, MultipleChoicePuzzleProps>(
  function MultipleChoicePuzzle({ data, disabled, onAnswer }, ref) {
    const [selectedLabels, setSelectedLabels] = useState<Set<string>>(new Set())

    useImperativeHandle(ref, () => ({
      check: () => {
        const correctLabels = data.options
          .filter(o => o.correct)
          .map(o => o.label)

        const isCorrect =
          correctLabels.length === selectedLabels.size &&
          correctLabels.every(label => selectedLabels.has(label))

        onAnswer(isCorrect)
        return isCorrect
      },
      reset: () => {
        setSelectedLabels(new Set())
      },
    }))

    const handleOptionClick = (label: string) => {
      if (disabled) return

      setSelectedLabels(prev => {
        const next = new Set(prev)

        if (data.multiSelect) {
          // Multi-select: toggle independently
          if (next.has(label)) {
            next.delete(label)
          } else {
            next.add(label)
          }
        } else {
          // Single-select: only one at a time
          if (next.has(label)) {
            next.clear()
          } else {
            next.clear()
            next.add(label)
          }
        }

        return next
      })
    }

    return (
      <Wrapper $disabled={disabled}>
        <div className="question">
          {data.question}
          {data.multiSelect && (
            <span className="multi-hint">(可多选)</span>
          )}
        </div>

        <div className="options">
          {data.options.map(option => {
            const isSelected = selectedLabels.has(option.label)
            return (
              <button
                key={option.label}
                className={`option${isSelected ? ' selected' : ''}`}
                onClick={() => handleOptionClick(option.label)}
                disabled={disabled}
                type="button"
              >
                <span className="option-label">{option.label}</span>
                <span className="option-text">{option.text}</span>
              </button>
            )
          })}
        </div>
      </Wrapper>
    )
  },
)

export default MultipleChoicePuzzle

// ==================== Styles ====================

const Wrapper = styled.div<{ $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  opacity: ${p => (p.$disabled ? 0.5 : 1)};
  pointer-events: ${p => (p.$disabled ? 'none' : 'auto')};

  .question {
    font-family: var(--font-body);
    font-size: 1.25rem;
    color: var(--color-text-primary);
    line-height: 1.5;
    padding: 0.5rem 0;
  }

  .multi-hint {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--color-pixel-cyan);
    margin-left: 0.5rem;
    letter-spacing: 0.05em;
    vertical-align: middle;
  }

  .options {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .option {
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

  .option.selected {
    border-color: var(--color-pixel-green);
    box-shadow: 3px 3px 0 0 #000, 0 0 0 2px var(--color-pixel-green);
    background: var(--color-bg-card);
  }

  .option-label {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-pixel-green);
    min-width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-bg-primary);
    border: 2px solid var(--color-border-default);
    flex-shrink: 0;
    image-rendering: pixelated;
  }

  .option.selected .option-label {
    border-color: var(--color-pixel-green);
    color: var(--color-pixel-green-bright);
    background: var(--color-bg-secondary);
  }

  .option-text {
    flex: 1;
    font-family: var(--font-body);
    font-size: 1.1rem;
    line-height: 1.4;
    word-break: break-word;
  }
`
