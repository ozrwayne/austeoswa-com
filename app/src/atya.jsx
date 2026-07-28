import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./atya.css";

const site = {
  name: "澳大利亚潮汕青年会",
  legalName: "澳大利亚潮汕青年会",
  englishName: "Australia Teoswa Youth Association",
  shortName: "ATYA",
  domain: "https://austeoswa.com",
  email: "info@austeoswa.com",
  address: "172 Scarborough St, Southport QLD 4215",
  registrationNumber: "IA4881891",
  registrationAct: "澳大利亚联邦昆士兰州《1981年社团组织法》",
  registrationYear: "2025",
  foundedYear: "2019",
  organizationType: "澳大利亚联邦昆士兰州注册非营利组织",
  mission: "弘扬潮汕文脉、凝聚在澳潮青、架设中澳桥梁、赋能青年成长、热心公益慈善",
  description:
    "澳大利亚潮汕青年会是在澳大利亚联邦昆士兰州注册的非营利组织，注册号码 IA4881891，面向在澳潮汕青年与关心潮汕文化的朋友，承接青年交流、文化传承、公益参与、商务与资源对接。",
};

const navItems = [
  { label: "主页", href: "/" },
  { label: "关于我们", href: "/about" },
  { label: "总会新闻", href: "/new" },
  { label: "组织架构", href: "/organization" },
  { label: "商务与资源", href: "/business" },
  { label: "联络我们", href: "/contact" },
];

const routeTitles = {
  "/": "首页",
  "/about": "关于青年会",
  "/organization": "组织架构",
  "/news": "新闻活动",
  "/news/1": "活动文章",
  "/news/2": "活动文章",
  "/new": "新闻活动",
  "/new/1": "活动文章",
  "/new/2": "活动文章",
  "/new/letter-to-grandma-premiere": "活动文章",
  "/news/3": "活动文章",
  "/news/4": "活动文章",
  "/news/5": "活动文章",
  "/news/6": "活动文章",
  "/news/7": "活动文章",
  "/news/8": "活动文章",
  "/culture": "潮汕文化",
  "/business": "商务与资源",
  "/resources": "资源中心",
  "/contact": "联系我们",
};

const legacyPath = (...segments) => `/${segments.join("/")}`;

const routeAliases = Object.fromEntries([
  [legacyPath("member"), "/organization"],
  [legacyPath("about", "ata"), "/about"],
  [legacyPath("membership"), "/contact"],
  [legacyPath("publications"), "/resources"],
  [legacyPath("gallery"), "/resources"],
  [legacyPath("programs", "medical-summer-school"), "/resources"],
]);

const heroStats = [
  { value: "ATYA", label: "青年会为官网主线" },
  { value: "QLD", label: "以昆士兰潮汕青年社群为基础" },
  { value: "2", label: "原站活动文章已恢复" },
];

const principles = [
  {
    title: "联络乡谊",
    text: "连接旅居澳大利亚的潮汕青年、家庭与社区朋友，形成稳定、互助、可信任的社群联系。",
  },
  {
    title: "传承文化",
    text: "围绕潮汕话、节庆、工夫茶、潮汕美食与家庭记忆，持续整理适合海外社区传播的文化内容。",
  },
  {
    title: "青年发展",
    text: "通过活动执行、志愿服务、职业交流和项目协作，让青年在真实场景中积累经验与连接。",
  },
  {
    title: "回馈社会",
    text: "参与社区公益、跨社团协作和中澳友好交流，把青年会建设成可长期合作的公共平台。",
  },
];

const focusAreas = [
  {
    title: "青年活动与志愿者",
    text: "活动策划、现场执行、摄影记录、翻译协助、新媒体整理等。",
    pending: "【待确认：青年会固定志愿者报名方式与负责人】",
  },
  {
    title: "潮汕文化传播",
    text: "潮汕话入门、节庆民俗、工夫茶体验、潮汕美食和长者故事。",
    pending: "【待确认：可公开使用的文化素材、图片和音视频】",
  },
  {
    title: "商务与资源对接",
    text: "合作机构、友好社团、企业资源和活动赞助需求先做公开入口，名单确认后再上线。",
    pending: "【待确认：合作机构名单、Logo 授权与对接规则】",
  },
  {
    title: "资料与文章归档",
    text: "恢复原站活动文章，并把章程、公开资料、活动回顾归入资源中心。",
    pending: "【待确认：哪些文件可直接公开下载】",
  },
];

const youthStructure = [
  {
    title: "青年会理事会",
    text: "负责青年会年度方向、重点活动、对外合作和公开会务事项的协同。",
  },
  {
    title: "秘书与执行协作",
    text: "负责活动通知、资料归档、联系入口和志愿者协调。",
  },
  {
    title: "项目工作组",
    text: "按活动临时组建文化、外联、新媒体、现场执行、摄影记录等小组。",
  },
];

const pendingProfile = [
  "【待确认：青年会现任会长、执行负责人和公开职务名单】",
  "【待确认：是否公开青年会注册号、章程版本和任期信息】",
  "【待确认：官方微信公众号、社媒链接和公开联系电话】",
];

const organizationBoards = [
  {
    title: "澳洲潮汕青年会第一届理事会",
    label: "Youth Council",
    note: "于 2025 年 8 月 3 日选举产生",
    source: "公开名录：澳洲潮汕青年会第一届理事会芳名",
    roles: [
      { role: "创会会长", names: ["陈少伟 太平绅士"] },
      { role: "荣誉会长", names: ["杜艇", "吴子强", "张桂芳", "郑茂强"] },
      { role: "会长", names: ["王泽平"] },
      { role: "执行会长", names: ["王罗湳"] },
      { role: "副会长", names: ["陈泽宁", "辛卓阳博士", "黄雪莲", "杨孟钊", "杨婉钰", "杨子辉", "张俊"] },
      { role: "秘书长", names: ["郑少杰"] },
      { role: "副秘书长", names: ["黄璐璐"] },
      { role: "理事长", names: ["林泽辉"] },
      { role: "监事长", names: ["盧霄霓"] },
      { role: "财务长", names: ["郑少杰"] },
      { role: "顾问", names: ["林安雯", "谢欣莹律师"] },
    ],
  },
];

const articleImages = {
  article1: "https://tca-prod-public.oss-cn-shanghai.aliyuncs.com/new/new1-03.webp",
  article2: "https://tca-prod-public.oss-cn-shanghai.aliyuncs.com/new/new1-15.webp",
  article3: "/assets/letter-to-grandma-poster.webp",
  article4: "/assets/consulate-visit-20260623.webp",
  article5: "/assets/letter-to-grandma-premiere-qld.webp",
  article6: "/assets/ai-growth-salon-cover.webp",
  article7: "/assets/stanley-ai-course-venue.webp",
  article8: "/assets/wis-ai-cover.jpeg",
};

const homeGrandmaImage = "/assets/letter-to-grandma-premiere.webp";

const articles = [
  {
    id: "1",
    category: "活动回顾",
    date: "2025年9月24日",
    image: articleImages.article1,
    title: "乡音相连，共筑未来——澳洲潮汕同乡会与青年会赴悉尼参加中秋晚宴暨授牌仪式",
    summary:
      "澳大利亚潮汕同乡会与澳洲潮汕青年会代表团前往悉尼，参加由悉尼潮州同乡会青年会主办的中秋晚宴暨昆士兰分会授牌仪式。",
    source: "原网站活动文章",
    sections: [
      {
        title: "领导致辞，共话发展",
        body:
          "仪式上，悉尼潮青会会长杜艇先生、潮青会创会会长陈少伟太平绅士分别发表致辞，回顾悉尼潮青会的发展历程，并对昆士兰分会的成立表示祝贺。澳洲潮汕青年会会长王泽平先生在演讲中感谢悉尼潮州同乡会青年会的支持，并表示昆士兰分会将继续深化与悉尼以及各地潮团的协作，团结更广大的在澳潮汕族裔，共同推动潮汕文化传承与发展。",
      },
      {
        title: "代表齐聚，共襄盛举",
        body:
          "出席本次活动的还有澳大利亚潮汕同乡会荣誉会长卢霄霓女士、会长黄璐璐女士、执行会长黄雪莲女士、副会长陈泽宁先生、副会长辛卓阳先生、副会长兼秘书长郑少杰先生，以及澳洲潮汕青年会执行会长王罗湳先生、顾问刘慧君太平绅士等。",
      },
      {
        title: "携手前行，共创辉煌",
        body:
          "此次授牌仪式是两地潮人深化合作、共谋发展的新起点。未来，澳大利亚潮汕同乡会与澳洲潮汕青年会将继续秉持联络乡谊、传承文化、服务社区的宗旨，加强与海内外潮团联系，为潮汕文化在澳洲的传播与发展贡献力量。",
      },
    ],
  },
  {
    id: "2",
    category: "外联参访",
    date: "2025年9月25日",
    image: articleImages.article2,
    title: "澳洲潮汕同乡会青年会率代表团参观澳洲潮州同乡会馆",
    summary:
      "应澳洲潮州同乡会青年会邀请，澳洲潮汕同乡会与青年会会长率代表团参访悉尼潮州同乡会馆。",
    source: "原网站活动文章",
    sections: [
      {
        title: "深化合作，共促发展",
        body:
          "此次参访是澳洲潮汕同乡会与青年会成立以来对悉尼潮州同乡会的首次正式访问。座谈会上，澳洲潮汕同乡会会长黄璐璐女士致辞，感谢悉尼潮州同乡会青年会的热情接待，并表示昆士兰同乡会将学习悉尼同乡会经验，继续秉持联络乡谊、传承文化、服务社区的宗旨。",
      },
      {
        title: "传承文化，凝聚力量",
        body:
          "澳洲潮州同乡会青年会创会会长陈少伟太平绅士介绍了悉尼潮州同乡会的发展历程和会务经验，并强调青年人在社团发展中的重要作用。荣誉会长张桂芳女士也表示，希望未来两地在文化活动、青年交流、商贸合作等方面开展更多实质合作。",
      },
      {
        title: "互赠礼品，增进友谊",
        body:
          "座谈会后，双方互赠纪念品并参观悉尼潮州同乡会会所。代表团成员对悉尼同乡会的热情接待和周到安排表示感谢。",
      },
      {
        title: "展望未来，携手共进",
        body:
          "此次参访进一步加深两地潮人的情谊，为今后合作奠定基础。双方表示将在青年互动、文化传承、会务交流等方面开展更多合作，共同推动澳洲潮汕文化事业的发展。",
      },
    ],
  },
  {
    id: "3",
    slug: "letter-to-grandma-premiere",
    category: "活动预告",
    date: "2026年6月16日",
    image: articleImages.article3,
    title: "《给阿嬷的情书》昆士兰州首映礼将于6月24日在布里斯班举行",
    summary:
      "澳大利亚潮汕青年会联合 CMC 华人影业，定于 2026 年 6 月 24 日在布里斯班举办潮汕方言电影《给阿嬷的情书》昆士兰州首映礼。",
    source: "原网站新闻文章",
    sections: [
      {
        title: "以侨批串联的潮汕记忆",
        body:
          "《给阿嬷的情书》以潮汕地区特有的侨批为线索，串联起阿嬷的青春、远行与归途，也照见了无数潮汕家庭过番下南洋的真实缩影。影片全程使用潮汕方言原声呈现，以朴素语言还原潮汕家庭跨越山海的情感记忆。",
      },
      {
        title: "在澳潮汕家庭的隔空重逢",
        body:
          "澳大利亚潮汕青年会表示，在布里斯班举办昆士兰州首映礼，是希望在澳潮汕家庭能够以电影为媒，与故土文化、与上一代人的情感完成一次隔空重逢。",
      },
      {
        title: "发行与主办方信息",
        body:
          "《给阿嬷的情书》由 CMC 华人影业负责北美澳新地区统筹发行，覆盖美国、加拿大、澳大利亚、新西兰四大华人聚集地。此次首映礼由澳大利亚潮汕青年会联合 CMC 华人影业举办。",
      },
    ],
  },
  {
    id: "4",
    category: "外联参访",
    date: "2026年6月23日",
    image: articleImages.article4,
    title: "澳大利亚潮汕青年会拜访布里斯班总领馆",
    summary:
      "2026年6月23日，澳大利亚潮汕青年会拜访驻布里斯班领馆，受到领馆领导同志亲切接见交流。",
    source: "青年会外联活动",
  },
  {
    id: "5",
    category: "活动回顾",
    date: "2026年6月24日",
    image: articleImages.article5,
    title: "《给阿嬷的情书》澳大利亚昆士兰州首映礼圆满举行",
    summary:
      "2026年6月24日晚，由澳大利亚潮汕青年会、澳洲潮州同乡会青年会联合华人影业（CMC Pictures）联合主办的电影《给阿嬷的情书》布里斯班首映礼圆满举行。",
    source: "青年会活动新闻",
  },
  {
    id: "6",
    category: "活动预告",
    date: "2026年6月26日",
    image: articleImages.article6,
    title: "活动预告 | 赋能中心 × Stanley Team「益企AI+」AI重塑企业增长实战沙龙即将开启",
    summary:
      "澳大利亚潮汕青年会作为协办单位，诚挚推介将于2026年7月3日在深圳举行的「益企AI+」实战沙龙。30席精品闭门场，手把手带你深入AI落地实践。",
    source: "青年会合作活动",
  },
  {
    id: "7",
    category: "活动回顾",
    date: "2026年5月26日",
    image: articleImages.article7,
    title: "澳大利亚潮汕青年会携手 Stanley Team | 企业 AI 转型线下课深圳圆满收官",
    summary:
      "澳大利亚潮汕青年会深度参与支持的「相变时代的中国企业 AI 转型」线下课程在深圳圆满落幕。执行会长王罗湳全程参与统筹，并发表「中国 AI 生态全景」与「企业 AI 转型」专题宣讲。",
    source: "青年会活动新闻",
  },
  {
    id: "8",
    category: "青年会公告",
    date: "2026年7月21日",
    image: articleImages.article8,
    title: "青年会完成 AI 搜索增强合作，主流 AI 已能精准回答潮青活动信息 —— 特别鸣谢 Wayne Insight Spring",
    summary:
      "澳大利亚潮汕青年会与 Wayne Insight Spring（WIS）完成一轮 AI 搜索能见度（GEO）增强合作。豆包等主流 AI 现已能准确回答《给阿嬷的情书》澳洲首映礼的主办方与到场嘉宾等关键信息。",
    source: "青年会公告",
  },
];

