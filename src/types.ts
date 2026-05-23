export interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    avatar: string;
    bio?: string;
  };
  date: string;
  readTime: string;
  category: string;
  image: string;
  featured?: boolean;
  videoUrl?: string; // For mockup video post support
  faqs?: { question: string; answer: string }[];
  tags: string[];
  bangla?: boolean; // Bangla translation indicator
}

export interface BannerAd {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  imageUrl: string;
  linkUrl: string;
  bgColor: string;
}

export interface AdWidget {
  id: string;
  name: string;
  size: string; // "728x90" | "300x250" | "320x50" etc.
  provider: "google-adsense" | "custom-html" | "sponsor";
  customImage?: string;
  clicks: number;
  impressions: number;
  estimatedEarnings: number;
  visible: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  language: "en" | "bn";
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  fontFamilyFamily: "inter-poppins" | "siliguri-noto";
  metaTitle: string;
  metaDescription: string;
  authorName: string;
  isDarkMode: boolean;
  enableLazyLoad: boolean;
  automaticAds: boolean;
  robotsTxt: string;
}

export interface Comment {
  id: string;
  postId: string;
  author: string;
  email: string;
  text: string;
  date: string;
  approved: boolean;
}
