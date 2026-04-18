# 工程伦理密室逃脱 (Engineering Ethics Escape Room)

一个像素复古风格的网页密室逃脱游戏，涵盖《工程伦理》课程全部 7 章知识点。玩家在 7 个密室中探索走动，通过答题、解谜、情景判断等方式逐一通关。

## 技术栈

- **React 19** + **TypeScript 5.9** — UI框架与类型安全
- **Vite 7** + SWC — 快速构建与热更新
- **Tailwind CSS 4** — 设计令牌（颜色、字体变量）
- **styled-components 6** — 组件级样式封装
- **react-router 7** — 页面路由
- **motion 12** — 动画库

## 开发

```bash
npm install       # 安装依赖
npm run dev       # 启动开发服务器
npm run build     # 构建生产版本
npm run lint      # ESLint 检查
npm run preview   # 预览生产构建
```

Git 提交时自动运行 `lint-staged` → `eslint --fix`。

## 项目结构

```
src/
├── types/game.ts          # TypeScript 类型（谜题、房间、状态）
├── data/                   # 游戏数据（7房间谜题、成就）
├── views/                  # 页面组件（路由对应）
├── components/
│   ├── room/               # 密室相关组件（场景、答题点、出口门、入口）
│   ├── character/          # 角色精灵与移动 Hook
│   └── effects/            # 像素粒子背景
└── index.css               # 全局设计令牌 + 动画 + 工具类
```

## 文档

- `docs/游戏设计文档.md` — 完整游戏设计（7个密室、24个谜题、评分系统）
- `docs/风格指南.md` — 视觉风格指南（配色、字体、动画规范）
- `docs/页面布局设计.md` — 各页面 ASCII 布局图与流转关系
- `docs/学习通课程/` — 课程资料（20个知识点文件）
