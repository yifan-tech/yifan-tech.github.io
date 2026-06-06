const siteConfig = {
  defaultTag: "全部",
  launchDate: "2026-01-27",
  storageKeys: {
    theme: "blogTheme",
    layout: "blogLayout",
    favorites: "blogFavorites",
    liked: "blogLiked",
    messages: "blogMessages",
    readerScale: "readerScale",
    accent: "blogAccent",
    musicTrack: "blogMusicTrack",
    pet: "blogPixelPet",
    petCollapsed: "blogPixelPetCollapsed",
    petPosition: "blogPixelPetPosition",
  },
};

// 添加或修改笔记时，主要维护这个数组。完整格式见项目根目录的「添加笔记说明.md」。
const posts = [
  {
    id: "repost-spring-boot-structure",
    title: "转载推荐：Spring Boot 项目结构为什么要从根包开始",
    date: "2026-06-04",
    readTime: "5 min",
    category: "转载推荐",
    tags: ["转载", "Java", "Spring Boot", "项目结构"],
    tone: "green",
    views: 0,
    likes: 0,
    words: 1500,
    repost: true,
    source: {
      name: "Spring Boot Reference Documentation",
      url: "https://docs.spring.io/spring-boot/reference/using/structuring-your-code.html",
    },
    summary:
      "官方文档里关于包结构的建议很适合新项目：主应用类放在根包，业务代码按边界向下组织，自动扫描才更稳定。",
    body: [
      "转载说明：本文不是原文全文转载，而是基于 Spring Boot 官方文档整理的学习摘记。建议阅读原文获取完整上下文。",
      "Spring Boot 项目最容易踩的坑之一，是一开始没有设计根包。主应用类如果放得太深，组件扫描就可能漏掉 controller、service 或配置类。",
      "更稳的做法是把启动类放在业务包根部，例如 com.yifan.blog，然后在下面拆 controller、service、repository、config、common 等目录。",
      "这条建议对小项目也有价值。目录结构不是为了显得复杂，而是让后续新增功能时，每个类都能被放到一个清楚的位置。",
      "实践清单：避免使用默认包；启动类放在根包；业务目录按职责拆分；公共工具不要混进业务层；配置类集中管理。",
    ],
  },
  {
    id: "repost-owasp-auth-checklist",
    title: "转载推荐：登录功能上线前的安全检查清单",
    date: "2026-06-04",
    readTime: "6 min",
    category: "转载推荐",
    tags: ["转载", "安全", "登录", "后端"],
    tone: "amber",
    views: 0,
    likes: 0,
    words: 1700,
    repost: true,
    source: {
      name: "OWASP Cheat Sheet Series - Authentication",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html",
    },
    summary:
      "登录不是只有用户名和密码：错误提示、限流、密码策略、找回流程和会话处理，都应该在上线前过一遍。",
    body: [
      "转载说明：本文为 OWASP Authentication Cheat Sheet 的学习整理，不复制原文内容，只保留适合项目落地的要点。",
      "登录接口的安全重点不是把表单做复杂，而是让攻击者不能轻易枚举账号、暴力尝试密码，或者通过找回密码流程绕过认证。",
      "错误提示要克制，不要明确告诉对方是账号不存在还是密码错误。限流也应该放在登录、验证码、找回密码等高风险入口。",
      "密码策略可以从长度、泄露密码拦截、重试限制和安全存储几个方向考虑。真正落地时，还要结合后端框架和部署环境。",
      "实践清单：统一错误提示；登录失败限流；密码哈希存储；重置链接短时有效；退出登录后清理会话；敏感操作二次确认。",
    ],
  },
  {
    id: "repost-mdn-css-grid-layout",
    title: "转载推荐：用 CSS Grid 稳住博客首页布局",
    date: "2026-06-03",
    readTime: "5 min",
    category: "转载推荐",
    tags: ["转载", "CSS", "Grid", "响应式"],
    tone: "blue",
    views: 0,
    likes: 0,
    words: 1400,
    repost: true,
    source: {
      name: "MDN Web Docs - CSS Grid Layout",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Grid_layout",
    },
    summary:
      "Grid 适合博客首页这种二维结构：主文章流、侧栏、专题卡片和统计区都能在同一个网格系统里保持稳定。",
    body: [
      "转载说明：本文根据 MDN CSS Grid 文档整理为博客布局笔记，完整语法和示例请看原文。",
      "博客首页不是简单的一列文章。它通常还有侧栏、专题、归档、标签、搜索和个人资料，这些模块更适合用二维网格来组织。",
      "Grid 的价值在于能明确描述列宽、间距和响应式断点。相比不断给元素写浮动或手动宽度，网格更容易维护。",
      "移动端布局不要只是缩小桌面端。更好的方式是重新排序信息：先给读者看到站点身份和文章入口，再展示辅助模块。",
      "实践清单：给主要区域定义 grid-template-columns；卡片使用稳定间距；移动端改成单列；固定格式模块加 minmax 防止挤压。",
    ],
  },
  {
    id: "repost-mysql-identifier-names",
    title: "转载推荐：MySQL 表名和字段名应该先统一规则",
    date: "2026-06-03",
    readTime: "4 min",
    category: "转载推荐",
    tags: ["转载", "MySQL", "规范", "后端"],
    tone: "green",
    views: 0,
    likes: 0,
    words: 1300,
    repost: true,
    source: {
      name: "MySQL 8.4 Reference Manual - Schema Object Names",
      url: "https://dev.mysql.com/doc/refman/8.4/en/identifiers.html",
    },
    summary:
      "字段命名不是小事。先统一大小写、分隔符、保留字规避和时间字段规则，后续接口、日志和排查都会顺很多。",
    body: [
      "转载说明：本文根据 MySQL 官方手册的标识符规则整理，不替代原文。涉及兼容性和特殊字符时，应以原文为准。",
      "数据库命名最怕风格混用：一部分下划线，一部分驼峰，一部分缩写。项目越长，沟通成本越高。",
      "实际项目里建议优先选择简单、稳定、可读的命名方式。表名和字段名尽量表达业务含义，避免为了省几个字符牺牲可读性。",
      "还要注意保留字和大小写差异。不同系统、不同配置下，大小写规则可能带来迁移问题，所以一开始就保持统一更稳。",
      "实践清单：统一 snake_case；避免保留字；时间字段固定 created_at、updated_at；状态字段明确枚举；外键字段用 xxx_id。",
    ],
  },
  {
    id: "repost-github-pages-static-blog",
    title: "转载推荐：纯静态博客部署到 GitHub Pages 的思路",
    date: "2026-06-02",
    readTime: "4 min",
    category: "转载推荐",
    tags: ["转载", "静态页面", "部署", "GitHub"],
    tone: "rose",
    views: 0,
    likes: 0,
    words: 1200,
    repost: true,
    source: {
      name: "GitHub Docs - Quickstart for GitHub Pages",
      url: "https://docs.github.com/en/pages/quickstart",
    },
    summary:
      "纯静态博客最适合先部署到 GitHub Pages：成本低、迁移方便，也能逐步接入域名、构建工具和自动发布。",
    body: [
      "转载说明：本文为 GitHub Pages 官方文档的部署思路整理，不复制原文步骤。实际操作时请以官方文档为准。",
      "你的博客目前是纯静态页面，这很适合先放到 GitHub Pages。只要 HTML、CSS、JS 和图片路径正确，就能很快上线。",
      "部署前要先检查相对路径、首页文件名、图片资源和大小写。很多静态站点本地能打开，线上出错，都是路径大小写或资源位置导致的。",
      "后续如果文章变多，可以再接构建流程，把文章数据拆出去。但第一版先用静态文件上线，能最快验证视觉和内容方向。",
      "实践清单：仓库保留 index.html；资源路径使用相对路径；提交到 GitHub；开启 Pages；绑定自定义域名时再配置 DNS。",
    ],
  },
  {
    id: "spring-boot-reading-notes",
    title: "Spring Boot 项目里，那些最先该理顺的目录",
    date: "2026-06-01",
    readTime: "6 min",
    category: "技术笔记",
    tags: ["Java", "Spring Boot", "项目结构"],
    tone: "green",
    views: 1420,
    likes: 88,
    words: 2300,
    featured: true,
    summary:
      "从 controller、service、mapper 到 config 与 common，先把边界想明白，后面的功能才不会长成一团。",
    body: [
      "刚开始写 Web 项目时，最容易把所有东西都塞进一个包里。短期看省事，长期看每一次改动都像在翻抽屉。",
      "我现在更习惯先画出请求流向：入口负责接参，业务层负责规则，数据层只做数据访问。目录不是仪式感，而是让代码的责任可以被快速看见。",
      "真正重要的不是名字多标准，而是团队里每个人都能猜到新代码应该放在哪里。",
    ],
  },
  {
    id: "blog-redesign",
    title: "给个人博客做一次轻量改版",
    date: "2026-05-25",
    readTime: "4 min",
    category: "建站日志",
    tags: ["博客", "前端", "设计"],
    tone: "rose",
    views: 980,
    likes: 73,
    words: 1600,
    summary:
      "参考壁纸横幅、资料侧栏和文章卡片的结构，把首页改成更适合长期写作的样子。",
    body: [
      "我喜欢首页有一点空间感，但不希望内容被装饰吞掉。横幅负责气氛，卡片负责信息，二者要保持距离。",
      "这次把资料、公告、标签、音乐状态放到侧栏，主区域留给文章。读者一进来能知道这里是谁的空间，也能马上进入文章。",
      "后续会把文章数据抽离成 Markdown，再让构建脚本生成归档、RSS 和站点地图。",
    ],
  },
  {
    id: "database-tiny-habits",
    title: "数据库字段命名的小习惯",
    date: "2026-05-18",
    readTime: "5 min",
    category: "开发日常",
    tags: ["MySQL", "规范", "后端"],
    tone: "amber",
    views: 1212,
    likes: 65,
    words: 1900,
    summary:
      "字段名、时间列、软删除、状态枚举，这些小地方统一之后，项目会少很多无意义的沟通。",
    body: [
      "字段命名最怕一半英文缩写、一半拼音、一半历史遗留。数据库不像页面，重构成本很高，所以一开始就要克制。",
      "我通常会固定 created_at、updated_at、deleted_at，再把状态字段收束为明确枚举。这样 API、后台表格和排查日志会更顺。",
      "规范的价值不是限制写法，而是把注意力还给真正的业务问题。",
    ],
  },
  {
    id: "night-reading",
    title: "夜里读书时，给自己留一盏小灯",
    date: "2026-05-10",
    readTime: "3 min",
    category: "生活碎片",
    tags: ["读书", "生活", "摘录"],
    tone: "green",
    views: 756,
    likes: 49,
    words: 1200,
    summary:
      "有些书不一定立刻改变什么，但会把一个普通晚上照得更安静一点。",
    body: [
      "我越来越喜欢慢读。不是为了记住每个观点，而是为了让自己在快节奏之外，有一个可以慢慢呼吸的地方。",
      "读到喜欢的句子时，我会先抄下来，再写一句自己的解释。很多时候，那一句解释才是这一天真正留下来的东西。",
      "写博客也是类似的事：不是展示已经完成的答案，而是留下正在变清楚的过程。",
    ],
  },
  {
    id: "frontend-checklist",
    title: "发布页面前，我会检查这几件事",
    date: "2026-04-28",
    readTime: "7 min",
    category: "前端",
    tags: ["CSS", "可访问性", "响应式"],
    tone: "rose",
    views: 1320,
    likes: 91,
    words: 2600,
    summary:
      "字号、间距、图片比例、移动端换行、按钮状态，很多页面质感都藏在这些细节里。",
    body: [
      "页面写完以后，我会先缩到手机宽度，看所有长标题和按钮文字有没有挤出容器。然后再看桌面宽屏，确认内容没有散得太开。",
      "图片一定要有稳定比例，列表卡片也要能承受标题变长。布局的稳定感，往往比某个单独的视觉效果更重要。",
      "最后才是动效。动效应该让操作更清楚，而不是把读者的注意力从内容上抢走。",
    ],
  },
  {
    id: "static-site-deploy",
    title: "纯静态博客可以怎么部署",
    date: "2026-04-18",
    readTime: "5 min",
    category: "建站日志",
    tags: ["静态页面", "部署", "博客"],
    tone: "blue",
    views: 1104,
    likes: 58,
    words: 1800,
    summary:
      "没有后端也可以先上线：对象存储、GitHub Pages、Nginx 静态目录，都能成为起点。",
    body: [
      "纯静态页面的优点是迁移成本低。只要路径清楚，图片和脚本都能跟着走，后续再接 CMS 或构建工具也不迟。",
      "我的习惯是先把首页、文章页、归档页做成静态版本，确认视觉和内容节奏，再决定是否引入框架。",
      "真正需要后端的，通常是评论、后台发布和统计。其它部分可以先用静态数据把体验跑通。",
    ],
  },
  {
    id: "java-web-login-flow",
    title: "登录流程不要只看表单提交",
    date: "2026-04-09",
    readTime: "8 min",
    category: "技术笔记",
    tags: ["Java", "安全", "会话"],
    tone: "amber",
    views: 1544,
    likes: 96,
    words: 3100,
    summary:
      "登录不是一个接口，而是一串边界：校验、限流、会话、跳转、退出和异常提示。",
    body: [
      "做登录功能时，表单只是入口。真正容易出问题的是错误提示、重复提交、会话续期和退出后的页面缓存。",
      "我会把登录流程拆成几个状态：未登录、验证中、已登录、已过期、已退出。状态清楚之后，前后端都更容易协作。",
      "安全不是把页面做复杂，而是让每个入口都有合理的默认防线。",
    ],
  },
  {
    id: "css-layout-notes",
    title: "用 CSS Grid 处理博客首页布局",
    date: "2026-03-29",
    readTime: "6 min",
    category: "前端",
    tags: ["CSS", "Grid", "响应式"],
    tone: "blue",
    views: 1032,
    likes: 54,
    words: 2100,
    summary:
      "侧栏、文章流、专题区和归档区都在同一个响应式网格里，页面会更稳。",
    body: [
      "Grid 的好处是能直接描述二维布局。博客首页这种侧栏加主内容的结构，很适合用 grid-template-columns 解决。",
      "移动端不是简单缩小，而是重新决定信息顺序。个人资料可以先出现，文章列表紧跟其后，辅助模块再往下排。",
      "布局写稳之后，动效和内容变化才不会把页面推得乱七八糟。",
    ],
  },
  {
    id: "weekly-reset",
    title: "每周日晚上，给草稿做一次整理",
    date: "2026-03-16",
    readTime: "4 min",
    category: "生活碎片",
    tags: ["写作", "计划", "生活"],
    tone: "green",
    views: 688,
    likes: 42,
    words: 1300,
    summary:
      "把零散笔记放回合适的位置，是让下周更轻一点的小仪式。",
    body: [
      "草稿箱里最常见的不是半成品，而是一些还没找到方向的句子。它们需要被整理，而不是被责备。",
      "我会把草稿分成三类：马上能写、需要查资料、只是一个想法。分类之后，焦虑会少很多。",
      "写作的连续感，很多时候来自这种温和的复盘。",
    ],
  },
];

