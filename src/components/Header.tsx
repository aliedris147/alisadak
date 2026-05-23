import { useState, useEffect } from 'react';
import { 
  Menu, Search, Twitter, Github, Linkedin, Bell, 
  Sun, Moon, Globe, Clock, ChevronRight, ChevronLeft, Volume2 
} from 'lucide-react';
import { SiteConfig } from '../types';

interface HeaderProps {
  config: SiteConfig;
  onChangeConfig: (config: SiteConfig) => void;
  onSearchQueryChange: (query: string) => void;
  onCategorySelect: (cat: string) => void;
  onAdInteract?: (type: 'impression' | 'click') => void;
  activeLanguage: 'en' | 'bn';
  onToggleLanguage: () => void;
}

const BREAKING_NEWS_BN = [
  '⚡ ব্রেকিং নিউজ: গুগলের ২০২৬ নতুন এসইও পলিসি রিলিজ হয়েছে - কোর ওয়েব ভাইটাল স্কোর এখন র‌্যাঙ্কিংয়ের প্রধান সিগন্যাল!',
  '⚡ ক্লাউড হোস্টিংয়ে বিশাল ছাড়: সোনারহোস্টে নতুন NVMe এসএসডি হোস্টিংয়ে ৫০% ফ্ল্যাট ডিসকাউন্ট অফার!',
  '⚡ নতুন টিউটোরিয়াল: রিয়্যাক্ট ও ডাইনামিক এসইও দিয়ে কীভাবে গুগল অ্যাডসেন্স এপ্রুভ করাবেন, বিস্তারিত গাইড প্রকাশ।'
];

const BREAKING_NEWS_EN = [
  '⚡ Breaking News: Google releases new SEO guidelines for 2026 - INP latency is now a critical core web ranking signal!',
  '⚡ Promo Deal: Enjoy 70% massive discounts on enterprise VPS solutions throughout this week!',
  '⚡ AI Updates: Gemini-3.5 now integrates natively with modern blog CMS pipelines.'
];

