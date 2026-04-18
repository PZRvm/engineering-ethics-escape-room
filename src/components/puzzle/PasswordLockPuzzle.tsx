import { forwardRef, useImperativeHandle, useState } from 'react'
import styled from 'styled-components'
import type { PasswordLockData } from '../../types/game'

// ==================== Handle ====================

export interface PasswordLockHandle {
  check: () => boolean
  reset: () => void
}

// ==================== Props ====================

interface PasswordLockPuzzleProps {
  data: PasswordLockData
  disabled: boolean
  onAnswer: (isCorrect: boolean) => void
}

// ==================== Component ====================

const PasswordLockPuzzle = forwardRef<PasswordLockHandle, PasswordLockPuzzleProps>(
  function PasswordLockPuzzle({ data, disabled, onAnswer }, ref) {
    const [input, setInput] = useState('')
    const MAX_INPUT_LEN = 20
    // 如果答案不是纯数字，使用文本输入框（支持中文等非数字答案）
    const isNumericAnswer = /^\d+$/.test(String(data.answer))

    useImperativeHandle(ref, () => ({
      check: () => {
        const isCorrect = input === String(data.answer)
        onAnswer(isCorrect)
        return isCorrect
      },
      reset: () => {
        setInput('')
      },
    }))

    const handleDigit = (digit: string) => {
      if (disabled) return
      setInput(prev => prev.length >= MAX_INPUT_LEN ? prev : prev + digit)
    }

    const handleDelete = () => {
      if (disabled) return
      setInput(prev => prev.slice(0, -1))
    }

    const handleTextInput = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled) return
      const val = e.target.value
      setInput(val.length > MAX_INPUT_LEN ? val.slice(0, MAX_INPUT_LEN) : val)
    }

    const keys: (string | null)[] = [
      '1', '2', '3',
      '4', '5', '6',
      '7', '8', '9',
      null, '0', 'DEL',
    ]

    return (
      <Wrapper $disabled={disabled}>
        <div className="clue">{data.clue}</div>

        {isNumericAnswer ? (
          <>
            <div className="input-display">
              <span className="input-text">{input || '\u00A0'}</span>
              <span className="input-cursor" />
            </div>

            <div className="keypad">
              {keys.map((key, i) => {
                if (key === null) {
                  return <div key={`blank-${i}`} className="key blank" />
                }
                if (key === 'DEL') {
                  return (
                    <button
                      key="del"
                      className="key delete"
                      onClick={handleDelete}
                      disabled={disabled}
                      type="button"
                    >
                      DEL
                    </button>
                  )
                }
                return (
                  <button
                    key={key}
                    className="key"
                    onClick={() => handleDigit(key)}
                    disabled={disabled}
                    type="button"
                  >
                    {key}
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <div className="text-input-wrapper">
            <input
              className="text-input"
              type="text"
              value={input}
              onChange={handleTextInput}
              disabled={disabled}
              placeholder="请输入答案"
              maxLength={MAX_INPUT_LEN}
            />
            {input.length > 0 && (
              <button className="clear-btn" onClick={() => setInput('')} disabled={disabled} type="button">
                ✕
              </button>
            )}
          </div>
        )}
      </Wrapper>
    )
  },
)

export default PasswordLockPuzzle

// ==================== Styles ====================

const Wrapper = styled.div<{ $disabled: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  opacity: ${p => (p.$disabled ? 0.5 : 1)};
  pointer-events: ${p => (p.$disabled ? 'none' : 'auto')};

  .clue {
    font-family: var(--font-body);
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
    padding: 0.5rem 0.75rem;
    border-left: 3px solid var(--color-pixel-green);
    background: var(--color-bg-secondary);
    white-space: pre-wrap;
    word-break: break-word;
  }

  .input-display {
    position: relative;
    display: flex;
    align-items: center;
    border: 3px solid var(--color-pixel-green);
    background: #000;
    padding: 0.75rem 1rem;
    min-height: 3rem;
    box-shadow: 3px 3px 0 0 #000;
    image-rendering: pixelated;
  }

  .input-text {
    font-family: var(--font-display);
    font-size: 1.1rem;
    color: var(--color-pixel-green-bright);
    letter-spacing: 0.2em;
    text-shadow: 0 0 6px var(--color-pixel-green);
    flex: 1;
    min-height: 1.4em;
    display: flex;
    align-items: center;
  }

  .input-cursor {
    display: inline-block;
    width: 10px;
    height: 1.4em;
    background: var(--color-pixel-green-bright);
    margin-left: 2px;
    animation: blink 1s steps(2) infinite;
    image-rendering: pixelated;
  }

  .keypad {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    width: 100%;
    max-width: 320px;
    margin: 0 auto;
  }

  .key {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-display);
    font-size: 0.9rem;
    color: var(--color-text-primary);
    background: var(--color-bg-secondary);
    border: 3px solid var(--color-border-default);
    box-shadow: 3px 3px 0 0 #000;
    padding: 0.6rem 0;
    cursor: pointer;
    image-rendering: pixelated;
    transition: none;
    -webkit-tap-highlight-color: transparent;

    &:hover:not(:disabled) {
      transform: translate(1px, 1px);
      box-shadow: 2px 2px 0 0 #000;
      background: var(--color-bg-card-hover);
    }

    &:active:not(:disabled) {
      transform: translate(3px, 3px);
      box-shadow: none;
    }

    &:disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
  }

  .key.blank {
    background: transparent;
    border-color: transparent;
    box-shadow: none;
    cursor: default;

    &:hover {
      transform: none;
    }
  }

  .key.delete {
    border-color: var(--color-pixel-pink);
    color: var(--color-pixel-pink);

    &:hover:not(:disabled) {
      background: var(--color-pixel-pink);
      color: var(--color-text-primary);
    }
  }

  .text-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .text-input {
    width: 100%;
    font-family: var(--font-body);
    font-size: 1.25rem;
    color: var(--color-pixel-green-bright);
    background: #000;
    border: 3px solid var(--color-pixel-green);
    box-shadow: 3px 3px 0 0 #000;
    padding: 0.75rem 2.5rem 0.75rem 1rem;
    outline: none;
    image-rendering: pixelated;

    &::placeholder {
      color: var(--color-text-muted);
    }

    &:focus {
      border-color: var(--color-pixel-cyan);
    }

    &:disabled {
      opacity: 0.5;
    }
  }

  .clear-btn {
    position: absolute;
    right: 0.5rem;
    background: none;
    border: none;
    color: var(--color-text-muted);
    font-size: 1rem;
    cursor: pointer;
    padding: 0.25rem;

    &:hover {
      color: var(--color-pixel-pink);
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`