const topicData = [
  {
    name: "Java Web",
    icon: "braces",
    tag: "Java",
    description: "后端目录、登录流程、安全边界和项目习惯。",
  },
  {
    name: "前端设计",
    icon: "palette",
    tag: "CSS",
    description: "布局、响应式、动效和页面发布前的检查清单。",
  },
  {
    name: "建站日志",
    icon: "hammer",
    tag: "博客",
    description: "从纯静态页面开始，慢慢把个人博客搭完整。",
  },
  {
    name: "生活碎片",
    icon: "book-open",
    tag: "生活",
    description: "读书、计划、草稿和一些安静的小观察。",
  },
];

const defaultMessages = [
  {
    name: "一帆",
    message: "欢迎来到凌云客栈。这个留言板是纯静态本地保存，可以先体验交互。",
    time: "2026-06-04",
  },
  {
    name: "路过的读者",
    message: "首页比普通文章列表更像一个可以停留的个人空间。",
    time: "2026-06-04",
  },
];

const musicPlaylist = [
  {
    id: "37i9dQZEVXbMDoHDwVN2tF",
    title: "全球 Top 50",
    subtitle: "实时热门排行",
  },
  {
    id: "37i9dQZF1DXcBWIGoYBM5M",
    title: "Today's Top Hits",
    subtitle: "全球流行热歌",
  },
  {
    id: "37i9dQZEVXbLiRSasKsNU9",
    title: "全球 Viral 50",
    subtitle: "正在走红的新歌",
  },
  {
    id: "37i9dQZF1DWUa8ZRTfalHk",
    title: "Pop Rising",
    subtitle: "流行新声精选",
  },
];

const state = {
  tag: siteConfig.defaultTag,
  query: "",
  layout: localStorage.getItem(siteConfig.storageKeys.layout) || "list",
  sort: "newest",
  favorites: new Set(readJSON(siteConfig.storageKeys.favorites, [])),
  liked: new Set(readJSON(siteConfig.storageKeys.liked, [])),
  readerScale: Number(localStorage.getItem(siteConfig.storageKeys.readerScale)) || 1,
  currentPostId: null,
  menuOpen: false,
  navMegaOpen: false,
  navTrigger: null,
  activeNavPanel: "articles",
  accent: localStorage.getItem(siteConfig.storageKeys.accent) || "rose",
  musicTrackIndex: Math.max(
    0,
    musicPlaylist.findIndex(
      (track) => track.id === localStorage.getItem(siteConfig.storageKeys.musicTrack),
    ),
  ),
  calendarDate: new Date(),
  pet: readObject(siteConfig.storageKeys.pet, {
    mood: 80,
    energy: 70,
    exp: 0,
    updatedAt: Date.now(),
  }),
  animationsReady: false,
};

let els = {};
let petSpeechTimer = null;
let petVisualTimer = null;
let activeTimePhase = null;
let weatherRefreshTimer = null;

const weatherConfig = {
  latitude: 28.2282,
  longitude: 112.9388,
  location: "长沙",
  refreshMs: 15 * 60 * 1000,
};

const timePhaseAssets = {
  morning: {
    src: "assets/hero-morning.png",
    pageSrc: "assets/footer-morning-4k.jpg",
    alt: "清晨阳光下的动漫风格屋顶书桌与城市天际线",
  },
  day: {
    src: "assets/hero-anime.png",
    pageSrc: "assets/footer-day-4k.jpg",
    alt: "晴朗白昼中的动漫风格屋顶书桌与城市天际线",
  },
  dusk: {
    src: "assets/hero-dusk.png",
    pageSrc: "assets/footer-dusk-4k.jpg",
    alt: "夕阳映照下的动漫风格屋顶书桌与城市天际线",
  },
  night: {
    src: "assets/hero-night.png",
    pageSrc: "assets/footer-night-4k.jpg",
    alt: "月夜灯光下的动漫风格屋顶书桌与城市天际线",
  },
};

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return Array.isArray(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function readObject(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === "object" && !Array.isArray(value) ? { ...fallback, ...value } : fallback;
  } catch {
    return fallback;
  }
}

