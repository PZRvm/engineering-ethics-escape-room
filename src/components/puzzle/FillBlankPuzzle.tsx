import { useEffect, forwardRef, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'
import type { FillBlankData } from '../../types/game'

// ==================== Handle ====================

export interface FillBlankHandle {
  check: () => boolean
  reset: () => void
}

// ==================== Props ====================

interface FillBlankPuzzleProps {
  data: FillBlankData
  disabled: boolean
  correct?: boolean
  onAnswer: (isCorrect: boolean) => void
}

// ==================== Component ====================

const FillBlankPuzzle = forwardRef<FillBlankHandle, FillBlankPuzzleProps>(
  function FillBlankPuzzle({ data, disabled, correct, onAnswer }, ref) {
    const [values, setValues] = useState<string[]>(() =>
      Array(data.blanks.length).fill(''),
    )

    // 答对后 key 变化导致组件重新挂载，此时 correct=true，直接显示正确答案
    useEffect(() => {
      if (correct) {
        setValues([...data.blanks])
      }
    }, [correct, data.blanks])

    useImperativeHandle(ref, () => ({
      check: () => {
        const isCorrect = data.blanks.every(
          (answer, i) =>
            values[i].trim().toLowerCase() === answer.toLowerCase(),
        )
        onAnswer(isCorrect)
        return isCorrect
      },
      reset: () => {
        setValues(Array(data.blanks.length).fill(''))
      },
    }))

    const handleChange = (index: number, value: string) => {
      if (disabled) return
      setValues(prev => {
        const next = [...prev]
        next[index] = value
        return next
      })
    }

    // Split template by ____ into text parts
    const parts = data.template.split('____')

    return (
      <Wrapper $disabled={disabled} $correct={!!correct}>
        <div className="question">{data.question}</div>

        <div className="template">
          {parts.map((part, i) => (
            <span key={`part-${i}`}>
              <span className="template-text">{part}</span>
              {i < data.blanks.length && (
                <input
                  className="blank-input"
                  type="text"
                  value={values[i]}
                  onChange={e => handleChange(i, e.target.value)}
                  disabled={disabled}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
              )}
            </span>
          ))}
        </div>
      </Wrapper>
    )
  },
)

export default FillBlankPuzzle

// ==================== Styles ====================

const Wrapper = styled.div<{ $disabled: boolean; $correct: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: ${p => (p.$disabled && !p.$correct ? 0.5 : 1)};
  pointer-events: ${p => (p.$disabled ? 'none' : 'auto')};

  .question {
    font-family: var(--font-body);
    font-size: 1.25rem;
    color: var(--color-text-primary);
    line-height: 1.5;
    padding: 0.5rem 0;
  }

  .template {
    font-family: var(--font-body);
    font-size: 1.1rem;
    color: var(--color-text-secondary);
    line-height: 2.4;
    padding: 0.75rem;
    background: var(--color-bg-secondary);
    border: 3px solid var(--color-border-default);
    box-shadow: 3px 3px 0 0 #000;
    word-break: break-word;
    image-rendering: pixelated;
  }

  .template-text {
    font-family: var(--font-body);
    font-size: 1.1rem;
    color: var(--color-text-secondary);
    line-height: inherit;
    vertical-align: middle;
  }

  .blank-input {
    font-family: var(--font-display);
    font-size: 0.7rem;
    color: var(--color-pixel-green-bright);
    background: #000;
    border: 3px solid var(--color-border-default);
    box-shadow: 3px 3px 0 0 #000;
    width: 120px;
    padding: 0.3rem 0.4rem;
    text-align: center;
    outline: none;
    image-rendering: pixelated;
    transition: none;
    vertical-align: middle;
    display: inline-block;

    &::placeholder {
      color: var(--color-text-muted);
    }

    &:focus {
      border-color: var(--color-pixel-green);
      box-shadow: 3px 3px 0 0 #000, 0 0 0 2px var(--color-pixel-green);
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }
`
