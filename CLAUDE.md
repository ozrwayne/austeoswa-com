# austeoswa.com — 项目说明

## 新闻稿写作

写、改、发布本站的新闻/公告/活动稿时，**使用 skill `news-writing`**（`.claude/skills/news-writing/SKILL.md`），里面是去 AI 味的完整规则。

## 部署架构（避免踩坑）

**真正部署的是 `/app/` 目录里的 Vite React SPA**，不是仓库根目录里的 `/new/`、`/assets/`、`sitemap.xml`。根目录那些是老旧文件，改了不进部署。

新闻文章通过 `/news/<id>` 路由发布，需要同时改：

1. `app/src/atya.jsx`
   - `articleImages` 加图 key
   - `articles` 数组追加 `{ id, category, date, image, title, summary, source }`
   - `originalArticlePages["<id>"]` 加正文（intro + sections）
   - `newsItems` 首位插入 `articles[N]`（保证首页优先）
   - `routeTitles` 加 `/news/<id>`
   - `titleFor()` 加分支
   - `App()` 加路由 `path === "/news/<id>" && <OriginalArticlePage .../>`

2. `app/scripts/write-atya-routes.mjs`
   - `routes` 加 `/news/<id>` 条目
   - `routeJsonLd["/news/<id>"]` 加 NewsArticle JSON-LD
   - `/news` 的 `ItemList` 追加
   - 若引用 `app/public/assets/xxx` 里的图片，加到 `publicWhitelist`

3. `app/public/assets/` 放实际图片文件

4. 本地 `cd app && npm run build` 验证：`dist/news/<id>/index.html` 生成 = 成功

5. 只 `git add` 上面 4 类文件，别夹带用户其他 unrelated 修改。commit + push，GitHub Pages 工作流（`.github/workflows/deploy-pages.yml`）自动构建部署。

**JSX 陷阱**：字符串里所有中文左右引号 `"…"` 要写成 `\"…\"`，否则 esbuild 会把它当 JS 字符串终止符报错。