function writeSet(key, set) {
  localStorage.setItem(key, JSON.stringify([...set]));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function sourceNoteHTML(post) {
  if (!post.source?.url || !post.source?.name) return "";
  const label = post.repost ? "转载来源" : "参考来源";
  return `
    <aside class="source-note">
      <span>${label}</span>
      <a href="${escapeHTML(post.source.url)}" target="_blank" rel="noreferrer">
        ${escapeHTML(post.source.name)}
        <i data-lucide="external-link"></i>
      </a>
    </aside>
  `;
}

function postUrl(postId) {
  return `posts/${encodeURIComponent(postId)}.html`;
}

function $(selector) {
  return document.querySelector(selector);
}

function $$(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function cacheElements() {
  els = {
    postList: $("#postList"),
    filterRow: $("#filterRow"),
    tagCloud: $("#tagCloud"),
    emptyState: $("#emptyState"),
    searchInput: $("#postSearch"),
    sortSelect: $("#sortSelect"),
    featuredPost: $("#featuredPost"),
    topicGrid: $("#topicGrid"),
    archiveList: $("#archiveList"),
    heatmap: $("#heatmap"),
    pulseActiveDays: $("#pulseActiveDays"),
    pulseArticleCount: $("#pulseArticleCount"),
    pulseLatest: $("#pulseLatest"),
    dialog: $("#postDialog"),
    dialogBody: $("#dialogBody"),
    searchPalette: $("#searchPalette"),
    paletteSearch: $("#paletteSearch"),
    paletteResults: $("#paletteResults"),
    mobileDrawer: $("#mobileDrawer"),
    mobileMenuToggle: $("#mobileMenuToggle"),
    mobileHub: $("#mobileHub"),
    navMega: $("#navMega"),
    navMegaBody: $("#navMegaBody"),
    navMegaTitle: $("#navMegaTitle"),
    navMegaClose: $("#navMegaClose"),
    navShield: $("#navShield"),
    navIndicator: $("#navIndicator"),
    heroClockTime: $("#heroClockTime"),
    heroClockDate: $("#heroClockDate"),
    dailyNotePhase: $("#dailyNotePhase"),
    dailyNoteMessage: $("#dailyNoteMessage"),
    dailyNoteDate: $("#dailyNoteDate"),
    weatherTemperature: $("#weatherTemperature"),
    weatherSummary: $("#weatherSummary"),
    weatherUpdated: $("#weatherUpdated"),
    weatherFeelsLike: $("#weatherFeelsLike"),
    weatherHumidity: $("#weatherHumidity"),
    weatherWind: $("#weatherWind"),
    weatherIcon: $("#heroWeather .weather-main-icon"),
    heroImages: $$(".hero-image"),
    wallpaperImages: $$(".wallpaper-image"),
    musicStatus: $("#musicStatus"),
    musicTrack: $("#musicTrack"),
    musicPlaylist: $("#musicPlaylist"),
    musicEmbed: $("#musicEmbed"),
    calendarTitle: $("#calendarTitle"),
    calendarToday: $("#calendarToday"),
    miniCalendar: $("#miniCalendar"),
    calendarPrev: $("#calendarPrev"),
    calendarNext: $("#calendarNext"),
    calendarReset: $("#calendarReset"),
    petWidget: $("#pixelPetWidget"),
    pixelPet: $("#pixelPet"),
    petSprite: $("#petSprite"),
    petSpeech: $("#petSpeech"),
    petMood: $("#petMood"),
    petEnergy: $("#petEnergy"),
    petLevel: $("#petLevel"),
    petCollapse: $("#petCollapse"),
    guestForm: $("#guestForm"),
    messageList: $("#messageList"),
  };
}

function uniqueTags() {
  return [siteConfig.defaultTag, ...new Set(posts.flatMap((post) => post.tags))];
}

function countForTag(tag) {
  if (tag === siteConfig.defaultTag) return posts.length;
  return posts.filter((post) => post.tags.includes(tag)).length;
}

function getLikes(post) {
  return post.likes + (state.liked.has(post.id) ? 1 : 0);
}

function filteredPosts() {
  const query = state.query.trim().toLowerCase();
  const result = posts.filter((post) => {
    const tagMatched = state.tag === siteConfig.defaultTag || post.tags.includes(state.tag);
    if (!query) return tagMatched;
    const haystack = [post.title, post.summary, post.category, ...post.tags].join(" ").toLowerCase();
    return tagMatched && haystack.includes(query);
  });

  return result.sort((a, b) => {
    if (state.sort === "popular") return b.views - a.views;
    if (state.sort === "liked") return getLikes(b) - getLikes(a);
    return new Date(b.date) - new Date(a.date);
  });
}

function categoryEntries() {
  const map = new Map();
  posts.forEach((post) => {
    if (!map.has(post.category)) map.set(post.category, []);
    map.get(post.category).push(post);
  });
  return [...map.entries()].sort((a, b) => b[1].length - a[1].length);
}

function recentPosts(limit = 5) {
  return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, limit);
}

function popularPosts(limit = 4) {
  return [...posts].sort((a, b) => b.views - a.views).slice(0, limit);
}

function favoritePosts() {
  return posts.filter((post) => state.favorites.has(post.id));
}

function createTagButton(tag, className = "filter-pill") {
  const button = document.createElement("button");
  button.type = "button";
  button.className = className;
  button.dataset.tag = tag;
  button.innerHTML = `<span>${escapeHTML(tag)}</span><small>${countForTag(tag)}</small>`;
  if (tag === state.tag) button.classList.add("is-active");
  return button;
}

function renderFilters() {
  const tags = uniqueTags();
  els.filterRow.replaceChildren(...tags.map((tag) => createTagButton(tag)));
  els.tagCloud.replaceChildren(...tags.slice(1).map((tag) => createTagButton(tag, "tag")));
}

function renderFeatured() {
  const post = posts.find((item) => item.featured) || posts[0];
  els.featuredPost.innerHTML = `
    <div>
      <span class="featured-badge">
        <i data-lucide="badge-check"></i>
        编辑推荐
      </span>
      <h3>${escapeHTML(post.title)}</h3>
      <p class="post-summary">${escapeHTML(post.summary)}</p>
      <div class="post-tags">
        ${post.tags.map((tag) => `<span class="post-tag">${escapeHTML(tag)}</span>`).join("")}
      </div>
      <div class="post-card-actions">
        <a class="read-button" href="${postUrl(post.id)}">
          <span>阅读全文</span>
          <i data-lucide="arrow-right"></i>
        </a>
        <button class="mini-action ${state.favorites.has(post.id) ? "is-active" : ""}" type="button" data-action="bookmark" data-post-id="${post.id}">
          <i data-lucide="bookmark"></i>
          收藏
        </button>
      </div>
    </div>
    <div class="featured-cover" aria-hidden="true"></div>
  `;
}

function renderPosts() {
  const shouldHideFeatured = state.tag === siteConfig.defaultTag && state.query.trim() === "";
  const visiblePosts = filteredPosts().filter((post) => !(shouldHideFeatured && post.featured));
  els.postList.className = `post-list ${state.layout}-mode`;
  els.emptyState.hidden = visiblePosts.length > 0;

  els.postList.replaceChildren(
    ...visiblePosts.map((post) => {
      const article = document.createElement("article");
      article.className = "post-card";
      article.dataset.postCard = post.id;
      article.innerHTML = `
        <div class="post-main">
          <div class="post-meta-line">
            <span>${post.date}</span>
            <span>${escapeHTML(post.category)}</span>
            <span>${post.readTime}</span>
            <span>${post.views.toLocaleString()} 浏览</span>
          </div>
          <h3>${escapeHTML(post.title)}</h3>
          <p class="post-summary">${escapeHTML(post.summary)}</p>
          <div class="post-tags">
            ${post.tags.map((tag) => `<span class="post-tag">${escapeHTML(tag)}</span>`).join("")}
          </div>
          <div class="post-card-actions">
            <a class="read-button" href="${postUrl(post.id)}">
              <span>阅读全文</span>
              <i data-lucide="arrow-right"></i>
            </a>
            <button class="mini-action ${state.liked.has(post.id) ? "is-active" : ""}" type="button" data-action="like" data-post-id="${post.id}">
              <i data-lucide="heart"></i>
              <span>${getLikes(post)}</span>
            </button>
            <button class="mini-action ${state.favorites.has(post.id) ? "is-active" : ""}" type="button" data-action="bookmark" data-post-id="${post.id}">
              <i data-lucide="bookmark"></i>
            </button>
          </div>
        </div>
        <div class="post-cover" data-tone="${post.tone}" aria-hidden="true">
          <div class="post-signal">
            <span>${post.words.toLocaleString()} 字</span>
            <span>${getLikes(post)} 喜欢</span>
          </div>
        </div>
      `;
      return article;
    }),
  );

  refreshIcons();
  animatePostCards();
  refreshScrollTriggers();
}

function renderTopics() {
  els.topicGrid.replaceChildren(
    ...topicData.map((topic) => {
      const count = posts.filter((post) => post.tags.includes(topic.tag)).length;
      const article = document.createElement("article");
      article.className = "topic-card";
      article.dataset.topicTag = topic.tag;
      article.innerHTML = `
        <span class="topic-count">
          <i data-lucide="${topic.icon}"></i>
          ${count} 篇
        </span>
        <h3>${escapeHTML(topic.name)}</h3>
        <p>${escapeHTML(topic.description)}</p>
      `;
      return article;
    }),
  );
}

function renderArchive() {
  const items = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  els.archiveList.replaceChildren(
    ...items.map((post) => {
      const row = document.createElement("article");
      row.className = "archive-item";
      row.innerHTML = `
        <span class="archive-date">${post.date}</span>
        <a class="archive-title text-button" href="${postUrl(post.id)}">
          ${escapeHTML(post.title)}
        </a>
        <span class="archive-tags">
          ${post.tags.slice(0, 2).map((tag) => `<span class="post-tag">${escapeHTML(tag)}</span>`).join("")}
        </span>
      `;
      return row;
    }),
  );
}

function renderHeatmap() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const postsByDate = posts.reduce((map, post) => {
    map.set(post.date, (map.get(post.date) || 0) + 1);
    return map;
  }, new Map());
  const days = Array.from({ length: 35 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (34 - index));
    const iso = formatLocalDate(date);
    const count = postsByDate.get(iso) || 0;
    return { date, iso, count, level: count === 0 ? 0 : Math.min(4, count * 2) };
  });
  const activeDays = days.filter((day) => day.count > 0);
  const articleCount = activeDays.reduce((sum, day) => sum + day.count, 0);
  const latest = [...activeDays].reverse()[0];

  els.heatmap.replaceChildren(
    ...days.map((day) => {
      const cell = document.createElement("time");
      cell.className = "heat-cell";
      cell.dateTime = day.iso;
      cell.dataset.level = String(day.level);
      cell.title = day.count ? `${day.iso}：发布 ${day.count} 篇文章` : `${day.iso}：暂无更新`;
      return cell;
    }),
  );
  els.pulseActiveDays.textContent = String(activeDays.length);
  els.pulseArticleCount.textContent = String(articleCount);
  els.pulseLatest.textContent = latest
    ? new Intl.DateTimeFormat("zh-CN", { month: "2-digit", day: "2-digit" })
        .format(latest.date)
        .replace(/\//g, ".")
    : "--";
}

