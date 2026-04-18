import type { Room } from '../types/game'
import { room1Puzzles } from './puzzles/room1'
import { room2Puzzles } from './puzzles/room2'
import { room3Puzzles } from './puzzles/room3'
import { room4Puzzles } from './puzzles/room4'
import { room5Puzzles } from './puzzles/room5'
import { room6Puzzles } from './puzzles/room6'
import { room7Puzzles } from './puzzles/room7'

export const rooms: Room[] = [
  {
    id: 1,
    name: '时间档案馆',
    chapter: 'CHAPTER 01',
    theme: '昏暗的档案室，墙壁上覆盖着发光的时间线和古老计算机蓝图。',
    narrative: '你进入一个布满计算机历史设备的昏暗档案室。一个数字声音说："要打开第一扇门，你必须追溯计算的起源。"',
    puzzles: room1Puzzles,
    layout: {
      puzzlePoints: {
        '1-1': { x: 20, y: 45, standX: 20, standY: 55 },
        '1-2': { x: 80, y: 25, standX: 80, standY: 35 },
        '1-3': { x: 75, y: 65, standX: 65, standY: 65 },
        '1-4': { x: 25, y: 70, standX: 35, standY: 70 },
      },
      decors: [
        { id: 'bookshelf', type: 'furniture', x: 3, y: 8, width: 12, height: 25, label: '书架' },
        { id: 'timeline-screen', type: 'screen', x: 30, y: 10, width: 20, height: 10, label: '时间线屏幕' },
        { id: 'old-computer', type: 'equipment', x: 60, y: 8, width: 15, height: 12, label: '古董计算机' },
        { id: 'cabinet', type: 'furniture', x: 45, y: 55, width: 18, height: 12, label: '档案柜' },
      ],
      entryPosition: { x: 50, y: 85 },
      exitDoorPosition: { x: 50, y: 5 },
    },
  },
  {
    id: 2,
    name: '伦理殿堂',
    chapter: 'CHAPTER 02',
    theme: '哲学名言投射在悬浮的全息石板上。中央祭坛有权衡正义的天平。',
    narrative: '哲学家们守护着这扇门。证明你理解是非背后的原理。',
    puzzles: room2Puzzles,
    layout: {
      puzzlePoints: {
        '2-1': { x: 12, y: 50, standX: 22, standY: 50 },
        '2-2': { x: 50, y: 20, standX: 50, standY: 30 },
        '2-3': { x: 85, y: 55, standX: 75, standY: 55 },
        '2-4': { x: 45, y: 70, standX: 45, standY: 60 },
      },
      decors: [
        { id: 'altar', type: 'furniture', x: 38, y: 38, width: 20, height: 14, label: '祭坛' },
        { id: 'stone-tablet-1', type: 'screen', x: 3, y: 15, width: 10, height: 18, label: '石板' },
        { id: 'stone-tablet-2', type: 'screen', x: 82, y: 20, width: 10, height: 18, label: '石板' },
        { id: 'scale', type: 'equipment', x: 42, y: 25, width: 12, height: 8, label: '天平' },
      ],
      entryPosition: { x: 50, y: 90 },
      exitDoorPosition: { x: 50, y: 3 },
    },
  },
  {
    id: 3,
    name: '职业竞技场',
    chapter: 'CHAPTER 03',
    theme: '反乌托邦风格的办公室，发光的办公桌和漂浮的简历。',
    narrative: '职业世界等待着你。你能像专业人士一样应对其中的挑战吗？',
    puzzles: room3Puzzles,
    layout: {
      puzzlePoints: {
        '3-1': { x: 25, y: 40, standX: 35, standY: 40 },
        '3-2': { x: 65, y: 35, standX: 55, standY: 35 },
        '3-3': { x: 50, y: 70, standX: 50, standY: 60 },
      },
      decors: [
        { id: 'desk-1', type: 'furniture', x: 10, y: 15, width: 18, height: 12, label: '办公桌' },
        { id: 'desk-2', type: 'furniture', x: 60, y: 12, width: 18, height: 12, label: '办公桌' },
        { id: 'floating-resume', type: 'equipment', x: 35, y: 45, width: 12, height: 8, label: '简历' },
        { id: 'monitor', type: 'screen', x: 70, y: 50, width: 15, height: 10, label: '显示器' },
      ],
      entryPosition: { x: 50, y: 88 },
      exitDoorPosition: { x: 50, y: 3 },
    },
  },
  {
    id: 4,
    name: '大师工坊',
    chapter: 'CHAPTER 04',
    theme: '精密工坊混合了数字蓝图。中央桌上放着发光的微缩魁北克大桥模型。',
    narrative: '真正的精通需要时间的沉淀。你能辨别精湛工艺与粗制滥造吗？',
    puzzles: room4Puzzles,
    layout: {
      puzzlePoints: {
        '4-1': { x: 30, y: 35, standX: 40, standY: 35 },
        '4-2': { x: 65, y: 55, standX: 55, standY: 55 },
      },
      decors: [
        { id: 'workbench', type: 'furniture', x: 35, y: 45, width: 22, height: 14, label: '工作台' },
        { id: 'bridge-model', type: 'equipment', x: 8, y: 35, width: 14, height: 10, label: '魁北克大桥模型' },
        { id: 'blueprint', type: 'screen', x: 60, y: 15, width: 18, height: 10, label: '数字蓝图' },
        { id: 'toolbox', type: 'equipment', x: 70, y: 65, width: 12, height: 10, label: '工具箱' },
      ],
      entryPosition: { x: 50, y: 88 },
      exitDoorPosition: { x: 50, y: 3 },
    },
  },
  {
    id: 5,
    name: '思维之树',
    chapter: 'CHAPTER 05',
    theme: '一棵巨大的发光树状数据结构充满房间。树枝代表计算的不同路径。',
    narrative: '计算之树有许多分支。只有理解它的根基，你才能找到前进的道路。',
    puzzles: room5Puzzles,
    layout: {
      puzzlePoints: {
        '5-1': { x: 20, y: 45, standX: 30, standY: 45 },
        '5-2': { x: 50, y: 68, standX: 50, standY: 58 },
        '5-3': { x: 80, y: 55, standX: 70, standY: 55 },
      },
      decors: [
        { id: 'tree-trunk', type: 'equipment', x: 43, y: 18, width: 14, height: 35, label: '树干' },
        { id: 'tree-branch-1', type: 'equipment', x: 15, y: 8, width: 25, height: 6, label: '树枝' },
        { id: 'tree-branch-2', type: 'equipment', x: 58, y: 5, width: 25, height: 6, label: '树枝' },
        { id: 'data-node', type: 'screen', x: 30, y: 65, width: 10, height: 8, label: '数据节点' },
      ],
      entryPosition: { x: 50, y: 90 },
      exitDoorPosition: { x: 50, y: 3 },
    },
  },
  {
    id: 6,
    name: '安全金库',
    chapter: 'CHAPTER 06',
    theme: '高科技安全设施。墙壁上有扫描的指纹、全息锁和漂浮的法律文件。',
    narrative: '这个金库保存着数字世界最重要的秘密。只有了解安全和法律的人才能通过。',
    puzzles: room6Puzzles,
    layout: {
      puzzlePoints: {
        '6-1': { x: 22, y: 32, standX: 32, standY: 32 },
        '6-2': { x: 75, y: 32, standX: 65, standY: 32 },
        '6-3': { x: 30, y: 70, standX: 40, standY: 70 },
        '6-4': { x: 70, y: 70, standX: 60, standY: 70 },
      },
      decors: [
        { id: 'fingerprint-scanner', type: 'equipment', x: 5, y: 10, width: 10, height: 10, label: '指纹扫描' },
        { id: 'holo-lock', type: 'equipment', x: 42, y: 18, width: 12, height: 8, label: '全息锁' },
        { id: 'safe', type: 'furniture', x: 35, y: 48, width: 25, height: 15, label: '保险箱' },
        { id: 'legal-doc', type: 'screen', x: 75, y: 50, width: 14, height: 10, label: '法律文件' },
      ],
      entryPosition: { x: 50, y: 88 },
      exitDoorPosition: { x: 50, y: 3 },
    },
  },
  {
    id: 7,
    name: '区块链节点',
    chapter: 'CHAPTER 07',
    theme: '深空环境，数据块像星座一样连接在一起。站在去中心化网络的中心。',
    narrative: '最后的房间。区块链守护着出口。证明你对去中心化信任的理解。',
    puzzles: room7Puzzles,
    layout: {
      puzzlePoints: {
        '7-1': { x: 25, y: 25, standX: 35, standY: 25 },
        '7-2': { x: 70, y: 25, standX: 60, standY: 25 },
        '7-3': { x: 25, y: 65, standX: 35, standY: 65 },
        '7-4': { x: 70, y: 65, standX: 60, standY: 65 },
      },
      decors: [
        { id: 'block-1', type: 'equipment', x: 8, y: 42, width: 10, height: 8, label: '区块' },
        { id: 'block-2', type: 'equipment', x: 82, y: 42, width: 10, height: 8, label: '区块' },
        { id: 'block-3', type: 'equipment', x: 43, y: 42, width: 14, height: 10, label: '创世区块' },
        { id: 'chain-link', type: 'screen', x: 22, y: 44, width: 18, height: 4, label: '链' },
        { id: 'chain-link-2', type: 'screen', x: 60, y: 44, width: 18, height: 4, label: '链' },
      ],
      entryPosition: { x: 50, y: 90 },
      exitDoorPosition: { x: 50, y: 3 },
    },
  },
]
