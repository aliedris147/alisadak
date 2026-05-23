import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { Hero } from './components/Hero';
import { BlogCard } from './components/BlogCard';
import { Sidebar } from './components/Sidebar';
import { PostReader } from './components/PostReader';
import { Footer } from './components/Footer';
import { ThemeCustomizer } from './components/ThemeCustomizer';
import { AnalyticsPanel } from './components/AnalyticsPanel';
import { AdPlacement } from './components/AdPlacement';
import { MOCK_POSTS, MOCK_SLIDER_BANNERS, DEFAULT_SITE_CONFIG } from './constants';
import { Post, SiteConfig, BannerAd } from './types';
import { Sparkles, ArrowRight, Layers, AlertCircle, Bookmark } from 'lucide-react';

export default function App() {
  // Global configured variables with persistence support
  const [config, setConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('sonar_site_config');
    return saved ? JSON.parse(saved) : DEFAULT_SITE_CONFIG;
  });

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('sonar_posts_catalog');
    return saved ? JSON.parse(saved) : MOCK_POSTS;
  });

  const [banners, setBanners] = useState<BannerAd[]>(() => {
    const saved = localStorage.getItem('sonar_slider_banners');
    return saved ? JSON.parse(saved) : MOCK_SLIDER_BANNERS;
  });

  // Ad Earnings Live Tracker Simulator
  const [adStats, setAdStats] = useState(() => {
    const saved = localStorage.getItem('sonar_ad_stats');
    return saved ? JSON.parse(saved) : { clicks: 14, impressions: 520, earnings: 28.45 };
  });

  const [activeCategory, setActiveCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // Pagination & Ajax Load More Simulator
  const [visibleCount, setVisibleCount] = useState(3);
  const [isLoaderMoreRunning, setIsLoaderMoreRunning] = useState(false);

  // Backup active variables to localStorage
  useEffect(() => {
    localStorage.setItem('sonar_site_config', JSON.stringify(config));
  }, [config]);

  useEffect(() => {
    localStorage.setItem('sonar_posts_catalog', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('sonar_slider_banners', JSON.stringify(banners));
  }, [banners]);

  useEffect(() => {
    localStorage.setItem('sonar_ad_stats', JSON.stringify(adStats));
  }, [adStats]);

  // Dynamic injection of Custom Colors and Font families into the Document root!
  useEffect(() => {
    const primary = config.primaryColor;
    const secondary = config.secondaryColor;
    const accent = config.accentColor;
    
    // Choose font families
    let fontNameStr = '"Inter", "Poppins", sans-serif';
    if (config.fontFamilyFamily === 'siliguri-noto') {
      fontNameStr = '"Hind Siliguri", "Noto Sans Bengali", sans-serif';
    }

    const styleEl = document.getElementById('sonar-theme-stylesheet') || document.createElement('style');
    styleEl.id = 'sonar-theme-stylesheet';
    styleEl.innerHTML = `
      :root {
        --color-brand: ${primary} !important;
        --color-brand-secondary: ${secondary} !important;
        --color-brand-accent: ${accent} !important;
        --font-sans: ${fontNameStr} !important;
      }
      
      /* Active custom utility wrappers */
      body {
        font-family: ${fontNameStr} !important;
        background-color: ${config.isDarkMode ? '#0B0F19' : '#F8FAFC'};
        color: ${config.isDarkMode ? '#F1F5F9' : '#0F172A'};
      }

      /* Dark mode content container blocks */
      .bg-white {
        background-color: ${config.isDarkMode ? '#131B2E' : '#FFFFFF'} !important;
      }
      .text-slate-900, .text-slate-950, .text-slate-800, h1, h2, h3, h4 {
        color: ${config.isDarkMode ? '#F8FAFC' : '#0F172A'} !important;
      }
      .text-slate-600, .text-slate-500, .text-slate-700 {
        color: ${config.isDarkMode ? '#94A3B8' : '#475569'} !important;
      }
      .border-slate-100, .border-slate-200, .border-slate-200\\/60 {
        border-color: ${config.isDarkMode ? '#1E293B' : '#E2E8F0'} !important;
      }
      .bg-slate-50, .bg-slate-50\\/50, .bg-slate-100, .bg-slate-100\\/80 {
        background-color: ${config.isDarkMode ? '#1E293B' : '#F1F5F9'} !important;
      }
      
      /* Color assignments based on Secondary selection */
      .bg-indigo-600 {
        background-color: ${secondary} !important;
      }
      .text-indigo-600 {
        color: ${secondary} !important;
      }
      .border-indigo-600 {
        border-color: ${secondary} !important;
      }
      .hover\\:bg-indigo-700:hover {
        background-color: ${secondary}ee !important;
      }
      
      /* Accent color assignment based on custom picker */
      .bg-amber-500, .bg-amber-600 {
        background-color: ${accent} !important;
      }
      .text-amber-500, .text-amber-600 {
        color: ${accent} !important;
      }
    `;

    if (!document.getElementById('sonar-theme-stylesheet')) {
      document.head.appendChild(styleEl);
    }
  }, [config, config.primaryColor, config.secondaryColor, config.accentColor, config.fontFamilyFamily, config.isDarkMode]);

  // Dynamic CPC earnings simulator logic (Point 5 & 16)
  const handleAdInteract = (type: 'impression' | 'click') => {
    setAdStats(prev => {
      const isClick = type === 'click';
      // High target niches yield higher CPC rates
      const cpcBonus = isClick ? (Math.random() * (2.85 - 0.75) + 0.75) : 0;
      return {
        clicks: prev.clicks + (isClick ? 1 : 0),
        impressions: prev.impressions + (type === 'impression' ? 1 : 0),
        earnings: prev.earnings + cpcBonus
      };
    });
  };

  const handleResetAdStats = () => {
    if (confirm('বিজ্ঞাপন আয়ের ডাটাবেসটি রিসেট করতে চান?')) {
      setAdStats({ clicks: 0, impressions: 0, earnings: 0.0 });
    }
  };

  // Insert a newly published / generated AI Blog post
  const handleAddPost = (newPost: Post) => {
    setPosts(prev => [newPost, ...prev]);
  };

  // Delete unwanted posts
  const handleDeletePost = (id: string) => {
    if (confirm('নিশ্চিতভাবে এই আর্টিকেলটি মুছে ফেলতে চান?')) {
      setPosts(prev => prev.filter(p => p.id !== id));
      if (selectedPost?.id === id) {
        setSelectedPost(null);
      }
    }
  };

  // Switch Site Languages (English ⇄ Bengali) and reset filters
  const handleToggleLanguage = () => {
    const nextLang = config.language === 'bn' ? 'en' : 'bn';
    setConfig(prev => ({ 
      ...prev, 
      language: nextLang,
      // Automatic adjust primary fonts for elegance
      fontFamilyFamily: nextLang === 'bn' ? 'siliguri-noto' : 'inter-poppins'
    }));
    setActiveCategory('');
    setSearchQuery('');
  };

  // Filter Catalog entries based on Category, Search query, and language match
  const filteredPosts = posts.filter(post => {
    // 1. Filter by Active Language
    const matchesLang = config.language === 'bn' ? post.bangla !== false : post.bangla === false;
    if (!matchesLang) return false;

    // 2. Filter by Category Select options
    if (activeCategory && post.category !== activeCategory) return false;

    // 3. Filter by Search input keys
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const inTitle = post.title.toLowerCase().includes(searchLower);
      const inExcerpt = post.excerpt.toLowerCase().includes(searchLower);
      const inContent = post.content.toLowerCase().includes(searchLower);
      const inTags = post.tags?.some(t => t.toLowerCase().includes(searchLower)) || false;
      return inTitle || inExcerpt || inContent || inTags;
    }

    return true;
  });

  // Calculate Featured item
  const featuredPost = filteredPosts.find(p => p.featured) || filteredPosts[0];
  const regularPosts = filteredPosts.filter(p => !featuredPost || p.id !== featuredPost.id);

  // Ajax simulation loading loop
  const handleAjaxLoadMore = () => {
    setIsLoaderMoreRunning(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 3);
      setIsLoaderMoreRunning(false);
    }, 1200);
  };

  return (
    <div className={`min-h-screen flex flex-col overflow-x-hidden ${config.isDarkMode ? 'dark' : ''}`}>
      
      {/* 1. Header with date tickers, news streams, logo and configurations */}
      <Header 
        config={config}
        onChangeConfig={setConfig}
        onSearchQueryChange={setSearchQuery}
        onCategorySelect={setActiveCategory}
        onAdInteract={handleAdInteract}
        activeLanguage={config.language}
        onToggleLanguage={handleToggleLanguage}
      />

      <main className="flex-grow">
        
        {/* Dynamic Reader Post details layout overlay */}
        <AnimatePresence mode="wait">
          {selectedPost ? (
            <motion.div
              key="reader-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
            >
              <PostReader 
                post={selectedPost}
                posts={posts}
                onBack={() => { setSelectedPost(null); window.scrollTo(0, 0); }}
                onPostSelect={(p) => { setSelectedPost(p); window.scrollTo(0, 0); }}
                onAdInteract={handleAdInteract}
                enableAds={config.automaticAds}
              />
            </motion.div>
          ) : (
            
            // Standard Front Feed layout index
            <motion.div
              key="catalog-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              {/* Header Ads spot horizontal banner (Recommended Size: 728x90) */}
              {config.automaticAds && (
                <div className="max-w-7xl mx-auto px-4 md:px-6 my-2 text-center">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
                    HEADER DIRECT LEADERBOARD SPOT
                  </span>
                  <AdPlacement 
                    id="header-adsense-row" 
                    size="728x90" 
                    slotName="Header Ad Row Adsense" 
                    onAdInteract={handleAdInteract}
                  />
                </div>
              )}

              {/* 5-Banner Hero Sliding Banner (3 seconds looping cycle) */}
              <HeroSlider 
                banners={banners} 
                onAdInteract={handleAdInteract}
              />

              {/* Featured Core Post item layout */}
              {featuredPost && (
                <div onClick={() => { setSelectedPost(featuredPost); window.scrollTo(0, 0); }}>
                  <Hero post={featuredPost} />
                </div>
              )}

              {/* Categories & Filter tag feedback ribbon */}
              <div className="border-y border-slate-200/70 bg-white/60 sticky top-[64px] z-30 backdrop-blur-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between overflow-x-auto no-scrollbar gap-8">
                  <div className="flex gap-6 text-[10.5px] font-black uppercase tracking-[0.2em] font-sans shrink-0">
                    <button 
                      onClick={() => setActiveCategory('')}
                      className={`h-12 flex items-center border-b-2 font-bold cursor-pointer transition-colors ${activeCategory === '' ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
                    >
                      {config.language === 'bn' ? 'সব স্টোরি' : 'All Stories'}
                    </button>
                    <button 
                      onClick={() => setActiveCategory('এসইও গাইড')}
                      className={`h-12 flex items-center border-b-2 font-bold cursor-pointer transition-colors ${activeCategory === 'এসইও গাইড' ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
                    >
                      {config.language === 'bn' ? 'এসইও গাইড' : 'SEO Guides'}
                    </button>
                    <button 
                      onClick={() => setActiveCategory('হোস্টিং গাইড')}
                      className={`h-12 flex items-center border-b-2 font-bold cursor-pointer transition-colors ${activeCategory === 'হোস্টিং গাইড' ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
                    >
                      {config.language === 'bn' ? 'হোস্টিং গাইড' : 'Hosting Guides'}
                    </button>
                    <button 
                      onClick={() => setActiveCategory('ভিডিও মার্কেটিং')}
                      className={`h-12 flex items-center border-b-2 font-bold cursor-pointer transition-colors ${activeCategory === 'ভিডিও মার্কেটিং' ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
                    >
                      {config.language === 'bn' ? 'ভিডিও মার্কেটিং' : 'Video Marketing'}
                    </button>
                    <button 
                      onClick={() => setActiveCategory('Finance')}
                      className={`h-12 flex items-center border-b-2 font-bold cursor-pointer transition-colors ${activeCategory === 'Finance' ? 'text-indigo-600 border-indigo-600' : 'text-slate-500 border-transparent hover:text-indigo-600'}`}
                    >
                      {config.language === 'bn' ? 'ফিন্যান্স' : 'Finance'}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600 shrink-0">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
                    <span>{config.language === 'bn' ? 'গুগল স্পীড রেডি ১০৯%' : 'Core Web Vitals Checked'}</span>
                  </div>
                </div>
              </div>

              {/* Core Split section grid holding left catalog feed and right sidebars */}
              <section className="max-w-7xl mx-auto px-4 md:px-6 py-6 font-sans">
                
                {/* Active Filter alerts if search results exist */}
                {(searchQuery || activeCategory) && (
                  <div className="mb-8 p-4 bg-indigo-50/60 border border-slate-200 rounded-xl flex items-center justify-between text-xs font-bold uppercase text-slate-800 tracking-wider">
                    <span>
                      {searchQuery 
                        ? `${config.language === 'bn' ? 'সার্চ কিওয়ার্ড' : 'Search'}: "${searchQuery}" • ` 
                        : ''}
                      {activeCategory 
                        ? `${config.language === 'bn' ? 'ক্যাটাগরি' : 'Category'}: "${activeCategory}" • ` 
                        : ''} 
                      {filteredPosts.length}টি আর্টিকেল পাওয়া গিয়েছে
                    </span>
                    <button 
                      onClick={() => { setSearchQuery(''); setActiveCategory(''); }}
                      className="text-red-600 bg-white border px-3 py-1 rounded-full cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      ফিল্টার রিসেট
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                  
                  {/* Left Column: Latest catalog grid with AJAX mock Loader */}
                  <div className="lg:col-span-2 space-y-12">
                    
                    <div className="border-b border-slate-200/60 pb-4">
                      <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
                        {config.language === 'bn' ? 'সাম্প্রতিক প্রকাশনা সমূহ' : 'Latest Publications'}
                      </h3>
                      <p className="text-xs text-slate-500">{config.language === 'bn' ? 'এসইও এবং মোবাইল পারফরমেন্সে সেরা আর্টিকেলের তালিকা' : 'Crawlable, dynamic, high CTR layouts'}</p>
                    </div>

                    {regularPosts.length === 0 ? (
                      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200/50 space-y-4">
                        <AlertCircle className="w-12 h-12 text-slate-400 mx-auto" />
                        <h4 className="text-sm font-bold uppercase text-slate-700">কোন আর্টিকেল খুঁজে পাওয়া যায় নি!</h4>
                        <p className="text-xs text-slate-400">ফিল্টার পরিবর্তন করুন অথবা এডমিন প্যানেল থেকে এআই আর্টিকেল জেনারেট করে পাবলিশ করুন।</p>
                      </div>
                    ) : (
                      <div className="blog-grid">
                        {regularPosts.slice(0, visibleCount).map((post, i) => (
                          <BlogCard 
                            key={post.id} 
                            post={post} 
                            index={i} 
                            onClick={() => { setSelectedPost(post); window.scrollTo(0, 0); }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Infinite scroll/AJAX Load more system widget */}
                    {regularPosts.length > visibleCount && (
                      <div className="pt-6 flex flex-col items-center gap-3">
                        <button 
                          onClick={handleAjaxLoadMore}
                          disabled={isLoaderMoreRunning}
                          className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all shadow-xl hover:shadow-indigo-500/10 active:scale-95 cursor-pointer disabled:opacity-80 flex items-center gap-2"
                        >
                          {isLoaderMoreRunning ? (
                            <>
                              <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              <span>সার্ভার থেকে লোড হচ্ছে...</span>
                            </>
                          ) : (
                            <>
                              <span>কন্টেন্ট আরো লোড করুন</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                          ১০০% মোবাইল অপ্টিমাইজড অ্যাজাক্স কোয়েরি সিমুলেশন
                        </span>
                      </div>
                    )}

                    {/* Middle Page Adsense Banner Ad (Recommended Size: 728x90) */}
                    {config.automaticAds && (
                      <div className="pt-4 text-center">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest block mb-1">
                          SPONSOR LEADERBOARD (MID PAGE)
                        </span>
                        <AdPlacement 
                          id="middle-adsense-row" 
                          size="728x90" 
                          slotName="Middle Page Ad Spot" 
                          onAdInteract={handleAdInteract}
                        />
                      </div>
                    )}

                    {/* Interactive Google PageSpeed & Analytics earnings report dashboard */}
                    <AnalyticsPanel 
                      adStats={adStats} 
                      postsCount={posts.length} 
                    />
                  </div>

                  {/* Right Column: Widgets Stack Sidebar (Recent, Popular, Follow, Reels shorts, Categories, Newsletter) */}
                  <div className="space-y-8">
                    <Sidebar 
                      posts={posts}
                      activeCategory={activeCategory}
                      onCategorySelect={(cat) => { setActiveCategory(cat); window.scrollTo(0, 0); }}
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                      onAdInteract={handleAdInteract}
                      onPostSelect={(p) => { setSelectedPost(p); window.scrollTo(0, 0); }}
                      enableAds={config.automaticAds}
                    />
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 4. Sticky Bottom Mobile Header Ad Banner (Recommended Size: 320x50 and responsive close) */}
      {config.automaticAds && (
        <div className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-amber-200/60 py-2 shadow-inner px-4 md:hidden flex justify-between items-center transition-all duration-300">
          <div className="w-full">
            <AdPlacement 
              id="sticky-mobile-bottom-ad" 
              size="320x50" 
              slotName="Mobile Sticky Adsense Spot" 
              onAdInteract={handleAdInteract}
            />
          </div>
        </div>
      )}

      {/* 5. Floating Admin Control Settings customizer */}
      <ThemeCustomizer 
        config={config}
        onChangeConfig={setConfig}
        banners={banners}
        onChangeBanners={setBanners}
        onAddPost={handleAddPost}
        posts={posts}
        onDeletePost={handleDeletePost}
        adStats={adStats}
        onResetAdStats={handleResetAdStats}
      />

      {/* 6. Footer containing fast Links, quick copyright profiles */}
      <Footer />
    </div>
  );
}
