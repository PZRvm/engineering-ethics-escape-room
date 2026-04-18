import styled, { keyframes } from 'styled-components'
import { useNavigate, useSearchParams } from 'react-router'
import PixelBackground from '../components/effects/PixelBackground'

// ==================== 动画 ====================

const glowPulse = keyframes`
  0%, 100% { text-shadow: 2px 2px 0 #000, 0 0 8px var(--color-pixel-gold); }
  50% { text-shadow: 2px 2px 0 #000, 0 0 20px var(--color-pixel-gold-bright); }
`

const fadeInUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

// ==================== 样式 ====================

const Wrapper = styled.div`
  min-height: 100vh;
  background: var(--color-bg-primary);
  position: relative;
  overflow: hidden;

  .main-content {
    position: relative;
    z-index: 10;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 0 1rem;
    gap: 1.5rem;
  }

  .title {
    font-family: var(--font-display);
    font-size: 1.6rem;
    color: var(--color-pixel-gold-bright);
    letter-spacing: 0.1em;
    animation: ${glowPulse} 2s steps(2) infinite;

    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
  }

  .subtitle {
    font-family: var(--font-body);
    font-size: 1.5rem;
    color: var(--color-text-secondary);
    letter-spacing: 0.1em;
    animation: ${fadeInUp} 0.5s steps(4);
  }

  .score-display {
    font-family: var(--font-display);
    font-size: 1rem;
    color: var(--color-pixel-gold);
    margin-top: 1rem;
    animation: ${fadeInUp} 0.5s steps(4) 0.2s both;

    .score-value {
      font-size: 2rem;
      color: var(--color-pixel-cyan);
    }
  }

  .divider {
    width: 16rem;
    height: 4px;
    background: var(--color-pixel-gold);
  }

  .stats {
    display: flex;
    gap: 2rem;
    animation: ${fadeInUp} 0.5s steps(4) 0.4s both;

    .stat {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.25rem;
    }

    .stat-value {
      font-family: var(--font-display);
      font-size: 0.9rem;
      color: var(--color-pixel-green-bright);
    }

    .stat-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-text-muted);
    }
  }

  .message {
    font-family: var(--font-body);
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    text-align: center;
    max-width: 32rem;
    line-height: 1.6;
    animation: ${fadeInUp} 0.5s steps(4) 0.6s both;
  }

  .btn {
    font-family: var(--font-display);
    font-size: 0.7rem;
    letter-spacing: 0.1em;
    padding: 0.75rem 2rem;
    border: 4px solid var(--color-pixel-cyan);
    background: var(--color-bg-card);
    color: var(--color-pixel-cyan);
    cursor: pointer;
    box-shadow: 4px 4px 0px 0px #000;
    image-rendering: pixelated;
    text-transform: uppercase;
    margin-top: 1rem;
    animation: ${fadeInUp} 0.5s steps(4) 0.8s both;

    &:hover {
      background: var(--color-pixel-cyan);
      color: var(--color-bg-primary);
      transform: translate(2px, 2px);
      box-shadow: 2px 2px 0px 0px #000;
    }

    &:active {
      box-shadow: none;
      transform: translate(4px, 4px);
    }
  }
`

// ==================== 组件 ====================

export default function VictoryScreen() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const totalScore = Number(searchParams.get('score') ?? 0)
  const maxScore = 200 // 7 rooms, 24 puzzles total

  return (
    <Wrapper>
      <PixelBackground />

      <div className="main-content">
        <div className="title">CONGRATULATIONS</div>
        <div className="subtitle">你已通关全部密室！</div>

        <div className="divider" />

        <div className="score-display">
          总得分：<span className="score-value">{totalScore}</span> / {maxScore}
        </div>

        <div className="stats">
          <div className="stat">
            <span className="stat-value">7/7</span>
            <span className="stat-label">密室</span>
          </div>
          <div className="stat">
            <span className="stat-value">24/24</span>
            <span className="stat-label">谜题</span>
          </div>
          <div className="stat">
            <span className="stat-value">{totalScore}</span>
            <span className="stat-label">得分</span>
          </div>
        </div>

        <div className="message">
          你已完成工程伦理课程的所有挑战。从伦理概念到网络安全，从AI伦理到区块链治理，
          你已经掌握了工程伦理的核心知识。希望这段旅程让你对技术背后的伦理责任有了更深的思考。
        </div>

        <button className="btn" onClick={() => navigate('/')}>
          ▶ 返回首页
        </button>
      </div>
    </Wrapper>
  )
}
