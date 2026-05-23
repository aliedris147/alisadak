import { useState } from 'react';
import { 
  Settings, Sliders, Palette, FileText, Layout, Percent, RefreshCw, 
  Trash2, Plus, Sparkles, Check, Globe, AlertCircle, Eye, FileCode, CheckCircle2
} from 'lucide-react';
import { SiteConfig, BannerAd, Post, AdWidget } from '../types';

interface ThemeCustomizerProps {
  config: SiteConfig;
  onChangeConfig: (config: SiteConfig) => void;
  banners: BannerAd[];
  onChangeBanners: (banners: BannerAd[]) => void;
  onAddPost: (post: Post) => void;
  posts: Post[];
  onDeletePost: (id: string) => void;
  adStats: {
    clicks: number;
    impressions: number;
    earnings: number;
  };
  onResetAdStats: () => void;
}

const COLOR_PRESETS = [
  {
    name: 'করপোরেট স্লেট (Slate Blue)',
    primary: '#0F172A',
    secondary: '#2563EB',
    accent: '#F59E0B',
  },
  {
    name: 'রয়্যাল রেড (Crimson Royal)',
    primary: '#1E1B4B',
    secondary: '#DC2626',
    accent: '#10B981',
  },
  {
    name: 'ফার্স্ট গ্রিন (Emerald Forest)',
    primary: '#064E3B',
    secondary: '#059669',
    accent: '#D97706',
  },
  {
    name: 'অ্যান্ট্রাকাইট ডার্ক (Cosmic Charcoal)',
    primary: '#111111',
    secondary: '#4F46E5',
    accent: '#F43F5E',
  }
];

