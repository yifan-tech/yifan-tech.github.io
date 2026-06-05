const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const appPath = path.join(root, "assets", "app.js");
const postsDir = path.join(root, "posts");

function extractConstArray(source, name) {
  const marker = `const ${name} = [`;
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Cannot find ${marker}`);

  const arrayStart = source.indexOf("[", start);
  let depth = 0;
  let quote = "";
  let escaped = false;
  let lineComment = false;
  let blockComment = false;

  for (let index = arrayStart; index < source.length; index += 1) {
    const char = source[index];
    const next = source[index + 1];

    if (lineComment) {
      if (char === "\n") lineComment = false;
      continue;
    }

    if (blockComment) {
      if (char === "*" && next === "/") {
        blockComment = false;
        index += 1;
      }
      continue;
    }

    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }

    if (char === "/" && next === "/") {
      lineComment = true;
      index += 1;
      continue;
    }

    if (char === "/" && next === "*") {
      blockComment = true;
      index += 1;
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      quote = char;
      continue;
    }

    if (char === "[") depth += 1;
    if (char === "]") {
      depth -= 1;
      if (depth === 0) return source.slice(arrayStart, index + 1);
    }
  }

  throw new Error(`Cannot parse ${name}`);
}

function readData() {
  const source = fs.readFileSync(appPath, "utf8");
  const postsCode = extractConstArray(source, "posts");
  const topicsCode = extractConstArray(source, "topicData");
  const sandbox = {};
  vm.createContext(sandbox);
  vm.runInContext(`posts = ${postsCode}; topicData = ${topicsCode};`, sandbox);
  return { posts: sandbox.posts, topicData: sandbox.topicData };
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

function pagePath(post) {
  return `${post.id}.html`;
}

function sourceBlock(post) {
  if (!post.source?.name || !post.source?.url) return "";
  return `
          <aside class="source-note static-source">
            <span>${post.repost ? "转载来源" : "参考来源"}</span>
            <a href="${escapeHTML(post.source.url)}" target="_blank" rel="noreferrer">
              ${escapeHTML(post.source.name)}
              <i data-lucide="external-link"></i>
            </a>
          </aside>`;
}

function articleHTML(post, previous, next) {
  const tags = post.tags.map((tag) => `<span class="post-tag">${escapeHTML(tag)}</span>`).join("");
  const body = post.body.map((paragraph) => `<p>${escapeHTML(paragraph)}</p>`).join("\n          ");
  const previousLink = previous
    ? `<a href="${pagePath(previous)}"><small>上一篇</small><strong>${escapeHTML(previous.title)}</strong></a>`
    : `<span><small>上一篇</small><strong>已经是最新一篇</strong></span>`;
  const nextLink = next
    ? `<a href="${pagePath(next)}"><small>下一篇</small><strong>${escapeHTML(next.title)}</strong></a>`
    : `<span><small>下一篇</small><strong>已经是最后一篇</strong></span>`;

  return `<!doctype html>
<html lang="zh-CN" data-theme="dark" data-wallpaper="banner">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="${escapeHTML(post.summary)}" />
    <title>${escapeHTML(post.title)} - 凌云客栈</title>
    <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="../assets/styles.css" />
    <link rel="stylesheet" href="../assets/anime.css" />
    <script>
      document.documentElement.dataset.theme = localStorage.getItem("blogTheme") || "dark";
      document.documentElement.dataset.wallpaper = localStorage.getItem("wallpaperMode") || "banner";
      document.documentElement.dataset.accent = localStorage.getItem("blogAccent") || "rose";
    </script>
    <script defer src="../assets/lucide.min.js"></script>
  </head>
  <body class="static-post-page">
    <div class="wallpaper-stage" aria-hidden="true">
      <img src="../assets/hero-anime.png" alt="" />
      <div class="wallpaper-veil"></div>
    </div>
    <div class="sakura-field" aria-hidden="true">
      <span></span><span></span><span></span><span></span>
      <span></span><span></span><span></span><span></span>
    </div>

    <header class="site-header static-header">
      <a class="brand" href="../index.html">
          <span class="brand-mark">L</span>
          <span class="brand-copy">
          <strong>凌云客栈</strong>
          <small>lingyun inn</small>
        </span>
      </a>
      <nav class="article-nav" aria-label="文章页导航">
        <a href="../index.html#posts">文章</a>
        <a href="../index.html#topics">专题</a>
        <a href="../index.html#archive-section">归档</a>
        <a href="../index.html#about">关于</a>
      </nav>
    </header>

    <main class="article-shell">
      <article class="article-page-card">
        <a class="article-back" href="../index.html#posts">
          <i data-lucide="arrow-left"></i>
          返回首页
        </a>
        <p class="eyebrow">${escapeHTML(post.category)} / ${escapeHTML(post.date)}</p>
        <h1>${escapeHTML(post.title)}</h1>
        <p class="article-summary">${escapeHTML(post.summary)}</p>
        <div class="post-meta-line article-meta">
          <span>${escapeHTML(post.readTime)}</span>
          <span>${post.words.toLocaleString()} 字</span>
          <span>${post.views.toLocaleString()} 浏览</span>
          ${post.repost ? "<span>转载推荐</span>" : "<span>原创笔记</span>"}
        </div>
        <div class="post-tags article-tags">${tags}</div>
        <div class="article-body">
          ${body}
          ${sourceBlock(post)}
          <blockquote>把还没完全想清楚的事写下来，常常就是想清楚的开始。</blockquote>
        </div>
      </article>

      <nav class="article-neighbor" aria-label="文章上一篇下一篇">
        ${previousLink}
        ${nextLink}
      </nav>
    </main>

    <script>
      document.addEventListener("DOMContentLoaded", () => window.lucide?.createIcons());
    </script>
  </body>
</html>
`;
}

function postsIndexHTML(posts) {
  const cards = posts
    .map(
      (post) => `
        <a class="post-card static-post-link" href="${pagePath(post)}">
          <div class="post-main">
            <div class="post-meta-line">
              <span>${escapeHTML(post.date)}</span>
              <span>${escapeHTML(post.category)}</span>
              <span>${escapeHTML(post.readTime)}</span>
            </div>
            <h3>${escapeHTML(post.title)}</h3>
            <p class="post-summary">${escapeHTML(post.summary)}</p>
            <div class="post-tags">${post.tags.map((tag) => `<span class="post-tag">${escapeHTML(tag)}</span>`).join("")}</div>
          </div>
        </a>`,
    )
    .join("");

  return `<!doctype html>
<html lang="zh-CN" data-theme="dark" data-wallpaper="banner">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>文章列表 - 凌云客栈</title>
    <link rel="icon" href="../assets/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="../assets/styles.css" />
    <link rel="stylesheet" href="../assets/anime.css" />
    <script>
      document.documentElement.dataset.theme = localStorage.getItem("blogTheme") || "dark";
      document.documentElement.dataset.wallpaper = localStorage.getItem("wallpaperMode") || "banner";
      document.documentElement.dataset.accent = localStorage.getItem("blogAccent") || "rose";
    </script>
  </head>
  <body class="static-post-page">
    <div class="wallpaper-stage" aria-hidden="true">
      <img src="../assets/hero-anime.png" alt="" />
      <div class="wallpaper-veil"></div>
    </div>
    <header class="site-header static-header">
      <a class="brand" href="../index.html"><span class="brand-mark">L</span><span class="brand-copy"><strong>凌云客栈</strong><small>lingyun inn</small></span></a>
      <nav class="article-nav" aria-label="文章列表导航">
        <a href="../index.html">首页</a>
        <a href="../index.html#topics">专题</a>
        <a href="../index.html#about">关于</a>
      </nav>
    </header>
    <main class="article-shell">
      <section class="section-head static-list-head">
        <p class="eyebrow">All Posts</p>
        <h1>全部文章</h1>
        <p>这里是纯静态生成的文章列表，共 ${posts.length} 篇。</p>
      </section>
      <section class="post-list grid-mode static-post-grid">${cards}</section>
    </main>
  </body>
</html>
`;
}

function main() {
  const { posts } = readData();
  const sortedPosts = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
  fs.mkdirSync(postsDir, { recursive: true });

  sortedPosts.forEach((post, index) => {
    fs.writeFileSync(
      path.join(postsDir, pagePath(post)),
      articleHTML(post, sortedPosts[index - 1], sortedPosts[index + 1]),
      "utf8",
    );
  });

  fs.writeFileSync(path.join(postsDir, "index.html"), postsIndexHTML(sortedPosts), "utf8");
  console.log(`Generated ${sortedPosts.length} post pages in ${path.relative(root, postsDir)}`);
}

main();
