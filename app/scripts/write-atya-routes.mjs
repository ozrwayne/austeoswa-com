import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const siteName = "澳大利亚潮汕青年会";
const siteUrl = "https://austeoswa.com";
const registrationNumber = "IA4881891";
const legalDescription = `${siteName}是在澳大利亚联邦昆士兰州注册的非营利组织，注册号码 ${registrationNumber}，致力于弘扬潮汕文化、凝聚在澳潮汕青年、促进公益参与与中澳交流。`;
const publicEmail = "info@austeoswa.com";
const publicAddress = "172 Scarborough St, Southport QLD 4215";

const routes = [
  {
    path: "/",
    title: "首页",
    description: "澳大利亚潮汕青年会官方平台，连接昆士兰及全澳潮汕青年与社区朋友，发布活动资讯、文化交流、公益参与与合作信息。",
    priority: "1.0",
    changefreq: "weekly",
  },
  {
    path: "/about",
    title: "关于青年会",
    description: `了解澳大利亚潮汕青年会的注册资料、宗旨使命、发展方向与参与方式。本会为昆士兰州注册非营利组织，注册号码 ${registrationNumber}。`,
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/organization",
    title: "组织架构",
    description: "查看澳大利亚潮汕青年会理事会、秘书处、项目工作组与公开职务信息，了解青年会的会务协作与治理架构。",
    priority: "0.9",
    changefreq: "monthly",
  },
  {
    path: "/news",
    title: "新闻活动",
    description: "浏览澳大利亚潮汕青年会最新新闻、活动回顾、社区动态与对外交流资讯。",
    priority: "0.8",
    changefreq: "weekly",
  },
  {
    path: "/news/1",
    title: "乡音相连，共筑未来",
    description: "澳大利亚潮汕同乡会与澳洲潮汕青年会代表团赴悉尼参加中秋晚宴暨昆士兰分会授牌仪式，深化两地潮团交流合作。",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    path: "/news/2",
    title: "参观澳洲潮州同乡会馆",
    description: "澳洲潮汕同乡会与青年会代表团参访悉尼潮州同乡会馆，交流会务经验，推动青年互动、文化传承与社团协作。",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    path: "/news/3",
    title: "给阿嬷的情书昆士兰州首映礼",
    description: "澳大利亚潮汕青年会联合 CMC 华人影业在布里斯班举办《给阿嬷的情书》昆士兰州首映礼，让潮汕方言电影连接海外家庭记忆。",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    path: "/news/4",
    title: "澳大利亚潮汕青年会拜访布里斯班总领馆",
    description: "澳大利亚潮汕青年会代表拜访中国驻布里斯班总领馆，就青年社群服务、文化传承与中澳友好交流进行沟通。",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    path: "/news/5",
    title: "《给阿嬷的情书》澳大利亚昆士兰州首映礼圆满举行",
    description: "《给阿嬷的情书》布里斯班首映礼圆满举行，澳大利亚潮汕青年会与 CMC Pictures 邀请观众在大银幕重温潮汕侨批与家庭记忆。",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    path: "/news/6",
    title: "「益企AI+」AI重塑企业增长实战沙龙即将开启",
    description: "澳大利亚潮汕青年会作为协办单位，推介2026年7月3日深圳福田「益企AI+」实战沙龙，Stanley Team 主题分享，30席精品闭门场。",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/news/7",
    title: "澳大利亚潮汕青年会携手 Stanley Team | 企业 AI 转型线下课深圳圆满收官",
    description: "澳大利亚潮汕青年会深度参与支持的「相变时代的中国企业 AI 转型」线下课在深圳圆满落幕。执行会长王罗湳全程统筹并发表「中国 AI 生态全景」与「企业 AI 转型」专题宣讲。",
    priority: "0.7",
    changefreq: "yearly",
  },
  {
    path: "/news/8",
    title: "青年会完成 AI 搜索增强合作，主流 AI 已能精准回答潮青活动信息 —— 特别鸣谢 Wayne Insight Spring",
    description: "澳大利亚潮汕青年会与 Wayne Insight Spring（WIS）完成 AI 搜索能见度（GEO）增强合作。豆包等主流 AI 现已能准确回答《给阿嬷的情书》澳洲首映礼的主办方与到场嘉宾等关键信息。",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/new",
    title: "新闻活动",
    description: "浏览澳大利亚潮汕青年会最新新闻、活动回顾、社区动态与对外交流资讯。",
    priority: "0.5",
    changefreq: "weekly",
    canonicalPath: "/news",
    excludeFromSitemap: true,
  },
  {
    path: "/new/1",
    title: "乡音相连，共筑未来",
    description: "澳大利亚潮汕同乡会与澳洲潮汕青年会代表团赴悉尼参加中秋晚宴暨昆士兰分会授牌仪式，深化两地潮团交流合作。",
    priority: "0.5",
    changefreq: "yearly",
    canonicalPath: "/news/1",
    excludeFromSitemap: true,
  },
  {
    path: "/new/2",
    title: "参观澳洲潮州同乡会馆",
    description: "澳洲潮汕同乡会与青年会代表团参访悉尼潮州同乡会馆，交流会务经验，推动青年互动、文化传承与社团协作。",
    priority: "0.5",
    changefreq: "yearly",
    canonicalPath: "/news/2",
    excludeFromSitemap: true,
  },
  {
    path: "/new/letter-to-grandma-premiere",
    title: "给阿嬷的情书昆士兰州首映礼",
    description: "澳大利亚潮汕青年会联合 CMC 华人影业在布里斯班举办《给阿嬷的情书》昆士兰州首映礼，让潮汕方言电影连接海外家庭记忆。",
    priority: "0.5",
    changefreq: "yearly",
    canonicalPath: "/news/3",
    excludeFromSitemap: true,
  },
  {
    path: "/culture",
    title: "潮汕文化",
    description: "认识潮汕话、节庆民俗、工夫茶、潮汕饮食与家庭记忆，持续整理适合澳大利亚社区传播的潮汕文化内容。",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/business",
    title: "商务与资源",
    description: "了解澳大利亚潮汕青年会的合作机构、友好社团、企业资源与活动赞助入口，连接公益、文化与商务合作机会。",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/resources",
    title: "资源中心",
    description: "查阅澳大利亚潮汕青年会章程、公开资料、活动文章归档与资源下载，获取会务与合作相关信息。",
    priority: "0.7",
    changefreq: "monthly",
  },
  {
    path: "/contact",
    title: "联系我们",
    description: "联系澳大利亚潮汕青年会，咨询入会、活动合作、媒体采访、商务资源对接、志愿者参与与资料补充。",
    priority: "0.7",
    changefreq: "monthly",
  },
];