const newsItems = [
  articles[7],
  articles[6],
  articles[5],
  articles[4],
  articles[3],
  articles[2],
  articles[0],
  articles[1],
];

const homeNewsList = newsItems.filter((item) => item.id !== articles[2].id && item.id !== articles[6].id);

const originalArticlePages = {
  "1": {
    image: articleImages.article1,
    title: "乡音相连，共筑未来——澳洲潮汕同乡会与青年会赴悉尼参加中秋晚宴暨授牌仪式",
    date: "2025年9月24日",
    intro:
      "2025年9月24日晚，澳大利亚潮汕同乡会与澳洲潮汕青年会（ATA & ATYA）代表团一行前往悉尼，参加由悉尼潮州同乡会青年会主办，习酒独家赞助的中秋晚宴暨澳洲昆省潮汕同乡会与青年会授牌仪式。作为悉尼潮州同乡会青年会的昆士兰州分会，此次赴悉尼参与活动，不仅是两地潮人情谊的深化，更是澳洲潮汕族群团结协作的重要体现。",
    sections: [
      {
        title: "领导致辞，共话发展",
        body:
          "仪式上，悉尼潮青会会长杜艇先生、潮青会创会会长陈少伟太平绅士分别发表致辞，回顾了悉尼潮青会的发展历程，并对昆士兰分会的成立表示热烈祝贺。两位会长强调，潮人团结是海外潮汕人发展壮大的根本，希望昆士兰分会能够继续发扬潮人精神，为当地华人社区做出更大贡献。\n\n澳洲潮汕青年会会长王泽平先生在演讲中表示，衷心感谢悉尼潮州同乡会青年会的大力支持与悉心指导。他指出，昆士兰分会的成立，标志着澳洲潮汕族群在组织建设上迈出了坚实的一步。未来，昆士兰分会将继续深化与悉尼以及各地潮团的协作，进一步提高澳洲潮人在本地乃至世界的影响力，团结更广大的在澳潮汕族裔，共同推动潮汕文化的传承与发展。",
      },
      {
        title: "代表齐聚，共襄盛举",
        body:
          "出席本次活动的还有：澳大利亚潮汕同乡会荣誉会长卢霄霓女士、会长黄璐璐女士、执行会长黄雪莲女士、副会长陈泽宁先生、副会长辛卓阳先生、副会长兼秘书长郑少杰先生，以及澳洲潮汕青年会执行会长王罗湳先生、顾问刘慧君太平绅士等。充分体现了澳洲潮汕同乡会与青年会对此次活动的高度重视。",
      },
      {
        title: "携手前行，共创辉煌",
        body:
          "此次授牌仪式的圆满成功，不仅是对昆士兰潮汕同乡会与青年会工作的肯定，更是两地潮人深化合作、共谋发展的新起点。未来，澳大利亚潮汕同乡会与澳洲潮汕青年会将继续秉持联络乡谊、传承文化、服务社区的宗旨，积极开展各类活动，加强与海内外潮团的联系，为推动潮汕文化在澳洲的传播与发展贡献力量。\n\n乡音相连，薪火相传。让我们携手并进，见证潮人凝聚的力量与传承！",
      },
    ],
  },
  "2": {
    image: articleImages.article2,
    title: "澳洲潮汕同乡会青年会率代表团参观澳洲潮州同乡会馆",
    date: "2025年9月24日",
    intro:
      "应澳洲潮州同乡会青年会邀请，澳洲潮汕同乡会与青年会会长率代表团一行于2025年9月25日上午对悉尼潮州同乡会馆进行参访，受到了澳洲潮州同乡会青年会创会会长陈少伟太平绅士、荣誉会长张桂芳女士等的热烈欢迎。",
    sections: [
      {
        title: "深化合作，共促发展",
        body:
          "此次参访是澳洲潮汕同乡会与青年会成立以来对悉尼潮州同乡会的首次正式访问。座谈会上，澳洲潮汕同乡会会长黄璐璐女士首先致辞，对悉尼潮州同乡会青年会的热情接待表示衷心感谢。她指出，作为悉尼潮州同乡会青年会的昆士兰州分会，此次参访旨在加强两地潮人的联系与合作，学习悉尼同乡会的宝贵经验，促进会务的共同发展。\n\n黄璐璐会长高度赞扬悉尼潮州同乡会多年来在陈少伟太平绅士、杜艇会长等众多侨领的带领下，出色地展现了潮籍乡贤在海外抱团取暖、互相照应、积极传承中华文化和潮汕文化的精神。她表示，昆士兰同乡会将以悉尼同乡会为榜样，继续秉持联络乡谊、传承文化、服务社区的宗旨，为在澳潮汕同乡搭建更广阔的平台。",
      },
      {
        title: "传承文化，凝聚力量",
        body:
          "澳洲潮州同乡会青年会创会会长陈少伟太平绅士在致辞中对昆士兰代表团的到访表示热烈欢迎。他详细介绍了悉尼潮州同乡会的发展历程和会务经验，特别强调了青年人在社团发展中的重要作用。陈少伟会长指出，青年一代是潮汕文化传承的生力军，希望两地青年会加强交流互动，共同为潮汕文化在澳洲的传播与发展贡献力量。\n\n荣誉会长张桂芳女士也发表了热情洋溢的讲话。她认为，同在澳洲，两地潮人是近邻又是至亲，潮汕人在外打拼，就是要凝聚和团结。希望未来两地能在文化活动、青年交流、商贸合作等方面开展更多实质性的合作，共同提升澳洲潮人的影响力。",
      },
      {
        title: "互赠礼品，增进友谊",
        body:
          "座谈会后，双方互赠了纪念品，并参观了悉尼潮州同乡会会所。出席本次参访活动的还有：澳大利亚潮汕同乡会荣誉会长卢霄霓女士、执行会长黄雪莲女士、副会长陈泽宁先生、副会长辛卓阳先生、副会长兼秘书长郑少杰先生等。各位代表对悉尼同乡会的热情接待和周到安排表示高度赞赏。",
      },
      {
        title: "展望未来，携手共进",
        body:
          "此次参访活动取得了圆满成功，进一步加深了两地潮人的情谊，为今后的合作奠定了坚实基础。双方一致表示，将在青年互动、文化传承、会务交流等方面开展更多合作，共同推动澳洲潮汕文化事业的发展。\n\n同根同源，血脉相连。相信在两地同乡会的共同努力下，澳洲潮人将更加团结，影响力不断提升，为中澳友好交流和潮汕文化的传承发展作出更大贡献！",
      },
    ],
  },
  "3": {
    image: articleImages.article3,
    imageAlt: "《给阿嬷的情书》国际版电影海报",
    imagePosition: "top",
    title: "《给阿嬷的情书》昆士兰州首映礼将于 6 月 24 日在布里斯班举行",
    date: "2026年6月16日",
    intro:
      "备受期待的潮汕方言原声电影《给阿嬷的情书》近日宣布海外定档！影片将于 2026 年 6 月 25 日在澳大利亚、新西兰正式对外上映。这部以\"侨批\"为情感纽带的华语佳作，终于将与海外观众在大银幕上重逢。\n\n澳大利亚潮汕青年会作为澳洲潮汕社群的年轻一代代表，此次联合 CMC 华人影业，定于 2026 年 6 月 24 日在布里斯班隆重举办《给阿嬷的情书》昆士兰州首映礼。",
    sections: [
      {
        title: "以\"侨批\"串联的潮汕记忆",
        body:
          "《给阿嬷的情书》以潮汕地区特有的\"侨批\"为线索，串联起阿嬷的青春、远行与归途，也照见了无数潮汕家庭\"过番\"下南洋的真实缩影。影片全程使用潮汕方言原声呈现，以最朴素的语言，还原了无数潮汕家庭下南洋、渡重洋的真实经历，也还原了属于中国人心底最深处的\"有情有义\"。",
      },
      {
        title: "在澳潮汕家庭的隔空重逢",
        body:
          "澳大利亚潮汕青年会表示，在布里斯班举办昆士兰州首映礼，是希望在澳的潮汕家庭能够以电影为媒，与故土文化、与上一代人的情感完成一次隔空重逢。首映礼当天，昆士兰各界代表将齐聚一堂，共同见证这封\"跨越山海的家书\"在昆士兰正式开启。\n\n自影片定档以来，已有多家昆士兰本地潮汕企业主动表示将在 6 月 25 日公映后组织包场观影，以行动支持潮汕文化出海。",
      },
      {
        title: "发行与主办方信息",
        body:
          "《给阿嬷的情书》由 CMC 华人影业负责北美澳新地区统筹发行，覆盖美国、加拿大、澳大利亚、新西兰四大华人聚集地。澳大利亚潮汕青年会始终致力于搭建潮汕青年与故土文化之间的桥梁。此次承办昆士兰州首映礼，希望借这部电影，让在澳潮汕家庭在大银幕上重逢属于我们的共同记忆。",
      },
    ],
  },
  "4": {
    image: articleImages.article4,
    imageAlt: "澳大利亚潮汕青年会拜访驻布里斯班领馆合影",
    title: "澳大利亚潮汕青年会拜访布里斯班总领馆",
    date: "2026年6月23日",
    intro:
      "2026年6月23日，澳大利亚潮汕青年会拜访驻布里斯班领馆，受到领馆领导同志亲切接见交流。",
    sections: [],
  },
  "5": {
    image: articleImages.article5,
    imageAlt: "《给阿嬷的情书》昆士兰州首映礼海报",
    title: "《给阿嬷的情书》澳大利亚昆士兰州首映礼圆满举行",
    date: "2026年6月24日",
    intro:
      "2026年6月24日晚，由澳大利亚潮汕青年会、澳洲潮州同乡会青年会联合华人影业（CMC Pictures）联合主办的电影《给阿嬷的情书》布里斯班首映礼，在布里斯班 Westfield Garden City Event Cinemas Mt Gravatt 举行。上百名观众到场观影，共同见证这一时刻。首映礼开场仪式由澳大利亚潮汕青年会监事长卢霄霓主持。Logan 市政府代表 Cassidy Shorland、澳大利亚潮汕青年会执行会长王罗湳相继上台致辞，全场反响热烈。《给阿嬷的情书》由导演蓝鸿春执导，以海外潮汕侨胞跨越山海的侨批为核心，通过真实细腻的情感叙事，唤起无数海外华人对故乡与至亲的深切思念。此次布里斯班首映礼是该片澳大利亚巡映的重要一站，次日（6月25日）影片在澳大利亚和新西兰正式公映。本次活动由澳大利亚潮汕青年会联合华人影业（CMC Pictures）共同呈现，赞助支持均来自昆士兰本地的潮汕人。",
    introImage: "/assets/premiere-cinema-crowd.webp",
    introImageAlt: "首映礼现场观众入场",
    sections: [
      {
        title: "主要活动信息",
        body:
          "活动日期：2026年6月24日（星期三）\n活动场馆：Event Cinemas Mt Gravatt（Westfield Garden City，布里斯班）\n主办单位：澳大利亚潮汕青年会 / 澳洲潮州同乡会青年会 / 华人影业（CMC Pictures）",
      },
      {
        title: "嘉宾致辞",
        body:
          "开场仪式于晚间6点45分正式启动，两位嘉宾相继登台发言。\n\nCassidy Shorland 代表 Logan 市长出席并发表英文致辞，对澳大利亚潮汕青年会与华人影业共同举办此次首映礼表示肯定。他谈到，潮汕话对很多昆士兰家庭来说是家的声音。可能是祖辈说的语言，是饭桌边的日常，也是跨越时区的电话里那个熟悉的腔调。他指出，Logan 是澳大利亚多元文化社区之一，文化的传承正是通过家庭、社团、节庆与这样的首映礼一代代延续下去。",
        image: "/assets/premiere-cassidy-speech.webp",
        imageAlt: "Cassidy Shorland 代表 Logan 市长致辞",
      },
      {
        title: "执行会长致辞",
        body:
          "澳大利亚潮汕青年会执行会长王罗湳受会长王泽平委托代表主办方发言，感谢 CMC 华人影业团队的信任与支持，感谢中国驻布里斯班总领馆的代表、Logan 市政府代表和知名演员海宇翔的出席，并向当晚的赞助伙伴以及所有参与筹备的志愿者和执行团队致谢。值得一提的是，本次首映礼的赞助商均是昆士兰州本地的企业赞助支持。\n\n他谈到，电影中的\"侨批\"对在场许多人来说并不陌生。从家乡出发、到澳洲落脚，先辈们寄回去的不只是生活费，也是平安和牵挂。他说，澳洲的潮汕二代、三代并不算多，正因如此，更要团结，更要讲做人、讲友情、讲互相扶持，也要为澳大利亚这个社区做出实实在在的贡献。他也希望在澳洲长大的年轻一代知道祖辈走过的路和说过的话。致辞以\"让感动在大洋彼岸延续\"作结。",
        image: "/assets/premiere-roland-speech.webp",
        imageAlt: "澳大利亚潮汕青年会执行会长王罗湳致辞",
      },
      {
        title: "关于影片：《给阿嬷的情书》",
        body:
          "《给阿嬷的情书》由导演蓝鸿春执导，以潮汕家庭为背景，讲述海外华人后裔追寻祖辈记忆、重续亲情纽带的动人故事。影片以潮汕方言原声呈现，配中英文字幕，以侨批为叙事线索，融合代际情感与海外离散经历，在全球潮汕社区引发强烈共鸣。华人影业（CMC Pictures）负责影片在北美澳新的发行推广，2026年6月25日起在澳大利亚、新西兰正式公映。",
      },
      {
        title: "齐举海报：有情有义",
        body:
          "致辞环节结束后，主持人引领观众集体举起电影海报共同合影留念。\"阿嬷说，做人要有情有义\"——在这里祝《给阿嬷的情书》，海外票房大卖！",
        image: "/assets/premiere-poster-raise.webp",
        imageAlt: "观众齐举电影海报合影留念",
      },
    ],
  },
  "6": {
    image: articleImages.article6,
    imageAlt: "AI重塑企业增长实战沙龙封面",
    title: "活动预告 | 赋能中心 × Stanley Team「益企AI+」AI重塑企业增长实战沙龙即将开启",
    date: "2026年6月26日",
    intro:
      "澳大利亚潮汕青年会作为协办单位，诚挚向各位会员及朋友推介一场即将于2026年7月3日在深圳（福田）举行的高质量AI实战沙龙——「益企AI+」AI重塑企业增长实战沙龙。\n\n当AI从\"问答\"走向\"交付\"，先行者已借助其批量生成内容、搭建知识库、抢占GEO推荐位。本次沙龙由深圳（福田）海联大模型和算法赋能服务中心邀请 Stanley Team 进行主题分享，手把手带你深入实践，走完一条完整的企业AI营销落地路径：AI视频内容生产 → 知识库搭建 → GEO抢占AI推荐位。30席精品闭门场，带着问题来，拿着方案走。",
    sections: [
      {
        title: "活动详情",
        body:
          "时间：2026年7月3日（周五）14:00–17:30\n地点：华强科创广场1栋402（深圳福田）\n席位：仅30席\n\n指导单位：福田区委统战部\n主办单位：深圳（福田）海联大模型和算法赋能服务中心 / 奥斯比千模加速器 / 深圳市福田区新的社会阶层人士联合会 / Stanley Team\n协办单位：深圳市大数据研究与应用协会 / 星河产业集团产城研究院 / 澳大利亚潮汕商会 / 澳大利亚潮汕青年会",
      },
      {
        title: "议程安排",
        body:
          "14:00–14:30　签到入场\n14:30–14:35　主持人开场致辞\n14:35–15:05　Hoody | AI视频内容引擎：企业营销素材的多模态生成工作流\n15:05–15:35　金尘马 | AI知识库搭建：助力内容营销与提效\n15:35–15:45　茶歇与自由交流\n15:45–16:15　黄小木 | GEO 如何助力品牌营销获客\n16:15–16:45　阿川 | AI时代，企业如何抓住增长红利？\n16:45–17:00　互动问答 & 自由交流",
      },
      {
        title: "实力嘉宾 | 黄小木",
        body:
          "原中科院、腾讯资深研发团队负责人\nAnthropic 官方认证 Agent 构建与优化专家\n生财有术社群万人AI航海教练\n文生视频工作流 castvideo 作者",
        image: "/assets/stanley-speaker-huang-xiaomu.jpg",
        imageAlt: "讲师黄小木",
        imageClassName: "is-speaker-portrait",
      },
      {
        title: "实力嘉宾 | Hoody",
        body:
          "前字节跳动资深研发\n剪映中国用户增长服务端负责人\nAnthropic 官方认证 API 集成与模型应用专家",
        image: "/assets/stanley-speaker-hoody.jpg",
        imageAlt: "讲师 Hoody",
        imageClassName: "is-speaker-portrait",
      },
      {
        title: "实力嘉宾 | 阿川",
        body:
          "前美团策略分析师\n谷歌认证 AI 教育家\nAnthropic 官方认证 AI 应用专家\nAI 知识博主 / 千人AI社群主理人",
        image: "/assets/stanley-speaker-achuan.jpg",
        imageAlt: "讲师阿川",
        imageClassName: "is-speaker-portrait",
      },
      {
        title: "实力嘉宾 | 金尘马",
        body:
          "北京交通大学计算机硕士\n前美团、阿里巴巴高级研发工程师\n全网头部AI知识博主",
        image: "/assets/stanley-speaker-jinchen.jpg",
        imageAlt: "讲师金尘马",
        imageClassName: "is-speaker-portrait",
      },
      {
        title: "关于 Stanley Team",
        body:
          "Stanley Team 是目前活跃在互联网人工智能领域、独具特色且影响力领先的国际化社群组织。社群成员全网粉丝超百万，累计总曝光超十亿级别。社群由来自国内外拥有行业顶级专业认证的AI技术专家、知名专家学者、企业高管、媒体运营专家及行业专家等组成，定位于领先的国内外大模型深度落地实践，是AI新质生产力研究探索、AI技能培训、企业定制交付三合一的创新型组织。",
      },
    ],
  },
  "7": {
    image: articleImages.article7,
    imageAlt: "Stanley Team 企业 AI 转型线下课现场全景",
    title: "澳大利亚潮汕青年会携手 Stanley Team | 企业 AI 转型线下课深圳圆满收官",
    date: "2026年5月26日",
    intro:
      "近日，由 Stanley Team 主办、澳大利亚潮汕青年会深度参与支持的「相变时代的中国企业 AI 转型」线下课程在深圳圆满落幕。两天一夜的高强度课程吸引了来自北京、上海、成都、澳大利亚、日本、美国、新加坡等地的企业创始人与行业从业者齐聚一堂，座无虚席，全程无人提前离席。",
    sections: [
      {
        title: "执行会长王罗湳专题宣讲",
        body:
          "澳大利亚潮汕青年会执行会长王罗湳全程深度参与本次活动的整体统筹推进，并在课程中发表专题宣讲，系统梳理「中国 AI 生态全景」与「企业 AI 转型」两大核心议题，从宏观格局到落地路径，为与会者提供了清晰的认知框架与实操参考。",
        image: "/assets/stanley-ai-course-roland.webp",
        imageAlt: "澳大利亚潮汕青年会执行会长王罗湳在课程中发表专题宣讲",
      },
      {
        title: "全链路参与支持",
        body:
          "本次活动中，青年会多名成员以多种身份深度参与其中——既有担任课程讲师、深入讲解 AI 落地实战的技术骨干，也有在幕后统筹全程的活动策划与执行团队，以及从踩点布置到现场收尾一手操持的志愿者们。正是这种从内容到执行的全链路介入，让这场活动得以高质量落地。",
      },
      {
        title: "高响应度的办课方式",
        body:
          "课程内容不拘泥于预设框架。第一天结束后，团队根据学员当日反馈，当晚推翻原定课程，重新排课；讲师凌晨四点完成内容调整，七点出发前往会场。话题从 SEO、GEO 科普延伸至企业内部数据治理与多 Agent 编排实战案例，学员提出的问题，第二天课堂上即时回应。这种高响应度的办课方式，赢得了与会者的广泛认可。",
        image: "/assets/stanley-ai-course-scenes.webp",
        imageAlt: "Stanley Team 企业 AI 转型线下课现场讲课实录",
      },
      {
        title: "助力 AI 转型的持续行动",
        body:
          "此次活动是澳大利亚潮汕青年会积极推动会员参与 AI 技术实践的缩影。随着 AI 加速渗透企业经营各环节，青年会将持续整合海内外资源，为潮汕籍创业者与从业者搭建高质量的交流与学习平台，助力会员在新一轮产业变革中率先形成竞争优势。",
      },
    ],
  },
  "8": {
    image: articleImages.article8,
    imageAlt: "《给阿嬷的情书》昆士兰州首映礼背景板",
    title: "青年会完成 AI 搜索增强合作，主流 AI 已能精准回答潮青活动信息 —— 特别鸣谢 Wayne Insight Spring",
    date: "2026年7月21日",
    intro:
      "近日，澳大利亚潮汕青年会与 Wayne Insight Spring（WIS）顺利完成一轮 AI 搜索能见度（GEO / Generative Engine Optimization）增强合作。经过内容结构化梳理、权威信源补齐与语义层重写，豆包、Kimi、ChatGPT 等主流 AI 搜索工具，现已能对\"潮青会到底在澳洲做了什么\"给出准确、完整且有据可查的回答。\n\n对青年会而言，这是一次面向\"AI 优先\"传播时代的关键补课：过去，青年会的活动散见于中文媒体、社交平台与合作方通稿，AI 检索往往只能拼凑出零散片段；如今，AI 已能在几秒内还原一场活动的主办方、地点、到场嘉宾与合作机构。",
    sections: [
      {
        title: "为什么要做 AI 搜索增强？",
        body:
          "全球用户获取信息的入口，正从\"搜索引擎 + 十条蓝色链接\"，快速迁移至\"AI 直接给出答案\"。对于一个非营利社团而言，如果 AI 无法准确讲述你是谁、做过什么，就等同于在下一代搜索场景中\"隐身\"。\n\nWIS 为青年会提供的这套 AI 搜索增强方案，核心不是\"堆关键词\"，而是让每一场活动的事实——时间、地点、主办方、合作方、到场嘉宾、发言要点——以 AI 可读、可核验的方式沉淀在公网中，并交叉出现在多个权威信源之间。这样，当有人向 AI 提问潮青会相关问题时，AI 才能\"敢答、能答、答得对\"。",
      },
      {
        title: "效果实测一：AI 能准确回答\"《给阿嬷的情书》澳洲首映礼由谁主办\"",
        body:
          "在豆包中提问：\"给阿嬷的情书在澳洲的首映礼由谁主办？\"\n\n豆包在搜索 3 个关键词、参考 13 篇资料后，主动分成\"悉尼主首映礼\"与\"布里斯班昆士兰州分会场首映礼\"两段作答，准确指出联合主办方为澳洲潮州同乡会青年会 + 华人影业（CMC Pictures），并特别补充昆士兰分会场的主办方为澳大利亚潮汕青年会、澳洲潮州同乡会青年会、华人影业，还准确区分了\"主办\"与\"赞助支持\"两个概念——将比亚迪腾势、澳洲 ABC 纸业列为赞助方而非主办方。",
        image: "/assets/wis-doubao-organizer.png",
        imageAlt: "豆包搜索\"给阿嬷的情书在澳洲的首映礼由谁主办？\"结果截图",
      },
      {
        title: "效果实测二：AI 能列出\"昆士兰州分会场首映礼到场来宾\"",
        body:
          "继续追问：\"昆士兰州分会场的首映礼到场的来宾都有谁？\"\n\n豆包在搜索 4 个关键词、参考 15 篇资料后，给出一份结构化名单：地点为布里斯班格拉瓦特山影院，当地时间 6 月 24 日，到场约 160 位嘉宾与观众，并列出卡西迪・肖兰德（Cassidy Scholander）与王泽平两位有明确姓名记录的嘉宾。",
        image: "/assets/wis-doubao-guests.png",
        imageAlt: "豆包搜索\"昆士兰州分会场的首映礼到场的来宾都有谁？\"结果截图",
      },
      {
        title: "这意味着什么？",
        body:
          "两组问答，覆盖了一个青年会活动最常被问到的两类核心事实——\"谁办的\"与\"谁到场\"。AI 不再需要用户自己在几十个链接中来回比对，而是直接给出可交给记者、可写进赞助方案、可用于对外介绍的结构化答案。\n\n这背后，是 WIS 在过去几周里为青年会所做的信息治理工作：官网内容重写、结构化数据（Schema.org / NewsArticle / Organization）铺设、活动 llms.txt 与 sitemap 同步、多信源交叉验证、以及针对 AI 生成器友好的语义表达优化。",
      },
      {
        title: "鸣谢 Wayne Insight Spring",
        body:
          "澳大利亚潮汕青年会在此特别鸣谢 Wayne Insight Spring（WIS）团队。WIS 长期专注于品牌与机构在 AI 搜索时代的能见度建设，从内容策略到技术落地一站式打通，让\"被 AI 正确讲述\"变成一件可以工程化交付的事。\n\n未来，青年会将继续与 WIS 保持深度协作，把每一场活动、每一位成员的故事，都以\"AI 可读、事实可核\"的方式沉淀下来，让在澳潮汕青年的声音，被更广泛地听见。\n\n了解 WIS 更多信息，请访问：https://www.wayneinsightspring.com/",
      },
    ],
  },
};