function renderStats() {
  const categories = categoryEntries().length;
  const topics = topicData.length;
  const tags = uniqueTags().length - 1;
  const words = posts.reduce((sum, post) => sum + post.words, 0);
  const runDays = getRunDays(siteConfig.launchDate);
  const latestActivity = getLatestActivityLabel();
  const padCount = (value) => String(value).padStart(2, "0");
  const setText = (selector, value) => {
    const node = $(selector);
    if (node) node.textContent = value;
  };

  setText("#heroPostCount", padCount(posts.length));
  setText("#heroTopicCount", padCount(topics));
  setText("#heroRunDays", `${runDays}d`);
  setText("#quickTopicCount", padCount(topics));
  setText("#quickArchiveCount", padCount(posts.length));
  setText("#statPosts", String(posts.length));
  setText("#statTags", String(tags));
  setText("#statWords", `${Math.round(words / 1000)}k`);
  setText("#railPosts", String(posts.length));
  setText("#railCategories", String(categories));
  setText("#railTags", String(tags));
  setText("#railWords", words.toLocaleString());
  setText("#railRunDays", `${runDays} 天`);
  setText("#railLastActivity", latestActivity);
}

function getRunDays(dateString) {
  const start = new Date(`${dateString}T00:00:00`);
  if (Number.isNaN(start.getTime())) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Math.max(0, Math.floor((today - start) / 86400000));
}

function getLatestActivityLabel() {
  const dates = posts
    .map((post) => new Date(`${post.date}T00:00:00`))
    .filter((date) => !Number.isNaN(date.getTime()))
    .sort((a, b) => b - a);
  if (!dates.length) return "--";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const latest = dates[0];
  const diffDays = Math.floor((today - latest) / 86400000);
  if (diffDays <= 0) return "今天";
  if (diffDays === 1) return "昨天";
  if (diffDays < 30) return `${diffDays} 天前`;
  return new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
  })
    .format(latest)
    .replace(/\//g, ".");
}

function readMessages() {
  const stored = readJSON(siteConfig.storageKeys.messages, null);
  return stored || defaultMessages;
}

function writeMessages(messages) {
  localStorage.setItem(siteConfig.storageKeys.messages, JSON.stringify(messages));
}

function renderMessages() {
  const messages = readMessages();
  els.messageList.replaceChildren(
    ...messages.map((item) => {
      const card = document.createElement("article");
      card.className = "message-card";
      card.innerHTML = `
        <strong>${escapeHTML(item.name)} <span class="muted">/ ${escapeHTML(item.time)}</span></strong>
        <p>${escapeHTML(item.message)}</p>
      `;
      return card;
    }),
  );
}

function navPostButton(post) {
  return `
    <a class="nav-link-item" href="${postUrl(post.id)}">
      <strong>${escapeHTML(post.title)}</strong>
      <small>${post.date} / ${escapeHTML(post.category)} / ${post.views.toLocaleString()} 浏览</small>
    </a>
  `;
}

function navActionButton(icon, title, desc, action) {
  return `
    <button class="nav-action-item" type="button" data-nav-action="${action}">
      <strong><i data-lucide="${icon}"></i> ${escapeHTML(title)}</strong>
      <small>${escapeHTML(desc)}</small>
    </button>
  `;
}

function navChip(label, count, attrs = "") {
  return `<button class="nav-chip ${label === state.tag ? "is-active" : ""}" type="button" ${attrs}>${escapeHTML(label)}<small>${count}</small></button>`;
}

function renderNavPanel(panel = state.activeNavPanel) {
  state.activeNavPanel = panel;
  if (!els.navMegaBody) return;

  const tags = uniqueTags();
  const favorites = favoritePosts();
  const panelTitles = {
    articles: "文章导航",
    topics: "专题地图",
    archive: "归档索引",
    tools: "快捷工具",
    site: "站点设置",
  };
  els.navMegaTitle.textContent = panelTitles[panel] || "导航中心";

  $$(".nav-tab").forEach((tab) => {
    tab.classList.toggle("is-active", tab.dataset.navPanel === panel);
  });

  if (panel === "articles") {
    els.navMegaBody.innerHTML = `
      <div class="nav-panel-grid">
        <section class="nav-panel-card">
          <h3><i data-lucide="clock-3"></i> 最近文章</h3>
          <div class="nav-link-list">
            ${recentPosts(5).map(navPostButton).join("")}
          </div>
        </section>
        <section class="nav-panel-card">
          <h3><i data-lucide="tags"></i> 标签筛选</h3>
          <div class="nav-chip-row">
            ${tags.map((tag) => navChip(tag, countForTag(tag), `data-nav-tag="${escapeHTML(tag)}"`)).join("")}
          </div>
        </section>
        <section class="nav-panel-card">
          <h3><i data-lucide="sliders-horizontal"></i> 阅读工具</h3>
          <div class="nav-action-list">
            ${navActionButton("search", "站内搜索", "打开命令式搜索面板", "search")}
            ${navActionButton("shuffle", "随机阅读", "从当前筛选结果里抽一篇", "random")}
            ${navActionButton("heart", "最多喜欢", "按喜欢数重新排序文章", "sort-liked")}
            ${navActionButton("eye", "最多浏览", "按浏览量重新排序文章", "sort-popular")}
          </div>
        </section>
      </div>
    `;
  }

  if (panel === "topics") {
    els.navMegaBody.innerHTML = `
      <div class="nav-panel-grid two-col">
        <section class="nav-panel-card">
          <h3><i data-lucide="folder-kanban"></i> 专题直达</h3>
          <div class="nav-link-list">
            ${topicData
              .map((topic) => {
                const count = posts.filter((post) => post.tags.includes(topic.tag)).length;
                return `
                  <button class="nav-link-item" type="button" data-nav-tag="${escapeHTML(topic.tag)}">
                    <strong>${escapeHTML(topic.name)} / ${count} 篇</strong>
                    <small>${escapeHTML(topic.description)}</small>
                  </button>
                `;
              })
              .join("")}
          </div>
        </section>
        <section class="nav-panel-card">
          <h3><i data-lucide="flame"></i> 热门阅读</h3>
          <div class="nav-link-list">
            ${popularPosts(5).map(navPostButton).join("")}
          </div>
        </section>
      </div>
    `;
  }

  if (panel === "archive") {
    const months = new Map();
    posts.forEach((post) => {
      const month = post.date.slice(0, 7);
      months.set(month, (months.get(month) || 0) + 1);
    });
    els.navMegaBody.innerHTML = `
      <div class="nav-panel-grid">
        <section class="nav-panel-card">
          <h3><i data-lucide="calendar-days"></i> 月份</h3>
          <div class="nav-chip-row">
            ${[...months.entries()].map(([month, count]) => navChip(month, count, `data-nav-month="${month}"`)).join("")}
          </div>
        </section>
        <section class="nav-panel-card">
          <h3><i data-lucide="archive"></i> 最近归档</h3>
          <div class="nav-link-list">
            ${recentPosts(6).map(navPostButton).join("")}
          </div>
        </section>
        <section class="nav-panel-card">
          <h3><i data-lucide="layout-list"></i> 分类</h3>
          <div class="nav-chip-row">
            ${categoryEntries()
              .map(([category, items]) => navChip(category, items.length, `data-nav-category="${escapeHTML(category)}"`))
              .join("")}
          </div>
        </section>
      </div>
    `;
  }

  if (panel === "tools") {
    els.navMegaBody.innerHTML = `
      <div class="nav-panel-grid">
        <section class="nav-panel-card">
          <h3><i data-lucide="wrench"></i> 快捷操作</h3>
          <div class="nav-action-list">
            ${navActionButton("search", "搜索", "Ctrl / Cmd + K 或 / 也可以打开", "search")}
            ${navActionButton("shuffle", "随机一篇", "不知道读什么时用它", "random")}
            ${navActionButton("message-square-text", "去留言", "跳到留言板区域", "guestbook")}
            ${navActionButton("arrow-up", "回到顶部", "回到首页横幅", "top")}
          </div>
        </section>
        <section class="nav-panel-card">
          <h3><i data-lucide="bookmark"></i> 我的收藏</h3>
          <div class="nav-link-list">
            ${
              favorites.length
                ? favorites.map(navPostButton).join("")
                : `<button class="nav-link-item" type="button" data-nav-action="random"><strong>还没有收藏</strong><small>先随机读一篇，喜欢就点收藏。</small></button>`
            }
          </div>
        </section>
        <section class="nav-panel-card">
          <h3><i data-lucide="layout-dashboard"></i> 布局</h3>
          <div class="nav-switch-grid">
            <button class="nav-chip ${state.layout === "list" ? "is-active" : ""}" type="button" data-nav-layout="list">列表</button>
            <button class="nav-chip ${state.layout === "grid" ? "is-active" : ""}" type="button" data-nav-layout="grid">网格</button>
            <button class="nav-chip ${state.sort === "newest" ? "is-active" : ""}" type="button" data-nav-sort="newest">最新</button>
            <button class="nav-chip ${state.sort === "popular" ? "is-active" : ""}" type="button" data-nav-sort="popular">热度</button>
          </div>
        </section>
      </div>
    `;
  }

  if (panel === "site") {
    els.navMegaBody.innerHTML = `
      <div class="nav-panel-grid">
        <section class="nav-panel-card">
          <h3><i data-lucide="bar-chart-3"></i> 站点概览</h3>
          <div class="nav-stat-grid">
            <div class="nav-stat"><strong>${posts.length}</strong><span>文章</span></div>
            <div class="nav-stat"><strong>${uniqueTags().length - 1}</strong><span>标签</span></div>
            <div class="nav-stat"><strong>${favoritePosts().length}</strong><span>收藏</span></div>
          </div>
        </section>
        <section class="nav-panel-card">
          <h3><i data-lucide="paintbrush"></i> 外观</h3>
          <div class="nav-action-list">
            ${navActionButton("sun-moon", "明暗主题", "在浅色和深色之间切换", "theme")}
          </div>
          <h3><i data-lucide="pipette"></i> 色彩</h3>
          <div class="nav-color-row">
            <button class="color-dot ${state.accent === "rose" ? "is-active" : ""}" style="--dot:#ff6fae" type="button" data-nav-accent="rose" aria-label="玫瑰"></button>
            <button class="color-dot ${state.accent === "teal" ? "is-active" : ""}" style="--dot:#33c7b1" type="button" data-nav-accent="teal" aria-label="青绿"></button>
            <button class="color-dot ${state.accent === "blue" ? "is-active" : ""}" style="--dot:#4fb8ff" type="button" data-nav-accent="blue" aria-label="海蓝"></button>
            <button class="color-dot ${state.accent === "gold" ? "is-active" : ""}" style="--dot:#ffd166" type="button" data-nav-accent="gold" aria-label="金色"></button>
          </div>
        </section>
        <section class="nav-panel-card">
          <h3><i data-lucide="link"></i> 站点链接</h3>
          <div class="nav-action-list">
            ${navActionButton("git-branch", "GitHub", "打开 yifan-tech 主页", "github")}
            ${navActionButton("rss", "RSS", "跳到归档和订阅预留区", "archive")}
            ${navActionButton("user-round", "关于站长", "跳转到个人资料侧栏", "about")}
          </div>
        </section>
      </div>
    `;
  }

  refreshIcons();
  animateNavPanel();
}

