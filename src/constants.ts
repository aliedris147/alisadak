import { Post, BannerAd, SiteConfig } from './types';

export const DEFAULT_SITE_CONFIG: SiteConfig = {
  name: 'SonarTech Blog',
  tagline: 'সম্পূর্ণ SEO Friendly এবং Core Web Vitals রেডি প্রফেশনাল ব্লগ থীম।',
  language: 'bn', // Default is Bengali to showcase Siliguri & Noto Sans Bengali
  primaryColor: '#0F172A',
  secondaryColor: '#2563EB',
  accentColor: '#F59E0B',
  fontFamilyFamily: 'siliguri-noto',
  metaTitle: 'সোনারটেক - বাংলা টেকনোলজি ও লাইফস্টাইল ব্লগ থীম',
  metaDescription: 'সোনারটেক হলো একটি অ্যাডভান্সড ডাইনামিক এসইও ফ্রেন্ডলি ব্লগ থীম, যা গুগল স্পীড এবং অ্যাডসেন্স অপ্টিমাইজড।',
  authorName: 'এডমিন ও লেখকমণ্ডলী',
  isDarkMode: false,
  enableLazyLoad: true,
  automaticAds: true,
  robotsTxt: 'User-agent: *\nDisallow: /wp-admin/\nAllow: /\n\nSitemap: https://sonartech-theme.com/sitemap.xml',
};

export const SITE_CONFIG = {
  name: DEFAULT_SITE_CONFIG.name,
  tagline: DEFAULT_SITE_CONFIG.tagline,
  links: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
  },
};

export const MOCK_SLIDER_BANNERS: BannerAd[] = [
  {
    id: 'slide-1',
    title: 'প্রিমিয়াম রেসপনসিভ এসইও ব্লগ থীম!',
    subtitle: '১০০% স্পিড অপ্টিমাইজেশন ও মেগা মেনু সহ এডসেন্স ফ্রেন্ডলি লেআউট।',
    buttonText: 'এখনই ডেমো দেখুন',
    imageUrl: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1200',
    linkUrl: '#get-theme',
    bgColor: 'from-slate-900 via-blue-900 to-indigo-950',
  },
  {
    id: 'slide-2',
    title: 'গুগল কোর ওয়েব ভাইটালস (Core Web Vitals) এক্সপার্ট',
    subtitle: '০.৫ সেকেন্ড লোডিং স্পিড নিয়ে সার্চ রেঙ্কিং-এ সবার উপরে থাকুন।',
    buttonText: 'স্পিড টেস্ট করুন',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    linkUrl: '#pagespeed',
    bgColor: 'from-blue-950 via-teal-900 to-slate-900',
  },
  {
    id: 'slide-3',
    title: 'অ্যাডসেন্স রেডি হাই-কনভার্সন অ্যাড স্পট',
    subtitle: 'হেডার, সাইডবার, ইন-কনটেন্ট এবং মোবাইল স্টিকি বিজ্ঞাপনের নিখুঁত সমন্বয়।',
    buttonText: 'অ্যাড লেআউট দেখুন',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    linkUrl: '#adscale',
    bgColor: 'from-slate-950 via-indigo-900 to-slate-900',
  },
  {
    id: 'slide-4',
    title: 'ডাবল রেভিনিউ আর্নিং সিস্টেম',
    subtitle: 'ভিডিও পোস্ট এবং শর্টস স্ক্রোলারের মাধ্যমে ব্যবহারকারীকে রাখুন যুক্ত।',
    buttonText: 'শর্টস প্লে করুন',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1200',
    linkUrl: '#shorts',
    bgColor: 'from-purple-950 via-pink-900 to-indigo-950',
  },
  {
    id: 'slide-5',
    title: 'এআই ভিত্তিক ইনস্ট্যান্ট আর্টিকেল সাজেশন',
    subtitle: 'একটি ক্লিপবোর্ড টপিকে সম্পূর্ণ এসইও কিওয়ার্ড ম্যাপ করার রোবোটিক ফিচার।',
    buttonText: 'এআই টেস্ট ক্রিয়েটর',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=1200',
    linkUrl: '#ai-box',
    bgColor: 'from-slate-900 via-violet-950 to-emerald-950',
  },
];

