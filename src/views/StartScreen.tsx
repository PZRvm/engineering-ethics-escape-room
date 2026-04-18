import styled from 'styled-components'
import PixelBackground from '../components/effects/PixelBackground'

const PageWrapper = styled.div`
  min-height: 100vh;
  background: var(--color-bg-primary);
  position: relative;
  overflow: hidden;
`

const MainContent = styled.main`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 0 1rem;
`

const PixelDots = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const Divider = styled.div`
  width: 12rem;
  height: 4px;
  background: var(--color-pixel-green);

  @media (min-width: 768px) {
    width: 16rem;
  }
`

const Title = styled.h1`
  font-family: var(--font-display);
  font-size: 1.875rem;
  color: var(--color-pixel-green-bright);
  text-shadow: 2px 2px 0px #000000;
  letter-spacing: 0.1em;
  animation: text-glow 2s steps(2) infinite;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`

const SubTitle = styled.p`
  font-family: var(--font-body);
  font-size: 1.5rem;
  color: var(--color-text-secondary);
  margin-top: 1.5rem;
  letter-spacing: 0.1em;

  @media (min-width: 768px) {
    font-size: 2.25rem;
  }
`

const StartButton = styled.button`
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
`

const FooterHint = styled.div`
  margin-top: 4rem;
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--color-text-muted);
  letter-spacing: 0.15em;
`

const BlinkCursor = styled.span`
  animation: blink 1s steps(1) infinite;
`

const PixelBlock = styled.div<{ $color: string; $size: string }>`
  width: ${p => p.$size};
  height: ${p => p.$size};
  background: ${p => p.$color};
`

export default function StartScreen() {
  return (
    <PageWrapper>
      <PixelBackground />

      <MainContent>
        {/* 顶部像素装饰 */}
        <PixelDots>
          <PixelBlock $color="var(--color-pixel-green)" $size="0.75rem" />
          <PixelBlock $color="var(--color-pixel-gold)" $size="0.5rem" />
          <PixelBlock $color="var(--color-pixel-cyan)" $size="0.75rem" />
        </PixelDots>

        <Divider />

        <Title>工程伦理</Title>
        <SubTitle>密室逃脱</SubTitle>

        <Divider />

        {/* 底部像素装饰 */}
        <PixelDots style={{ marginTop: '1rem' }}>
          <PixelBlock $color="var(--color-pixel-cyan)" $size="0.5rem" />
          <PixelBlock $color="var(--color-pixel-gold)" $size="0.75rem" />
          <PixelBlock $color="var(--color-pixel-green-bright)" $size="0.5rem" />
        </PixelDots>

        <div style={{ marginTop: '3rem' }}>
          <StartButton>▶ 即将开始</StartButton>
        </div>

        <FooterHint>
          PRESS START<BlinkCursor> _</BlinkCursor>
        </FooterHint>
      </MainContent>
    </PageWrapper>
  )
}