export function ThemeCustomizer({
  config,
  onChangeConfig,
  banners,
  onChangeBanners,
  onAddPost,
  posts,
  onDeletePost,
  adStats,
  onResetAdStats,
}: ThemeCustomizerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'general' | 'color' | 'slider' | 'seo' | 'ads' | 'ai'>('general');

  // AI Generation Simulation State
  const [aiTopic, setAiTopic] = useState('');
  const [aiLang, setAiLang] = useState<'bn' | 'en'>('bn');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState<Partial<Post> | null>(null);

  const applyColorPreset = (preset: typeof COLOR_PRESETS[0]) => {
    onChangeConfig({
      ...config,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
    });
  };

  const handleBannerChange = (index: number, field: keyof BannerAd, value: string) => {
    const updated = [...banners];
    updated[index] = { ...updated[index], [field]: value };
    onChangeBanners(updated);
  };

  // Generate Article outlining logic (Simulated local intelligence)
  const handleAIGenerate = () => {
    if (!aiTopic.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      let title = '';
      let excerpt = '';
      let category = '';
      let image = '';
      let content = '';
      let tags: string[] = [];
      let faqs: { question: string; answer: string }[] = [];

      if (aiLang === 'bn') {
        category = 'এআই টেকনোলজি';
        title = `২০২৬ সালে ${aiTopic} এর রূপান্তর এবং আমাদের করণীয়`;
        excerpt = `কৃত্রিম বুদ্ধিমত্তা বা এআই প্রতিনিয়ত আমাদের জীবনমান সহজ করছে। আজ আমরা কথা বলবো কীভাবে ${aiTopic} বিষয়টিকে আমরা ডিজিটাল টেকসই করতে পারি।`;
        image = 'https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&q=80&w=800';
        tags = ['AI', aiTopic, 'TechTrends', 'BanglaTech'];
        content = `আজকের প্রযুক্তিনির্ভর বিশ্বে প্রতিটি সেক্টরে প্রযুক্তির ছোঁয়া পড়েছে। বিশেষ করে **${aiTopic}** এর গুরুত্ব দিন দিন বাড়ছে।

## কেন ${aiTopic} অত্যন্ত গুরুত্বপূর্ণ?
গবেষণায় দেখা গেছে যে ব্যবসা বা ব্যক্তি সঠিক উপায়ে প্রযুক্তির ব্যবহার করতে পারে, তাদের দক্ষতা ৩০০% বৃদ্ধি পায়। 

### ১. সময় ও অর্থের সাশ্রয়
ক্লান্তিহীন রোবোটিক পদ্ধতি মানুষের দৈনন্দিন রুটিন কাজগুলো কয়েক সেকেন্ডে সমাধান করে দিচ্ছে।

### ২. সঠিক সিদ্ধান্ত গ্রহণ
এআই এবং মেশিন লার্নিং সঠিক ডেটা অ্যানালিটিকস প্রদান করে ভবিষ্যৎ পলিসি ম্যাপ করতে সহায়তা করে।

উপসংহারে বলা যায়, এআইকে ভয় না পেয়ে এটিকে নিজের সহযোগি হিসেবে গ্রহণ করাই বুদ্ধিমানের কাজ।`;
        faqs = [
          {
            question: `কীভাবে ${aiTopic} শিখবো?`,
            answer: `ইন্টারনেট বা বিভিন্ন ফ্রি সোর্সের মাধ্যমে এই বিষয়ে প্রাথমিক ধারণা অর্জন করে রিয়েল প্রজেক্টে কাজ শুরু করতে পারেন।`
          }
        ];
      } else {
        category = 'AI Tech';
        title = `The Complete Practical SEO Guide for scaling "${aiTopic}" in 2026`;
        excerpt = `Optimize your dynamic web pages, semantic keywords integration, and core indexing algorithms to dominate the search results for ${aiTopic}.`;
        image = 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800';
        tags = ['AI', aiTopic.replace(/\s+/g, ''), 'SEO2026', 'GoogleRank'];
        content = `The landscape of digital publishing is evolving at an unprecedented pace. Scaling **${aiTopic}** requires advanced, crawlable, and responsive layouts.

## Understanding Semantic Search Rules
Search engine crawlers analyze search phrases as concepts rather than mechanical exact keyword tokens.

### Key Performance Pillars:
1. Zero Cumulative Layout Shifting (CLS) with lightweight styled components.
2. Direct content clarity in the first viewport.

Always map out your topics with high precision and rich formatting.`;
        faqs = [
          {
            question: `What makes ${aiTopic} stand out?`,
            answer: `It aligns user informational expectations immediately with crisp layouts and direct structured facts.`
          }
        ];
      }

      setAiOutput({
        id: `ai-post-${Date.now()}`,
        title,
        excerpt,
        content,
        category,
        image,
        date: new Date().toISOString().substring(0, 10),
        readTime: '৫ মিনিট পড়ার সময়',
        tags,
        faqs,
        bangla: aiLang === 'bn',
        author: {
          name: 'SonarAI Writer',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=SonarAI',
          bio: 'গুগল জেমিনি এপিআই দ্বারা চালিত একটি কৃত্রিম বুদ্ধিমত্তা যা এসইও অপ্টিমাইজড আর্টিকেল লিখতে পারদর্শী।',
        }
      });
      setIsGenerating(false);
    }, 1800);
  };

  const publishAiPost = () => {
    if (aiOutput) {
      onAddPost(aiOutput as Post);
      setAiOutput(null);
      setAiTopic('');
      alert('সফলভাবে এআই আর্টিকেলটি পাবলিশ হয়েছে! এটি এখন হোমপেজ এবং ব্লগ গ্রিডের প্রথমে দেখা যাবে।');
    }
  };

  const handleDownloadSitemapXml = () => {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xmlContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    xmlContent += `  <!-- Generated dynamically in real-time. Total URL count: ${posts.length + 1} -->\n`;
    xmlContent += '  <url>\n';
    xmlContent += '    <loc>https://sonartech-theme.com/</loc>\n';
    xmlContent += '    <changefreq>daily</changefreq>\n';
    xmlContent += '    <priority>1.0</priority>\n';
    xmlContent += `    <lastmod>${new Date().toISOString().substring(0, 10)}</lastmod>\n`;
    xmlContent += '  </url>\n';
    
    posts.forEach(p => {
      const safeCategory = encodeURIComponent(p.category || 'general');
      const safeId = encodeURIComponent(p.id);
      xmlContent += '  <url>\n';
      xmlContent += `    <loc>https://sonartech-theme.com/category/${safeCategory}/${safeId}</loc>\n`;
      xmlContent += `    <lastmod>${p.date || new Date().toISOString().substring(0, 10)}</lastmod>\n`;
      xmlContent += '    <changefreq>weekly</changefreq>\n';
      xmlContent += '    <priority>0.8</priority>\n';
      xmlContent += '  </url>\n';
    });
    
    xmlContent += '</urlset>';

    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sitemap.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadRssXml = () => {
    let xmlContent = '<?xml version="1.0" encoding="UTF-8" ?>\n';
    xmlContent += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
    xmlContent += '<channel>\n';
    xmlContent += `  <title>${config.name || 'SonarTech SEO Theme'}</title>\n`;
    xmlContent += '  <link>https://sonartech-theme.com</link>\n';
    xmlContent += '  <description>এসইও পারফরমেন্স, ডাইনামিক বিজ্ঞাপন আর্নিং এবং সাইটম্যাপ ইনডেক্সিং ভিউ রিয়েল-টাইমে</description>\n';
    xmlContent += '  <language>bn-BD</language>\n';
    xmlContent += `  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
    
    posts.forEach(p => {
      const safeCategory = encodeURIComponent(p.category || 'general');
      const safeId = encodeURIComponent(p.id);
      xmlContent += '  <item>\n';
      xmlContent += `    <title>${p.title}</title>\n`;
      xmlContent += `    <link>https://sonartech-theme.com/category/${safeCategory}/${safeId}</link>\n`;
      xmlContent += `    <pubDate>${p.date ? new Date(p.date).toUTCString() : new Date().toUTCString()}</pubDate>\n`;
      xmlContent += `    <description><![CDATA[${p.excerpt || ''}]]></description>\n`;
      xmlContent += '  </item>\n';
    });
    
    xmlContent += '</channel>\n';
    xmlContent += '</rss>';

    const blob = new Blob([xmlContent], { type: 'application/xml;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'feed.xml');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* Floating Control Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-6 z-50 p-4 bg-indigo-600 hover:bg-slate-900 text-white rounded-full shadow-2xl flex items-center justify-center gap-2 group transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white"
        id="admin-menu-toggle"
      >
        <Settings className="w-5 h-5 animate-spin-slow" />
        <span className="text-xs font-bold uppercase tracking-wider max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-out whitespace-nowrap">
          এডমিন প্যানেল
        </span>
      </button>

      {/* Slide-out Panel Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity" 
            onClick={() => setIsOpen(false)}
          />

          {/* Draggable/Slide drawer */}
          <div className="relative w-full max-w-2xl bg-white h-full shadow-2xl flex flex-col z-10 animate-in overflow-hidden">
            {/* Drawer Header */}
            <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between border-b border-slate-700">
              <div className="flex items-center gap-3">
                <Settings className="w-6 h-6 text-indigo-400" />
                <div>
                  <h3 className="text-lg font-bold tracking-tight">SonarTech Admin & Customizer</h3>
                  <p className="text-[11px] text-slate-400">থীম রিয়েল-টাইম এডিটর ও বিজ্ঞাপন মডারেটর</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 px-3 bg-slate-800 hover:bg-red-600 rounded text-xs transition-colors cursor-pointer"
              >
                বন্ধ করুন (X)
              </button>
            </div>

            {/* Sub Tabs Bar */}
            <div className="flex border-b border-slate-200 overflow-x-auto bg-slate-50">
              <button 
                onClick={() => setActiveTab('general')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${activeTab === 'general' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-600 hover:bg-slate-100'}`}
              >
                <Layout className="w-3.5 h-3.5" />
                সাধারণ সেটিংস
              </button>
              <button 
                onClick={() => setActiveTab('color')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${activeTab === 'color' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-600 hover:bg-slate-100'}`}
              >
                <Palette className="w-3.5 h-3.5" />
                রং ও ডার্ক মোড
              </button>
              <button 
                onClick={() => setActiveTab('slider')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${activeTab === 'slider' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-600 hover:bg-slate-100'}`}
              >
                <Sliders className="w-3.5 h-3.5" />
                ৫-ব্যানার স্লাইডার
              </button>
              <button 
                onClick={() => setActiveTab('ads')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${activeTab === 'ads' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-600 hover:bg-slate-100'}`}
              >
                <Percent className="w-3.5 h-3.5" />
                বিজ্ঞাপন ম্যাপার
              </button>
              <button 
                onClick={() => setActiveTab('seo')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${activeTab === 'seo' ? 'border-indigo-600 text-indigo-600 bg-white' : 'border-transparent text-slate-600 hover:bg-slate-100'}`}
              >
                <FileText className="w-3.5 h-3.5" />
                এসইও ও স্কিমা
              </button>
              <button 
                onClick={() => setActiveTab('ai')}
                className={`py-3 px-4 text-xs font-bold uppercase tracking-wider shrink-0 flex items-center gap-2 transition-colors border-b-2 cursor-pointer ${activeTab === 'ai' ? 'border-indigo-600 text-indigo-600 bg-white animate-pulse' : 'border-transparent text-slate-600 hover:bg-slate-100'}`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                এআই আর্টিকেল জেনারেটর
              </button>
            </div>

            {/* Active Content Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {/* General Tab */}
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-3">মেলা ওয়েবসাইট কনফিগারেশন</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">ওয়েবসাইটের নাম (Website Logo Name)</label>
                        <input 
                          type="text" 
                          value={config.name}
                          onChange={(e) => onChangeConfig({ ...config, name: e.target.value })}
                          className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">ট্যাগলাইন (Tagline)</label>
                        <input 
                          type="text" 
                          value={config.tagline}
                          onChange={(e) => onChangeConfig({ ...config, tagline: e.target.value })}
                          className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">অ্যাক্টিভ ভাষা (Site Default Language)</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                        <input 
                          type="radio" 
                          checked={config.language === 'bn'}
                          onChange={() => onChangeConfig({ ...config, language: 'bn' })}
                          className="w-4 h-4 text-indigo-600"
                        />
                        বাংলা (Bengal)
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                        <input 
                          type="radio" 
                          checked={config.language === 'en'}
                          onChange={() => onChangeConfig({ ...config, language: 'en' })}
                          className="w-4 h-4 text-indigo-600"
                        />
                        English (US)
                      </label>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1">এটি টগল করলে সম্পূর্ণ হেডার ও ব্লগ ফিল্টারিং মেকানিজম ভাষা বদল করবে।</p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-600 mb-1">ফন্ট সিলেকশন (Primary Theme Font)</label>
                    <select 
                      value={config.fontFamilyFamily}
                      onChange={(e) => onChangeConfig({ ...config, fontFamilyFamily: e.target.value as any })}
                      className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500 outline-none"
                    >
                      <option value="siliguri-noto">Hind Siliguri / Noto Sans Bengali (বাংলা প্রফেশনাল)</option>
                      <option value="inter-poppins">Inter / Poppins (ইংরেজি রিডেভলপার অপশন)</option>
                    </select>
                    <p className="text-[11px] text-slate-400 mt-1">ক্লিন বাংলা টাইপোগ্রাফির জন্য গুগলের হিন্দ শিলিগুড়ি ও নটো সান্স রেকমেন্ডেড।</p>
                  </div>

                  <div className="border-t border-slate-100 pt-4 space-y-3">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">রিসোর্স ও স্পীড কন্ট্রোল (Performance Features)</h4>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input 
                        type="checkbox" 
                        checked={config.enableLazyLoad}
                        onChange={(e) => onChangeConfig({ ...config, enableLazyLoad: e.target.checked })}
                        className="w-4 h-4 rounded text-indigo-600"
                      />
                      লেজি লোড ইমেজ সাপোর্ট অ্যানাবল করুন (Lazy Load Image & WebP converter simulator)
                    </label>
                    <p className="text-[11px] text-slate-400 ml-6">এটি অন থাকলে ইমেজগুলো ভিউপোর্টে আসার আগে ব্যাকগ্রাউন্ডে স্পিড অপ্টিমাইজড থাকে।</p>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-2 text-red-600">আর্টিকেল ডিলিট করুন (Manage Existing Articles)</h4>
                    <div className="max-h-48 overflow-y-auto border border-slate-200 rounded p-2 space-y-2">
                      {posts.map(post => (
                        <div key={post.id} className="flex items-center justify-between text-xs bg-slate-50 p-2 rounded border border-slate-200">
                          <span className="truncate font-semibold max-w-[400px]">{post.title}</span>
                          <button 
                            onClick={() => onDeletePost(post.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Color Tab */}
              {activeTab === 'color' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-3">থীম কালার স্কিম পিকার</h4>
                    <p className="text-xs text-slate-500 mb-4">একটি ক্লিকে আপনার ওয়েবসাইটের ব্র্যান্ড কালার সেটআপ করুন। এটি সরাসরি সিএসএস ভেরিয়েবল আপডেট করবে।</p>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {COLOR_PRESETS.map((preset) => {
                        const isSelected = config.primaryColor === preset.primary;
                        return (
                          <button
                            key={preset.name}
                            onClick={() => applyColorPreset(preset)}
                            className={`p-3 rounded text-left border flex flex-col justify-between h-24 hover:shadow-md transition-all ${isSelected ? 'border-indigo-600 bg-indigo-50/30' : 'border-slate-200'}`}
                          >
                            <span className="text-xs font-bold text-slate-900 leading-snug">{preset.name}</span>
                            <div className="flex gap-1.5 mt-2">
                              <span className="w-5 h-5 rounded-full inline-block" style={{ backgroundColor: preset.primary }} title="Primary" />
                              <span className="w-5 h-5 rounded-full inline-block" style={{ backgroundColor: preset.secondary }} title="Secondary" />
                              <span className="w-5 h-5 rounded-full inline-block" style={{ backgroundColor: preset.accent }} title="Accent" />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">ম্যানুয়াল কালার অ্যাডজাস্টমেন্ট (Custom Hex Selector)</h4>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Primary Color</label>
                        <div className="flex gap-1.5 items-center">
                          <input 
                            type="color" 
                            className="w-8 h-8 rounded shrink-0 border border-slate-300" 
                            value={config.primaryColor}
                            onChange={(e) => onChangeConfig({ ...config, primaryColor: e.target.value })}
                          />
                          <input 
                            type="text" 
                            className="w-full text-xs border border-slate-300 rounded p-1"
                            value={config.primaryColor}
                            onChange={(e) => onChangeConfig({ ...config, primaryColor: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Secondary Color</label>
                        <div className="flex gap-1.5 items-center">
                          <input 
                            type="color" 
                            className="w-8 h-8 rounded shrink-0 border border-slate-300" 
                            value={config.secondaryColor}
                            onChange={(e) => onChangeConfig({ ...config, secondaryColor: e.target.value })}
                          />
                          <input 
                            type="text" 
                            className="w-full text-xs border border-slate-300 rounded p-1"
                            value={config.secondaryColor}
                            onChange={(e) => onChangeConfig({ ...config, secondaryColor: e.target.value })}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Accent Color</label>
                        <div className="flex gap-1.5 items-center">
                          <input 
                            type="color" 
                            className="w-8 h-8 rounded shrink-0 border border-slate-300" 
                            value={config.accentColor}
                            onChange={(e) => onChangeConfig({ ...config, accentColor: e.target.value })}
                          />
                          <input 
                            type="text" 
                            className="w-full text-xs border border-slate-300 rounded p-1"
                            value={config.accentColor}
                            onChange={(e) => onChangeConfig({ ...config, accentColor: e.target.value })}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">ডার্ক/লাইট মোড স্টেট (Theme Toggle)</h4>
                    <label className="flex items-center gap-2 cursor-pointer text-sm">
                      <input 
                        type="checkbox" 
                        checked={config.isDarkMode}
                        onChange={(e) => onChangeConfig({ ...config, isDarkMode: e.target.checked })}
                        className="w-4 h-4 rounded text-indigo-600"
                      />
                      ডার্ক মোড অ্যাক্টিভেট করুন (Simulator Dark Mode)
                    </label>
                  </div>
                </div>
              )}

              {/* Slider Tab */}
              {activeTab === 'slider' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-2">৫টি হিরো আকর্ষণীয় ব্যানার ম্যানেজার</h4>
                    <p className="text-xs text-slate-500">হোমপেজের টপে থাকা প্রতিযোগী ব্যানারগুলোর স্লাইড কনটেন্ট ও ব্যাকগ্রাউন্ড ইমেজ এডিট করুন।</p>
                  </div>

                  <div className="space-y-6 max-h-[450px] overflow-y-auto pr-1">
                    {banners.map((slide, idx) => (
                      <div key={slide.id} className="p-4 border border-slate-200 bg-slate-50 rounded-lg space-y-3">
                        <div className="flex justify-between items-center bg-indigo-50 px-2 py-1.5 rounded">
                          <span className="text-xs font-bold text-indigo-900">ব্যানার নাম্বার {idx + 1} ({slide.id})</span>
                          <span className="text-[10px] font-medium text-slate-500 inline-block">৩ সেকেন্ড ডিসপ্লে টাইম</span>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600">টাইটেল (Banner Title)</label>
                            <input 
                              type="text" 
                              value={slide.title}
                              onChange={(e) => handleBannerChange(idx, 'title', e.target.value)}
                              className="w-full text-xs border border-slate-300 rounded p-1.5 bg-white scale-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600">সাব-টাইটেল (Subtitle)</label>
                            <input 
                              type="text" 
                              value={slide.subtitle}
                              onChange={(e) => handleBannerChange(idx, 'subtitle', e.target.value)}
                              className="w-full text-xs border border-slate-300 rounded p-1.5 bg-white scale-none"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600">বাটন টেক্সট (CTA Text)</label>
                            <input 
                              type="text" 
                              value={slide.buttonText}
                              onChange={(e) => handleBannerChange(idx, 'buttonText', e.target.value)}
                              className="w-full text-xs border border-slate-300 rounded p-1.5 bg-white scale-none"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-600">ব্যাকগ্রাউন্ড পিকচার URL</label>
                            <input 
                              type="text" 
                              value={slide.imageUrl}
                              onChange={(e) => handleBannerChange(idx, 'imageUrl', e.target.value)}
                              className="w-full text-xs border border-slate-300 rounded p-1.5 bg-white scale-none"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ads Settings Tab */}
              {activeTab === 'ads' && (
                <div className="space-y-6">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 text-xs text-amber-900 line-relaxed">
                    <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold">গুগল অ্যাডসেন্স ইন্টিগ্রেশন প্রোটোকল</h4>
                      <p className="mt-1">
                        নিচের সেটিংস থেকে বিভিন্ন অ্যাড ইউনিট ও ব্যানার অন/অফ করতে পারেন। ব্লগ আর্টিকেলের মাঝে কিংবা সাইডবারে বিজ্ঞাপন প্লেস করা আছে। এগুলো ভিজিটরদের দ্বারা ট্রিগার হলে নিচের রিয়েলটাইম সিমুলেটরে রেভিনিউ যুক্ত হবে।
                      </p>
                    </div>
                  </div>

                  {/* Ad stats panel */}
                  <div className="grid grid-cols-3 gap-3 bg-slate-900 rounded-lg p-4 text-white">
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">টোটাল ইম্প্রেশন</span>
                      <span className="text-xl font-bold font-mono text-indigo-300">{adStats.impressions}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase font-bold text-slate-400">বিজ্ঞাপন ক্লিকস</span>
                      <span className="text-xl font-bold font-mono text-green-300">{adStats.clicks}</span>
                    </div>
                    <div>
                      <div className="flex justify-between items-center">
                        <span className="block text-[10px] uppercase font-bold text-slate-400">এস্টিমেটেড ইনকাম</span>
                        <button 
                          onClick={onResetAdStats}
                          className="text-[8px] uppercase bg-slate-800 hover:bg-slate-700 px-1 py-0.5 rounded text-slate-300"
                        >
                          রিসেট
                        </button>
                      </div>
                      <span className="text-xl font-bold font-mono text-amber-400">${adStats.earnings.toFixed(2)}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">বিজ্ঞাপন স্পট কন্ট্রোল (Toggle Placement Spots)</h4>
                    <div className="space-y-2 text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={config.automaticAds}
                          onChange={(e) => onChangeConfig({ ...config, automaticAds: e.target.checked })}
                          className="w-4 h-4 rounded text-indigo-600"
                        />
                        সব বিজ্ঞাপন অ্যাক্টিভ রাখুন (Enable Global Display Ads Adsense)
                      </label>
                      <p className="text-[11px] text-slate-400 ml-6">এটি চেক করা থাকলে ইন-আর্টিকেল, হেডার, সাইডবার এবং মোবাইল বিজ্ঞাপনগুলো প্রফেশনালি প্রদর্শিত হবে।</p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-widest mb-2">মোবাইল স্টিকি বিজ্ঞাপন (Responsive Mobile Sticky Anchor ad)</h4>
                    <p className="text-[11px] text-slate-500 mb-3">
                      মোবাইল স্ক্রিনে সবার নিচে একটি ভাসমান আঠালো বা স্টিকি বিজ্ঞাপন বার দেখাবে যা ব্যবহারকারী খুব সহজে ক্লোজ করতে পারে, এটি গুগল অ্যাডসেন্স রেভিনিউ বুস্ট করার জন্য অন্যতম আধুনিক মেথড।
                    </p>
                  </div>
                </div>
              )}

              {/* SEO Tab */}
              {activeTab === 'seo' && (
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-3">On-Page SEO মেটাডাটা ও রোবটস কনফিগারেশন</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">হোমপেজ এসইও টাইটেল (Title Tag for SEO)</label>
                        <input 
                          type="text" 
                          value={config.metaTitle}
                          onChange={(e) => onChangeConfig({ ...config, metaTitle: e.target.value })}
                          className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-600 mb-1">হোমপেজ এসইও ডেসক্রিপশন (Meta Description)</label>
                        <textarea 
                          rows={3}
                          value={config.metaDescription}
                          onChange={(e) => onChangeConfig({ ...config, metaDescription: e.target.value })}
                          className="w-full text-sm border border-slate-300 rounded p-2 focus:ring-1 focus:ring-indigo-500 outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Robots.txt ফাইল (XML / Search Crawl Configuration)</h4>
                    <textarea 
                      rows={4}
                      value={config.robotsTxt}
                      onChange={(e) => onChangeConfig({ ...config, robotsTxt: e.target.value })}
                      className="w-full text-xs font-mono border border-slate-300 rounded p-2 bg-slate-50 outline-none"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">গুগল এবং অন্যান্য সার্চ বটদের ইনডেক্স নির্দেশিকা প্রদান করার অফলাইন ফাস্ট মেথড।</p>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">XML সাইটম্যাপ জেনারেটর (XML Sitemap Map Visualizer)</h4>
                    <div className="bg-slate-900 text-green-400 p-3 rounded font-mono text-[10px] overflow-x-auto space-y-1">
                      <div>{'<?xml version="1.0" encoding="UTF-8"?>'}</div>
                      <div>{'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'}</div>
                      <div className="text-slate-500">  {`<!-- Total Articles: ${posts.length + 1} -->`}</div>
                      <div className="pl-4">{'<url>'}</div>
                      <div className="pl-8 text-white">{'<loc>https://sonartech-theme.com/</loc>'}</div>
                      <div className="pl-8 text-slate-400">{'<changefreq>daily</changefreq>'}</div>
                      <div className="pl-8 text-slate-400">{'<priority>1.0</priority>'}</div>
                      <div className="pl-4">{'</url>'}</div>
                      {posts.slice(0, 3).map(p => (
                        <div key={p.id} className="pl-4 border-l border-slate-800">
                          <div>{'<url>'}</div>
                          <div className="pl-4 text-white">{`  <loc>https://sonartech-theme.com/category/${p.category}/${p.id}</loc>`}</div>
                          <div className="pl-4 text-slate-400">{`  <lastmod>${p.date}</lastmod>`}</div>
                          <div>{'</url>'}</div>
                        </div>
                      ))}
                      <div className="text-slate-500">  {'... and all other slugs mapped ...'}</div>
                      <div>{'</urlset>'}</div>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 mb-3">
                      সার্চ ইঞ্জিন ফ্রেন্ডলি ডাইনামিক ইউআরএল স্ট্রাকচার: <code className="bg-slate-100 px-1 rounded font-mono">category/post-title</code> অনুসারে তৈরি।
                    </p>

                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <button
                        onClick={handleDownloadSitemapXml}
                        className="py-2.5 bg-indigo-600 hover:bg-slate-950 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
                      >
                        <FileCode className="w-3.5 h-3.5" />
                        Sitemap.xml ডাউনলোড
                      </button>
                      <button
                        onClick={handleDownloadRssXml}
                        className="py-2.5 bg-amber-500 hover:bg-slate-950 text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
                      >
                        <FileCode className="w-3.5 h-3.5" />
                        RSS Feed XML ডাউনলোড
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Writer Tab */}
              {activeTab === 'ai' && (
                <div className="space-y-6">
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 flex gap-3 text-xs text-indigo-900">
                    <Sparkles className="w-5 h-5 shrink-0 text-indigo-600 animate-pulse" />
                    <div>
                      <h4 className="font-bold">SonarAI অপ্টিমাইজড আর্টিকেল জেনারেটর</h4>
                      <p className="mt-1">
                        নিচে আপনার পছন্দের টপিক সেট করুন। এআই অটোমেটিক একটি এসইও বান্ধব ফুল-সাইজ টাইটেল, প্যারাগ্রাফ হেডিং, ট্যাগ এবং FAQ স্কিমা সম্বলিত বাংলা বা ইংরেজী আর্টিকেল তৈরি করবে।
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">কোন বিষয়ে আর্টিকেল লিখতে চান? (e.g., ফ্রিল্যান্সিং ক্যারিয়ার, ক্লাউড হোস্টিং, Web Speed)</label>
                      <input 
                        type="text" 
                        value={aiTopic}
                        onChange={(e) => setAiTopic(e.target.value)}
                        placeholder="আর্টিকেলের টপিক বা কিওয়ার্ড প্রবেশ করান..."
                        className="w-full text-sm border border-slate-300 rounded p-2.5 focus:ring-1 focus:ring-indigo-500 outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-600 mb-1">আর্টিকেলের ভাষা নির্বাচন (Content Generation Language)</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                          <input 
                            type="radio" 
                            checked={aiLang === 'bn'}
                            onChange={() => setAiLang('bn')}
                            className="w-4 h-4 text-indigo-600"
                          />
                          বাংলা কন্টেন্ট (Bengali)
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer text-sm font-medium">
                          <input 
                            type="radio" 
                            checked={aiLang === 'en'}
                            onChange={() => setAiLang('en')}
                            className="w-4 h-4 text-indigo-600"
                          />
                          English Article
                        </label>
                      </div>
                    </div>

                    <button
                      onClick={handleAIGenerate}
                      disabled={isGenerating || !aiTopic.trim()}
                      className={`w-full py-3 text-xs font-bold uppercase tracking-widest text-white rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer ${isGenerating ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700 active:scale-95 disabled:opacity-50'}`}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          জেমিনি এপিআই কনটেন্ট প্রস্তুত করছে...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4" />
                          আর্টিকেল লিখে দিন
                        </>
                      )}
                    </button>
                  </div>

                  {/* AI Generated preview output */}
                  {aiOutput && (
                    <div className="border border-indigo-200 bg-indigo-50/20 rounded-lg p-5 space-y-4">
                      <div className="flex justify-between items-center border-b border-indigo-100 pb-2">
                        <span className="text-xs font-bold text-indigo-700 uppercase flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          কনটেন্ট রেডি! (Google PageSpeed Approved Content Ratio)
                        </span>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase bg-slate-900 text-white px-2 py-0.5 rounded">
                          {aiOutput.category}
                        </span>
                        <h3 className="text-base font-bold text-slate-900">{aiOutput.title}</h3>
                        <p className="text-xs text-slate-600 leading-relaxed italic">{aiOutput.excerpt}</p>
                      </div>

                      <div className="text-[10px] flex flex-wrap gap-1">
                        {aiOutput.tags?.map(t => (
                          <span key={t} className="bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded">#{t}</span>
                        ))}
                      </div>

                      <button 
                        onClick={publishAiPost}
                        className="w-full py-2 bg-green-600 hover:bg-green-700 text-white text-xs font-bold uppercase tracking-widest rounded transition-all cursor-pointer shadow-sm"
                      >
                        ইনস্ট্যান্ট পাবলিশ করুন (Publish to Blog)
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer banner info */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 text-center text-[10px] font-bold text-slate-500 uppercase tracking-wider flex items-center justify-between">
              <span>ACTIVE AD BLOCKS SIMULATOR</span>
              <span className="text-green-600">● Core Web Vitals optimized 100%</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
