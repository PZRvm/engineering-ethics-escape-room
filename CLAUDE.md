# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Engineering Ethics Escape Room (工程伦理密室逃脱) — a pixel retro (8-bit) style web game for an ethics course. Players navigate 7 rooms, solving 24 puzzles across 6 interaction types. Built with React 19 + TypeScript 5.9 + Vite 7.

## Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build (tsc -b && vite build)
npm run lint      # ESLint check
npm run preview   # Preview production build
```

Pre-commit hook auto-runs `lint-staged` → `eslint --fix` on staged `.ts/.tsx` files.

## Architecture

**Routing**: React Router 7, configured in `src/App.tsx`. Page components live in `src/views/`.

**Data separation**: All game content is in `src/data/`, fully decoupled from components:
- `types/game.ts` — discriminated union types for 6 puzzle types, room layouts, game state actions
- `data/puzzles/room1-7.ts` — puzzle definitions (each exports `room{N}Puzzles: Puzzle[]`)
- `data/rooms.ts` — room metadata + scene layout (puzzle point positions as percentages, decorations, entry/exit)
- `data/achievements.ts` — 10 achievement definitions

**State management**: React Context + useReducer (planned, types already defined in `game.ts` as `GameState` / `GameAction`).

**Room exploration system**: Each room is a 2D top-down scene rendered entirely with **react-konva** (Canvas). All elements (decorations, puzzle points, exit door, character) live inside a single Konva `Stage > Layer`. No DOM overlays for game objects. Character walks to points on click, puzzle modal pops up on arrival. Coordinates use percentage-based positioning (0-100), converted to pixels via `(pct / 100) * SCENE_DIMENSION`.

**Coordinate system**:
- All (x, y) coordinates in data represent percentage positions (0-100)
- **Interactive elements** (puzzle points, exit door, character): center-anchored via `offsetX/offsetY` of half their size
- **Decorations** (decors): top-left anchored (they have width/height defining a rectangular area)
- Click events on Stage convert pointer position to percentage coords for character movement

## Styling

Three-layer approach:
1. **`index.css` `@theme {}`** — Tailwind 4 design tokens (colors, fonts). Colors: `--color-pixel-green`, `--color-bg-primary`, etc. Fonts: `--font-display` (Press Start 2P), `--font-body` (VT323), `--font-mono` (Silkscreen).
2. **`index.css` utility classes** — shared CSS classes (`.btn-neon`, `.sci-card`, `.pixel-star`, `.scanline-overlay`, all `@keyframes` animations).
3. **styled-components** — each component uses a single `Wrapper` styled-component with nested class selectors. Dynamic values use transient `$`-prefixed props on `Wrapper`; all child element styles are expressed as nested `.class-name` selectors inside `Wrapper`, not as separate styled components.

### styled-components pattern

Every component file follows this structure:

```tsx
export default function MyComponent() {
  return (
    <Wrapper>
      <div className="header">标题</div>
      <div className="content">
        <p className="text">内容</p>
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 20px;

  .header { font-size: 24px; }
  .content {
    padding: 10px;
    .text { font-size: 16px; }
  }
`
```

- Only ONE `Wrapper` styled-component per file (exception: independently positioned elements like `ScorePopup`)
- Dynamic props use `$` prefix on `Wrapper` (e.g., `$x`, `$status`, `$unlocked`)
- Child element styles go into nested `.class-name` selectors, not separate styled components
- For elements needing dynamic inline values (position, size), use `style={{}}` on plain elements

### Pixel Retro Conventions

These are non-negotiable for maintaining the 8-bit aesthetic:

- **No blur shadows**: `box-shadow: 4px 4px 0 0 #000` (solid offset only)
- **Step-based animations**: `steps()` not smooth easing (e.g., `animation: text-glow 2s steps(2) infinite`)
- **No font smoothing**: `-webkit-font-smoothing: none` globally
- **Deterministic particles**: Background positions use `(index * prime + offset) % range` to prevent re-render flicker
- **styled-components transient props**: Use `$` prefix for style-only props on `Wrapper` only
- **Referenced via CSS variables**: styled-components use `var(--color-*)` and `var(--font-*)`, not hardcoded values
- **One Wrapper per file**: All child styles via nested `.class-name` selectors inside a single `Wrapper`

## Documentation

- `docs/游戏设计文档.md` — Full game design: 7 rooms, all 24 puzzles with answers, scoring, achievements
- `docs/风格指南.md` — Visual style guide: color palette, fonts, animation specs, component styles
- `docs/页面布局设计.md` — ASCII layouts for all pages and their flow relationships
- `docs/学习通课程/` — 20 course material files covering 7 chapters
