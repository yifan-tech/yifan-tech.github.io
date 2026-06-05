# 凌云客栈个人博客原型

这是一个参考 `https://blog.520781.xyz/` 和 [CuteLeaf/Firefly](https://github.com/CuteLeaf/Firefly) 的个人博客静态页面，只使用 `HTML + CSS + JavaScript + 图片资源`。当前视觉方向是 Firefly 启发的原创二次元风格：清透晴空、动漫横幅、三栏博客布局、玻璃质感卡片、柔和高亮和轻量动效。

## 使用

直接用浏览器打开 `index.html` 即可查看页面，不需要后端、数据库、Node 构建或 Java 服务。

所有第三方脚本都已放在 `assets` 目录里，包括图标库和 GSAP，因此页面可以作为普通静态文件部署。

后续替换个人信息和文章内容，主要改这几个位置：

- `index.html`：站点名称、个人介绍、公告、导航与页脚。
- `assets/app.js`：文章数据、标签、分类、阅读时间、专题、留言和交互逻辑。
- `assets/hero-anime.png`：首页原创二次元横幅图。
- `assets/styles.css`：颜色、字体、卡片透明度与响应式布局。
- `assets/anime.css`：二次元视觉覆盖层。

## 参考来源

页面结构参考了 Firefly 的横幅首页、左/右侧边栏、站点统计、日历、音乐组件、分类导航、文章列表/网格切换等设计思路。当前项目没有引入 Astro、Tailwind、Pagefind 或 Firefly 源码，仍然是可直接打开的纯静态页面。