export const MOCK_POSTS: Post[] = [
  {
    id: 'post-1',
    title: '২০২৬ সালে গুগলে ১ নম্বর রেঙ্ক পাওয়ার ১০টি কার্যকরী অন-পেজ এসইও টিপস',
    excerpt: 'গুগলের প্রতিনিয়ত এআই আপডেটের যুগে অন-পেজ এসইও আগের চেয়ে অনেক বেশি সূক্ষ্ম ও গুরুত্বপূর্ণ হয়ে উঠেছে। চলুন বিষয়গুলো সহজ বাংলায় জেনে নিই।',
    content: `গুগলের সার্চ ইঞ্জিন এখন অনেক বেশি আধুনিক। ২০১৬ সাল থেকে ২০২৬ সালের দূরত্বে এসে এখন সরাসরি কিওয়ার্ড ব্যবহারের চেয়ে **কনটেন্ট ডেনসিটি** এবং **ইউজার সার্কেট ইনটেন্ট** বেশি গুরুত্বপূর্ণ।

## ১. কিওয়ার্ড অপ্টিমাইজেশন ও এলএসআই (LSI)
আপনার আর্টিকেলের প্রথম ১০০ শব্দের মধ্যে মূল কিওয়ার্ড রাখুন। তবে একই শব্দের বারবার ব্যবহার পরিহার করুন। পরিবর্তে রিলেটেড সিম্যান্টিক বা কিওয়ার্ড সমার্থক শব্দ (LSI Keywords) ব্যবহার করুন যা সার্চ ক্রলারকে কনটেন্টের গভীরতা বোঝাবে।

## ২. হেডিং স্ট্রাকচার (H1, H2, H3) যথাযথ ব্যবহার
একটি পেজে কেবলমাত্র একটিই H1 ট্যাগ থাকবে যা সাধারণত আর্টিকেলের প্রধান টাইটেল। সাব-সেকশনগুলোর জন্য পর্যায়ক্রমে H2 এবং H3 ট্যাগ ব্যবহার করুন। এটি পাঠকের পড়ার সুবিধা যেমন বাড়ায়, তেমনই গুগলের রিডাবিলিটি ইনডেক্স ঠিক রাখে।

## ৩. লাস্ট-আপডেট ও স্কিমা মার্কআপ (Schema Markup)
অনুসন্ধান ফলাফলে রিচ স্নিপেট (Rich Snippet) পাওয়ার জন্য আর্টিকেলে FAQ এবং Article Schema ইন্টিগ্রেট করা অত্যাবশ্যক। এটি অটোমেটিক স্কিমা কোড জেনারেটরকে ট্রিগার করে।

## ৪. ফাস্ট লোডিং এবং রেসপনসিভ লেআউট (Core Web Vitals)
আপনার থীম যদি মোবাইল-ফ্রেন্ডলি না হয় কিংবা লোড হতে যদি ৩ সেকেন্ডের বেশি সময় নেয়, তবে গুগল র‌্যাঙ্কিং হারাতে বাধ্য। এই থীমটি Lightweight CSS এবং WebP ফরমেট অটো-কনভার্ট সাপোর্ট সহ ডিজাইন করা হয়েছে।`,
    author: {
      name: 'আসাদুল্লাহিল গালিব',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Galib',
      bio: 'একজন পেশাদার এসইও এক্সপার্ট ও ব্লগ পাবলিশার। দীর্ঘ ১০ বছর ধরে টেকনোলজি ও ডিজিটাল মার্কেটিং নিয়ে ব্লগিং করছেন।',
    },
    date: '2026-05-22',
    readTime: '৫ মিনিট পড়ার সময়',
    category: 'এসইও গাইড',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    featured: true,
    tags: ['SEO', 'OnPage', 'GoogleRanking', 'BanglaTech'],
    bangla: true,
    faqs: [
      {
        question: 'এসইও স্কিমা মার্কআপ কেন দরকার?',
        answer: 'স্কিমা মার্কআপ গুগলের ক্রলারদের বোঝায় আপনার আর্টিকেলের কোন অংশে কী তথ্য আছে। এতে গুগলের পেজ ইনডেক্সিং এবং সার্চে স্টার রেটিং পাওয়ার হার বাড়ে।'
      },
      {
        question: 'এই ব্লগ থীম কি গুগল এডসেন্স ফ্রেন্ডলি?',
        answer: 'হ্যাঁ! থীমটিতে ডেডিকেটেড হাই-কনভার্টিং এড স্পটস রয়েছে, যা গুগল পলিসি লঙ্ঘন না করেই বেশি সিপিসি (CPC) দেয়।'
      }
    ]
  },
  {
    id: 'post-2',
    title: 'ডোমেইন হোস্টিং কেনার পূর্বে যে ৫টি মারাত্মক ভুল কখনোই করা যাবে না!',
    excerpt: 'অনলাইনে নিজের বা ব্যবসার কাজের জন্য প্রথম ডোমেইন এবং হোস্টিং কিনতে যাচ্ছেন? তাহলে কম বাজেটে ভুল হোস্টিং কিনে পস্তানোর আগে এই টিপসগুলো পড়ুন।',
    content: `অনেকেই সাশ্রয় করতে গিয়ে শেয়ার্ড হোস্টিং-এর এমন সাবস্ক্রিপশন নেন, যাতে সাইট একটু ভিজিটর পেলেই ডাউন হয়ে যায়। এটি আপনার ওয়েবসাইটের ভবিষ্যৎ কেরিয়ার সম্পূর্ণ ধ্বংস করে দিতে পারে।

## ১. সস্তা হোস্টিংয়ের ফাঁদ (Avoid Cheap Shared Server trap)
বিকাশে কম দামের লোভ দেখিয়ে অনেকেই স্লো ব্যান্ডউইথ এবং মাদারবোর্ড রিসোর্স লিমিটেডের হোস্টিং বিক্রি করে। এগুলো নিলে আপনার সাইটের TTFB (Time To First Byte) অনেক বেশি হয়ে যাবে, যার ফলে সাইট লোড হতে ৭-৮ সেকেন্ড লেগে যাবে।

## ২. লাইভ চ্যাট সাপোর্ট না চেক করা
হোস্টিং এ রাতে ৩টায় ডাটাবেজ ক্র্যাশ হলে আপনি কার কথা শুনবেন? তাই ২৪/৭ লাইভ চ্যাট সাপোর্ট আছে কি না দেখে ট্রায়াল দিন।

## ৩. সঠিক ব্যাকআপ সিস্টেম নির্বাচন (Daily Auto Backup)
যে হোস্টিং প্রভাইডার ফ্রিতে অন্তত সাপ্তাহিক দূরবর্তী সার্ভার ব্যকআপ (Remote Backup) দেয় না, তাদের থেকে দূরে থাকুন।`,
    author: {
      name: 'নাসিফ মোস্তফা',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nasif',
      bio: 'সিস্টেম অ্যাডমিনিস্ট্রেটর এবং ক্লাউড আর্কিটেক্ট। ডোমেন অ্যান্ড ওয়েব ইনফ্রাস্ট্রাকচার বিশেষজ্ঞ।',
    },
    date: '2026-05-20',
    readTime: '৪ মিনিট পড়ার সময়',
    category: 'হোস্টিং গাইড',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800',
    tags: ['Domain', 'Hosting', 'SpeedOptimization', 'WebDevelopment'],
    bangla: true,
    faqs: [
      {
        question: 'কোন হোস্টিং ব্লগের জন্য সেরা?',
        answer: 'নতুন ব্লগের জন্য ক্লাউড হোস্টিং বা ভালো মানের এলএসইউএস (Hostinger, Namecheap) ক্লাউড হোস্টিং সেরা যা ট্রাফিকের চাপ সামলাতে পারে।'
      }
    ]
  },
  {
    id: 'post-3',
    title: 'The Rise of Next-Gen CSS: Exploring Core Web Vitals Optimization in 2026',
    excerpt: 'How modern CSS execution and zero-runtime stylesheet generation are reshaping the web performance metrics and SEO dominance.',
    content: `Web performance is no longer just a technical luxury; it is the cornerstone of search engine valuation. With the recent updates in Google's ranking signals, Interaction to Next Paint (INP) has completely superseded old parameters.

## The Paradigm Shift to Zero-Runtime CSS
Runtime CSS in JS libraries inject styles dynamically during JS parsing. However, this causes blocking behavior on the main thread, lowering the mobile responsive score dramatically. Modern frameworks compiled with strict Tailwind classes solve this by pre-building exact stylesheets.

### 1. Eliminating Cumulative Layout Shift (CLS)
To achieve a CLS of 0.0, images and ad units must strictly declared logical dimensions. Responsive layouts must hold skeleton structures before server assets resolve.

### 2. Reducing First Input Delay with WebP formats
Always serve images with WebP or AVIF output. Our theme implements fully responsive adaptive source tags, meaning dynamic layout sizing is handled dynamically in real-time.`,
    author: {
      name: 'Elena Vance',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      bio: 'Principal Frontend Engineer passionate about web responsiveness, clean styling patterns, and Core Web Vitals optimizer.',
    },
    date: '2026-05-18',
    readTime: '6 min read',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
    tags: ['CSS', 'WebSpeed', 'CLS', 'Frontend'],
    bangla: false,
    faqs: [
      {
        question: 'What is Next-Gen CSS optimization?',
        answer: 'It represents compiling styles to raw static utility code where zero overhead JavaScript is introduced at runtime, ensuring pristine INP metrics.'
      }
    ]
  },
  {
    id: 'post-4',
    title: 'ভিডিও ব্লগিংয়ের ভবিষ্যৎ: কীভাবে ইউটিউব ও ফেসবুকের পাশাপাশি নিজস্ব পোর্টালে ট্রাফিক বাড়াবেন?',
    excerpt: 'শুধুমাত্র সোশ্যাল মিডিয়া অ্যালগরিদমের উপর নির্ভর করে ভিডিও ব্লগিং ক্যারিয়ার টিকিয়ে রাখা সম্ভব নয়। কেন নিজের ব্রান্ডেড সাইট তৈরি করা দরকার, জানুন বিস্তারিত।',
    content: `সোশ্যাল মিডিয়া প্ল্যাটফর্মগুলো নিয়মিত তাদের রিচ কমানোর নীতিমালা আপডেট করে থাকে। আজকে যে পেজে মিলিয়ন ভিউ হচ্ছে, কালকে সেটি জিরো রিচ হয়ে যেতে পারে। কিন্তু নিজের একটি ভিডিও ব্লগ থীম থাকলে পাঠক ও দর্শকরা সরাসরি আপনার ডাটাবেজে যুক্ত থাকবে।

## ভিডিও ব্লগিংয়ের জন্য বিশেষ ভিডিও পোস্ট ফিচারের প্রয়োজনীয়তা
আমাদের থীমটিতে ভিডিও পোস্টের জন্য চমৎকার একটি কাস্টম ভিডিও প্লেয়ার ইমপ্লিমেন্ট করা আছে। আপনি যেকোনো ইউটিউব / এমপিফোর ভিডিও সরাসরি আর্টিকেলের টপে ফিচার করতে পারেন। 

### ১. ভিডিও অপ্টিমাইজড স্কিমা মার্কআপ (VideoObject Schema)
গুগল সার্চে আপনার আর্টিকেলের পাশে একটি প্লে বোতাম এবং ছোট থাম্বনেইল প্রদর্শন করানোর জন্য ভিডিও স্কিমা খুবই উপকারি। এটি আপনার ক্লিক থ্রু রেট বা CTR দ্বিগুণ করে দেয়।

### ২. শর্ট ভিডিও গ্যাজেট (Sidebar Short Videos Widget)
আজকের ব্যস্ত সময় দর্শকরা টিকটক/শর্টস স্ক্রোল করতে ভালোবাসে। আপনার সাইটের ডানপাশের সাইডবারে রিলস/শর্টস উইজেট পাঠককে দীর্ঘ সময় সাইটে ধরে রাখবে, যা গুগলে বাউন্স রেট কমিয়ে দেবে।`,
    author: {
      name: 'জাহিদ হাসান',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zahid',
      bio: 'একজন ফ্রিল্যান্স ভিডিও ক্রিয়েটর ও কন্টেন্ট স্ট্র্যাটেজিস্ট। নিজস্ব টেকপোর্টাল পরিচালনা করছেন।',
    },
    date: '2026-05-15',
    readTime: '৩ মিনিট পড়ার সময়',
    category: 'ভিডিও মার্কেটিং',
    image: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?auto=format&fit=crop&q=80&w=800',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-coding-on-a-laptop-computer-31356-large.mp4',
    tags: ['VideoSchema', 'PassiveIncome', 'Shorts', 'BloggingTips'],
    bangla: true,
    faqs: [
      {
        question: 'ভিডিও পোস্ট কি ওয়েবসাইট স্লো করে না?',
        answer: 'আমাদের ভিডিও পোস্টগুলো লেজি লোড টেকনিক ব্যবহার করে এবং স্ক্রোল ডাউন না করা পর্যন্ত প্লেয়ার ব্যাকস্টেজে থাকে, তাই স্পিডে কোনো প্রভাব পড়ে না।'
      }
    ]
  },
  {
    id: 'post-5',
    title: 'How to Target High CPC Tech Niches for AdSense Arbitrage & Pure SEO Growth',
    excerpt: 'Maximize your display ad revenue by aligning semantic user clusters with financial, cloud computing, online insurance, and high premium search queries.',
    content: `AdSense Arbitrage and pure technical content writing are highly dependent on target Geographic CPC markets. If you write articles that speak of general topics, you will end up with sub-par RPM.

## Understanding AdSense Key Factors
Search engines analyze the context of your article to match higher-paying ad clusters. High CPM keywords like VPN solutions, personal injury attorneys, or corporate dynamic hosting pay 10x higher rates compared to casual recipe categories.

### 1. Intent Mapping
Always map out user queries using transactional intentions. If a customer is looking to "buy cheap NVMe hosting in Dhaka", the surrounding horizontal and sidebar ad blocks will dynamically serve high CPC hosting bids.

### 2. High Impact Ad Layout Placements
Our layout places optimized ad banners:
- A responsive Horizontal Top Leaderboard (728x90) for immediate impressions.
- Sticky responsive sidebar widgets (300x250) for maximum click engagement.
- Auto-injected paragraph body ads to intercept user eyes naturally.`,
    author: {
      name: 'Sabrina Rahman',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sabrina',
      bio: 'AdSense Optimization professional and niche digital analyst with a proven history of scaling dynamic content sites.',
    },
    date: '2026-05-12',
    readTime: '7 min read',
    category: 'Finance',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    tags: ['AdSense', 'NicheBlogging', 'CPC', 'SEOArbitrage'],
    bangla: false,
    faqs: [
      {
        question: 'How do I boost my blog CTR safely?',
        answer: 'Place clean responsive ad setups with genuine padding and explicit borders to avoid Google warnings on dynamic layout shifts or accidental clicks.'
      }
    ]
  }
];

export const MOCK_SHORTS = [
  {
    id: 's1',
    title: 'How Google indexing works under 60 seconds ⚡',
    views: '45.2K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-operating-a-tablet-computer-39824-large.mp4',
    author: 'আসাদুল্লাহিল গালিব',
  },
  {
    id: 's2',
    title: 'বাংলায় Core Web Vitals ঠিক করার কিলার হ্যাক! 🚀',
    views: '32.1K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-software-developer-working-on-his-computer-38556-large.mp4',
    author: 'নাসিফ মোস্তফা',
  },
  {
    id: 's3',
    title: 'The secret high CPC niches revealed 💰',
    views: '89.4K',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-man-typing-on-a-keyboard-39832-large.mp4',
    author: 'Sabrina Rahman',
  }
];