export function Header({
  config,
  onChangeConfig,
  onSearchQueryChange,
  onCategorySelect,
  onAdInteract,
  activeLanguage,
  onToggleLanguage,
}: HeaderProps) {
  const [activeNewsIdx, setActiveNewsIdx] = useState(0);
  const [currentTime, setCurrentTime] = useState('');
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  // Ticking local digital clock
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      // Format in Bengali or English based on selected language
      const locale = activeLanguage === 'bn' ? 'bn-BD' : 'en-US';
      setCurrentTime(now.toLocaleDateString(locale, options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [activeLanguage]);

  // Rotate breaking news every 4 seconds
  useEffect(() => {
    const newsInterval = setInterval(() => {
      handleNextNews();
    }, 4000);
    return () => clearInterval(newsInterval);
  }, [activeNewsIdx, activeLanguage]);

  const handleNextNews = () => {
    const list = activeLanguage === 'bn' ? BREAKING_NEWS_BN : BREAKING_NEWS_EN;
    setActiveNewsIdx((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  const handlePrevNews = () => {
    const list = activeLanguage === 'bn' ? BREAKING_NEWS_BN : BREAKING_NEWS_EN;
    setActiveNewsIdx((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchQueryChange(searchVal);
    setShowSearchModal(false);
  };

  const newsList = activeLanguage === 'bn' ? BREAKING_NEWS_BN : BREAKING_NEWS_EN;

  return (
    <header className="w-full bg-white z-50">
      
      {/* 1. TOP BAR SECTION */}
      <div className="w-full bg-slate-900 text-slate-300 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-10 flex items-center justify-between gap-4 overflow-x-auto no-scrollbar">
          
          {/* Ticking Date & Clock */}
          <div className="flex items-center gap-2 shrink-0 font-medium">
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span className="font-mono text-[11px] tabular-nums whitespace-nowrap">{currentTime || 'Loading date...'}</span>
          </div>

          {/* Core Breaking news ticker */}
          <div className="flex-1 max-w-xl hidden md:flex items-center gap-2 overflow-hidden bg-slate-950/45 px-3 py-1 rounded-full border border-slate-800">
            <span className="px-2 py-0.5 bg-red-600 text-[9px] font-black uppercase text-white rounded shrink-0 tracking-wider">
              HOT
            </span>
            <div className="flex-1 truncate relative text-[11px] text-slate-100 font-semibold select-none">
              {newsList[activeNewsIdx]}
            </div>
            
            <div className="flex items-center gap-1 shrink-0">
              <button onClick={handlePrevNews} className="hover:text-white transition-colors cursor-pointer">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={handleNextNews} className="hover:text-white transition-colors cursor-pointer">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Social Links & Language toggler */}
          <div className="flex items-center gap-4 shrink-0 font-bold text-[10px] uppercase tracking-wider">
            {/* Language Switch */}
            <button 
              onClick={onToggleLanguage}
              className="flex items-center gap-1 hover:text-white bg-slate-800 hover:bg-slate-700 px-2.5 py-1 rounded transition-colors text-slate-200 cursor-pointer text-[10px]"
            >
              <Globe className="w-3 h-3 text-indigo-400" />
              <span>{activeLanguage === 'bn' ? 'ENGLISH' : 'বাংলা'}</span>
            </button>

            {/* Micro Social icons representing touch target profiles */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-slate-800">
              <a href="#" className="hover:text-white transition-colors" title="Twitter"><Twitter className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-white transition-colors" title="Github"><Github className="w-3.5 h-3.5" /></a>
              <a href="#" className="hover:text-white transition-colors" title="Linkedin"><Linkedin className="w-3.5 h-3.5" /></a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN NAVIGATION HEADER */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/70">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between gap-6">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-8 shrink-0">
            <a href="/" onClick={(e) => { e.preventDefault(); onCategorySelect(''); }} className="flex items-center gap-2.5 group">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-sm shadow-md transition-all group-hover:rotate-6 scale-95"
                style={{ backgroundColor: config.primaryColor || '#0F172A' }}
              >
                ST
              </div>
              <div className="flex flex-col">
                <span className="text-md font-black tracking-tight uppercase text-slate-900 leading-none">
                  {config.name}
                </span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 max-w-[150px] truncate">
                  CORE SPEED SEO READY
                </span>
              </div>
            </a>
          </div>

          {/* Center navigation links */}
          <div className="hidden md:flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-slate-600">
            <button onClick={() => onCategorySelect('')} className="hover:text-indigo-600 transition-colors cursor-pointer">
              {activeLanguage === 'bn' ? 'সব আর্টিকেল' : 'All Articles'}
            </button>
            <button onClick={() => onCategorySelect('এসইও গাইড')} className="hover:text-indigo-600 transition-colors cursor-pointer">
              {activeLanguage === 'bn' ? 'এসইও গাইড (SEO)' : 'SEO Guides'}
            </button>
            <button onClick={() => onCategorySelect('হোস্টিং গাইড')} className="hover:text-indigo-600 transition-colors cursor-pointer">
              {activeLanguage === 'bn' ? 'হোস্টিং' : 'Hosting'}
            </button>
            <button onClick={() => onCategorySelect('ভিডিও মার্কেটিং')} className="hover:text-indigo-600 transition-colors cursor-pointer active:text-indigo-600">
              {activeLanguage === 'bn' ? 'ভিডিও সেকশন' : 'Video Posts'}
            </button>
          </div>

          {/* Action buttons with Search & Toggle Dark State */}
          <div className="flex items-center gap-3">
            {/* Search Trigger (Mobile accessible target 44px) */}
            <button 
              onClick={() => setShowSearchModal(true)} 
              className="p-2.5 hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
              title="Search Articles"
            >
              <Search className="w-4.5 h-4.5 text-slate-700" />
            </button>

            {/* Custom Mode Toggle with sun/moon details */}
            <button 
              onClick={() => onChangeConfig({ ...config, isDarkMode: !config.isDarkMode })}
              className="p-2.5 hover:bg-slate-100 rounded-full transition-colors text-slate-700 cursor-pointer"
              title="Toggle Dark Mode"
            >
              {config.isDarkMode ? <Sun className="w-4.5 h-4.5 text-amber-500" /> : <Moon className="w-4.5 h-4.5 text-slate-800" />}
            </button>

            {/* Notification alert simulator bell */}
            <button 
              onClick={() => alert(activeLanguage === 'bn' ? 'পুশ নোটিফিকেশন মডিউল সম্পূর্ণ রেডি!' : 'Push System is primed!')}
              className="p-2.5 hover:bg-slate-100 rounded-full text-slate-700 cursor-pointer hidden sm:inline-block relative"
              title="Push Notification Trigger"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-600 rounded-full animate-pulse" />
            </button>
          </div>
        </div>
      </nav>

      {/* 3. DYNAMIC POPUP SEARCH CONTAINER */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 space-y-4 shadow-2xl border animate-in relative">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest border-b pb-2">
              আর্টিকেল অনুসন্ধান করুন (Deep SEO Search Engine)
            </h4>
            
            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <input 
                type="text" 
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="ম্যাক বুক হোস্টিং, স্পিড অপ্টিমাইজেশন ইত্যাদি লিখে খুঁজুন..." 
                className="w-full text-xs p-3.5 border border-slate-200 rounded-lg outline-none focus:border-indigo-600"
                autoFocus
              />
              <div className="flex gap-2 justify-end">
                <button 
                  type="button" 
                  onClick={() => setShowSearchModal(false)}
                  className="px-4 py-2 bg-slate-100 rounded hover:bg-slate-200 text-xs font-bold text-slate-600 cursor-pointer"
                >
                  বাতিল করুন
                </button>
                <button 
                  type="submit" 
                  className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-xs font-bold cursor-pointer"
                >
                  সার্চ করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </header>
  );
}
