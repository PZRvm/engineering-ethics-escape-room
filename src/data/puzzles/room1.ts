import type { Puzzle } from '../../types/game'

export const room1Puzzles: Puzzle[] = [
  {
    id: '1-1',
    title: '计算史时间线',
    narrative: '一个损坏的时间线显示屏闪烁着。恢复事件的正确顺序。',
    knowledgePoint: '图灵→ENIAC→深蓝→大数据→AlphaGo→ChatGPT',
    score: 10,
    data: {
      type: 'drag-sort',
      items: [
        'AlphaGo击败李世石 (2016)',
        'ChatGPT发布 (2022)',
        'ENIAC诞生 (1946)',
        'Google日处理数据超24PB（大数据时代）',
        '图灵提出图灵机概念 (1936)',
        '卡斯帕罗夫 vs 深蓝 (1997)',
      ],
      correctOrder: [
        '图灵提出图灵机概念 (1936)',
        'ENIAC诞生 (1946)',
        '卡斯帕罗夫 vs 深蓝 (1997)',
        'Google日处理数据超24PB（大数据时代）',
        'AlphaGo击败李世石 (2016)',
        'ChatGPT发布 (2022)',
      ],
    },
    explanation:
      '从图灵的理论奠基到ChatGPT的发布，计算机发展经历了从理论到实践的完整历程。图灵(1936)→ENIAC(1946)→深蓝(1997)→大数据时代→AlphaGo(2016)→ChatGPT(2022)',
    hint: '最早的计算机理论可以追溯到1936年，而最新的事件是2022年ChatGPT的发布。',
  },
  {
    id: '1-2',
    title: '计算机之父',
    narrative: '一个锁定的展示柜上提问："谁被公认为计算机之父？"',
    knowledgePoint: '图灵与冯·诺依曼的贡献辨析',
    score: 10,
    data: {
      type: 'multiple-choice',
      question: '谁被公认为计算机之父？',
      options: [
        {
          label: 'A',
          text: '冯·诺依曼 —— 提出存储程序计算机体系结构',
          correct: false,
        },
        {
          label: 'B',
          text: '图灵 —— 提出图灵机和图灵测试，奠定计算理论基础',
          correct: true,
        },
        {
          label: 'C',
          text: '比尔·盖茨 —— 创立微软，推动个人电脑普及',
          correct: false,
        },
        {
          label: 'D',
          text: '乔布斯 —— 创造iPhone，引领移动互联网时代',
          correct: false,
        },
      ],
      multiSelect: false,
    },
    explanation:
      '图灵被称为"计算机之父"，冯·诺依曼被称为"现代计算机之父"。图灵的最大贡献是提出了图灵机和图灵测试，奠定了可计算性理论和人工智能的理论基础。',
    hint: '他被认为奠定了计算理论的基础，提出了"机器能否思考"的著名问题。',
  },
  {
    id: '1-3',
    title: '数据单位排序',
    narrative: '一个数据存储终端需要校准。将数据单位从小到大排序。',
    knowledgePoint: 'Byte→KB→MB→GB→TB→PB→EB→ZB',
    score: 10,
    data: {
      type: 'drag-sort',
      items: ['PB', 'Byte', 'TB', 'GB', 'KB', 'EB', 'ZB', 'MB'],
      correctOrder: ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB'],
    },
    explanation:
      '数据单位从小到大依次为：Byte < KB < MB < GB < TB < PB < EB < ZB。每个单位是前一个的1024倍。',
    hint: '最小的单位是Byte（字节），然后依次是K、M、G、T、P、E、Z。',
  },
  {
    id: '1-4',
    title: '大数据3V特征',
    narrative: '一扇上锁的门有一个扫描仪。它要求："识别大数据的3V特征。"',
    knowledgePoint: 'Volume/Velocity/Variety',
    score: 10,
    data: {
      type: 'multiple-choice',
      question: '识别大数据的3V特征。',
      options: [
        { label: 'A', text: 'Volume（大量）', correct: true },
        { label: 'B', text: 'Velocity（高速）', correct: true },
        { label: 'C', text: 'Variety（多样）', correct: true },
        { label: 'D', text: 'Vulnerability（脆弱性）', correct: false },
        { label: 'E', text: 'Veracity（真实性）', correct: false },
      ],
      multiSelect: true,
    },
    explanation:
      '大数据的经典3V特征是Volume（大量）、Velocity（高速）和Variety（多样）。后来也有学者加入了Veracity（真实性）和Value（价值），形成了5V模型。',
    hint: '3V分别描述了数据的"量"、"速度"和"种类"三个维度。',
  },
]
