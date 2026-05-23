import { Search, Flame, Tag, Folder, Mail, Heart, Twitter, Github, Linkedin, MessageSquare } from 'lucide-react';
import { Post } from '../types';
import { ShortsWidget } from './ShortsWidget';
import { AdPlacement } from './AdPlacement';

interface SidebarProps {
  posts: Post[];
  activeCategory: string;
  onCategorySelect: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAdInteract?: (type: 'impression' | 'click') => void;
  onPostSelect: (post: Post) => void;
  enableAds?: boolean;
}

export function Sidebar({
  posts,
  activeCategory,
  onCategorySelect,
  searchQuery,
  onSearchChange,
  onAdInteract,
  onPostSelect,
  enableAds = true,
}: SidebarProps) {
  // Sort posts for Popular items (simulated based on length of title or static factor)
  const popularPosts = [...posts].sort((a, b) => b.title.length - a.title.length).slice(0, 3);
  const recentPosts = [...posts].slice(0, 3);

  // Group categories dynamically
  const categories = posts.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Gather unique tags
  const allTags = Array.from(new Set(posts.flatMap(p => p.tags || []))).slice(0, 10);

  return (
    <aside className="space-y-8 w-full">
      {/* Search Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800">
          সার্চ বক্স (Search Articles)
        </h4>
        <div className="relative">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="আর্টিকেল খুঁজুন..." 
            className="w-full text-xs py-3.5 pl-4 pr-10 border border-slate-200 rounded-full bg-slate-50 focus:bg-white focus:border-indigo-600 outline-none transition-all placeholder:text-slate-400"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
        </div>
      </div>

      {/* Categories Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Folder className="w-4 h-4 text-indigo-600" />
          ক্যাটাগরি সমূহ (Blog Categories)
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => onCategorySelect('')}
            className={`w-full flex items-center justify-between py-2 px-3 text-xs font-medium rounded-lg transition-colors ${activeCategory === '' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <span>সব কন্টেন্ট (Show All)</span>
            <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {posts.length}
            </span>
          </button>
          {Object.entries(categories).map(([cat, count]) => (
            <button
              key={cat}
              onClick={() => onCategorySelect(cat)}
              className={`w-full flex items-center justify-between py-2 px-3 text-xs font-medium rounded-lg transition-colors ${activeCategory === cat ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <span>{cat}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${activeCategory === cat ? 'bg-indigo-500 text-white' : 'bg-slate-100 text-slate-700'}`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Sticky Top Sidebar Banner Ads (300x250 px) */}
      {enableAds && (
        <AdPlacement 
          id="sidebar-ad-1" 
          size="300x250" 
          slotName="Sidebar Banner Adsense" 
          onAdInteract={onAdInteract}
        />
      )}

      {/* Popular Posts Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Flame className="w-4 h-4 text-orange-500" />
          জনপ্রিয় আর্টিকেল (Popular Posts)
        </h4>
        <div className="space-y-4">
          {popularPosts.map((post, index) => (
            <div 
              key={post.id} 
              onClick={() => onPostSelect(post)}
              className="flex gap-3 cursor-pointer group hover:bg-slate-50 p-1.5 rounded-lg transition-colors"
            >
              <div className="w-16 h-16 rounded-md overflow-hidden bg-slate-100 shrink-0">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="space-y-1 shrink min-w-0">
                <h5 className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h5>
                <div className="text-[10px] text-slate-400 font-medium">
                  {post.date} • {post.readTime}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Social Follow Me Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Heart className="w-4 h-4 text-red-500" />
          সোশ্যাল ফলো করুন (Social Follow)
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <a href="#" className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg hover:bg-sky-50 transition-colors group">
            <Twitter className="w-4 h-4 text-sky-500" />
            <span className="text-[11px] font-bold text-slate-600 group-hover:text-sky-600 uppercase">Twitter</span>
          </a>
          <a href="#" className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group">
            <Github className="w-4 h-4 text-slate-900" />
            <span className="text-[11px] font-bold text-slate-600 group-hover:text-slate-950 uppercase">Github</span>
          </a>
          <a href="#" className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg hover:bg-blue-50 transition-colors group">
            <Linkedin className="w-4 h-4 text-blue-600" />
            <span className="text-[11px] font-bold text-slate-600 group-hover:text-blue-700 uppercase">LinkedIn</span>
          </a>
          <a href="#" className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg hover:bg-indigo-50 transition-colors group">
            <MessageSquare className="w-4 h-4 text-indigo-500" />
            <span className="text-[11px] font-bold text-slate-600 group-hover:text-indigo-600 uppercase">Telegram</span>
          </a>
        </div>
      </div>

      {/* Short Reels Video Scroller */}
      <ShortsWidget />

      {/* Tags Widget */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-4">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800 flex items-center gap-1.5 border-b border-slate-100 pb-2">
          <Tag className="w-4 h-4 text-emerald-600" />
          ট্যাগ সমাহার (Tags Cloud)
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {allTags.map(tag => (
            <span 
              key={tag}
              className="px-2.5 py-1 text-[10px] font-semibold bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 rounded-full transition-all cursor-pointer hover:border-indigo-400"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Newsletter Widget */}
      <div className="bg-gradient-to-br from-indigo-900 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white text-center space-y-4 shadow-xl relative overflow-hidden border border-slate-700">
        <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 rounded-full filter blur-xl" />
        <div className="inline-flex p-3 bg-white/10 rounded-full backdrop-blur-md">
          <Mail className="w-5 h-5 text-indigo-300" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold">নিউজলেটার সাবস্ক্রিপশন</h4>
          <p className="text-[11px] text-slate-300 leading-normal">
            সেরা এসইও গাইড ও ডোমেন অফারগুলো প্রতি বৃহস্পতিবার ইমেইলে পেতে এখনই সাবস্ক্রাইব করুন।
          </p>
        </div>

        <form onSubmit={e => { e.preventDefault(); alert('ধন্যবাদ! সফলভাবে সাবস্ক্রাইব করা হয়েছে।'); }} className="space-y-2">
          <input 
            type="email" 
            placeholder="আপনার ইমেইল অ্যাড্রেস..." 
            className="w-full text-xs px-3.5 py-2.5 rounded bg-white/10 border border-white/20 text-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-400 text-center"
            required
          />
          <button 
            type="submit" 
            className="w-full text-[10px] font-bold uppercase tracking-wider bg-indigo-500 hover:bg-indigo-600 py-2 rounded text-white transition-all cursor-pointer"
          >
            সাবস্ক্রাইব করুন
          </button>
        </form>
      </div>
    </aside>
  );
}
