import type { Puzzle } from '../../types/game'

export const room6Puzzles: Puzzle[] = [
  {
    id: '6-1',
    title: 'CIA三要素匹配',
    score: 15,
    narrative: '三个保险箱上分别标注了CIA的三个要素。将安全措施归类到正确的保险箱中。',
    knowledgePoint: '机密性/完整性/可用性',
    data: {
      type: 'drag-classify',
      categories: ['机密性', '完整性', '可用性'],
      items: [
        { text: '确保信息只被授权者访问', category: '机密性' },
        { text: '确保信息不被非法篡改', category: '完整性' },
        { text: '确保授权用户可随时获取信息', category: '可用性' },
        { text: '使用加密技术保护数据传输', category: '机密性' },
        { text: '使用哈希函数验证文件未被修改', category: '完整性' },
        { text: '部署备份系统防止服务中断', category: '可用性' },
      ],
    },
    explanation: '信息安全的CIA三要素：机密性（Confidentiality，防止未授权访问）、完整性（Integrity，防止篡改）、可用性（Availability，保障正常使用）。',
    hint: '"谁能看"是机密性，"能不能改"是完整性，"能不能用"是可用性。',
  },
  {
    id: '6-2',
    title: '网络威胁分类',
    score: 15,
    narrative: '安全监控屏幕上显示着多种网络攻击。将它们归入正确的威胁类别。',
    knowledgePoint: '攻击类型识别',
    data: {
      type: 'drag-classify',
      categories: ['钓鱼攻击', '勒索软件', '社会工程学', 'DDoS攻击'],
      items: [
        { text: '攻击者发送伪装成银行的邮件获取密码', category: '钓鱼攻击' },
        { text: '利用Windows漏洞加密文件索要赎金', category: '勒索软件' },
        { text: '冒充IT部门打电话索要密码', category: '社会工程学' },
        { text: '大量请求淹没服务器导致无法访问', category: 'DDoS攻击' },
      ],
    },
    explanation: '常见的网络攻击类型：钓鱼攻击（伪装身份骗取信息）、勒索软件（加密文件索要赎金）、社会工程学（利用人性弱点获取信息）、DDoS攻击（海量请求瘫痪服务）。',
    hint: '电话诈骗属于"利用人性"的社会工程学，邮件诈骗属于"伪装身份"的钓鱼攻击。',
  },
  {
    id: '6-3',
    title: '法律知识密码',
    score: 10,
    narrative: '一个法律文献柜上的密码锁需要你输入正确数字。',
    knowledgePoint: '个人信息保护法罚款',
    data: {
      type: 'password-lock',
      clue: '根据《个人信息保护法》，违法处理个人信息情节严重的，最高可罚款多少万元？',
      answer: '5000',
    },
    explanation: '根据《中华人民共和国个人信息保护法》第六十六条，违法处理个人信息情节严重的，可处以五千万元以下或者上一年度营业额百分之五以下罚款。',
    hint: 'PIPL规定最高罚款为5000万元或上一年度营业额的5%。',
  },
  {
    id: '6-4',
    title: '开源许可证分类',
    score: 10,
    narrative: '一面专利墙上展示着不同的开源许可证。将它们分类到正确的组别。',
    knowledgePoint: '限制性/宽松许可',
    data: {
      type: 'drag-classify',
      categories: ['限制性', '宽松'],
      items: [
        { text: 'GPL', category: '限制性' },
        { text: 'MIT License', category: '宽松' },
        { text: 'Apache License 2.0', category: '宽松' },
        { text: 'LGPL', category: '限制性' },
        { text: 'BSD License', category: '宽松' },
      ],
    },
    explanation: '限制性许可证（如GPL、LGPL）要求衍生作品必须以相同许可证开源（Copyleft）；宽松许可证（如MIT、Apache、BSD）允许闭源使用，限制较少。',
    hint: 'GPL系列是"传染性"的（限制性），MIT/BSD/Apache系列是"自由使用"的（宽松）。',
  },
];