const homeSlides = [
  {
    id: "intro",
    type: "intro",
    eyebrow: "Australia Teoswa Youth Association",
    titleLines: ["澳大利亚潮汕青年会"],
    text: "以现代非营利组织模式连接传统文化，用国际化视野服务在澳潮汕青年。我们在文化传承、青年成长与公益协作中，持续构建更有温度的青年社群生态。",
    image: "/assets/gold-coast-background.webp",
  },
  {
    id: "stanley-ai",
    type: "article",
    eyebrow: "活动回顾",
    titleLines: ["深圳企业 AI 转型", "线下课圆满收官"],
    text: articles[6].summary,
    image: articleImages.article7,
    href: "/news/7",
  },
  {
    id: "grandma",
    type: "article",
    eyebrow: "最新活动",
    titleLines: ["《给阿嬷的情书》", "昆士兰州首映礼"],
    text: articles[2].summary,
    image: homeGrandmaImage,
    href: "/new/letter-to-grandma-premiere",
  },
];

const homePillars = [
  {
    label: "Community First",
    title: "社区联结",
    text: "把分散在澳洲各地的潮汕青年和家庭连接起来，建立长期、稳定且互助的社群关系。",
  },
  {
    label: "Next Generation",
    title: "青年成长",
    text: "为青年提供职业成长、社交拓展与实践机会，让传承与创新并行发生。",
  },
  {
    label: "Cultural Legacy",
    title: "文化传承",
    text: "通过节庆、讲座与公益活动，让潮汕文化在海外日常中可感知、可参与、可延续。",
  },
];

