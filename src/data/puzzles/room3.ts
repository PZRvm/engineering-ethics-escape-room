import type { Puzzle } from '../../types/game'

export const room3Puzzles: Puzzle[] = [
  {
    id: '3-1',
    title: '新人困境分类',
    score: 15,
    narrative: '办公桌上散落着各种职场困境的案例。将它们归类到正确的类别中。',
    knowledgePoint: '技能/人际/合作三类困境',
    data: {
      type: 'drag-classify',
      categories: ['技能困境', '人际困境', '合作困境'],
      items: [
        { text: '新技术不断涌现，在校所学已不够用', category: '技能困境' },
        { text: '与同事沟通不畅，产生误解', category: '人际困境' },
        { text: '团队任务分配不均，有人摸鱼', category: '合作困境' },
        { text: '面对大量代码不知从何入手', category: '技能困境' },
        { text: '不知如何得体地拒绝不合理要求', category: '人际困境' },
        { text: '跨部门协作时职责不清晰', category: '合作困境' },
      ],
    },
    explanation:
      '新人进入职场常面临三大困境：技能困境（知识不足）、人际困境（沟通不畅）、合作困境（团队协作问题）。正确识别困境类型是解决问题的第一步。',
    hint: '技能困境与"不会做"有关，人际困境与"说不通"有关，合作困境与"分工乱"有关。',
  },
  {
    id: '3-2',
    title: '职业素养判断',
    score: 10,
    narrative: '屏幕上播放着不同的职场场景。判断哪些行为体现了良好的职业素养。',
    knowledgePoint: '识别良好职业素养',
    data: {
      type: 'scenario',
      question: '以下哪些行为体现了良好的职业素养？',
      multiSelect: true,
      options: [
        {
          label: 'A',
          text: '《隐藏人物》中的女主角通过过硬的专业技能证明自己的价值',
          correct: true,
          reason: '用实力说话是职业素养的最佳体现。',
        },
        {
          label: 'B',
          text: '面对不公平待遇时保持冷静，用实力证明自己',
          correct: true,
          reason: '情绪管理能力和专业精神都是职业素养的重要组成部分。',
        },
        {
          label: 'C',
          text: '为了尽快完成项目，忽视代码质量',
          correct: false,
          reason: '忽视质量追求速度是缺乏职业素养的表现。',
        },
        {
          label: 'D',
          text: '拒绝不合理要求时，先肯定对方再说明困难',
          correct: true,
          reason: '得体的沟通方式体现了良好的职业素养。',
        },
        {
          label: 'E',
          text: '把同事的失误报告给上司以获取信任',
          correct: false,
          reason: '利用他人失误谋取私利是不道德的行为。',
        },
      ],
    },
    explanation:
      '职业素养的核心在于：专业技能过硬、情绪管理得当、沟通方式得体、不以牺牲质量为代价追求速度。',
    hint: '注意区分"合理拒绝"和"打小报告"的区别。',
  },
  {
    id: '3-3',
    title: '职业素养要素',
    score: 10,
    narrative: '一个职业素养评测系统需要你完成最后一道测试。',
    knowledgePoint: '核心构成要素',
    data: {
      type: 'multiple-choice',
      question: '职业素养的核心构成要素中，以下哪个不是必须的？',
      multiSelect: false,
      options: [
        { label: 'A', text: '专业技能', correct: false },
        { label: 'B', text: '职业道德', correct: false },
        { label: 'C', text: '豪华的办公环境', correct: true },
        { label: 'D', text: '沟通能力', correct: false },
        { label: 'E', text: '抗压能力', correct: false },
      ],
    },
    explanation:
      '职业素养的核心要素包括专业技能、职业道德、沟通能力和抗压能力等。豪华的办公环境属于外在条件，与职业素养本身无关。',
    hint: '想想哪个选项属于外部环境而非个人素质。',
  },
]
