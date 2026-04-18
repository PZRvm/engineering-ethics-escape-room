import styled from 'styled-components'
import { useNavigate } from 'react-router'
import PixelBackground from '../components/effects/PixelBackground'

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
  }

  .pixel-dots {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .divider {
    width: 12rem;
    height: 4px;
    background: var(--color-pixel-green);

    @media (min-width: 768px) {
      width: 16rem;
    }
  }

  .title {
    font-family: var(--font-display);
    font-size: 1.875rem;
    color: var(--color-pixel-green-bright);
    text-shadow: 2px 2px 0px #000000;
    letter-spacing: 0.1em;
    animation: text-glow 2s steps(2) infinite;

    @media (min-width: 768px) {
      font-size: 3rem;
    }
  }

  .sub-title {
    font-family: var(--font-body);
    font-size: 1.5rem;
    color: var(--color-text-secondary);
    margin-top: 1.5rem;
    letter-spacing: 0.1em;

    @media (min-width: 768px) {
      font-size: 2.25rem;
    }
  }

  .start-button {
    font-family: var(--font-display);
    font-size: 0.7rem;
    font-weight: 400;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.75rem 2rem;
    border: 4px solid var(--color-pixel-green);
    background: var(--color-bg-card);
    color: var(--color-pixel-green-bright);
    cursor: pointer;
    box-shadow: 4px 4px 0px 0px #000000;
    image-rendering: pixelated;

    &:hover {
      background: var(--color-pixel-green);
      color: var(--color-bg-primary);
      box-shadow: 2px 2px 0px 0px #000000;
      transform: translate(2px, 2px);
    }

    &:active {
      box-shadow: none;
      transform: translate(4px, 4px);
    }
  }

  .footer-hint {
    margin-top: 4rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-text-muted);
    letter-spacing: 0.15em;
  }

  .blink-cursor {
    animation: blink 1s steps(1) infinite;
  }
`

export default function StartScreen() {
  const navigate = useNavigate()

  return (
    <Wrapper>
      <PixelBackground />

      <div className="main-content">
        {/* 顶部像素装饰 */}
        <div className="pixel-dots">
          <div style={{ width: '0.75rem', height: '0.75rem', background: 'var(--color-pixel-green)' }} />
          <div style={{ width: '0.5rem', height: '0.5rem', background: 'var(--color-pixel-gold)' }} />
          <div style={{ width: '0.75rem', height: '0.75rem', background: 'var(--color-pixel-cyan)' }} />
        </div>

        <div className="divider" />

        <h1 className="title">工程伦理</h1>
        <p className="sub-title">密室逃脱</p>

        <div className="divider" />

        {/* 底部像素装饰 */}
        <div className="pixel-dots" style={{ marginTop: '1rem' }}>
          <div style={{ width: '0.5rem', height: '0.5rem', background: 'var(--color-pixel-cyan)' }} />
          <div style={{ width: '0.75rem', height: '0.75rem', background: 'var(--color-pixel-gold)' }} />
          <div style={{ width: '0.5rem', height: '0.5rem', background: 'var(--color-pixel-green-bright)' }} />
        </div>

        <div style={{ marginTop: '3rem' }}>
          <button className="start-button" onClick={() => navigate('/game')}>▶ 即将开始</button>
        </div>

        <div className="footer-hint">
          PRESS START<span className="blink-cursor"> _</span>
        </div>
      </div>
    </Wrapper>
  )
}