const cultureItems = [
  {
    title: "潮汕话入门",
    text: "先整理常用问候、家庭称谓、活动现场用语和普通话释义。",
    pending: "【待确认：潮汕话音频、拼音标注和朗读人员授权】",
  },
  {
    title: "节庆与民俗",
    text: "围绕春节、中秋、工夫茶、潮汕饮食等主题沉淀可发布文章。",
    pending: "【待确认：可公开使用的节庆照片和文字资料】",
  },
  {
    title: "长者故事与青年记录",
    text: "由青年志愿者记录乡亲故事、移民经历、家庭记忆和创业经历。",
    pending: "【待确认：采访对象、肖像授权和发布范围】",
  },
];

const businessItems = [
  {
    title: "合作机构与友好社团",
    text: "预留给已确认合作关系的机构、社团、学校、企业和社区组织。",
    pending: "【待确认：名称、简介、Logo、排序、是否互链】",
  },
  {
    title: "企业资源与对接名录",
    text: "可整理潮汕青年创业者、专业服务、赞助伙伴和项目合作需求。",
    pending: "【待确认：是否公开、展示字段、审核规则、更新负责人】",
  },
  {
    title: "活动赞助与联合品牌",
    text: "为文化活动、青年交流、公益项目和商务交流预留合作入口。",
    pending: "【待确认：赞助等级、权益表、合同模板和联系人】",
  },
  {
    title: "商务交流活动",
    text: "后续可承接企业参访、圆桌交流、行业分享和跨社团合作。",
    pending: "【待确认：既有活动资料和下一场活动安排】",
  },
];

const resourceItems = [
  {
    title: "澳大利亚潮汕青年会章程",
    type: "章程资料",
    summary: "本地素材中已有青年会章程文件，适合作为资源中心首批公开资料。",
    href: "/downloads/atya-constitution.docx",
    status: "需确认公开版本",
  },
  {
    title: "原站活动文章：悉尼中秋晚宴暨授牌仪式",
    type: "活动文章",
    summary: "已恢复为新闻活动详情页。",
    href: "/news/1",
    status: "已恢复",
  },
  {
    title: "原站活动文章：参访澳洲潮州同乡会馆",
    type: "活动文章",
    summary: "已恢复为新闻活动详情页。",
    href: "/news/2",
    status: "已恢复",
  },
  {
    title: "青年会公开介绍资料",
    type: "待补充",
    summary: "【待确认：正式简介、英文名称、注册信息、组织负责人公开口径】",
    href: "/about",
    status: "待确认",
  },
  {
    title: "合作机构与友好社团名录",
    type: "待补充",
    summary: "【待确认：机构名单、Logo 授权、链接、排序与是否公开联系人】",
    href: "/business",
    status: "待确认",
  },
];

