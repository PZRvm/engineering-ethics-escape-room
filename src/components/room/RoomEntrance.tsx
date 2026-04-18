import styled from 'styled-components'
import type { Room } from '../../types/game'

// ==================== 房间主题装饰配置 ====================

interface RoomDecorConfig {
  label: string
  pixels: { x: number; y: number; w: number; h: number; color: string }[]
}

const ROOM_DECORS: Record<number, RoomDecorConfig> = {
  1: {
    label: '时间档案馆',
    pixels: [
      { x: 5, y: 15, w: 12, h: 35, color: 'var(--color-pixel-green)' },
      { x: 15, y: 20, w: 25, h: 10, color: 'var(--color-pixel-cyan)' },
      { x: 65, y: 10, w: 18, h: 20, color: 'var(--color-pixel-green)' },
      { x: 45, y: 55, w: 22, h: 18, color: 'var(--color-pixel-gold)' },
      { x: 80, y: 60, w: 15, h: 25, color: 'var(--color-pixel-green)' },
    ],
  },
  2: {
    label: '伦理殿堂',
    pixels: [
      { x: 5, y: 20, w: 10, h: 25, color: 'var(--color-pixel-purple)' },
      { x: 40, y: 35, w: 20, h: 18, color: 'var(--color-pixel-gold)' },
      { x: 82, y: 25, w: 10, h: 25, color: 'var(--color-pixel-purple)' },
      { x: 42, y: 38, w: 16, h: 10, color: 'var(--color-pixel-cyan)' },
    ],
  },
  3: {
    label: '职业竞技场',
    pixels: [
      { x: 12, y: 18, w: 20, h: 14, color: 'var(--color-pixel-green)' },
      { x: 58, y: 14, w: 20, h: 14, color: 'var(--color-pixel-green)' },
      { x: 32, y: 45, w: 14, h: 10, color: 'var(--color-pixel-gold)' },
      { x: 68, y: 48, w: 18, h: 12, color: 'var(--color-pixel-cyan)' },
    ],
  },
  4: {
    label: '大师工坊',
    pixels: [
      { x: 32, y: 32, w: 28, h: 20, color: 'var(--color-pixel-gold)' },
      { x: 38, y: 36, w: 16, h: 12, color: 'var(--color-pixel-cyan)' },
      { x: 60, y: 12, w: 22, h: 14, color: 'var(--color-pixel-green)' },
      { x: 8, y: 58, w: 14, h: 12, color: 'var(--color-pixel-gold)' },
    ],
  },
  5: {
    label: '思维之树',
    pixels: [
      { x: 40, y: 18, w: 20, h: 42, color: 'var(--color-pixel-green)' },
      { x: 12, y: 12, w: 30, h: 10, color: 'var(--color-pixel-cyan)' },
      { x: 55, y: 8, w: 30, h: 10, color: 'var(--color-pixel-cyan)' },
      { x: 28, y: 62, w: 12, h: 10, color: 'var(--color-pixel-green-bright)' },
    ],
  },
  6: {
    label: '安全金库',
    pixels: [
      { x: 6, y: 14, w: 12, h: 16, color: 'var(--color-pixel-cyan)' },
      { x: 43, y: 18, w: 14, h: 12, color: 'var(--color-pixel-green)' },
      { x: 33, y: 48, w: 34, h: 22, color: 'var(--color-pixel-gold)' },
      { x: 75, y: 48, w: 18, h: 12, color: 'var(--color-pixel-purple)' },
    ],
  },
  7: {
    label: '区块链节点',
    pixels: [
      { x: 8, y: 38, w: 12, h: 10, color: 'var(--color-pixel-cyan)' },
      { x: 42, y: 40, w: 16, h: 14, color: 'var(--color-pixel-gold)' },
      { x: 80, y: 38, w: 12, h: 10, color: 'var(--color-pixel-cyan)' },
      { x: 22, y: 42, w: 18, h: 6, color: 'var(--color-pixel-green)' },
      { x: 60, y: 42, w: 18, h: 6, color: 'var(--color-pixel-green)' },
    ],
  },
}

// ==================== Styled Component ====================

const Wrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background: var(--color-bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: fade-in-up 0.4s ease-out;

  .card {
    max-width: 640px;
    width: 100%;
    background: var(--color-bg-card);
    border: 4px solid var(--color-border-default);
    box-shadow: 4px 4px 0px 0px #000000;
    position: relative;
    overflow: hidden;
    padding: 2rem 1.5rem;

    @media (min-width: 768px) {
      padding: 2.5rem 2rem;
    }

    /* sci-card 顶部装饰条 */
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: var(--color-pixel-green);
    }
  }

  .chapter {
    display: block;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--color-pixel-cyan);
    letter-spacing: 0.2em;
    text-align: center;
    margin-bottom: 0.75rem;
  }

  .room-name {
    font-family: var(--font-display);
    font-size: 1.25rem;
    color: var(--color-pixel-green-bright);
    text-shadow: 2px 2px 0px #000000;
    text-align: center;
    letter-spacing: 0.1em;
    animation: text-glow 2s steps(2) infinite;

    @media (min-width: 768px) {
      font-size: 1.5rem;
    }
  }

  .divider {
    width: 12rem;
    height: 4px;
    background: var(--color-pixel-green);
    margin: 1rem auto;
    opacity: 0.6;
  }

  .illustration {
    width: 100%;
    aspect-ratio: 16 / 9;
    background: var(--color-bg-secondary);
    border: 4px solid var(--color-border-default);
    box-shadow: 4px 4px 0px 0px #000000;
    position: relative;
    overflow: hidden;
    image-rendering: pixelated;
    margin: 1.25rem 0;
  }

  .illus-gradient {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      135deg,
      var(--color-bg-secondary) 0%,
      var(--color-bg-card) 50%,
      var(--color-bg-secondary) 100%
    );
    opacity: 0.8;
  }

  .illus-pixel {
    position: absolute;
    opacity: 0.4;
    image-rendering: pixelated;
  }

  .illus-label {
    position: absolute;
    bottom: 0.5rem;
    left: 0;
    right: 0;
    text-align: center;
    font-family: var(--font-mono);
    font-size: 0.625rem;
    color: var(--color-text-muted);
    letter-spacing: 0.1em;
  }

  .narrative-box {
    background: var(--color-bg-primary);
    border-left: 4px solid var(--color-pixel-purple);
    padding: 1rem 1.25rem;
    margin: 1.25rem 0;
    font-family: var(--font-body);
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--color-text-secondary);
    box-shadow: 4px 4px 0px 0px #000000;
  }

  .dialog-text {
    color: var(--color-pixel-green-bright);
    text-shadow: 1px 1px 0px #000000;
  }

  .puzzle-row {
    display: flex;
    gap: 0.5rem;
    justify-content: center;
    flex-wrap: wrap;
    margin: 1rem 0;
  }

  .puzzle-chip {
    width: 64px;
    height: 48px;
    background: var(--color-bg-primary);
    border: 3px solid var(--color-border-default);
    box-shadow: 2px 2px 0px 0px #000000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    image-rendering: pixelated;
  }

  .puzzle-chip-id {
    font-family: var(--font-mono);
    font-size: 0.625rem;
    color: var(--color-text-muted);
  }

  .puzzle-chip-lock {
    font-size: 0.75rem;
    opacity: 0.6;
  }

  .puzzle-count {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--color-text-muted);
    text-align: center;
    letter-spacing: 0.1em;
    margin-bottom: 1.5rem;
  }

  .enter-button {
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
    display: block;
    margin: 0 auto;

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
`

// ==================== 组件 ====================

interface RoomEntranceProps {
  room: Room
  onEnter: () => void
}

export default function RoomEntrance({ room, onEnter }: RoomEntranceProps) {
  const decor = ROOM_DECORS[room.id] ?? { label: room.name, pixels: [] }

  // 解析叙事文本：将引号内的对话部分高亮
  const narrativeParts = splitNarrative(room.narrative)

  return (
    <Wrapper>
      <div className="card">
        <span className="chapter">{room.chapter}</span>
        <h2 className="room-name">{room.name}</h2>
        <div className="divider" />

        {/* 房间插图 */}
        <div className="illustration">
          <div className="illus-gradient" />
          {decor.pixels.map((px, i) => (
            <div
              key={i}
              className="illus-pixel"
              style={{
                left: `${px.x}%`,
                top: `${px.y}%`,
                width: `${px.w}%`,
                height: `${px.h}%`,
                background: px.color,
              }}
            />
          ))}
          <div className="illus-label">{decor.label}</div>
        </div>

        {/* 叙事文本 */}
        <div className="narrative-box">
          {narrativeParts.map((part, i) =>
            part.dialog
              ? <span key={i} className="dialog-text">{part.text}</span>
              : <span key={i}>{part.text}</span>
          )}
        </div>

        {/* 谜题预览 */}
        <div className="puzzle-row">
          {room.puzzles.map(p => (
            <div key={p.id} className="puzzle-chip">
              <span className="puzzle-chip-id">{p.id}</span>
              <span className="puzzle-chip-lock">🔒</span>
            </div>
          ))}
        </div>
        <p className="puzzle-count">共 {room.puzzles.length} 个谜题</p>

        <button className="enter-button" onClick={onEnter}>▶ 进入密室</button>
      </div>
    </Wrapper>
  )
}

// ==================== 工具函数 ====================

/** 将叙事文本按引号拆分，区分旁白和对话 */
function splitNarrative(text: string): { text: string; dialog: boolean }[] {
  const parts: { text: string; dialog: boolean }[] = []
  // 匹配中文引号和英文引号
  const regex = /([""「])(.+?)([""」])/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), dialog: false })
    }
    parts.push({ text: match[0], dialog: true })
    lastIndex = regex.lastIndex
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), dialog: false })
  }

  return parts.length > 0 ? parts : [{ text, dialog: false }]
}
