import type { Puzzle } from '../../types/game'

export const room2Puzzles: Puzzle[] = [
  // 2-1 伦理概念分类
  {
    id: '2-1',
    title: '伦理概念分类',
    score: 15,
    narrative: '三个石制基座，每个标有标签。将卷轴分类到正确的基座上。',
    knowledgePoint: '伦理/道德/法律辨析',
    data: {
      type: 'drag-classify',
      categories: ['伦理', '道德', '法律'],
      items: [
        { text: '由国家强制力保证实施的行为规范', category: '法律' },
        { text: '控制我们行为的规则、标准、文化', category: '道德' },
        { text: '道德的哲学，研究道德背后的规则和原理', category: '伦理' },
        { text: '违反后果是受到刑罚或行政处罚', category: '法律' },
        { text: '违反后果主要受到社会舆论和良心谴责', category: '道德' },
        { text: '为道德判断提供理性基础', category: '伦理' },
      ],
    },
    explanation:
      '法律由国家强制力保证，违反有明确处罚；道德依靠社会舆论和良心，没有强制力；伦理是道德的哲学，为道德判断提供理性基础。',
    hint: '想想哪种规范有强制力，哪种依靠自觉，哪种是研究"为什么应该自觉"的学问。',
  },

  // 2-2 伦理的起源
  {
    id: '2-2',
    title: '伦理的起源',
    score: 10,
    narrative: '一本古老的典籍浮现在空中，翻到了关于"伦理"起源的章节。',
    knowledgePoint: '"伦理"一词在中国最早出处',
    data: {
      type: 'multiple-choice',
      question: '',
      options: [
        { label: 'A', text: '《论语》', correct: false },
        { label: 'B', text: '《乐记》', correct: true },
        { label: 'C', text: '《道德经》', correct: false },
        { label: 'D', text: '《孟子》', correct: false },
      ],
      multiSelect: false,
    },
    explanation:
      '在中国文化中，"伦理"一词最早出现在《礼记·乐记》中："乐者，通伦理者也。"意为音乐与伦理是相通的。在西方，亚里士多德的《尼各马可伦理学》是最早的伦理学专著。',
    hint: '它出自《礼记》中的一篇，与"音乐"有关。',
  },

  // 2-3 工程伦理案例
  {
    id: '2-3',
    title: '工程伦理案例',
    score: 15,
    narrative: '投影仪显示出多个工程灾难场景。识别哪些体现了工程伦理的缺失。',
    knowledgePoint: '科技伦理缺失案例识别',
    data: {
      type: 'scenario',
      question: '以下哪些案例体现了工程伦理的缺失？',
      multiSelect: true,
      options: [
        {
          label: 'A',
          text: '二战中纳粹用活人做试验',
          correct: true,
          reason: '这是严重的反人类罪行，违反了最基本的伦理原则。',
        },
        {
          label: 'B',
          text: '基因编辑敲除新生儿CCR5基因',
          correct: true,
          reason: '未经充分告知和同意，对人类胚胎进行基因编辑存在未知的伦理风险。',
        },
        {
          label: 'C',
          text: '魁北克大桥因设计师过度自信忽略重量计算而坍塌',
          correct: true,
          reason: '设计师的专业疏忽导致75人遇难，体现了工程责任意识的缺失。',
        },
        {
          label: 'D',
          text: '某公司公开算法以提高透明度',
          correct: false,
          reason: '公开算法提高透明度是符合伦理的做法，体现了对用户负责的态度。',
        },
        {
          label: 'E',
          text: '算法决策过程不公开透明',
          correct: true,
          reason: '缺乏透明度的算法决策可能导致偏见和歧视，属于伦理缺失。',
        },
      ],
    },
    explanation:
      '工程伦理缺失通常表现为：违反基本人权、专业疏忽、缺乏透明度、未经同意的实验等。公开算法恰恰是符合伦理的做法。',
    hint: '有一个选项描述的是正面的、符合伦理的做法，它不应该被选入。',
  },

  // 2-4 机器人三定律
  {
    id: '2-4',
    title: '机器人三定律',
    score: 10,
    narrative: '一个机器人守卫挡住了出口。输入密码才能通过。',
    knowledgePoint: '阿西莫夫定律知识',
    data: {
      type: 'password-lock',
      clue: '阿西莫夫机器人三定律中，保护人类的定律共有几条？',
      answer: '2',
      hint: '机器人不得伤害人类，或坐视人类受到伤害而袖手旁观。',
    },
    explanation:
      '阿西莫夫机器人三定律中，第一定律（不得伤害人类）和第二定律（服从人类命令，除非与第一定律冲突）都涉及保护人类，共2条。第三定律是保护机器人自身。',
    hint: '机器人不得伤害人类，或坐视人类受到伤害而袖手旁观。',
  },
]