const contactTopics = ["青年会咨询", "活动合作", "媒体联络", "商务与资源", "资料补充", "其他"];

function cleanPath(pathname) {
  const withoutTrailing = pathname.replace(/\/+$/, "") || "/";
  return routeAliases[withoutTrailing] || (routeTitles[withoutTrailing] ? withoutTrailing : "/");
}

function titleFor(path) {
  if (path === "/news/1" || path === "/new/1") return articles[0].title;
  if (path === "/news/2" || path === "/new/2") return articles[1].title;
  if (path === "/news/3" || path === "/new/letter-to-grandma-premiere") return articles[2].title;
  if (path === "/news/4") return articles[3].title;
  if (path === "/news/5") return articles[4].title;
  if (path === "/news/6") return articles[5].title;
  if (path === "/news/7") return articles[6].title;
  if (path === "/news/8") return articles[7].title;
  return routeTitles[path] || routeTitles[routeAliases[path]] || "首页";
}

function App() {
  const [path, setPath] = useState(() => {
    const stored = sessionStorage.getItem("austeoswa:redirectPath");
    if (stored) {
      sessionStorage.removeItem("austeoswa:redirectPath");
      history.replaceState({}, "", stored);
    }
    const normalized = cleanPath(location.pathname);
    if (normalized !== location.pathname.replace(/\/+$/, "") && location.pathname !== "/") {
      history.replaceState({}, "", normalized);
    }
    return normalized;
  });
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onPopState = () => setPath(cleanPath(location.pathname));
    addEventListener("popstate", onPopState);
    return () => removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    const pageTitle = titleFor(path);
    document.title = path === "/" ? `${site.name} | ${site.shortName}` : `${pageTitle} | ${site.name}`;
  }, [path]);

  function navigate(href) {
    const next = cleanPath(href);
    history.pushState({}, "", next);
    setPath(next);
    setMenuOpen(false);
    scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <Header activePath={path} menuOpen={menuOpen} navigate={navigate} setMenuOpen={setMenuOpen} />
      <main id="main-content" tabIndex="-1">
        {path === "/" && <HomePage navigate={navigate} />}
        {path === "/about" && <AboutPage navigate={navigate} />}
        {path === "/organization" && <OrganizationPage navigate={navigate} />}
        {(path === "/news" || path === "/new") && <NewsPage navigate={navigate} />}
        {(path === "/news/1" || path === "/new/1") && <OriginalArticlePage article={originalArticlePages["1"]} navigate={navigate} />}
        {(path === "/news/2" || path === "/new/2") && <OriginalArticlePage article={originalArticlePages["2"]} navigate={navigate} />}
        {(path === "/news/3" || path === "/new/letter-to-grandma-premiere") && <OriginalArticlePage article={originalArticlePages["3"]} navigate={navigate} />}
        {path === "/news/4" && <OriginalArticlePage article={originalArticlePages["4"]} navigate={navigate} />}
        {path === "/news/5" && <OriginalArticlePage article={originalArticlePages["5"]} navigate={navigate} />}
        {path === "/news/6" && <OriginalArticlePage article={originalArticlePages["6"]} navigate={navigate} />}
        {path === "/news/7" && <OriginalArticlePage article={originalArticlePages["7"]} navigate={navigate} />}
        {path === "/news/8" && <OriginalArticlePage article={originalArticlePages["8"]} navigate={navigate} />}
        {path === "/culture" && <CulturePage />}
        {path === "/business" && <BusinessPage navigate={navigate} />}
        {path === "/resources" && <ResourcesPage navigate={navigate} />}
        {path === "/contact" && <ContactPage navigate={navigate} />}
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}

