import { access, readFile, readdir, stat } from "node:fs/promises";
import { constants } from "node:fs";

const routes = [
  "/",
  "/about",
  "/organization",
  "/news",
  "/news/1",
  "/news/2",
  "/news/3",
  "/news/4",
  "/news/5",
  "/news/6",
  "/new",
  "/new/1",
  "/new/2",
  "/new/letter-to-grandma-premiere",
  "/culture",
  "/business",
  "/resources",
  "/contact",
];

const requiredFiles = [
  "dist/manifest.webmanifest",
  "dist/llms.txt",
  "dist/robots.txt",
  "dist/sitemap.xml",
  "dist/_headers",
  "dist/assets/atya-wordmark.webp",
  "dist/assets/gold-coast-background.webp",
  "dist/assets/ai-growth-salon-cover.webp",
  "dist/assets/letter-to-grandma-poster.webp",
  "dist/assets/letter-to-grandma-premiere.webp",
  "dist/assets/consulate-visit-20260623.webp",
  "dist/assets/letter-to-grandma-premiere-qld.webp",
  "dist/assets/premiere-cinema-crowd.webp",
  "dist/assets/premiere-cassidy-speech.webp",
  "dist/assets/premiere-roland-speech.webp",
  "dist/assets/premiere-poster-raise.webp",
  "dist/assets/stanley-speaker-huang-xiaomu.jpg",
  "dist/assets/stanley-speaker-hoody.jpg",
  "dist/assets/stanley-speaker-achuan.jpg",
  "dist/assets/stanley-speaker-jinchen.jpg",
  "dist/assets/roland-uniform-2026.webp",
  "dist/assets/wang-zeping-uniform-2026.webp",
  "dist/assets/xin-zhuoyang-uniform-2026.webp",
  "dist/assets/huang-xuelian-uniform-2026.webp",
  "dist/assets/zheng-shaojie-uniform-2026.webp",
  "dist/assets/lin-zehui-uniform-2026.webp",
  "dist/assets/lu-xiaoni-uniform-2026.webp",
  "dist/downloads/atya-constitution.docx",
];

const forbiddenVisibleText = [
  "医学研修",
  "图库问答",
  "会员服务",
  "会员权益",
  "/assets/ata-logo.png",
];

const forbiddenPublicRoutes = [
  "/programs/medical-summer-school",
  "/gallery",
  "/membership",
  "/publications",
];

const forbiddenPublishedFiles = [
  "dist/assets/ata-logo.png",
  "dist/assets/consulate-visit-20260623.png",
  "dist/assets/letter-to-grandma-premiere-qld.png",
  "dist/assets/premiere-cinema-crowd.jpg",
  "dist/assets/premiere-cassidy-speech.jpg",
  "dist/assets/premiere-roland-speech.jpg",
  "dist/assets/premiere-poster-raise.jpg",
  "dist/assets/medical-program-background.jpg",
  "dist/assets/medical-program-journey.jpg",
  "dist/assets/medical-sydney-banner.jpg",
];

function routeIndexPath(route) {
  if (route === "/") return "dist/index.html";
  return `dist${route}/index.html`;
}

async function assertReadable(path) {
  await access(path, constants.R_OK);
}

async function assertNotReadable(path) {
  try {
    await access(path, constants.R_OK);
    throw new Error(`${path} should not be published`);
  } catch (error) {
    if (error?.code === "ENOENT" || error?.code === "ENOTDIR") return;
    throw error;
  }
}

function assertIncludes(text, expected, label) {
  if (!text.includes(expected)) {
    throw new Error(`${label} missing ${expected}`);
  }
}

function assertExcludes(text, forbidden, label) {
  if (text.includes(forbidden)) {
    throw new Error(`${label} contains forbidden public text: ${forbidden}`);
  }
}

async function collectFiles(entry) {
  const info = await stat(entry);
  if (info.isFile()) return [entry];
  const children = await readdir(entry);
  const nested = await Promise.all(children.map((child) => collectFiles(`${entry}/${child}`)));
  return nested.flat();
}

for (const route of routes) {
  const path = routeIndexPath(route);
  await assertReadable(path);
  const html = await readFile(path, "utf8");
  assertIncludes(html, "<title>", path);
  assertIncludes(html, 'name="description"', path);
  assertIncludes(html, 'rel="canonical"', path);
  assertIncludes(html, 'property="og:url"', path);
  assertIncludes(html, 'name="twitter:card"', path);
  assertIncludes(html, 'type="application/ld+json"', path);
  assertIncludes(html, '<div id="root">', path);
  assertIncludes(html, "<noscript>", path);
}

const notFound = await readFile("dist/404.html", "utf8");
assertIncludes(notFound, 'content="noindex, follow"', "dist/404.html");

const manifest = JSON.parse(await readFile("dist/manifest.webmanifest", "utf8"));
if (manifest.name !== "澳大利亚潮汕青年会") {
  throw new Error("manifest name mismatch");
}
if (!manifest.icons?.some((icon) => icon.src === "/assets/atya-logo.png")) {
  throw new Error("manifest does not use ATYA logo");
}

const sitemap = await readFile("dist/sitemap.xml", "utf8");
for (const route of routes) {
  const loc = `https://austeoswa.com${route === "/" ? "/" : route}`;
  assertIncludes(sitemap, `<loc>${loc}</loc>`, "dist/sitemap.xml");
}
assertExcludes(sitemap, "/publications", "dist/sitemap.xml");
for (const route of forbiddenPublicRoutes) {
  assertExcludes(sitemap, route, "dist/sitemap.xml");
}

for (const file of requiredFiles) {
  await assertReadable(file);
}

for (const file of forbiddenPublishedFiles) {
  await assertNotReadable(file);
}

const textExtensions = new Set([".js", ".css", ".html", ".xml", ".txt", ".json", ".webmanifest"]);
const distFiles = await collectFiles("dist");
for (const path of distFiles) {
  const extension = path.includes(".") ? path.slice(path.lastIndexOf(".")) : "";
  if (!textExtensions.has(extension)) continue;
  const text = await readFile(path, "utf8");
  for (const forbidden of forbiddenVisibleText) {
    assertExcludes(text, forbidden, path);
  }
  if (path.endsWith(".html") || path.endsWith(".xml")) {
    for (const route of forbiddenPublicRoutes) {
      assertExcludes(text, route, path);
    }
  }
}

const builtText = (await Promise.all(
  distFiles
    .filter((path) => path.endsWith(".js") || path.endsWith(".html"))
    .map((path) => readFile(path, "utf8")),
)).join("\n");

for (const expected of [
  "澳大利亚潮汕青年会",
  "IA4881891",
  "昆士兰州注册的非营利组织",
  "组织架构",
  "商务与资源",
  "资源中心",
  "乡音相连，共筑未来",
  "澳洲潮汕同乡会青年会代表团澳洲潮州同乡会馆参访",
  "《给阿嬷的情书》昆士兰州首映礼",
  "【待确认：",
]) {
  assertIncludes(builtText, expected, "dist build");
}

console.log(`Verified ATYA build with ${routes.length} routes and ${requiredFiles.length} required files.`);