function animateNavPanel() {
  if (!window.gsap || !state.navMegaOpen || !els.navMegaBody) return;
  const cards = els.navMegaBody.querySelectorAll(".nav-panel-card");
  const items = els.navMegaBody.querySelectorAll(".nav-link-item, .nav-action-item, .nav-chip, .nav-stat");
  gsap.fromTo(
    cards,
    { autoAlpha: 0, y: 14 },
    { autoAlpha: 1, y: 0, duration: 0.28, stagger: 0.035, ease: "power3.out", overwrite: true },
  );
  gsap.fromTo(
    items,
    { autoAlpha: 0, y: 8 },
    { autoAlpha: 1, y: 0, duration: 0.22, delay: 0.08, stagger: 0.014, ease: "power2.out", overwrite: true },
  );
}

function renderMobileHub() {
  if (!els.mobileHub) return;
  const topTags = uniqueTags().slice(0, 7);
  const favorites = favoritePosts();
  els.mobileHub.innerHTML = `
    <section class="mobile-hub-section">
      <h3>快速筛选</h3>
      <div class="nav-chip-row">
        ${topTags.map((tag) => navChip(tag, countForTag(tag), `data-nav-tag="${escapeHTML(tag)}"`)).join("")}
      </div>
    </section>
    <section class="mobile-hub-section">
      <h3>导航工具</h3>
      <div class="nav-action-list">
        ${navActionButton("heart", "最多喜欢", "按喜欢排序", "sort-liked")}
        ${navActionButton("eye", "最多浏览", "按浏览排序", "sort-popular")}
        ${navActionButton("sun-moon", "明暗主题", "切换主题", "theme")}
      </div>
    </section>
    <section class="mobile-hub-section">
      <h3>收藏</h3>
      <div class="nav-link-list">
        ${
          favorites.length
            ? favorites.slice(0, 3).map(navPostButton).join("")
            : `<button class="nav-link-item" type="button" data-nav-action="random"><strong>暂无收藏</strong><small>先随机阅读一篇。</small></button>`
        }
      </div>
    </section>
  `;
}

function refreshActiveTags() {
  $$("[data-tag]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.tag === state.tag);
  });
}

function setTag(tag) {
  state.tag = tag;
  refreshActiveTags();
  renderPosts();
  renderNavPanel(state.activeNavPanel);
  renderMobileHub();
  closeNavMega();
  closeMobileMenu();
  document.querySelector("#posts").scrollIntoView({ behavior: "smooth", block: "start" });
}

function openPost(postId) {
  const post = posts.find((item) => item.id === postId);
  if (!post) return;
  window.location.href = postUrl(post.id);
  return;

  state.currentPostId = post.id;
  $("#dialogMeta").textContent = `${post.date} / ${post.category} / ${post.readTime} / ${post.views.toLocaleString()} 浏览`;
  $("#dialogTitle").textContent = post.title;
  $("#dialogTags").innerHTML = post.tags.map((tag) => `<span class="post-tag">${escapeHTML(tag)}</span>`).join("");
  els.dialogBody.style.setProperty("--reader-scale", state.readerScale);
  els.dialogBody.innerHTML = `
    ${post.body.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("")}
    ${sourceNoteHTML(post)}
    <blockquote>把还没完全想清楚的事写下来，常常就是想清楚的开始。</blockquote>
  `;
  updateDialogActions();

  if (!els.dialog.open) {
    els.dialog.showModal();
  }

  animateDialog(els.dialog);
  refreshIcons();
}

function updateDialogActions() {
  const postId = state.currentPostId;
  $("#dialogLike").classList.toggle("is-active", state.liked.has(postId));
  $("#dialogBookmark").classList.toggle("is-active", state.favorites.has(postId));
}

function toggleLike(postId) {
  if (state.liked.has(postId)) {
    state.liked.delete(postId);
  } else {
    state.liked.add(postId);
  }
  writeSet(siteConfig.storageKeys.liked, state.liked);
  renderFeatured();
  renderPosts();
  renderNavPanel(state.activeNavPanel);
  renderMobileHub();
  if (state.currentPostId === postId) updateDialogActions();
}

function toggleBookmark(postId) {
  if (state.favorites.has(postId)) {
    state.favorites.delete(postId);
  } else {
    state.favorites.add(postId);
  }
  writeSet(siteConfig.storageKeys.favorites, state.favorites);
  renderFeatured();
  renderPosts();
  renderNavPanel(state.activeNavPanel);
  renderMobileHub();
  if (state.currentPostId === postId) updateDialogActions();
}

function randomPost() {
  const pool = filteredPosts();
  const target = pool[Math.floor(Math.random() * pool.length)] || posts[Math.floor(Math.random() * posts.length)];
  openPost(target.id);
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem(siteConfig.storageKeys.theme, theme);
  $("#themeToggle").innerHTML = `<i data-lucide="${theme === "dark" ? "sun" : "moon"}"></i>`;
  refreshIcons();
  renderNavPanel(state.activeNavPanel);
  renderMobileHub();
}

function initTheme() {
  const stored = localStorage.getItem(siteConfig.storageKeys.theme);
  const legacyStored = localStorage.getItem("theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(stored || legacyStored || (systemDark ? "dark" : "light"));
}

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollable <= 0 ? 0 : (window.scrollY / scrollable) * 100;
  document.documentElement.style.setProperty("--progress", `${progress}%`);
  $("#backToTop").classList.toggle("is-visible", window.scrollY > 360);
}

function updateHeroClock() {
  if (!els.heroClockTime || !els.heroClockDate) return;
  const now = new Date();
  const phase = getTimePhase(now.getHours());
  els.heroClockTime.textContent = new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
  const formattedDate = new Intl.DateTimeFormat("zh-CN", {
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  })
    .format(now)
    .replace(/\//g, ".");
  els.heroClockDate.textContent = formattedDate;
  els.dailyNoteDate.textContent = formattedDate;
  const dailyNotes = {
    morning: ["晨光初醒", "先整理思绪，再把今天最重要的一件事写下来。"],
    day: ["晴昼进行时", "专注解决眼前的问题，也给偶然冒出的灵感留个位置。"],
    dusk: ["晚霞收笔", "回看今天走过的路，把还没想清楚的部分留给明天。"],
    night: ["夜色正好", "把今天学到的东西，慢慢写成明天的路标。"],
  };
  const [notePhase, noteMessage] = dailyNotes[phase.key];
  els.dailyNotePhase.textContent = notePhase;
  els.dailyNoteMessage.textContent = noteMessage;
  applyTimePhase(phase.key);
}

function getTimePhase(hour) {
  if (hour >= 5 && hour < 11) {
    return { key: "morning" };
  }
  if (hour >= 11 && hour < 16) {
    return { key: "day" };
  }
  if (hour >= 16 && hour < 19) {
    return { key: "dusk" };
  }
  return { key: "night" };
}

function swapTimedImage(layers, asset, decorative = false) {
  if (!layers?.length) return;
  const current = layers.find((layer) => layer.classList.contains("is-active")) || layers[0];
  const currentSrc = new URL(current.getAttribute("src"), window.location.href).href;
  const targetSrc = new URL(asset.src, window.location.href).href;

  if (currentSrc === targetSrc) {
    if (!decorative) current.alt = asset.alt;
    return;
  }

  const next = layers.find((layer) => layer !== current) || current;
  const reveal = () => {
    next.classList.add("is-active");
    current.classList.remove("is-active");
  };

  next.alt = decorative ? "" : asset.alt;
  next.src = asset.src;
  if (next.complete) {
    window.requestAnimationFrame(reveal);
  } else {
    next.addEventListener("load", reveal, { once: true });
  }
}

function applyTimePhase(phaseKey) {
  if (activeTimePhase === phaseKey) return;
  const asset = timePhaseAssets[phaseKey];
  if (!asset) return;

  document.documentElement.dataset.timePhase = phaseKey;
  swapTimedImage(els.heroImages, asset);
  swapTimedImage(els.wallpaperImages, { src: asset.pageSrc }, true);
  activeTimePhase = phaseKey;
}

function describeWeather(code) {
  if (code === 0) return { type: "clear", label: "晴朗", icon: "sun" };
  if ([1, 2].includes(code)) return { type: "cloudy", label: "晴间多云", icon: "cloud-sun" };
  if (code === 3) return { type: "cloudy", label: "阴天", icon: "cloud" };
  if ([45, 48].includes(code)) return { type: "fog", label: "有雾", icon: "cloud-fog" };
  if ([51, 53, 55, 56, 57].includes(code)) return { type: "rain", label: "毛毛雨", icon: "cloud-drizzle" };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return { type: "rain", label: code >= 80 ? "阵雨" : "有雨", icon: "cloud-rain" };
  }
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { type: "snow", label: "降雪", icon: "snowflake" };
  if ([95, 96, 99].includes(code)) return { type: "thunder", label: "雷雨", icon: "cloud-lightning" };
  return { type: "cloudy", label: "天气变化中", icon: "cloud" };
}