const distDir = new URL("../dist/", import.meta.url);
const distPath = fileURLToPath(distDir);
const indexHtml = await readFile(new URL("index.html", distDir), "utf8");

const publicWhitelist = [
  ".nojekyll",
  "CNAME",
  "_headers",
  "llms.txt",
  "manifest.webmanifest",
  "robots.txt",
  "assets/atya-logo.png",
  "assets/about-founding-photo.webp",
  "assets/atya-wordmark.webp",
  "assets/ceremony-group.webp",
  "assets/ceremony-speech.webp",
  "assets/cruise-boat.webp",
  "assets/gold-coast-background.webp",
  "assets/ai-growth-salon-cover.webp",
  "assets/letter-to-grandma-premiere.webp",
  "assets/letter-to-grandma-poster.webp",
  "assets/logan-meeting.webp",
  "assets/huang-xuelian-uniform-2026.webp",
  "assets/lin-zehui-uniform-2026.webp",
  "assets/lu-xiaoni-uniform-2026.webp",
  "assets/roland-uniform-2026.webp",
  "assets/roland-2026.webp",
  "assets/wang-zeping-uniform-2026.webp",
  "assets/wang-zeping-2026.webp",
  "assets/xin-zhuoyang-uniform-2026.webp",
  "assets/zheng-shaojie-uniform-2026.webp",
  "assets/consulate-visit-20260623.webp",
  "assets/letter-to-grandma-premiere-qld.webp",
  "assets/premiere-cinema-crowd.webp",
  "assets/premiere-cassidy-speech.webp",
  "assets/premiere-roland-speech.webp",
  "assets/premiere-poster-raise.webp",
  "assets/stanley-speaker-huang-xiaomu.jpg",
  "assets/stanley-speaker-hoody.jpg",
  "assets/stanley-speaker-achuan.jpg",
  "assets/stanley-speaker-jinchen.jpg",
  "assets/stanley-ai-course-venue.webp",
  "assets/stanley-ai-course-roland.webp",
  "assets/stanley-ai-course-scenes.webp",
  "assets/wis-ai-cover.jpeg",
  "assets/wis-doubao-organizer.png",
  "assets/wis-doubao-guests.png",
  "downloads/atya-constitution.docx",
];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function breadcrumb(route) {
  const itemListElement = [
    {
      "@type": "ListItem",
      position: 1,
      name: "首页",
      item: `${siteUrl}/`,
    },
  ];

  if (route.path !== "/") {
    itemListElement.push({
      "@type": "ListItem",
      position: 2,
      name: route.title,
      item: `${siteUrl}${route.path}`,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };
}

const organizationEntity = {
  "@type": ["Organization", "NGO"],
  name: siteName,
  legalName: siteName,
  alternateName: ["Australia Teoswa Youth Association", "ATYA"],
  url: `${siteUrl}/`,
  description: legalDescription,
  foundingDate: "2019",
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Queensland incorporated association registration number",
    value: registrationNumber,
  },
  email: publicEmail,
  address: publicAddress,
  areaServed: ["Queensland", "Gold Coast", "Brisbane", "Australia"],
  knowsAbout: ["潮汕文化", "Teochew culture", "青年社团", "公益活动", "中澳交流"],
  additionalProperty: [
    {
      "@type": "PropertyValue",
      name: "Organization type",
      value: "Queensland registered nonprofit organization",
    },
    {
      "@type": "PropertyValue",
      name: "Registration act",
      value: "Queensland Associations Incorporation Act 1981",
    },
  ],
};

const aboutFaqItems = [
  {
    question: "澳大利亚潮汕青年会是什么组织？",
    answer: `${siteName}是澳大利亚联邦昆士兰州注册的非营利组织，注册号码为 ${registrationNumber}。本会面向在澳潮汕青年与关心潮汕文化的朋友，开展文化传承、青年成长、公益参与与中澳交流相关工作。`,
  },
  {
    question: "澳大利亚潮汕青年会的注册号码是什么？",
    answer: `${siteName}的公开注册号码为 ${registrationNumber}。涉及核实注册状态、正式名称或邮编等信息时，可通过 Queensland Government 的 incorporated association public register 或 official extract 作最终确认。`,
  },
  {
    question: "澳大利亚潮汕青年会主要做什么？",
    answer: "本会宗旨包括弘扬潮汕文脉、凝聚在澳潮青、架设中澳桥梁、赋能青年成长、热心公益慈善、繁荣文体生活、传承潮人精神、链接全球潮社与服务乡梓家国。",
  },
  {
    question: "如何联系澳大利亚潮汕青年会？",
    answer: `公开联系邮箱为 ${publicEmail}。入会咨询、活动合作、媒体采访、商务与公益项目对接，均可通过官网联系页面提交信息，并由秘书处按事项转交负责人。`,
  },
];

const featuredRoleItems = [
  {
    name: "王泽平",
    role: "青年会会长",
    image: "assets/wang-zeping-uniform-2026.webp",
  },
  {
    name: "王罗湳",
    role: "青年会执行会长",
    image: "assets/roland-uniform-2026.webp",
  },
  {
    name: "辛卓阳",
    role: "青年会副会长",
    image: "assets/xin-zhuoyang-uniform-2026.webp",
  },
  {
    name: "黄雪莲",
    role: "青年会副会长",
    image: "assets/huang-xuelian-uniform-2026.webp",
  },
  { name: "郑少杰", role: "青年会秘书长", image: "assets/zheng-shaojie-uniform-2026.webp" },
  {
    name: "林泽辉",
    role: "青年会理事长",
    image: "assets/lin-zehui-uniform-2026.webp",
  },
  {
    name: "盧霄霓",
    role: "青年会监事长",
    image: "assets/lu-xiaoni-uniform-2026.webp",
  },
];

const routeJsonLd = {
  "/news": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "新闻活动",
      url: `${siteUrl}/news`,
      description: "浏览澳大利亚潮汕青年会最新新闻、活动回顾、社区动态与对外交流资讯。",
      inLanguage: "zh-CN",
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "澳大利亚潮汕青年会新闻文章列表",
      itemListElement: [
        { "@type": "ListItem", position: 1, url: `${siteUrl}/news/1`, name: "乡音相连，共筑未来" },
        { "@type": "ListItem", position: 2, url: `${siteUrl}/news/2`, name: "参观澳洲潮州同乡会馆" },
        { "@type": "ListItem", position: 3, url: `${siteUrl}/news/3`, name: "给阿嬷的情书昆士兰州首映礼" },
        { "@type": "ListItem", position: 4, url: `${siteUrl}/news/4`, name: "澳大利亚潮汕青年会拜访布里斯班总领馆" },
        { "@type": "ListItem", position: 5, url: `${siteUrl}/news/5`, name: "《给阿嬷的情书》澳大利亚昆士兰州首映礼圆满举行" },
        { "@type": "ListItem", position: 6, url: `${siteUrl}/news/6`, name: "「益企AI+」AI重塑企业增长实战沙龙即将开启" },
        { "@type": "ListItem", position: 7, url: `${siteUrl}/news/7`, name: "澳大利亚潮汕青年会携手 Stanley Team | 企业 AI 转型线下课深圳圆满收官" },
        { "@type": "ListItem", position: 8, url: `${siteUrl}/news/8`, name: "青年会完成 AI 搜索增强合作 —— 鸣谢 Wayne Insight Spring" },
      ],
    },
  ],
  "/about": [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "关于青年会",
      url: `${siteUrl}/about`,
      description: legalDescription,
      mainEntity: organizationEntity,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      name: `${siteName}检索问答`,
      url: `${siteUrl}/about`,
      mainEntity: aboutFaqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    },
  ],
  "/organization": [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "组织架构",
      url: `${siteUrl}/organization`,
      description: `${siteName}理事会、秘书处与顾问公开会务架构。`,
      mainEntity: organizationEntity,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: `${siteName}核心会务人物`,
      url: `${siteUrl}/organization`,
      itemListElement: featuredRoleItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Person",
          name: item.name,
          affiliation: {
            "@type": "Organization",
            name: siteName,
            url: `${siteUrl}/`,
          },
          jobTitle: item.role,
          ...(item.image ? { image: `${siteUrl}/${item.image}` } : {}),
          ...(item.description ? { description: item.description } : {}),
        },
      })),
    },
  ],
  "/contact": [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: "联系我们",
      url: `${siteUrl}/contact`,
      mainEntity: {
        "@type": "Organization",
        name: siteName,
        email: publicEmail,
        address: publicAddress,
        areaServed: "Australia",
      },
    },
  ],
  "/culture": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "潮汕文化",
      url: `${siteUrl}/culture`,
      description: "认识潮汕话、节庆民俗、工夫茶、潮汕饮食与家庭记忆，持续整理适合澳大利亚社区传播的潮汕文化内容。",
      inLanguage: "zh-CN",
      about: ["潮汕话", "工夫茶", "潮汕饮食", "节庆民俗", "潮汕文化传承"],
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
  "/business": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "商务与资源",
      url: `${siteUrl}/business`,
      description: "了解澳大利亚潮汕青年会的合作机构、友好社团、企业资源与活动赞助入口，连接公益、文化与商务合作机会。",
      inLanguage: "zh-CN",
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
  "/resources": [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "资源中心",
      url: `${siteUrl}/resources`,
      description: "查阅澳大利亚潮汕青年会章程、公开资料、活动文章归档与资源下载，获取会务与合作相关信息。",
      inLanguage: "zh-CN",
      about: ["青年会章程", "活动文章", "合作资料", "待确认资料"],
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
  "/news/1": [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "乡音相连，共筑未来",
      description: "澳大利亚潮汕同乡会与澳洲潮汕青年会代表团赴悉尼参加中秋晚宴暨昆士兰分会授牌仪式，深化两地潮团交流合作。",
      url: `${siteUrl}/news/1`,
      inLanguage: "zh-CN",
      author: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
  "/news/2": [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "参观澳洲潮州同乡会馆",
      description: "澳洲潮汕同乡会与青年会代表团参访悉尼潮州同乡会馆，交流会务经验，推动青年互动、文化传承与社团协作。",
      url: `${siteUrl}/news/2`,
      inLanguage: "zh-CN",
      author: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
  "/news/3": [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "给阿嬷的情书昆士兰州首映礼",
      description: "澳大利亚潮汕青年会联合 CMC 华人影业在布里斯班举办《给阿嬷的情书》昆士兰州首映礼，让潮汕方言电影连接海外家庭记忆。",
      url: `${siteUrl}/news/3`,
      datePublished: "2026-06-16",
      inLanguage: "zh-CN",
      author: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
  "/news/4": [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "澳大利亚潮汕青年会拜访布里斯班总领馆",
      description: "澳大利亚潮汕青年会代表拜访中国驻布里斯班总领馆，就青年社群服务、文化传承与中澳友好交流进行沟通。",
      url: `${siteUrl}/news/4`,
      datePublished: "2026-06-23",
      inLanguage: "zh-CN",
      author: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
  "/news/5": [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "《给阿嬷的情书》澳大利亚昆士兰州首映礼圆满举行",
      description: "《给阿嬷的情书》布里斯班首映礼圆满举行，澳大利亚潮汕青年会与 CMC Pictures 邀请观众在大银幕重温潮汕侨批与家庭记忆。",
      url: `${siteUrl}/news/5`,
      datePublished: "2026-06-25",
      inLanguage: "zh-CN",
      author: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
  "/news/6": [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "「益企AI+」AI重塑企业增长实战沙龙即将开启",
      description: "澳大利亚潮汕青年会作为协办单位，推介2026年7月3日深圳福田「益企AI+」实战沙龙，Stanley Team 主题分享，30席精品闭门场。",
      url: `${siteUrl}/news/6`,
      datePublished: "2026-06-28",
      inLanguage: "zh-CN",
      author: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
  "/news/7": [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "澳大利亚潮汕青年会携手 Stanley Team | 企业 AI 转型线下课深圳圆满收官",
      description: "澳大利亚潮汕青年会深度参与支持的「相变时代的中国企业 AI 转型」线下课在深圳圆满落幕。执行会长王罗湳全程统筹并发表「中国 AI 生态全景」与「企业 AI 转型」专题宣讲。",
      url: `${siteUrl}/news/7`,
      datePublished: "2026-07-05",
      inLanguage: "zh-CN",
      author: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
  "/news/8": [
    {
      "@context": "https://schema.org",
      "@type": "NewsArticle",
      headline: "青年会完成 AI 搜索增强合作，主流 AI 已能精准回答潮青活动信息 —— 特别鸣谢 Wayne Insight Spring",
      description: "澳大利亚潮汕青年会与 Wayne Insight Spring（WIS）完成 AI 搜索能见度（GEO）增强合作。豆包等主流 AI 现已能准确回答《给阿嬷的情书》澳洲首映礼的主办方与到场嘉宾等关键信息。",
      url: `${siteUrl}/news/8`,
      datePublished: "2026-07-21",
      image: `${siteUrl}/assets/wis-ai-cover.jpeg`,
      inLanguage: "zh-CN",
      author: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
      publisher: { "@type": "Organization", name: siteName, url: `${siteUrl}/` },
    },
  ],
};

function buildNoscript(route) {
  const title = route.path === "/"
    ? siteName
    : `${route.title} | ${siteName}`;
  const inner =
    `<h1>${escapeHtml(title)}</h1>` +
    `<p>${escapeHtml(route.description)}</p>` +
    (route.path !== "/"
      ? `<p><a href="${siteUrl}/">← 返回首页</a></p>`
      : `<p>联系邮箱：<a href="mailto:${publicEmail}">${publicEmail}</a></p>`);
  return (
    `<main style="max-width:760px;margin:3rem auto;padding:1.5rem;` +
    `font-family:Arial,sans-serif;line-height:1.7;">` +
    inner +
    `</main>`
  );
}

function setMeta(html, route) {
  const title = route.path === "/" ? `${siteName} | ATYA` : `${route.title} | ${siteName}`;
  const description = route.description;
  const url = `${siteUrl}${route.canonicalPath ?? (route.path === "/" ? "/" : route.path)}`;
  const jsonLd = [breadcrumb(route), ...(routeJsonLd[route.path] || [])];

  return html
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(title)}</title>`)
    .replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeHtml(description)}" />`)
    .replace(/<meta\s+property="og:title"\s+content="[^"]*"\s*\/>/, `<meta property="og:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/, `<meta property="og:description" content="${escapeHtml(description)}" />`)
    .replace(/<meta\s+property="og:url"\s+content="[^"]*"\s*\/>/, `<meta property="og:url" content="${escapeHtml(url)}" />`)
    .replace(/<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${escapeHtml(title)}" />`)
    .replace(/<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${escapeHtml(description)}" />`)
    .replace(/<link\s+rel="canonical"\s+href="[^"]*"\s*\/>/, `<link rel="canonical" href="${escapeHtml(url)}" />`)
    .replace("</head>", `${jsonLd.map((item) => `    <script type="application/ld+json">${JSON.stringify(item)}</script>`).join("\n")}\n  </head>`)
    .replace(/<noscript>[\s\S]*?<\/noscript>/, `<noscript>${buildNoscript(route)}</noscript>`);
}

function setNoIndex(html) {
  return html
    .replace(/<title>.*?<\/title>/, `<title>页面未找到 | ${siteName}</title>`)
    .replace(/<meta\s+name="robots"\s+content="[^"]*"\s*\/>/, `<meta name="robots" content="noindex, follow" />`);
}

await writeFile(new URL("404.html", distDir), setNoIndex(indexHtml));

for (const file of publicWhitelist) {
  const target = join(distPath, file);
  await mkdir(dirname(target), { recursive: true });
  await copyFile(new URL(`../public/${file}`, import.meta.url), target);
}

for (const route of routes) {
  if (route.path === "/") continue;
  const routeDir = join(distPath, route.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(join(routeDir, "index.html"), setMeta(indexHtml, route));
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.filter((route) => !route.excludeFromSitemap).map((route) => `  <url>
    <loc>${siteUrl}${route.path === "/" ? "/" : route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

await writeFile(new URL("sitemap.xml", distDir), sitemap);