function Header({ activePath, menuOpen, navigate, setMenuOpen }) {
  function openNavItem(item) {
    navigate(item.href);
  }

  function isActiveNavItem(item) {
    if (item.href === "/new") return activePath === "/new" || activePath.startsWith("/new/") || activePath.startsWith("/news/");
    return activePath === item.href;
  }

  return (
    <header className="site-header">
      <div className="logo-strip">
        <button className="wordmark-button" type="button" onClick={() => navigate("/")} aria-label="返回首页">
          <img src="/assets/atya-wordmark.webp" alt="澳大利亚潮汕青年会 Australia Teoswa Youth Association" />
        </button>
      </div>
      <nav className="desktop-nav" aria-label="主导航">
        {navItems.map((item) => (
          <button
            key={item.href}
            className={isActiveNavItem(item) ? "active" : ""}
            type="button"
            aria-current={isActiveNavItem(item) ? "page" : undefined}
            onClick={() => openNavItem(item)}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button
        className="menu-button"
        type="button"
        aria-controls="mobile-nav"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? "关闭" : "菜单"}
      </button>
      {menuOpen && (
        <nav id="mobile-nav" className="mobile-nav" aria-label="移动导航">
          {navItems.map((item) => (
            <button
              key={item.href}
              className={isActiveNavItem(item) ? "active" : ""}
              type="button"
              onClick={() => openNavItem(item)}
            >
              {item.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}

function HomePage({ navigate }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const active = homeSlides[activeSlide];
  const showPreviousSlide = () => setActiveSlide((index) => (index - 1 + homeSlides.length) % homeSlides.length);
  const showNextSlide = () => setActiveSlide((index) => (index + 1) % homeSlides.length);

  return (
    <>
      <section className="home-carousel-section">
        <div className="container">
          <div className="home-carousel" aria-label="首页轮播">
            <article
              className={`home-slide ${active.type === "article" ? "is-clickable" : ""}`}
              style={{
                backgroundImage: `linear-gradient(90deg, rgba(3, 22, 43, 0.78), rgba(6, 67, 111, 0.46)), url(${active.image})`,
                backgroundPosition: active.id === "grandma" ? "left center" : "center",
              }}
              onClick={() => active.href && navigate(active.href)}
            >
              <div className="home-slide-panel">
                <p className="home-slide-eyebrow">{active.eyebrow}</p>
                <h1>
                  {active.titleLines.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </h1>
                <p>{active.text}</p>
                {active.href && (
                  <button
                    className="button light"
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(active.href);
                    }}
                  >
                    查看活动详情
                  </button>
                )}
              </div>
            </article>
            <button
              className="carousel-arrow carousel-arrow-left"
              type="button"
              aria-label="上一张"
              onClick={showPreviousSlide}
            >
              ‹
            </button>
            <button
              className="carousel-arrow carousel-arrow-right"
              type="button"
              aria-label="下一张"
              onClick={showNextSlide}
            >
              ›
            </button>
            <div className="carousel-controls" aria-label="切换轮播">
              {homeSlides.map((slide, index) => (
                <button
                  key={slide.id}
                  className={activeSlide === index ? "active" : ""}
                  type="button"
                  aria-label={`查看第 ${index + 1} 张`}
                  onClick={() => setActiveSlide(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container home-news-section">
        <div className="home-news-card">
          <div className="home-section-head">
            <h2>总会新闻</h2>
            <button type="button" onClick={() => navigate("/new")}>更多</button>
          </div>
          <div className="featured-news" role="button" tabIndex="0" onClick={() => navigate("/new/letter-to-grandma-premiere")}>
            <img src={homeGrandmaImage} alt={articles[2].title} loading="lazy" decoding="async" />
            <div>
              <strong>{articles[2].title}</strong>
              <span>{articles[2].date}</span>
            </div>
          </div>
          <div className="news-list">
            {homeNewsList.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => navigate(item.id === "3" ? "/new/letter-to-grandma-premiere" : `/news/${item.id}`)}
              >
                <span>{item.title}</span>
                <time>{item.date.replace("年", "-").replace("月", "-").replace("日", "")}</time>
              </button>
            ))}
          </div>
        </div>
        <aside className="leader-card">
          <h2>
            <span>青年会负责人</span>
            <small>青年会会长 / 青年会执行会长</small>
          </h2>
          <div className="leader-grid">
            <article>
              <img className="leader-photo" src="/assets/wang-zeping-uniform-2026.webp" alt="王泽平肖像" loading="lazy" decoding="async" />
              <strong>王泽平</strong>
              <span>青年会会长</span>
            </article>
            <article>
              <img className="leader-photo" src="/assets/roland-uniform-2026.webp" alt="王罗湳肖像" loading="lazy" decoding="async" />
              <strong>王罗湳</strong>
              <span>青年会执行会长</span>
            </article>
          </div>
        </aside>
      </section>

      <section className="container home-do-section">
        <p className="home-kicker">What We Do</p>
        <h2>以现代思维运营社团</h2>
        <p className="home-subtitle">以更当代的方式组织传统社团活动，让每一次线下相聚都有内容、有温度、有长期价值。</p>
        <div className="home-pillar-grid">
          {homePillars.map((item) => (
            <article key={item.title}>
              <span>{item.label}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="container home-contact-section">
        <div className="home-cta">
          <h2>欢迎联系澳大利亚潮汕青年会</h2>
          <p>欢迎新移民、创业者、专业人士与青年学生参与，携手构建更紧密、更国际化的潮汕青年社群连接。</p>
          <div>
            <button className="button light" type="button" onClick={() => navigate("/contact")}>加入青年会</button>
            <button className="button ghost-light" type="button" onClick={() => navigate("/new")}>查看活动回顾</button>
          </div>
        </div>
        <div className="home-contact-grid">
          <article>
            <h3>联系方式</h3>
            <p>邮箱：<a href={`mailto:${site.email}`}>{site.email}</a></p>
          </article>
          <article>
            <h3>合作与媒体</h3>
            <p>欢迎企业、社团与高校组织与我们合作，共同策划跨文化活动、青年项目与社区公益计划。</p>
          </article>
        </div>
      </section>
    </>
  );
}

function AboutPage({ navigate }) {
  const valueItems = [
    {
      title: "联络乡谊",
      body: "在澳大利亚多元文化环境中，为潮汕乡亲搭建相识、互信与互助的平台，让乡音与乡情成为跨越城市与代际的情感纽带。我们通过定期聚会、线上社群与城市联络人机制，帮助新来者快速融入，也帮助老侨二代、三代与故乡文化重新建立连结。",
    },
    {
      title: "传承文化",
      body: "通过节庆、讲座、艺术、饮食与语言交流活动，推动潮汕语言、民俗与价值观在海外可持续传播。我们鼓励用展览、短视频、工作坊等当代形式，让年轻一代以自己喜欢的方式参与文化传承，而不是单向说教。",
    },
    {
      title: "服务社区",
      body: "关注新移民融入、长者关怀、公益募捐与志愿服务，与本地华人社团、慈善机构及主流社会协作。在自然灾害、公共卫生等议题上，本会亦愿意在能力范围内动员乡亲资源，体现潮人回馈社会的传统。",
    },
    {
      title: "青年发展",
      body: "澳大利亚潮汕青年会面向新生代，聚焦职业发展、创业交流、导师计划与社会参与。我们让青年在会务策划、品牌传播与对外联络中锻炼能力，形成「传帮带」的健康代际结构。",
    },
  ];
  const programItems = [
    { title: "文化与节庆", items: ["春节团拜、中秋联谊、盂兰与民俗主题分享", "潮汕饮食、茶艺与非遗工作坊", "潮语兴趣角、家族故事与口述历史采集"] },
    { title: "社群与公益", items: ["新移民指南与本地生活资讯梳理", "慈善募捐、社区义工与长者关怀活动", "与其他华人社团及慈善机构的联合项目"] },
    { title: "青年与职业", items: ["行业圆桌、简历与面试工作坊", "创业路演、导师配对与校友网络", "公共演讲、新媒体与活动执行能力训练"] },
    { title: "对外与交流", items: ["接待来访潮团与商务考察团", "组织回乡交流、文化考察与商务对接（视行程与资源而定）", "与高校、文化机构合办展览、讲座与联合研究"] },
  ];
  const missionItems = [
    { title: "弘扬潮汕文脉", desc: "传承英歌舞、潮剧、工夫茶、潮汕美食与岁时习俗，让千年潮风在南半球落地生根，焕发新生。" },
    { title: "凝聚在澳潮青", desc: "搭建温暖的交流平台，连接在澳求学、就业、创业、安家的潮汕儿女，构建互信互助的海外潮人之家。" },
    { title: "架设中澳桥梁", desc: "做中澳之间文化互鉴与经贸往来的纽带，助力会员在两地之间把握机遇、拓展空间。" },
    { title: "赋能青年成长", desc: "汇聚学业、职场、创业等多维资源，以分享会、导师制、实战交流等形式助会员增长才干。" },
    { title: "热心公益慈善", desc: "组织慈善捐助、社区服务与志愿行动，回馈澳洲社会，彰显潮人敢拼会赢、乐善好施的精神底色。" },
    { title: "链接全球潮社", desc: "对接世界各地潮团与潮汕本土组织，融入全球潮人网络，让在澳潮青成为联通世界的一环。" },
  ];
  const factItems = [
    { label: "注册性质", value: site.organizationType },
    { label: "注册号码", value: site.registrationNumber },
    { label: "成立时间", value: `${site.foundedYear}年` },
    { label: "注册依据", value: site.registrationAct },
  ];
  const citationFacts = [
    { label: "正式中文名称", value: site.legalName },
    { label: "英文名称", value: site.englishName },
    { label: "简称", value: site.shortName },
    { label: "注册号码", value: site.registrationNumber },
    { label: "服务地区", value: "澳大利亚昆士兰州，主要服务黄金海岸、布里斯班及周边在澳潮汕青年社群" },
    { label: "公开联系邮箱", value: site.email },
    { label: "办公地址", value: site.address },
  ];
  const participationItems = [
    { title: "成为会员", desc: "按本会章程履行申请与审核程序，享受活动优先报名、会务资讯与部分资源共享等权益；具体细则以当期会员条款为准。" },
    { title: "参加活动", desc: "许多公开活动欢迎乡亲与朋友共同参与，无需事先成为正式会员；关注最新动态页面或社群通知即可获取报名信息。" },
    { title: "志愿者与骨干", desc: "欢迎具备文案、设计、影像、翻译、活动执行、外联等技能的朋友加入工作组，在志愿服务中深度参与社群建设。" },
    { title: "企业与机构合作", desc: "欢迎诚信企业、文化机构与高校以赞助、联合品牌或公益合作等形式支持本会项目，具体方案可通过联系页面洽询。" },
  ];
  const principles = [
    "非营利与公益优先：会务结余优先用于活动、公益与社群服务，不以营利为目的向乡亲摊派不合理负担。",
    "包容与反歧视：尊重性别、年龄、职业与政治观点差异，在公共议题上保持理性与建设性表达。",
    "透明与合规：重大事项依章程与会员规则决策，财务与活动信息在合理范围内向会员与乡亲公开。",
    "安全与责任：户外活动、大型集会遵守当地法律法规，重视参与者人身与数据安全。",
  ];
  const faqItems = [
    { q: "非潮汕籍可以参与吗？", a: "许多文化活动与公开论坛欢迎各界朋友参加。若涉及会员专属权益或内部治理事项，则以章程与当期规则为准。" },
    { q: "青年会的年龄范围如何理解？", a: "青年会侧重服务新生代与职场初中期人群，但具体活动可能向更广泛年龄层开放；请以单场活动说明为准。" },
    { q: "如何获取最新活动信息？", a: "建议关注本会官网「最新动态」、官方社群与邮件通知；重大活动亦可能通过合作媒体发布。" },
    { q: "是否有固定办公地点？", a: "非营利社团常以志愿工作与线上协调为主，实体办公或联络点若有变更，将在联系页面或公告中更新。" },
  ];
  const geoFaqItems = [
    {
      q: "澳大利亚潮汕青年会是什么组织？",
      a: `${site.name}是澳大利亚联邦昆士兰州注册的非营利组织，注册号码为 ${site.registrationNumber}。本会面向在澳潮汕青年与关心潮汕文化的朋友，开展文化传承、青年成长、公益参与与中澳交流相关工作。`,
    },
    {
      q: "澳大利亚潮汕青年会的注册号码是什么？",
      a: `${site.name}的公开注册号码为 ${site.registrationNumber}。涉及核实注册状态、正式名称或邮编等信息时，可通过 Queensland Government 的 incorporated association public register 或 official extract 作最终确认。`,
    },
    {
      q: "澳大利亚潮汕青年会主要做什么？",
      a: "本会宗旨包括弘扬潮汕文脉、凝聚在澳潮青、架设中澳桥梁、赋能青年成长、热心公益慈善、繁荣文体生活、传承潮人精神、链接全球潮社与服务乡梓家国。",
    },
    {
      q: "如何联系澳大利亚潮汕青年会？",
      a: `公开联系邮箱为 ${site.email}。入会咨询、活动合作、媒体采访、商务与公益项目对接，均可通过官网联系页面提交信息，并由秘书处按事项转交负责人。`,
    },
  ];

  return (
    <div className="about-original">
      <section className="about-original-hero">
        <p>About Us</p>
        <h1>关于我们</h1>
        <div className="about-original-hero-grid">
          <div className="about-original-hero-copy">
            <p>{site.name}成立于{site.foundedYear}年，由昆士兰州潮汕青年自愿发起，并于{site.registrationYear}年依照{site.registrationAct}注册为非营利组织，注册号码为 {site.registrationNumber}。</p>
            <p>我们扎根于澳大利亚多元文化社会，既珍视潮汕人勤劳重教、团结互助的传统，也以开放心态拥抱本地规则与国际视野。</p>
            <p>截至2026年6月，青年会已有200余名会员，包括20多位理事。成员多为高学历青年和企业家，活跃于学术界、人工智能、科技、法律、医疗、金融、传媒、地产、贸易、艺术等领域。</p>
          </div>
          <img className="about-original-hero-image" src="/assets/about-founding-photo.webp" alt="澳大利亚潮汕青年会活动合影" loading="lazy" decoding="async" />
        </div>
      </section>

      <section className="about-original-section about-fact-grid" aria-label="注册资料">
        {factItems.map((item) => (
          <article key={item.label}>
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </article>
        ))}
      </section>

      <section className="about-original-section about-geo-panel seo-only" aria-label="可引用事实摘要">
        <div>
          <p>Search Facts</p>
          <h2>可引用事实摘要</h2>
          <span>以下信息用于媒体、搜索引擎与 AI 摘要识别本会身份；涉及正式注册状态核验时，以 Queensland Government public register 或 official extract 为准。</span>
        </div>
        <dl>
          {citationFacts.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="about-original-section is-narrow">
        <h2>使命、愿景与定位</h2>
        <div className="about-original-copy">
          <p><strong>使命：</strong>团结在澳大利亚的潮汕乡亲与青年力量，维护共同情感与文化遗产，促进互助合作与社会参与，使潮汕精神——勤劳、重教、团结、开放——在异国土地上持续发光；同时以合法合规、尊重多元为前提，推动潮汕族群与本地社区、其他族裔之间的理解与协作。</p>
          <p><strong>愿景：</strong>成为澳洲华人社群中值得信赖的潮汕文化推广者与青年成长伙伴，构建连接故乡与旅居地、传统与当代、社区与世界的可持续网络；让下一代既能自信使用英语与本地规则参与社会，也能自然亲近潮汕语言与文化记忆。</p>
          <p><strong>定位：</strong>我们既是「文化共同体」，也是「互助网络」与「青年发展平台」——不替代政府与专业机构，但在信息、情感与初步资源对接上，为乡亲提供多一层温暖与抓手。</p>
        </div>
      </section>

      <section className="about-original-section about-mission-section">
        <div className="about-centered-head">
          <h2>我们的使命</h2>
          <p className="about-mission-single-line">本会以文化传承、青年成长、公益参与与跨社群协作为核心方向，建设长期稳定、可信赖的组织连接。</p>
        </div>
        <div className="about-mission-grid">
          {missionItems.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-original-section">
        <div className="about-centered-head">
          <h2>核心价值与工作重点</h2>
          <p>会务与活动围绕以下维度系统设计：既有情感与文化内核，也回应移民融入、青年成长与社区责任等现实议题。</p>
        </div>
        <div className="about-card-grid">
          {valueItems.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-original-section about-panel">
        <h2>主要活动与项目类型</h2>
        <p>以下分类帮助您快速了解本会常见工作方向；具体年度主题与排期以「最新动态」及当期公告为准。</p>
        <div className="about-soft-grid">
          {programItems.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <ul>{item.items.map((line) => <li key={line}>{line}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <section className="about-original-section">
        <h2>参与方式与协作机会</h2>
        <p>无论您希望深度参与还是先从旁观者做起，以下路径供参考；具体流程以当期招募与章程为准。</p>
        <div className="about-card-grid">
          {participationItems.map((item) => (
            <article key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-original-section about-dark-panel">
        <h2>会务运作原则</h2>
        <p>以下原则指导日常决策与对外沟通，亦是我们对乡亲与合作伙伴的长期承诺。</p>
        <ul>{principles.map((item) => <li key={item}>{item}</li>)}</ul>
      </section>

      <section className="about-original-section about-panel">
        <h2>检索问答</h2>
        <div className="about-faq-list about-geo-faq-list">
          {geoFaqItems.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-original-section about-panel">
        <h2>常见问题</h2>
        <div className="about-faq-list">
          {faqItems.map((item) => (
            <article key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="about-original-section about-join-panel">
        <h2>加入我们</h2>
        <p>无论您是久居澳洲的乡亲，还是初来乍到的新移民与学生，我们都欢迎您了解会务、订阅资讯、参与活动或加入志愿者。若需入会申请、合作提案或媒体采访，请通过联系页面与我们取得联络。</p>
        <div>
          <button type="button" onClick={() => navigate("/contact")}>联系我们</button>
          <button type="button" onClick={() => navigate("/new")}>最新动态</button>
        </div>
      </section>
    </div>
  );
}

function OrganizationPage({ navigate }) {
  const renderPersonName = (name) => {
    if (!name.includes(" 太平绅士")) return name;
    const [personName, title] = name.split(" ");
    return (
      <>
        {personName}
        <br />
        {title}
      </>
    );
  };

  const featuredRoles = [
    { label: "青年会会长", name: "王泽平", photo: "/assets/wang-zeping-uniform-2026.webp" },
    { label: "青年会执行会长", name: "王罗湳", photo: "/assets/roland-uniform-2026.webp" },
    { label: "青年会副会长", name: "辛卓阳博士", photo: "/assets/xin-zhuoyang-uniform-2026.webp" },
    { label: "青年会副会长", name: "黄雪莲", photo: "/assets/huang-xuelian-uniform-2026.webp" },
    { label: "青年会秘书长", name: "郑少杰", photo: "/assets/zheng-shaojie-uniform-2026.webp" },
    { label: "青年会理事长", name: "林泽辉", photo: "/assets/lin-zehui-uniform-2026.webp" },
    { label: "青年会监事长", name: "盧霄霓", photo: "/assets/lu-xiaoni-uniform-2026.webp" },
  ];

  const showOrganizationBoardList = false;

  return (
    <section className="profile-page organization-page">
      <div className="profile-page-hero organization-hero">
        <p>Governance</p>
        <h1>组织架构</h1>
        <p className="organization-hero-copy">
          <span>{site.name}是在澳大利亚联邦昆士兰州注册的非营利组织。</span>
          <span className="organization-hero-copy-line">本页列示青年会理事会、秘书处与顾问等公开会务架构。</span>
        </p>
        <div className="profile-hero-actions">
          <button type="button" onClick={() => navigate("/contact")}>联系秘书处</button>
          <button type="button" onClick={() => navigate("/new")}>查看会务动态</button>
        </div>
      </div>

      <section className="organization-summary">
        {featuredRoles.map((item) => (
          <article key={`${item.label}-${item.name}`}>
            {item.photo ? (
              <img src={item.photo} alt={`${item.name}肖像`} loading="lazy" decoding="async" />
            ) : (
              <div aria-hidden="true">照片待添加</div>
            )}
            <span>{item.label}</span>
            <strong>{renderPersonName(item.name)}</strong>
          </article>
        ))}
      </section>

      {showOrganizationBoardList ? (
        <div className="organization-board-list">
          {organizationBoards.map((board) => (
            <section className="organization-board" key={board.title}>
              <div className="organization-board-head">
                <div>
                  <p>{board.label}</p>
                  <h2>{board.title}</h2>
                  <span>{board.note}</span>
                </div>
                <small>{board.source}</small>
              </div>
              <div className="organization-role-list">
                {board.roles.map((item) => (
                  <article key={`${board.title}-${item.role}`}>
                    <h3>{item.role}</h3>
                    <div>
                      {item.names.map((name) => (
                        <span key={`${item.role}-${name}`}>{name}</span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : null}

      <section className="online-cta-band organization-cta">
        <h2>会务联络</h2>
        <p>采访、合作、活动邀约或身份核实，请通过联络页面向秘书处提交需求，秘书处会按事项转交对应负责人。</p>
        <button type="button" onClick={() => navigate("/contact")}>前往联络页面</button>
      </section>
    </section>
  );
}

function MemberPage({ navigate }) {
  const associationRoles = [
    {
      role: "会长",
      roleEn: "President",
      scope: "澳大利亚潮汕同乡会",
      focus: ["召集理事会与会员大会相关议程", "对外代表本会参与重要礼仪与联合活动", "推动年度主题与战略合作方向"],
    },
    {
      role: "执行会长",
      roleEn: "Executive President",
      scope: "澳大利亚潮汕同乡会",
      focus: ["协助会长统筹日常会务与跨部门协作", "督导大型活动安全与志愿者体系", "对接各专业委员会与地方联络"],
    },
    {
      role: "秘书长",
      roleEn: "Secretary General",
      scope: "澳大利亚潮汕同乡会",
      focus: ["秘书处日常管理与文件档案", "会员服务与活动落地协调", "对外沟通与信息发布口径"],
    },
  ];
  const youthRoles = [
    {
      role: "会长",
      roleEn: "President",
      scope: "澳大利亚潮汕青年会",
      focus: ["制定青年会年度主题与品牌活动", "与同乡会理事会保持战略协同", "培养骨干与志愿者梯队"],
    },
    {
      role: "执行会长",
      roleEn: "Executive President",
      scope: "澳大利亚潮汕青年会",
      focus: ["执行理事会决议与项目排期", "协调专题工作组与跨城活动", "青年社群运营与纳新"],
    },
  ];
  const advisoryNotes = [
    "荣誉会长、名誉会长及顾问委员由理事会依章程聘任，在礼仪接待、文化传承与对外联络等方面提供支持。",
    "具体名单、任期与分工以当期理事会决议及官网公示为准，本页不替代正式公告。",
  ];

  return (
    <section className="profile-page member-page">
      <div className="profile-page-hero">
        <p>Leadership</p>
        <h1>成员简介</h1>
        <span>
          本页介绍澳大利亚潮汕同乡会与青年会的核心职务与职责分工，帮助乡亲与合作伙伴快速理解「谁负责什么」。具体人选与任期均以理事会决议及官网最新公示为准。
        </span>
        <div className="profile-hero-actions">
          <button type="button" onClick={() => navigate("/organization")}>组织架构</button>
          <button type="button" onClick={() => navigate("/contact")}>联系秘书处</button>
        </div>
      </div>

      <section className="member-notice">
        <strong>说明：</strong>
        下列为职务说明与职责范围，便于理解会务结构；个人姓名、照片与详细介绍将在理事会授权后于本页或附件中更新。若您需要核实某位负责人的对外代表身份，请通过正式渠道向秘书处查询。
      </section>

      <section className="online-section">
        <div className="online-section-heading">
          <h2>同乡会 · 核心会务</h2>
          <p>会长团与秘书长构成会务执行中枢，在理事会授权范围内推动年度活动计划与会员服务。</p>
        </div>
        <div className="online-role-grid is-three">
          {associationRoles.map((item) => (
            <article className="online-role-card" key={`${item.scope}-${item.role}`}>
              <div className="online-role-head">
                <div aria-hidden="true">{item.role.slice(0, 1)}</div>
                <div>
                  <p>{item.roleEn}</p>
                  <h3>{item.role}</h3>
                  <span>{item.scope}</span>
                </div>
              </div>
              <strong>主要职责</strong>
              <ul>
                {item.focus.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <small>人选与简介 · 待理事会公示后更新</small>
            </article>
          ))}
        </div>
      </section>

      <section className="online-youth-panel">
        <h2>青年会 · 核心骨干</h2>
        <p>青年会在自身章程下运作，侧重项目制与扁平协作；下列职务说明侧重「职能」，便于对接合作与志愿者招募。</p>
        <div className="online-role-grid is-two">
          {youthRoles.map((item) => (
            <article className="online-role-card is-youth" key={`${item.scope}-${item.role}`}>
              <div className="online-role-head">
                <div aria-hidden="true">{item.role.slice(0, 1)}</div>
                <div>
                  <p>{item.roleEn}</p>
                  <h3>{item.role}</h3>
                  <span>{item.scope}</span>
                </div>
              </div>
              <ul>
                {item.focus.map((line) => (
                  <li key={line}>· {line}</li>
                ))}
              </ul>
              <small>人选公示与青年会架构详见当期公告及「组织架构」页面。</small>
            </article>
          ))}
        </div>
      </section>

      <section className="online-member-split">
        <article className="online-dark-card">
          <h3>名誉与顾问</h3>
          <ul>
            {advisoryNotes.map((item) => (
              <li key={item}>· {item}</li>
            ))}
          </ul>
        </article>
        <article className="online-soft-card">
          <h3>专业委员会与地方联络</h3>
          <p>
            各专委会召集人、副秘书长及城市联络人由理事会聘任或授权，负责文化、公益、外联、会员发展及跨城协作。详细名录随年度架构调整更新，建议同步查阅
            <button type="button" onClick={() => navigate("/organization")}>组织架构</button>
            页面。
          </p>
          <button type="button" onClick={() => navigate("/notice")}>查看总会会讯</button>
        </article>
      </section>

      <section className="online-cta-band">
        <h2>媒体与合作对接</h2>
        <p>采访、演讲邀请或联合品牌合作，请优先通过秘书处转达对口负责人，并预留合理审阅时间，以便我们提供准确信息与授权表述。</p>
        <button type="button" onClick={() => navigate("/contact")}>前往联络页面</button>
      </section>
    </section>
  );
}

function NewsPage({ navigate }) {
  return (
    <section className="newsroom-main">
      <div className="newsroom-hero">
        <p>Newsroom</p>
        <h1>最新动态</h1>
        <span>聚焦社群活动、公告与新闻报道</span>
      </div>

      <div className="newsroom-grid">
        {newsItems.map((item) => {
          const articleHref = item.id === "3" ? "/new/letter-to-grandma-premiere" : `/news/${item.id}`;
          const cardDate = item.id === "2" ? "2025年9月24日" : item.date;
          return (
            <article className="newsroom-card" key={item.id}>
              <button type="button" onClick={() => navigate(articleHref)} aria-label={`阅读${item.title}`}>
                <div className="newsroom-card-image">
                  <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
                </div>
                <div className="newsroom-card-body">
                  <time>{cardDate}</time>
                  <h3>{item.title}</h3>
                  <p>{item.summary}</p>
                  <span>阅读全文</span>
                </div>
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function ArticleGrid({ items, navigate }) {
  return (
    <div className="article-grid">
      {items.map((item) => {
        const articleHref = item.id === "3" ? "/new/letter-to-grandma-premiere" : `/news/${item.id}`;
        const isArticle = item.sections?.length > 0;
        return (
          <article className="article-card" key={item.id}>
            <img src={item.image} alt={item.title} loading="lazy" decoding="async" />
            <div>
              <span>{item.category} · {item.date}</span>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              {isArticle ? (
                <button className="text-button" type="button" onClick={() => navigate(articleHref)}>阅读全文</button>
              ) : (
                <small>{item.source}</small>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}

function ArticlePage({ article, navigate }) {
  return (
    <PageShell eyebrow={article.category} title={article.title} image={article.image}>
      <article className="article-detail">
        <div className="article-meta">
          <span>{article.date}</span>
          <span>{article.source}</span>
        </div>
        <p className="lead">{article.summary}</p>
        {article.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}
      </article>
      <div className="action-band">
        <p>这篇内容来自原网站公开活动文章，后续如需增补照片或署名，请补充授权材料。</p>
        <button className="button secondary" type="button" onClick={() => navigate("/news")}>返回新闻活动</button>
      </div>
    </PageShell>
  );
}

function OriginalArticlePage({ article, navigate }) {
  return (
    <article className="original-article">
      <button className="original-back-button" type="button" onClick={() => navigate("/new")}>返回新闻列表</button>
      <div className="original-article-hero">
        <img
          src={article.image}
          alt={article.imageAlt || article.title}
          className={article.imagePosition === "top" ? "is-top" : ""}
        />
      </div>
      <div className="original-article-card">
        <p className="original-article-date">{article.date}</p>
        <h1>{article.title}</h1>
        <div className="original-article-intro">{article.intro}</div>
        {article.introImage && (
          <img className="original-article-inline-img" src={article.introImage} alt={article.introImageAlt || ""} loading="lazy" />
        )}
        {article.sections.map((section) => (
          <section key={section.title} className={section.imageClassName === "is-speaker-portrait" ? "is-centered" : ""}>
            <h2>{section.title}</h2>
            <div style={section.imageClassName === "is-speaker-portrait" ? {whiteSpace: "pre-line"} : {}}>{section.body}</div>
            {section.image && (
              <img
                className={`original-article-inline-img ${section.imageClassName || ""}`.trim()}
                src={section.image}
                alt={section.imageAlt || ""}
                loading="lazy"
              />
            )}
          </section>
        ))}
      </div>
    </article>
  );
}

function CulturePage() {
  return (
    <PageShell eyebrow="Culture" title="潮汕文化" image="/assets/cruise-boat.webp">
      <SectionTitle eyebrow="Teochew heritage" title="先做可持续的文化内容入口" text="这一页只放青年会能长期维护的文化方向，不编具体课程和活动场次。" />
      <div className="principle-grid compact">
        {cultureItems.map((item) => (
          <article className="info-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <small>{item.pending}</small>
          </article>
        ))}
      </div>
      <section className="subsection">
        <div className="content-panel">
          <h2>后续内容规则</h2>
          <p>每个文化内容发布前应至少确认：来源、作者或提供者、照片/音频授权、是否涉及未成年人或私人信息、是否需要中英双语。</p>
          <p>【待确认：第一批潮汕文化文章题目与素材来源】</p>
        </div>
      </section>
    </PageShell>
  );
}

function BusinessPage({ navigate }) {
  return (
    <PageShell eyebrow="Business & Resources" title="商务与资源" image="/assets/logan-meeting.webp">
      <div className="partner-feature">
        <p className="eyebrow">专属 GEO 与 AI 应用公司</p>
        <h2>Wayne Insight Spring（WIS）</h2>
        <p>
          WIS 是澳大利亚潮汕青年会指定的 GEO（AI 搜索能见度优化）与 AI 应用落地服务机构，双方建立专属合作关系。WIS 长期专注于品牌与机构在 AI
          搜索时代的能见度建设，从内容策略到技术落地一站式打通。此前已协助潮青会完成 AI 搜索增强，使豆包、Kimi、ChatGPT 等主流 AI 工具能准确回答潮青活动信息。
        </p>
        <a href="https://www.wayneinsightspring.com/" target="_blank" rel="noopener noreferrer" className="button primary">访问 WIS 官网</a>
      </div>
      <SectionTitle eyebrow="Partnership" title="其他合作方向" />
      <div className="focus-grid">
        {businessItems.map((item) => (
          <article className="focus-card" key={item.title}>
            <h3>{item.title}</h3>
          </article>
        ))}
      </div>
      <div className="action-band">
        <p>合作信息需要秘书处或 Roland 审核后发布；未确认前不展示机构名称和联系人。</p>
        <button className="button primary" type="button" onClick={() => navigate("/contact")}>提交合作咨询</button>
      </div>
    </PageShell>
  );
}

function ResourcesPage({ navigate }) {
  const [query, setQuery] = useState("");
  const filtered = resourceItems.filter((item) => {
    const text = `${item.title} ${item.type} ${item.summary} ${item.status}`.toLowerCase();
    return text.includes(query.trim().toLowerCase());
  });

  return (
    <PageShell eyebrow="Resources" title="资源中心" image="/assets/ceremony-speech.webp">
      <SectionTitle eyebrow="Documents" title="公开资料与待补清单" text="资源中心只放能确认的资料；不能确认的资料保留待确认句式，方便明早逐条补齐。" />
      <label className="resource-search">
        搜索资源
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="输入章程、活动、合作、待确认等关键词" />
      </label>
      <div className="resource-list">
        {filtered.map((item) => (
          <article key={item.title}>
            <span>{item.type} · {item.status}</span>
            <h3>{item.title}</h3>
            <p>{item.summary}</p>
            <button className="text-button" type="button" onClick={() => navigate(item.href)}>查看</button>
          </article>
        ))}
        {filtered.length === 0 && (
          <article>
            <h3>暂无匹配资料</h3>
            <p>换一个关键词，或把缺少的信息发给青年会统一补充。</p>
          </article>
        )}
      </div>
    </PageShell>
  );
}

function ContactPage() {
  const sendContactEmail = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name")?.toString().trim() || "未填写";
    const phone = data.get("phone")?.toString().trim() || "未填写";
    const email = data.get("email")?.toString().trim() || "未填写";
    const topic = data.get("topic")?.toString().trim() || "官网咨询";
    const message = data.get("message")?.toString().trim() || "未填写";
    const subject = `官网咨询：${topic} - ${name}`;
    const body = [
      "以下内容由官网联系表单生成：",
      "",
      `姓名：${name}`,
      `联系电话：${phone}`,
      `邮箱：${email}`,
      `咨询主题：${topic}`,
      "",
      "详细内容：",
      message,
    ].join("\n");
    const href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = href;
  };

  const contactCards = [
    {
      title: "邮箱咨询",
      detail: site.email,
      desc: "活动合作、入会咨询、媒体联络与商务洽询。",
      isEmail: true,
    },
    {
      title: "社群联络",
      detail: "微信公众号：澳大利亚潮汕青年协会",
      desc: "微信内搜索公众号名称，获取活动通知与文章更新。",
    },
    {
      title: "办公地址",
      detail: site.address,
      desc: "邮寄与到访前请先邮件或电话预约，以便安排接待。",
    },
  ];

  return (
    <section className="profile-page contact-page">
      <div className="profile-page-hero">
        <p>Contact</p>
        <h1>联系我们</h1>
        <span>欢迎联系澳大利亚潮汕青年会。无论是活动合作、入会咨询、志愿者参与或媒体沟通，我们都将尽快回复。</span>
      </div>

      <section className="online-contact-cards">
        {contactCards.map((item) => (
          <article key={item.title}>
            <h2>{item.title}</h2>
            {item.isEmail ? (
              <a href={`mailto:${item.detail}`}>{item.detail}</a>
            ) : (
              <strong>{item.detail}</strong>
            )}
            <p>{item.desc}</p>
          </article>
        ))}
      </section>

      <section className="online-contact-main">
        <form className="online-contact-form" onSubmit={sendContactEmail}>
          <h2>邮件咨询</h2>
          <p>填写后将打开邮件客户端，并自动带入你的联系方式与需求；我们一般在 3–5 个工作日内回复（公共假期顺延）。</p>
          <div className="online-form-row">
            <label>
              姓名
              <input name="name" type="text" placeholder="请输入姓名" required />
            </label>
            <label>
              联系电话
              <input name="phone" type="tel" placeholder="请输入电话" />
            </label>
          </div>
          <label>
            邮箱
            <input name="email" type="email" placeholder={site.email} required />
          </label>
          <label>
            咨询主题
            <input name="topic" type="text" placeholder="例如：入会申请 / 商务合作 / 活动咨询" required />
          </label>
          <label>
            详细内容
            <textarea name="message" rows="5" placeholder="请填写你的需求与背景信息" required />
          </label>
          <button className="online-contact-submit" type="submit">打开邮件发送</button>
        </form>

        <aside className="online-office-panel">
          <h2>办公与会务</h2>
          <p><strong>办公时间：</strong>周一至周五 10:00 – 18:00（澳洲东部时间，节假日以公告为准）</p>
          <p><strong>会务支持：</strong>活动策划、志愿者协调、青年项目与对外联络。</p>
          <p><strong>品牌合作：</strong>欢迎企业与机构共创公益与文化项目。</p>
          <div className="online-address-box">
            <strong>邮寄地址：</strong>
            <span>{site.address}</span>
          </div>
          <div className="online-mail-box">
            <h3>直接发信</h3>
            <p>
              也可直接发送邮件至
              <a href={`mailto:${site.email}`}>{site.email}</a>
              ，请在标题中注明「咨询主题 + 姓名」。
            </p>
          </div>
        </aside>
      </section>
    </section>
  );
}

function PageShell({ eyebrow, title, image, children }) {
  return (
    <>
      <section className="page-hero">
        <div className="container page-hero-grid">
          <div>
            <p className="eyebrow">{eyebrow}</p>
            <h1>{title}</h1>
            <p>{site.description}</p>
          </div>
          <img src={image} alt={title} />
        </div>
      </section>
      <div className="container page-content">{children}</div>
    </>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return (
    <div className="section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Footer({ navigate }) {
  const quickLinks = [
    { label: "关于我们", href: "/about" },
    { label: "组织架构", href: "/organization" },
    { label: "总会新闻", href: "/new" },
    { label: "联络我们", href: "/contact" },
  ];
  const friendLinks = [
    { label: "国际潮团总会", href: "https://teochew1981.com/" },
    { label: "国际潮青联合会", href: "http://www.teoyouth.com" },
  ];

  return (
    <footer className="site-footer">
      <div className="site-footer-grid">
        <div>
          <button className="site-footer-title" type="button" onClick={() => navigate("/")}>澳大利亚潮汕青年会</button>
          <p>联结在澳潮汕青年与社区朋友，传承文化、服务社区、赋能青年<br />澳大利亚潮汕青年会官方网站。</p>
        </div>
        <nav className="site-footer-links" aria-label="常用链接">
          <span>常用链接</span>
          {quickLinks.map((item) => (
            <button key={item.href} type="button" onClick={() => navigate(item.href)}>{item.label}</button>
          ))}
        </nav>
        <nav className="site-footer-links" aria-label="友情链接">
          <span>友情链接</span>
          {friendLinks.map((item) => (
            <a key={item.href} href={item.href} target="_blank" rel="noreferrer">{item.label}</a>
          ))}
        </nav>
        <div className="site-footer-contact">
          <span>联络</span>
          <dl>
            <div>
              <dt>地址</dt>
              <dd>{site.address}</dd>
            </div>
            <div>
              <dt>电邮</dt>
              <dd><a href={`mailto:${site.email}`}>{site.email}</a></dd>
            </div>
          </dl>
        </div>
      </div>
      <p className="site-footer-copy">© {new Date().getFullYear()} 澳大利亚潮汕青年会 · <a href={`mailto:${site.email}`}>{site.email}</a></p>
    </footer>
  );
}

createRoot(document.getElementById("root")).render(<App />);