function applyWeather(current) {
  const weather = describeWeather(Number(current.weather_code));
  const temperature = Math.round(Number(current.temperature_2m));
  els.weatherTemperature.textContent = `${temperature}°`;
  els.weatherSummary.textContent = weather.label;
  els.weatherUpdated.textContent = `更新于 ${new Intl.DateTimeFormat("zh-CN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date())}`;
  els.weatherFeelsLike.textContent = `${Math.round(Number(current.apparent_temperature))}°`;
  els.weatherHumidity.textContent = `${Math.round(Number(current.relative_humidity_2m))}%`;
  els.weatherWind.textContent = `${Math.round(Number(current.wind_speed_10m))} km/h`;
  els.weatherIcon?.setAttribute("data-lucide", weather.icon);
  refreshIcons();
}

async function updateWeather() {
  const params = new URLSearchParams({
    latitude: weatherConfig.latitude,
    longitude: weatherConfig.longitude,
    current:
      "temperature_2m,apparent_temperature,relative_humidity_2m,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m,is_day",
    timezone: "Asia/Shanghai",
  });

  try {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if (!response.ok) throw new Error(`Weather request failed: ${response.status}`);
    const data = await response.json();
    if (!data.current) throw new Error("Weather response has no current conditions.");
    applyWeather(data.current);
  } catch {
    els.weatherTemperature.textContent = "--°";
    els.weatherSummary.textContent = "天气暂不可用";
    els.weatherUpdated.textContent = "稍后自动重试";
  }
}

function updateMusicUI() {
  const track = musicPlaylist[state.musicTrackIndex];
  els.musicStatus.textContent = "Spotify 官方精选";
  els.musicTrack.textContent = `${track.title} · ${track.subtitle}`;
  if (els.musicPlaylist) els.musicPlaylist.value = track.id;
}

function renderMusicPlaylist() {
  if (!els.musicPlaylist) return;
  els.musicPlaylist.replaceChildren(
    ...musicPlaylist.map((track) => {
      const option = document.createElement("option");
      option.value = track.id;
      option.textContent = `${track.title} · ${track.subtitle}`;
      return option;
    }),
  );
  els.musicPlaylist.value = musicPlaylist[state.musicTrackIndex].id;
  const track = musicPlaylist[state.musicTrackIndex];
  els.musicEmbed.src = `https://open.spotify.com/embed/playlist/${track.id}?utm_source=generator&theme=0`;
  els.musicEmbed.title = `Spotify 歌单：${track.title}`;
  updateMusicUI();
}

function selectMusicTrack(index) {
  state.musicTrackIndex = (index + musicPlaylist.length) % musicPlaylist.length;
  const track = musicPlaylist[state.musicTrackIndex];
  localStorage.setItem(siteConfig.storageKeys.musicTrack, track.id);
  els.musicEmbed.src = `https://open.spotify.com/embed/playlist/${track.id}?utm_source=generator&theme=0`;
  els.musicEmbed.title = `Spotify 歌单：${track.title}`;
  updateMusicUI();
}

function formatLocalDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function renderCalendar() {
  if (!els.miniCalendar) return;
  const view = state.calendarDate;
  const year = view.getFullYear();
  const month = view.getMonth();
  const today = new Date();
  const firstDay = new Date(year, month, 1);
  const mondayOffset = (firstDay.getDay() + 6) % 7;
  const startDate = new Date(year, month, 1 - mondayOffset);
  const postsByDate = new Map();

  posts.forEach((post) => {
    if (!postsByDate.has(post.date)) postsByDate.set(post.date, []);
    postsByDate.get(post.date).push(post);
  });

  els.calendarTitle.textContent = `${year}年${month + 1}月`;
  els.calendarToday.textContent = new Intl.DateTimeFormat("zh-CN", {
    month: "long",
    day: "numeric",
    weekday: "short",
  }).format(today);

  const weekdays = ["一", "二", "三", "四", "五", "六", "日"].map((label) => {
    const span = document.createElement("span");
    span.textContent = label;
    return span;
  });

  const days = Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const iso = formatLocalDate(date);
    const dayPosts = postsByDate.get(iso) || [];
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = String(date.getDate());
    button.dataset.calendarDate = iso;
    button.classList.toggle("is-muted", date.getMonth() !== month);
    button.classList.toggle("is-today", iso === formatLocalDate(today));
    button.classList.toggle("has-post", dayPosts.length > 0);
    button.classList.toggle("is-active", dayPosts.length > 0);
    button.disabled = dayPosts.length === 0;
    button.title = dayPosts.length
      ? `${iso}：${dayPosts.map((post) => post.title).join("、")}`
      : iso;
    if (dayPosts.length) button.dataset.postId = dayPosts[0].id;
    return button;
  });

  els.miniCalendar.replaceChildren(...weekdays, ...days);
}

function shiftCalendarMonth(offset) {
  state.calendarDate = new Date(
    state.calendarDate.getFullYear(),
    state.calendarDate.getMonth() + offset,
    1,
  );
  renderCalendar();
}

function savePet() {
  state.pet.updatedAt = Date.now();
  localStorage.setItem(siteConfig.storageKeys.pet, JSON.stringify(state.pet));
}

function petLevel() {
  return Math.floor(state.pet.exp / 50) + 1;
}

function setPetSpeech(message) {
  if (els.petSpeech) els.petSpeech.textContent = message;
}

const petFramePaths = {
  idle: "assets/pet/frames/idle.png",
  walk: "assets/pet/frames/walk-right.png",
  wave: "assets/pet/frames/wave.png",
  jump: "assets/pet/frames/jump.png",
  fail: "assets/pet/frames/fail.png",
  wait: "assets/pet/frames/wait.png",
  sprint: "assets/pet/frames/sprint.png",
  review: "assets/pet/frames/review.png",
};

function setPetVisualState(name, duration = 0) {
  if (!els.petSprite || !petFramePaths[name]) return;
  window.clearTimeout(petVisualTimer);
  if (els.pixelPet.dataset.petState !== name) {
    els.petSprite.src = petFramePaths[name];
  }
  els.pixelPet.dataset.petState = name;
  if (duration) {
    petVisualTimer = window.setTimeout(() => setPetVisualState("idle"), duration);
  }
}

function preloadPetFrames() {
  Object.values(petFramePaths).forEach((src) => {
    const image = new Image();
    image.src = src;
  });
}

function readPetPosition() {
  return readObject(siteConfig.storageKeys.petPosition, null);
}

function clampPetPosition(left, top) {
  const margin = 10;
  const rect = els.petWidget.getBoundingClientRect();
  return {
    left: Math.max(margin, Math.min(left, window.innerWidth - rect.width - margin)),
    top: Math.max(margin, Math.min(top, window.innerHeight - rect.height - margin)),
  };
}

function placePet(left, top, persist = false) {
  if (!els.petWidget) return;
  const position = clampPetPosition(left, top);
  els.petWidget.style.left = `${position.left}px`;
  els.petWidget.style.top = `${position.top}px`;
  els.petWidget.style.right = "auto";
  els.petWidget.style.bottom = "auto";
  if (persist) {
    localStorage.setItem(siteConfig.storageKeys.petPosition, JSON.stringify(position));
  }
}

function restorePetPosition() {
  if (!els.petWidget) return;
  const saved = readPetPosition();
  if (saved && Number.isFinite(saved.left) && Number.isFinite(saved.top)) {
    placePet(saved.left, saved.top);
    return;
  }
  const rect = els.petWidget.getBoundingClientRect();
  placePet(18, window.innerHeight - rect.height - 18);
}

function initPetDragging() {
  if (!els.petWidget || !els.pixelPet) return;
  let drag = null;
  let suppressPetClick = false;

  const beginDrag = (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    const rect = els.petWidget.getBoundingClientRect();
    drag = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top,
      startX: event.clientX,
      startY: event.clientY,
      lastX: event.clientX,
      lastY: event.clientY,
      moved: false,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
    els.petWidget.classList.add("is-dragging");
    document.body.classList.add("is-pet-dragging");
    event.preventDefault();
  };

  const moveDrag = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    if (event.clientX === 0 && event.clientY === 0 && drag.moved) return;
    const distance = Math.hypot(event.clientX - drag.startX, event.clientY - drag.startY);
    if (distance > 5) {
      drag.moved = true;
      const horizontalDelta = event.clientX - drag.lastX;
      if (Math.abs(horizontalDelta) > 1.5) {
        els.pixelPet.classList.toggle("is-facing-left", horizontalDelta < 0);
      }
      setPetVisualState("walk");
    }
    drag.lastX = event.clientX;
    drag.lastY = event.clientY;
    placePet(event.clientX - drag.offsetX, event.clientY - drag.offsetY);
  };

  const endDrag = (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const wasMoved = drag.moved;
    drag = null;
    els.petWidget.classList.remove("is-dragging");
    document.body.classList.remove("is-pet-dragging");
    const rect = els.petWidget.getBoundingClientRect();
    placePet(rect.left, rect.top, true);
    if (wasMoved) {
      suppressPetClick = true;
      setPetVisualState("idle");
      window.setTimeout(() => {
        suppressPetClick = false;
      }, 120);
    }
  };

  els.pixelPet.addEventListener("pointerdown", beginDrag);
  window.addEventListener("pointermove", moveDrag, { passive: true });
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);
  window.addEventListener("resize", () => {
    const rect = els.petWidget.getBoundingClientRect();
    placePet(rect.left, rect.top, true);
  });

  els.pixelPet.addEventListener(
    "click",
    (event) => {
      if (!suppressPetClick) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    },
    true,
  );
}

function renderPet() {
  if (!els.pixelPet) return;
  state.pet.mood = Math.max(0, Math.min(100, Math.round(state.pet.mood)));
  state.pet.energy = Math.max(0, Math.min(100, Math.round(state.pet.energy)));
  if (els.petMood) els.petMood.textContent = `心情 ${state.pet.mood}`;
  if (els.petEnergy) els.petEnergy.textContent = `体力 ${state.pet.energy}`;
  if (els.petLevel) els.petLevel.textContent = `Lv.${petLevel()}`;
}

