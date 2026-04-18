import type { Puzzle } from '../../types/game'

export const room5Puzzles: Puzzle[] = [
  {
    id: '5-1',
    title: '计算思维匹配',
    score: 15,
    narrative: '树干上的光点组成了各种描述。将它们匹配到正确的思维要素中。',
    knowledgePoint: '四要素与描述匹配',
    data: {
      type: 'drag-classify',
      categories: ['分解', '模式识别', '抽象', '算法设计'],
      items: [
        { text: '将复杂问题拆分为可管理的小问题', category: '分解' },
        { text: '在不同问题中发现相似的规律和模式', category: '模式识别' },
        { text: '忽略无关细节，提取核心特征', category: '抽象' },
        { text: '设计逐步解决问题的步骤和流程', category: '算法设计' },
        { text: '画流程图来描述解决过程', category: '算法设计' },
        { text: '找出多道数学题的共同解题方法', category: '模式识别' },
      ],
    },
    explanation:
      '计算思维的四要素：分解（拆分问题）、模式识别（发现规律）、抽象（提取本质）、算法设计（设计步骤）。这四种思维方式是解决复杂问题的基础。',
    hint: '"拆分"对应分解，"找规律"对应模式识别，"忽略细节"对应抽象，"写步骤"对应算法设计。',
  },
  {
    id: '5-2',
    title: '计算之树',
    score: 10,
    narrative: '一棵巨大的数据之树矗立在你面前，根系深入地面以下。',
    knowledgePoint: '计算之树的根基',
    data: {
      type: 'multiple-choice',
      multiSelect: false,
      question: '计算之树的"根"代表什么？',
      options: [
        { label: 'A', text: '计算思维', correct: true },
        { label: 'B', text: '编程语言', correct: false },
        { label: 'C', text: '硬件设备', correct: false },
        { label: 'D', text: '数学公式', correct: false },
      ],
    },
    explanation:
      '计算之树中，"根"代表计算思维，它是所有计算活动的基础。编程语言、硬件设备和数学公式都是树的不同分支，而非根基。',
    hint: '树根是整棵树的基础，就像一种思维方式是所有计算活动的基础。',
  },
  {
    id: '5-3',
    title: '思维要素填空',
    score: 10,
    narrative: '一面数字白板上有一个未完成的公式。填入缺失的思维要素。',
    knowledgePoint: '计算思维四要素',
    data: {
      type: 'fill-blank',
      question: '计算思维的四要素是：____、____、____和____。',
      template: '计算思维的四要素是：____、____、____和____。',
      blanks: ['分解', '模式识别', '抽象', '算法设计'],
    },
    explanation:
      '计算思维的四要素是分解、模式识别、抽象和算法设计。这四个要素构成了完整的问题解决方法论，适用于各个学科领域。',
    hint: '第一个是把大问题变小问题，第二个是找规律，第三个是抓本质，第四个是写步骤。',
  },
];
