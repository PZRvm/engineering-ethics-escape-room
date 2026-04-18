// ===================== 谜题类型 =====================

/** 谜题交互类型 */
export type PuzzleType =
  | 'drag-sort'       // 拖拽排序
  | 'drag-classify'   // 拖拽分类
  | 'multiple-choice' // 单选/多选
  | 'password-lock'   // 密码锁
  | 'scenario'        // 情景判断
  | 'fill-blank'      // 填空题

/** 谜题状态 */
export type PuzzleStatus = 'locked' | 'active' | 'solved'

/** 排序题数据 */
export interface DragSortData {
  type: 'drag-sort'
  items: string[]
  correctOrder: string[]
}

/** 分类题数据 */
export interface DragClassifyData {
  type: 'drag-classify'
  categories: string[]
  items: { text: string; category: string }[]
}

/** 选择题数据 */
export interface MultipleChoiceData {
  type: 'multiple-choice'
  question: string
  options: { label: string; text: string; correct: boolean }[]
  multiSelect: boolean
}

/** 密码锁数据 */
export interface PasswordLockData {
  type: 'password-lock'
  clue: string
  answer: string | number
}

/** 情景判断题数据 */
export interface ScenarioData {
  type: 'scenario'
  question: string
  options: { label: string; text: string; correct: boolean; reason: string }[]
  multiSelect: boolean
}

/** 填空题数据 */
export interface FillBlankData {
  type: 'fill-blank'
  question: string
  blanks: string[]           // 每个空格的正确答案
  template: string           // 带 ____ 的题目模板
}

/** 谜题数据联合类型 */
export type PuzzleData =
  | DragSortData
  | DragClassifyData
  | MultipleChoiceData
  | PasswordLockData
  | ScenarioData
  | FillBlankData

/** 谜题定义 */
export interface Puzzle {
  id: string              // 如 '1-1'
  title: string           // 谜题标题
  narrative: string       // 叙事文本
  knowledgePoint: string  // 知识点
  score: number           // 分值
  data: PuzzleData
  explanation: string     // 答题后解析
  hint: string            // 提示内容
}

// ===================== 房间类型 =====================

/** 答题点在房间场景中的位置 */
export interface PuzzlePointPosition {
  x: number               // 答题点 x 坐标（百分比 0-100）
  y: number               // 答题点 y 坐标（百分比 0-100）
  standX: number          // 角色站位的 x 坐标
  standY: number          // 角色站位的 y 坐标
}

/** 装饰物定义 */
export interface RoomDecor {
  id: string
  type: 'furniture' | 'screen' | 'equipment' | 'plant'
  x: number               // 百分比位置
  y: number
  width: number
  height: number
  label?: string          // 装饰物名称
}

/** 房间布局配置 */
export interface RoomLayout {
  puzzlePoints: Record<string, PuzzlePointPosition>
  decors: RoomDecor[]
  entryPosition: { x: number; y: number }    // 角色进入房间的初始位置
  exitDoorPosition: { x: number; y: number } // 出口门位置
}

/** 房间定义 */
export interface Room {
  id: number
  name: string             // 密室名称
  chapter: string          // 章节标签 如 'CHAPTER 01'
  theme: string            // 主题描述
  narrative: string        // 叙事引入
  puzzles: Puzzle[]
  layout: RoomLayout
}

// ===================== 成就类型 =====================

export interface Achievement {
  id: string
  name: string
  description: string
  icon: string             // emoji 图标
  condition: 'chapter' | 'no-hint' | 'speed' | 'score'
  threshold?: number       // 条件阈值
}

// ===================== 游戏状态类型 =====================

export type Screen = 'start' | 'playing' | 'victory'
export type RoomPhase = 'entrance' | 'exploring' | 'puzzling' | 'cleared'

export interface PuzzleState {
  status: PuzzleStatus
  score: number
  attempts: number
  hintUsed: boolean
}

export interface GameState {
  screen: Screen
  currentRoom: number
  roomPhase: RoomPhase
  totalScore: number
  roomScores: Record<number, number>
  puzzleStates: Record<string, PuzzleState>
  characterPos: { x: number; y: number }
  activePuzzle: string | null
  unlockedRooms: number[]
  achievements: string[]
  startTime: number
  hintsUsed: number
}

// ===================== Action 类型 =====================

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'ENTER_ROOM' }
  | { type: 'MOVE_CHARACTER'; payload: { x: number; y: number } }
  | { type: 'OPEN_PUZZLE'; payload: { puzzleId: string } }
  | { type: 'CLOSE_PUZZLE' }
  | { type: 'SOLVE_PUZZLE'; payload: { puzzleId: string; score: number } }
  | { type: 'USE_HINT'; payload: { puzzleId: string } }
  | { type: 'CLEAR_ROOM' }
  | { type: 'COMPLETE_GAME' }
  | { type: 'LOAD_SAVE'; payload: GameState }
