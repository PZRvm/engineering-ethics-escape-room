import type { Puzzle } from '../../types/game'

export const room4Puzzles: Puzzle[] = [
  {
    id: '4-1',
    title: '工匠精神识别',
    score: 10,
    narrative: '一面墙上投影着不同的工匠故事。识别哪些真正体现了工匠精神。',
    knowledgePoint: '工匠精神案例',
    data: {
      type: 'scenario',
      question: '以下哪些案例体现了工匠精神？',
      multiSelect: true,
      options: [
        {
          label: 'A',
          text: '王震华十年磨一剑，用榫卯结构复原天坛模型',
          correct: true,
          reason: '十年专注一个项目，精益求精，是工匠精神的完美诠释。',
        },
        {
          label: 'B',
          text: '程序员为赶进度跳过代码审查',
          correct: false,
          reason: '跳过质量保证环节恰恰违背了工匠精神。',
        },
        {
          label: 'C',
          text: '做事精益求精，即使无人监督也不降低标准',
          correct: true,
          reason: '慎独精神是工匠精神的精髓。',
        },
        {
          label: 'D',
          text: '在AI时代，工匠精神已无意义，应完全依赖AI',
          correct: false,
          reason: '工匠精神的核心是人的态度和追求，不会因技术进步而失去价值。',
        },
        {
          label: 'E',
          text: '将手工艺与现代技术结合，追求卓越',
          correct: true,
          reason: '工匠精神不是守旧，而是在传统基础上不断创新。',
        },
      ],
    },
    explanation:
      '工匠精神的核心是精益求精、专注执着、追求卓越。它不排斥技术进步，而是强调在任何时代都应保持对品质的极致追求。',
    hint: '工匠精神强调的是态度和品质追求，与技术工具无关。有两个选项其实违背了这个原则。',
  },
  {
    id: '4-2',
    title: 'CDIO排序',
    score: 10,
    narrative:
      '一幅教育蓝图上四个阶段被打乱了顺序。将CDIO工程教育阶段按正确顺序排列。',
    knowledgePoint: 'CDIO四阶段',
    data: {
      type: 'drag-sort',
      items: [
        'Operate（运作）',
        'Design（设计）',
        'Conceive（构思）',
        'Implement（实现）',
      ],
      correctOrder: [
        'Conceive（构思）',
        'Design（设计）',
        'Implement（实现）',
        'Operate（运作）',
      ],
    },
    explanation:
      'CDIO是国际工程教育的标准模式，四个阶段依次为：Conceive（构思）→Design（设计）→Implement（实现）→Operate（运作），完整覆盖了产品从概念到运营的全生命周期。',
    hint: 'CDIO四个字母就是正确顺序的首字母缩写。',
  },
]
