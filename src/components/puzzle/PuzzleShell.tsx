import styled, { keyframes, css } from 'styled-components'
import type { Puzzle } from '../../types/game'

// ==================== 动画 ====================

const shakeAnim = keyframes`
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-6px); }
  20%, 40%, 60%, 80% { transform: translateX(6px); }
`

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`

// ==================== 唯一样式组件 ====================

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`

const Wrapper = styled.div<{ $resultState: 'none' | 'correct' | 'wrong' }>`
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  background: var(--color-bg-card);
  border: 4px solid ${p =>
    p.$resultState === 'correct' ? 'var(--color-pixel-cyan)' :
    p.$resultState === 'wrong' ? 'var(--color-pixel-pink)' :
    'var(--color-border-default)'};
  box-shadow: 4px 4px 0px 0px #000;
  position: relative;
  animation: ${p => p.$resultState === 'wrong' ? css`${shakeAnim} 0.4s steps(4)` : 'none'};

  /* 顶部装饰条 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: ${p =>
      p.$resultState === 'correct' ? 'var(--color-pixel-cyan)' :
      p.$resultState === 'wrong' ? 'var(--color-pixel-pink)' :
      'var(--color-pixel-green)'};
  }

  /* 滚动条 */
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: var(--color-bg-primary); }
  &::-webkit-scrollbar-thumb { background: var(--color-border-default); }

  .header {
    padding: 1.25rem 1.25rem 0.75rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .puzzle-id {
    font-family: var(--font-mono);
    font-size: 0.65rem;
    color: var(--color-pixel-green);
    letter-spacing: 0.1em;
  }

  .close-btn {
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--color-text-muted);
    cursor: pointer;
    background: none;
    border: 2px solid var(--color-text-muted);
    padding: 2px 8px;
    box-shadow: 2px 2px 0px 0px #000;
    image-rendering: pixelated;

    &:hover {
      color: var(--color-text-primary);
      border-color: var(--color-text-primary);
    }
  }

  .title {
    padding: 0 1.25rem;
    font-family: var(--font-display);
    font-size: 0.8rem;
    color: var(--color-text-primary);
    line-height: 1.6;
  }

  .narrative {
    padding: 0.5rem 1.25rem;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text-secondary);
    font-style: italic;
  }

  .divider {
    margin: 0.5rem 1.25rem;
    border: none;
    border-top: 2px dashed var(--color-border-default);
  }

  .content {
    padding: 0.75rem 1.25rem;
  }

  .actions {
    padding: 0.75rem 1.25rem 1.25rem;
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
    flex-wrap: wrap;
  }

  .btn {
    font-family: var(--font-display);
    font-size: 0.6rem;
    letter-spacing: 0.05em;
    padding: 0.5rem 1.25rem;
    border: 3px solid;
    cursor: pointer;
    box-shadow: 3px 3px 0px 0px #000;
    image-rendering: pixelated;
    text-transform: uppercase;
    background: var(--color-bg-card);

    &:hover {
      transform: translate(1px, 1px);
      box-shadow: 2px 2px 0px 0px #000;
    }

    &:active {
      transform: translate(3px, 3px);
      box-shadow: none;
    }
  }

  .btn-primary {
    border-color: var(--color-pixel-green);
    color: var(--color-pixel-green-bright);
    &:hover {
      background: var(--color-pixel-green);
      color: var(--color-bg-primary);
    }
  }

  .btn-hint {
    border-color: var(--color-pixel-gold);
    color: var(--color-pixel-gold-bright);
    &:hover {
      background: var(--color-pixel-gold);
      color: var(--color-bg-primary);
    }
  }

  .btn-retry {
    border-color: var(--color-pixel-pink);
    color: var(--color-pixel-pink);
    &:hover {
      background: var(--color-pixel-pink);
      color: var(--color-text-primary);
    }
  }

  .btn-back {
    border-color: var(--color-pixel-cyan);
    color: var(--color-pixel-cyan);
    &:hover {
      background: var(--color-pixel-cyan);
      color: var(--color-bg-primary);
    }
  }

  .btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
    transform: none;
    box-shadow: 3px 3px 0px 0px #000;
    &:hover {
      transform: none;
      background: var(--color-bg-card);
    }
  }

  /* 结果区 */
  .result {
    padding: 1rem 1.25rem;
    animation: ${fadeIn} 0.3s steps(4);
  }

  .result-title {
    font-family: var(--font-display);
    font-size: 0.7rem;
    margin-bottom: 0.5rem;
  }

  .result-title.correct {
    color: var(--color-pixel-cyan);
  }

  .result-title.wrong {
    color: var(--color-pixel-pink);
  }

  .result-text {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text-secondary);
    line-height: 1.5;
  }

  .hint-text {
    padding: 0.5rem 1.25rem;
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-pixel-gold-bright);
    text-shadow: 1px 1px 0 #000;
    background: var(--color-bg-secondary);
    border: 2px solid var(--color-pixel-gold);
    margin: 0.5rem 1.25rem;
    box-shadow: 2px 2px 0px 0px #000;
  }

  .score-text {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-pixel-gold);
  }
`

// ==================== 组件 ====================

export type PuzzleResult = 'none' | 'correct' | 'wrong'

interface PuzzleShellProps {
  puzzle: Puzzle
  resultState: PuzzleResult
  showHint: boolean
  onClose: () => void
  onSubmit: () => void
  onHint: () => void
  onRetry: () => void
  onBack: () => void
  canSubmit: boolean
  children: React.ReactNode
}

export default function PuzzleShell({
  puzzle,
  resultState,
  showHint,
  onClose,
  onSubmit,
  onHint,
  onRetry,
  onBack,
  canSubmit,
  children,
}: PuzzleShellProps) {
  const isFinished = resultState !== 'none'

  return (
    <Overlay onClick={e => e.target === e.currentTarget && !isFinished && onClose()}>
      <Wrapper $resultState={resultState} key={resultState}>
        <div className="header">
          <span className="puzzle-id">谜题 {puzzle.id}</span>
          {!isFinished && (
            <button className="close-btn" onClick={onClose}>✕</button>
          )}
        </div>

        <div className="title">{puzzle.title}</div>
        <div className="narrative">{puzzle.narrative}</div>
        <hr className="divider" />

        <div className="content">
          {children}
        </div>

        {showHint && (
          <div className="hint-text">💡 {puzzle.hint}</div>
        )}

        {resultState === 'correct' && (
          <div className="result">
            <div className="result-title correct">✓ 回答正确！+{puzzle.score}分</div>
            <div className="result-text">{puzzle.explanation}</div>
          </div>
        )}

        {resultState === 'wrong' && (
          <div className="result">
            <div className="result-title wrong">✗ 回答错误</div>
          </div>
        )}

        <div className="actions">
          {!isFinished && (
            <>
              <button className="btn btn-hint" onClick={onHint} disabled={showHint}>
                💡提示(-5分)
              </button>
              <button className="btn btn-primary" onClick={onSubmit} disabled={!canSubmit}>
                提交答案
              </button>
            </>
          )}
          {resultState === 'wrong' && (
            <>
              <button className="btn btn-retry" onClick={onRetry}>重试(-2分)</button>
              <button className="btn btn-hint" onClick={onHint} disabled={showHint}>使用提示(-5分)</button>
            </>
          )}
          {resultState === 'correct' && (
            <button className="btn btn-back" onClick={onBack}>→ 返回房间</button>
          )}
        </div>
      </Wrapper>
    </Overlay>
  )
}
