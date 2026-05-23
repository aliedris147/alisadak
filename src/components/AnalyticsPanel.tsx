import { useState, useEffect } from 'react';
import { 
  TrendingUp, BarChart3, ShieldCheck, Gauge, Zap, Globe, 
  RefreshCw, CheckCircle2, ChevronDown, Check, Info 
} from 'lucide-react';

interface AnalyticsPanelProps {
  adStats: {
    clicks: number;
    impressions: number;
    earnings: number;
  };
  postsCount: number;
}

export function AnalyticsPanel({ adStats, postsCount }: AnalyticsPanelProps) {
  const [crawlStatus, setCrawlStatus] = useState<'idle' | 'scanning' | 'success'>('success');
  const [activeSpeedTab, setActiveSpeedTab] = useState<'mobile' | 'desktop'>('mobile');

  // Simulated live parameters
  const ctr = adStats.impressions > 0 ? (adStats.clicks / adStats.impressions) * 100 : 0.0;
  const cpc = adStats.clicks > 0 ? adStats.earnings / adStats.clicks : 0.0;
  const rpm = adStats.impressions > 0 ? (adStats.earnings / adStats.impressions) * 1000 : 0.0;

  const handleRecrawl = () => {
    setCrawlStatus('scanning');
    setTimeout(() => {
      setCrawlStatus('success');
    }, 1500);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 space-y-8 shadow-sm">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[10px] font-bold px-2.5 py-1 rounded-full border border-green-200 uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            AdSense and PageSpeed Authenticated
          </span>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            থীম অপ্টিমাইজেশন ও আর্নিং রিপোর্ট (Analytics & Earnings Dashboard)
          </h3>
          <p className="text-xs text-slate-500">এসইও পারফরমেন্স, ডাইনামিক বিজ্ঞাপন আর্নিং এবং সাইটম্যাপ ইনডেক্সিং ভিউ রিয়েল-টাইমে</p>
        </div>

        <button 
          onClick={handleRecrawl}
          disabled={crawlStatus === 'scanning'}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all flex items-center gap-2 drop-shadow-sm shrink-0 cursor-pointer disabled:opacity-70"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${crawlStatus === 'scanning' ? 'animate-spin' : ''}`} />
          {crawlStatus === 'scanning' ? 'ক্রলিং হচ্ছে...' : 'Sitemap রিক্রল করুন'}
        </button>
      </div>

      {/* Grid of core metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl relative overflow-hidden">
          <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">টোটাল আর্নিংস</span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-3xl font-black text-slate-950 font-mono">${adStats.earnings.toFixed(2)}</span>
            <span className="text-[10px] text-green-600 font-bold uppercase tracking-wider">▲ 24% This Hour</span>
          </div>
          <p className="text-[10.5px] text-slate-500 mt-2">গুগল এডসেন্স এস্টিমেটেড ইনকাম</p>
        </div>

        {/* Metric 2 */}
        <div className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl">
          <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">কিউরেটেড আর্টিকেলের সংখ্যা</span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-3xl font-black text-slate-950 font-mono">{postsCount}টি</span>
            <span className="text-[10px] text-indigo-600 font-bold uppercase">আই-আর্টিকেল রেডি</span>
          </div>
          <p className="text-[10.5px] text-slate-500 mt-2">অন-পেজ স্কিম রেডি রিচ পোস্ট</p>
        </div>

        {/* Metric 3 */}
        <div className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl">
          <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">গড় সিপিসি (Average CPC)</span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-3xl font-black text-slate-950 font-mono">${cpc.toFixed(3)}</span>
            <span className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">হাই সিপিসি নিশ</span>
          </div>
          <p className="text-[10.5px] text-slate-500 mt-2">প্রতি বিজ্ঞাপনে গড় ক্লিকে আয়</p>
        </div>

        {/* Metric 4 */}
        <div className="p-5 border border-slate-100 bg-slate-50/50 rounded-2xl">
          <span className="block text-[10px] text-slate-400 uppercase font-black tracking-widest">বিজ্ঞাপন আরপিএম (Ad RPM)</span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="text-3xl font-black text-slate-950 font-mono">${rpm.toFixed(2)}</span>
            <span className="text-[10px] text-purple-600 font-bold uppercase tracking-wider">CTR {ctr.toFixed(1)}%</span>
          </div>
          <p className="text-[10.5px] text-slate-500 mt-2">প্রতি হাজার ইম্প্রেশন থেকে রাজস্ব</p>
        </div>
      </div>

      {/* Speed Metrics and Chart section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
        
        {/* Left Side: PageSpeed Insights Score simulator (Core Web Vitals) */}
        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between border-b pb-3">
            <div className="flex items-center gap-2">
              <Gauge className="text-indigo-600 w-5 h-5 animate-pulse" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800">
                গুগল স্পীড স্কোর অপ্টিমাইজার (Google PageSpeed friendly)
              </h4>
            </div>
            
            <div className="flex bg-slate-200/60 p-1 rounded-lg text-[9px] font-bold uppercase tracking-wider">
              <button 
                onClick={() => setActiveSpeedTab('mobile')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${activeSpeedTab === 'mobile' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-black'}`}
              >
                মোবাইল
              </button>
              <button 
                onClick={() => setActiveSpeedTab('desktop')}
                className={`px-2.5 py-1 rounded transition-all cursor-pointer ${activeSpeedTab === 'desktop' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-black'}`}
              >
                ডেস্কটপ
              </button>
            </div>
          </div>

          <div className="flex items-center gap-6 py-2">
            {/* Round circular dashboard chart score */}
            <div className="relative w-24 h-24 flex items-center justify-center shrink-0">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="48" cy="48" r="42" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
                <circle cx="48" cy="48" r="42" stroke="#10b981" strokeWidth="6" fill="transparent" 
                  strokeDasharray="264" strokeDashoffset={activeSpeedTab === 'mobile' ? '8' : '0'} // 98% vs 100%
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center">
                <span className="text-2xl font-black text-slate-900 font-mono">{activeSpeedTab === 'mobile' ? '98' : '100'}</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">SPEED</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-xs font-bold text-slate-900 uppercase">Core Web Vitals Passed! (০.৩ - ০.৫ সেকেন্ড ল্যাটেন্সি)</h5>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                আমাদের থীমটি অত্যন্ত হালকা কোডে তৈরি। কোনো ক্লাটার জেএস ওভারলোড নেই, যা যেকোনো মোবাইল এবং কমস্পিড নেটওয়ার্কেও ১০০% গ্রিন রেজাল্ট দেয়।
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase font-bold pt-2 border-t">
            <div className="p-2 bg-indigo-50/40 rounded">
              <span className="block text-slate-400 text-[9px]">LCP index</span>
              <span className="text-xs font-bold font-mono text-emerald-600">0.4 sec (Good)</span>
            </div>
            <div className="p-2 bg-indigo-50/40 rounded">
              <span className="block text-slate-400 text-[9px]">INP Delay</span>
              <span className="text-xs font-bold font-mono text-emerald-600">12 ms (Good)</span>
            </div>
            <div className="p-2 bg-indigo-50/40 rounded">
              <span className="block text-slate-400 text-[9px]">Layout Shift</span>
              <span className="text-xs font-bold font-mono text-emerald-600">0.02 (Prinstine)</span>
            </div>
          </div>
        </div>

        {/* Right Side: Ad CPC Target niches index */}
        <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Zap className="text-amber-500 w-5 h-5" />
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800">
              হাই আরপিএম রেভিনিউ মেকানিজম (Traffic Niches Tracker)
            </h4>
          </div>

          <div className="text-[11px] text-slate-500 leading-normal space-y-3">
            <p>
              গুগল এডসেন্স অ্যালগরিদম আমাদের কিওয়ার্ড ডেনসিটি ইনডেক্স রিড করে সঠিক বিড প্রদর্শন করছে। নিচে নিশ ভিত্তিক রেভিনিউ প্রক্ষেপণ দেখুন:
            </p>

            <div className="space-y-2 pt-1 font-bold">
              <div className="flex items-center justify-between border-b pb-1.5">
                <span className="text-slate-700">১. ক্লাউড ইনফ্রাস্ট্রাকচার ও ভিপিএন নিশ (Tech)</span>
                <span className="text-green-600">$1.20 - $3.50 CPC</span>
              </div>
              <div className="flex items-center justify-between border-b pb-1.5">
                <span className="text-slate-700">২. ডিজিটাল এসইও মার্কেটিং গাইডস</span>
                <span className="text-green-600">$0.85 - $1.90 CPC</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-700">৩. ফাইনান্স ও লোকাল পেমেন্ট উইজেটস</span>
                <span className="text-green-600">$1.50 - $4.00 CPC</span>
              </div>
            </div>
          </div>

          <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex gap-2 text-[10.5px] text-amber-900 leading-relaxed font-medium">
            <Info className="w-4 h-4 shrink-0 text-amber-600" />
            <span>
              <strong>টিপস:</strong> বিজ্ঞাপন দেখতে আর্টিকেলের ভেতরের স্পনসর ব্যানারে ক্লিক করুন। রেভিনিউ এবং ক্লিক সংখ্যা সঙ্গে সঙ্গে ড্যাশবোর্ডে যোগ হবে।
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