function interactWithPet(action) {
  const messages = {
    feed: ["饱啦！代码也要一口一口写。", "曲奇补充完毕，体力上涨！"],
    play: ["冲呀！去随机读一篇文章。", "跳跃成功，获得一点经验。"],
    rest: ["进入省电模式，稍后再战。", "休息一下，灵感会自己走过来。"],
    greet: ["我在这里陪你写博客。", "今天的页面也很漂亮。", "点点下面的按钮和我互动吧。"],
  };

  if (action === "feed") {
    state.pet.energy += 13;
    state.pet.mood += 5;
    state.pet.exp += 8;
  } else if (action === "play") {
    state.pet.energy -= 9;
    state.pet.mood += 14;
    state.pet.exp += 12;
    setPetVisualState("jump", 900);
  } else if (action === "rest") {
    state.pet.energy += 18;
    state.pet.mood += 2;
    state.pet.exp += 5;
  } else {
    state.pet.mood += 2;
    state.pet.exp += 1;
    setPetVisualState("wave", 900);
  }

  const pool = messages[action] || messages.greet;
  setPetSpeech(pool[Math.floor(Math.random() * pool.length)]);
  renderPet();
  savePet();
}

function initPet() {
  if (!els.petWidget) return;
  const elapsedHours = Math.max(0, (Date.now() - Number(state.pet.updatedAt || Date.now())) / 3600000);
  state.pet.energy -= Math.min(24, elapsedHours * 1.2);
  state.pet.mood -= Math.min(18, elapsedHours * 0.8);
  els.petWidget.classList.remove("is-collapsed");
  renderPet();
  preloadPetFrames();
  setPetVisualState(state.pet.energy <= 15 ? "fail" : "idle");
  savePet();
  requestAnimationFrame(restorePetPosition);

  window.clearInterval(petSpeechTimer);
  petSpeechTimer = window.setInterval(() => {
    if (els.petWidget.classList.contains("is-dragging")) return;
    const states = state.pet.energy <= 15 ? ["fail", "wait"] : ["idle", "wait", "review"];
    setPetVisualState(states[Math.floor(Math.random() * states.length)], 2600);
  }, 9000);
}

function refreshIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function openPalette() {
  if (els.dialog.open) els.dialog.close();
  if (!els.searchPalette.open) {
    els.searchPalette.showModal();
  }
  els.paletteSearch.value = state.query;
  renderPalette();
  requestAnimationFrame(() => els.paletteSearch.focus());
  animateDialog(els.searchPalette);
}

function renderPalette() {
  const query = els.paletteSearch.value.trim().toLowerCase();
  const results = posts
    .filter((post) => {
      if (!query) return true;
      const haystack = [post.title, post.summary, post.category, ...post.tags].join(" ").toLowerCase();
      return haystack.includes(query);
    })
    .slice(0, 8);

  els.paletteResults.replaceChildren(
    ...results.map((post) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "palette-result";
      button.dataset.paletteId = post.id;
      button.innerHTML = `
        <strong>${escapeHTML(post.title)}</strong>
        <small>${post.date} / ${escapeHTML(post.category)} / ${post.tags.map(escapeHTML).join("、")}</small>
      `;
      return button;
    }),
  );

  if (results.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = "没有找到匹配内容。";
    els.paletteResults.replaceChildren(empty);
  }
}

function closeMobileMenu() {
  if (!state.menuOpen) return;
  state.menuOpen = false;
  els.mobileMenuToggle.setAttribute("aria-expanded", "false");
  els.mobileMenuToggle.innerHTML = `<i data-lucide="menu"></i>`;
  refreshIcons();

  if (window.gsap) {
    gsap.to(els.mobileDrawer, {
      autoAlpha: 0,
      y: -8,
      scale: 0.98,
      duration: 0.18,
      ease: "power2.in",
      onComplete: () => {
        els.mobileDrawer.hidden = true;
      },
    });
  } else {
    els.mobileDrawer.hidden = true;
  }
}

function openMobileMenu() {
  state.menuOpen = true;
  els.mobileDrawer.hidden = false;
  els.mobileMenuToggle.setAttribute("aria-expanded", "true");
  els.mobileMenuToggle.innerHTML = `<i data-lucide="x"></i>`;
  refreshIcons();

  if (window.gsap) {
    gsap.fromTo(
      els.mobileDrawer,
      { autoAlpha: 0, y: -12, scale: 0.98 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.24, ease: "power3.out" },
    );
  }
}

function toggleMobileMenu() {
  if (state.menuOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
}

function updateNavExpansion(panel = null, trigger = null) {
  state.navTrigger = trigger;
  $$(".main-nav .nav-expander").forEach((button) => {
    const isExpanded = Boolean(trigger && button === trigger && button.dataset.navMenu === panel);
    button.setAttribute("aria-expanded", String(isExpanded));
    button.closest(".nav-item")?.classList.toggle("is-expanded", isExpanded);
  });
}

function openNavMega(panel = state.activeNavPanel, trigger = null) {
  if (window.innerWidth < 1101 || !els.navMega) return;
  closeMobileMenu();
  state.navMegaOpen = true;
  els.navMega.hidden = false;
  els.navShield.hidden = false;
  renderNavPanel(panel);
  updateNavExpansion(panel, trigger);
  moveNavIndicator(trigger?.closest(".nav-item") || $(".main-nav .nav-item.is-active"));

  if (window.gsap) {
    gsap.fromTo(
      els.navMega,
      { autoAlpha: 0, y: -14, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.24, ease: "power3.out", overwrite: true },
    );
    gsap.fromTo(els.navShield, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.18, overwrite: true });
  }
}

function closeNavMega() {
  if (!state.navMegaOpen || !els.navMega) return;
  state.navMegaOpen = false;
  updateNavExpansion();
  moveNavIndicator($(".main-nav .nav-item.is-active") || $(".main-nav a.is-active"));

  if (window.gsap) {
    gsap.to(els.navMega, {
      autoAlpha: 0,
      y: -8,
      scale: 0.985,
      duration: 0.18,
      ease: "power2.in",
      overwrite: true,
      onComplete: () => {
        els.navMega.hidden = true;
      },
    });
    gsap.to(els.navShield, {
      autoAlpha: 0,
      duration: 0.16,
      overwrite: true,
      onComplete: () => {
        els.navShield.hidden = true;
      },
    });
  } else {
    els.navMega.hidden = true;
    els.navShield.hidden = true;
  }
}

function setAccent(accent) {
  state.accent = accent;
  document.documentElement.dataset.accent = accent;
  localStorage.setItem(siteConfig.storageKeys.accent, accent);
  renderNavPanel(state.activeNavPanel);
  renderMobileHub();
}

function setLayout(layout) {
  state.layout = layout;
  localStorage.setItem(siteConfig.storageKeys.layout, state.layout);
  $$(".segment").forEach((item) => item.classList.toggle("is-active", item.dataset.layout === layout));
  renderPosts();
  renderNavPanel(state.activeNavPanel);
  renderMobileHub();
}

function setSort(sort) {
  state.sort = sort;
  els.sortSelect.value = sort;
  renderPosts();
  renderNavPanel(state.activeNavPanel);
  renderMobileHub();
}

function scrollToTarget(selector) {
  document.querySelector(selector)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleNavAction(action) {
  const actionMap = {
    search: () => openPalette(),
    random: () => randomPost(),
    theme: () => setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark"),
    "sort-liked": () => setSort("liked"),
    "sort-popular": () => setSort("popular"),
    guestbook: () => scrollToTarget("#guestbook"),
    top: () => window.scrollTo({ top: 0, behavior: "smooth" }),
    about: () => scrollToTarget("#about"),
    archive: () => scrollToTarget("#archive-section"),
    links: () => scrollToTarget("#links"),
    github: () => window.open("https://github.com/yifan-tech", "_blank", "noopener,noreferrer"),
  };

  actionMap[action]?.();
  if (!["theme", "sort-liked", "sort-popular"].includes(action)) {
    closeNavMega();
    closeMobileMenu();
  }
  renderNavPanel(state.activeNavPanel);
  renderMobileHub();
}

function setActiveNav(sectionId) {
  const links = $$("[data-nav-link][data-section]");
  links.forEach((link) => {
    const isActive = link.dataset.section === sectionId;
    link.classList.toggle("is-active", isActive);
    link.closest(".nav-item")?.classList.toggle("is-active", isActive);
  });
  const active = links.find((link) => link.dataset.section === sectionId) || links[0];
  moveNavIndicator(active?.closest(".nav-item") || active);
}

function moveNavIndicator(target) {
  if (!target || !els.navIndicator || target.offsetParent === null) return;
  const navRect = target.parentElement.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  const vars = {
    x: rect.left - navRect.left,
    width: rect.width,
    autoAlpha: 1,
    duration: 0.28,
    ease: "power3.out",
  };

  if (window.gsap) {
    gsap.to(els.navIndicator, vars);
  } else {
    els.navIndicator.style.opacity = "1";
    els.navIndicator.style.transform = `translateX(${vars.x}px)`;
    els.navIndicator.style.width = `${vars.width}px`;
  }
}

function initNavObserver() {
  const sectionIds = ["posts", "topics", "archive-section", "guestbook", "links", "about"];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveNav(visible.target.id);
    },
    { rootMargin: "-28% 0px -58% 0px", threshold: [0.1, 0.35, 0.65] },
  );

  sections.forEach((section) => observer.observe(section));
  setActiveNav("posts");
}

function animatePostCards() {
  if (!window.gsap || !state.animationsReady) return;
  gsap.fromTo(
    ".post-card",
    { autoAlpha: 0, y: 18 },
    { autoAlpha: 1, y: 0, duration: 0.38, stagger: 0.045, ease: "power2.out", overwrite: true },
  );
}

function animateDialog(dialog) {
  if (!window.gsap) return;
  const card = dialog.querySelector("article, .palette-card");
  gsap.fromTo(card, { autoAlpha: 0, y: 20, scale: 0.98 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.28, ease: "power3.out" });
}

function refreshScrollTriggers() {
  if (window.ScrollTrigger) {
    window.ScrollTrigger.refresh();
  }
}

function initAnimations() {
  if (!window.gsap) return;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) return;

  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  gsap.defaults({ ease: "power3.out", duration: 0.6 });

  const intro = gsap.timeline();
  intro
    .from(".brand", { autoAlpha: 0, y: -12, duration: 0.42 })
    .from(".main-nav", { autoAlpha: 0, y: -12, duration: 0.42 }, "<0.08")
    .from(".header-actions", { autoAlpha: 0, duration: 0.34 }, "<")
    .from(".hero-note-card, .hero-weather-card", { autoAlpha: 0, y: -14, stagger: 0.08, duration: 0.46 }, "<0.06")
    .from(".hero .kicker, .hero-time-layer, .hero h1, .hero-copy, .hero-actions > *", { autoAlpha: 0, y: 32, stagger: 0.08 }, "-=0.15")
    .from(".hero-dock > div", { autoAlpha: 0, y: 20, stagger: 0.07 }, "-=0.3")
    .from(".quick-card", { autoAlpha: 0, y: 22, stagger: 0.045, duration: 0.38, immediateRender: false }, "-=0.62");

  gsap.to(".floating-note", {
    y: (index) => [-12, 16, -9][index] || 10,
    rotation: (index) => [-3, 4, 2][index] || 2,
    repeat: -1,
    yoyo: true,
    duration: 2.4,
    stagger: 0.3,
    ease: "sine.inOut",
  });

  if (window.ScrollTrigger) {
    gsap.to(".hero-image", {
      yPercent: 10,
      scale: 1.06,
      ease: "none",
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom top",
        scrub: 1,
      },
    });

    const revealTargets = gsap.utils.toArray(
      ".panel, .featured-post, .post-card, .topic-card, .archive-item, .guest-form, .message-card",
    );
    ScrollTrigger.batch(revealTargets, {
      start: "top 88%",
      once: true,
      onEnter: (batch) => {
        gsap.fromTo(
          batch,
          { autoAlpha: 0, y: 28 },
          { autoAlpha: 1, y: 0, duration: 0.62, stagger: 0.06, overwrite: true },
        );
      },
    });
  }

  state.animationsReady = true;
}

function bindEvents() {
  document.addEventListener("click", (event) => {
    const actionButton = event.target.closest("[data-action][data-post-id]");
    if (actionButton) {
      const postId = actionButton.dataset.postId;
      if (actionButton.dataset.action === "like") toggleLike(postId);
      if (actionButton.dataset.action === "bookmark") toggleBookmark(postId);
      return;
    }

    const tagButton = event.target.closest("[data-tag]");
    if (tagButton) {
      setTag(tagButton.dataset.tag);
      return;
    }

    const topicCard = event.target.closest("[data-topic-tag]");
    if (topicCard) {
      setTag(topicCard.dataset.topicTag);
      return;
    }

    const navPanelButton = event.target.closest("[data-nav-panel]");
    if (navPanelButton) {
      renderNavPanel(navPanelButton.dataset.navPanel);
      return;
    }

    const navTagButton = event.target.closest("[data-nav-tag]");
    if (navTagButton) {
      setTag(navTagButton.dataset.navTag);
      return;
    }

    const navCategoryButton = event.target.closest("[data-nav-category]");
    if (navCategoryButton) {
      state.tag = siteConfig.defaultTag;
      state.query = navCategoryButton.dataset.navCategory;
      els.searchInput.value = state.query;
      refreshActiveTags();
      renderPosts();
      closeNavMega();
      closeMobileMenu();
      scrollToTarget("#posts");
      return;
    }

    const navMonthButton = event.target.closest("[data-nav-month]");
    if (navMonthButton) {
      closeNavMega();
      scrollToTarget("#archive-section");
      return;
    }

    const navLayoutButton = event.target.closest("[data-nav-layout]");
    if (navLayoutButton) {
      setLayout(navLayoutButton.dataset.navLayout);
      return;
    }

    const navSortButton = event.target.closest("[data-nav-sort]");
    if (navSortButton) {
      setSort(navSortButton.dataset.navSort);
      return;
    }

    const navAccentButton = event.target.closest("[data-nav-accent]");
    if (navAccentButton) {
      setAccent(navAccentButton.dataset.navAccent);
      return;
    }

    const navActionButton = event.target.closest("[data-nav-action]");
    if (navActionButton) {
      handleNavAction(navActionButton.dataset.navAction);
      return;
    }

    const quickCard = event.target.closest("[data-quick-target]");
    if (quickCard) {
      document.querySelector(quickCard.dataset.quickTarget)?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    const readButton = event.target.closest("[data-post-id]");
    if (readButton) {
      closeNavMega();
      closeMobileMenu();
      openPost(readButton.dataset.postId);
      return;
    }

    const paletteResult = event.target.closest("[data-palette-id]");
    if (paletteResult) {
      els.searchPalette.close();
      openPost(paletteResult.dataset.paletteId);
    }
  });

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderPosts();
  });

  els.sortSelect.addEventListener("change", (event) => {
    setSort(event.target.value);
  });

  $$(".segment").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.layout === state.layout);
    button.addEventListener("click", () => {
      setLayout(button.dataset.layout);
    });
  });

  $("#themeToggle").addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
  });

  $("#searchOpen").addEventListener("click", openPalette);
  $("#heroSearch").addEventListener("click", openPalette);
  $("#drawerSearch").addEventListener("click", () => {
    closeMobileMenu();
    openPalette();
  });
  $("#randomPost").addEventListener("click", randomPost);
  $("#heroRandom").addEventListener("click", randomPost);
  $("#drawerRandom").addEventListener("click", () => {
    closeMobileMenu();
    randomPost();
  });
  els.mobileMenuToggle.addEventListener("click", toggleMobileMenu);
  $$("[data-mobile-link]").forEach((link) => link.addEventListener("click", closeMobileMenu));
  if (els.navMega) {
    $$(".main-nav .nav-anchor").forEach((link) => {
      link.addEventListener("click", closeNavMega);
    });
    $$(".main-nav .nav-expander").forEach((button) => {
      button.setAttribute("aria-expanded", "false");
      button.addEventListener("click", (event) => {
        if (window.innerWidth < 1101) return;
        event.preventDefault();
        event.stopPropagation();
        const isSameTrigger = state.navMegaOpen && state.navTrigger === button;
        if (isSameTrigger) {
          closeNavMega();
        } else {
          openNavMega(button.dataset.navMenu, button);
        }
      });
    });
    els.navMegaClose?.addEventListener("click", closeNavMega);
    els.navShield?.addEventListener("click", closeNavMega);
  }

  els.musicPlaylist?.addEventListener("change", (event) => {
    const index = musicPlaylist.findIndex((track) => track.id === event.target.value);
    if (index >= 0) selectMusicTrack(index);
  });
  els.calendarPrev?.addEventListener("click", () => shiftCalendarMonth(-1));
  els.calendarNext?.addEventListener("click", () => shiftCalendarMonth(1));
  els.calendarReset?.addEventListener("click", () => {
    state.calendarDate = new Date();
    renderCalendar();
  });
  els.pixelPet?.addEventListener("click", () => {
    interactWithPet("greet");
  });
  els.pixelPet?.addEventListener("dblclick", () => {
    state.pet.mood += 4;
    state.pet.energy -= 2;
    state.pet.exp += 4;
    setPetVisualState("jump", 900);
    renderPet();
    savePet();
  });
  $$("[data-pet-action]").forEach((button) => {
    button.addEventListener("click", () => interactWithPet(button.dataset.petAction));
  });
  initPetDragging();

  $("#backToTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  $("#dialogClose").addEventListener("click", () => els.dialog.close());
  els.dialog.addEventListener("click", (event) => {
    if (event.target === els.dialog) els.dialog.close();
  });
  els.searchPalette.addEventListener("click", (event) => {
    if (event.target === els.searchPalette) els.searchPalette.close();
  });
  els.paletteSearch.addEventListener("input", renderPalette);

  $("#dialogLike").addEventListener("click", () => {
    if (state.currentPostId) toggleLike(state.currentPostId);
  });
  $("#dialogBookmark").addEventListener("click", () => {
    if (state.currentPostId) toggleBookmark(state.currentPostId);
  });
  $("#fontMinus").addEventListener("click", () => setReaderScale(Math.max(0.9, state.readerScale - 0.08)));
  $("#fontPlus").addEventListener("click", () => setReaderScale(Math.min(1.28, state.readerScale + 0.08)));

  els.guestForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("#guestName").value.trim() || "路过的读者";
    const message = $("#guestMessage").value.trim();
    if (!message) return;
    const messages = readMessages();
    messages.unshift({
      name,
      message,
      time: new Date().toISOString().slice(0, 10),
    });
    writeMessages(messages.slice(0, 6));
    els.guestForm.reset();
    renderMessages();
    refreshIcons();
    refreshScrollTriggers();
  });

  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", () => {
    updateProgress();
    const active = $(".main-nav .nav-item.is-expanded") || $(".main-nav .nav-item.is-active") || $(".main-nav a.is-active");
    moveNavIndicator(active);
  });

  document.addEventListener("keydown", (event) => {
    const isTyping = ["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement?.tagName);
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openPalette();
    }
    if (!isTyping && event.key === "/") {
      event.preventDefault();
      openPalette();
    }
    if (event.key === "Escape") {
      closeMobileMenu();
      closeNavMega();
    }
  });
}

function setReaderScale(value) {
  state.readerScale = Number(value.toFixed(2));
  localStorage.setItem(siteConfig.storageKeys.readerScale, String(state.readerScale));
  els.dialogBody.style.setProperty("--reader-scale", state.readerScale);
}

function init() {
  cacheElements();
  document.documentElement.dataset.accent = state.accent;
  els.sortSelect.value = state.sort;
  initTheme();
  renderStats();
  renderHeatmap();
  renderFilters();
  renderFeatured();
  renderPosts();
  renderTopics();
  renderArchive();
  renderMessages();
  renderCalendar();
  renderMusicPlaylist();
  initPet();
  renderNavPanel(state.activeNavPanel);
  renderMobileHub();
  bindEvents();
  initNavObserver();
  updateProgress();
  updateHeroClock();
  window.setInterval(updateHeroClock, 1000);
  updateWeather();
  window.clearInterval(weatherRefreshTimer);
  weatherRefreshTimer = window.setInterval(updateWeather, weatherConfig.refreshMs);
  refreshIcons();
  initAnimations();
  refreshScrollTriggers();
}

document.addEventListener("DOMContentLoaded", init);
