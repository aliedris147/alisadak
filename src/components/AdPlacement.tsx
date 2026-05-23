import { useState, useEffect } from 'react';
import { Info, X, ExternalLink } from 'lucide-react';

interface AdPlacementProps {
  id: string;
  size: '728x90' | '300x250' | '320x50' | '970x90' | 'fluid';
  slotName: string;
  onAdInteract?: (type: 'impression' | 'click') => void;
  visible?: boolean;
}

export function AdPlacement({ id, size, slotName, onAdInteract, visible = true }: AdPlacementProps) {
  const [isClosed, setIsClosed] = useState(false);
  const [hasImpressed, setHasImpressed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (visible && !isClosed && !hasImpressed) {
      // Trigger dynamic impression report on mounting
      if (onAdInteract) {
        onAdInteract('impression');
      }
      setHasImpressed(true);
    }
  }, [visible, isClosed, hasImpressed, onAdInteract]);

  if (!visible || isClosed) return null;

  const handleAdClick = (e: React.MouseEvent) => {
    // Avoid registration if clicked on the Close or Info buttons
    const target = e.target as HTMLElement;
    if (target.closest('.ad-control')) return;

    if (onAdInteract) {
      onAdInteract('click');
    }
  };

  // Dimensional styles based on Ad size guidelines
  let sizeClasses = '';
  let mockContent = {
    title: 'প্রিমিয়াম ডোমেন ও NVMe ক্লাউড হোস্টিং!',
    descr: '৮০% শতাংশ পর্যন্ত বিশেষ ছাড়! সাথে থাকছে আনলিমিটেড ফ্রি এসএসএল সার্টিফিকেট।',
    cta: 'অর্ডার করুন',
    sponsor: 'HostGari Cloud Ltd.',
  };

  if (size === '300x250') {
    sizeClasses = 'w-[300px] h-[250px] mx-auto';
    mockContent = {
      title: 'প্রিমিয়াম ভিপিএন সলিউশন!',
      descr: 'নিরাপদ ইন্টারনেট ব্রাউজিং নিশ্চিত করুন এবং যেকোনো সাইট আনব্লক করুন ১টি ক্লিকে।',
      cta: 'ফ্রি ট্রায়াল নিন',
      sponsor: 'NordSecure VPN',
    };
  } else if (size === '728x90') {
    sizeClasses = 'w-full max-w-[728px] h-[90px] mx-auto hidden md:flex';
  } else if (size === '320x50') {
    sizeClasses = 'w-[320px] h-[50px] mx-auto flex md:hidden';
    mockContent = {
      title: 'বিকাশ ডাবল ক্যাশব্যাক অফার!',
      descr: '',
      cta: 'রিচার্জ করুন',
      sponsor: 'bKash Tech Ltd.',
    };
  } else if (size === '970x90') {
    sizeClasses = 'w-full max-w-[970px] h-[90px] mx-auto hidden lg:flex';
  } else {
    // fluid or standard adaptive article ad
    sizeClasses = 'w-full h-auto p-4';
  }

  return (
    <div 
      className="relative mx-auto my-6 bg-slate-50 border border-amber-200/60 rounded-lg overflow-hidden transition-all duration-300 hover:border-amber-300 shadow-sm"
      style={{ userSelect: 'none' }}
    >
      {/* Top Tag Bar */}
      <div className="flex items-center justify-between px-3 py-1 bg-amber-50 border-b border-amber-100 text-[9px] text-amber-800/80 uppercase font-bold tracking-widest">
        <span className="flex items-center gap-1">
          <span>Sponsor Ad</span>
          <span className="w-1 h-1 bg-amber-300 rounded-full" />
          <span className="text-[8px] tracking-normal text-slate-500 normal-case">ID: {id} ({size})</span>
        </span>
        
        <div className="flex items-center gap-2">
          {/* AdSense Info Trigger */}
          <button 
            onClick={() => setShowInfo(!showInfo)} 
            className="ad-control hover:text-amber-950 p-0.5 transition-colors cursor-pointer"
            title="About AdSense Ad spots"
          >
            <Info className="w-3.5 h-3.5" />
          </button>
          
          {/* Close Ad Box */}
          <button 
            onClick={() => setIsClosed(true)} 
            className="ad-control hover:text-red-600 p-0.5 transition-colors cursor-pointer"
            title="Hide this ad temporary"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Info popover */}
      {showInfo && (
        <div className="absolute inset-x-0 top-6 bottom-0 bg-white/95 backdrop-blur-sm p-3 text-xs text-slate-700 z-10 flex flex-col justify-between border-t border-amber-100">
          <div>
            <p className="font-bold text-amber-900 mb-1">Google AdSense Friendly Ad Layout</p>
            <p className="leading-relaxed text-[11px] text-slate-600">
              এটি একটি ডেমো বিজ্ঞাপন স্পট। আর্টিকেলের রিডাবিলিটি সঠিক রাখতে এবং গুগল পলিসি মেনে এটি ডিজাইন করা হয়েছে। ক্লিক করলে বা স্পট লোড হলে এস্টিমেটেড ড্যাশবোর্ড ইনকাম বৃদ্ধি পবে।
            </p>
          </div>
          <button 
            onClick={() => setShowInfo(false)} 
            className="ad-control self-end px-3 py-1 bg-amber-600 text-white text-[10px] uppercase font-bold tracking-wider rounded hover:bg-amber-700 transition-colors"
          >
            ঠিক আছে
          </button>
        </div>
      )}

      {/* Interactive Ad Canvas */}
      <div 
        onClick={handleAdClick}
        className={`relative cursor-pointer transition-colors hover:bg-amber-50/20 ${sizeClasses} flex items-center justify-between p-4 gap-4`}
      >
        {size === '300x250' ? (
          <div className="flex flex-col justify-between w-full h-full pt-1">
            <div>
              <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block mb-1">
                {mockContent.sponsor}
              </span>
              <h4 className="text-sm font-bold text-slate-950 leading-snug line-clamp-2">
                {mockContent.title}
              </h4>
              <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                {mockContent.descr}
              </p>
            </div>
            
            <div className="flex items-center justify-between mt-3 text-xs">
              <span className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded text-[10px] uppercase tracking-wider hover:bg-indigo-600 transition-colors">
                {mockContent.cta}
              </span>
              <span className="text-[9px] text-slate-400 flex items-center gap-1">
                <span>ads.google.com</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </span>
            </div>
          </div>
        ) : size === '728x90' || size === '970x90' ? (
          <div className="flex items-center justify-between w-full h-full py-1">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 text-white font-black text-center rounded flex items-center justify-center shrink-0 shadow-inner">
                HOST
              </div>
              <div>
                <span className="text-[10px] font-bold text-amber-700 uppercase tracking-widest block">
                  HOT DEALS  • HostGari Cloud
                </span>
                <h4 className="text-[15px] font-bold text-slate-950 tracking-tight leading-normal">
                  সুপার স্পীড এনভিএমই ক্লাউড হোস্টিং হোস্টিং কিনুন ফ্রি ডোমেইন সহ!
                </h4>
                <p className="text-xs text-slate-500 hidden lg:block line-clamp-1">
                  ৯৯.৯৯% আপটাইম গ্যারান্টি, লাইভ ট্রান্সফার সাপোর্ট, এবং সাথে থাকছে আনলিমিটেড ফ্রি এসএসএল সার্টিফিকেট।
                </p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1.5 grow-0 shrink-0">
              <span className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold uppercase tracking-wider rounded-md shadow-sm transition-colors text-center whitespace-nowrap">
                এখনই কিনুন
              </span>
              <span className="text-[8px] text-slate-400">Sponsored by hostgari.com</span>
            </div>
          </div>
        ) : (
          /* Mobile banner 320x50 or Fluid */
          <div className="flex items-center justify-between w-full py-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
                bK
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-950 leading-tight">
                  {mockContent.title}
                </h4>
                <p className="text-[10px] text-slate-500">
                  {mockContent.sponsor}
                </p>
              </div>
            </div>
            
            <span className="px-2.5 py-1 bg-red-600 text-white text-[10px] font-bold uppercase rounded hover:bg-red-700 whitespace-nowrap">
              {mockContent.cta}
            </span>
          </div>
        )}
      </div>

      {/* Embedded interactive pointer indicator */}
      <div className="absolute right-2 bottom-1.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-amber-500 text-white text-[8px] font-bold px-1.5 py-0.5 rounded shadow">
          CLICK AND EARN DEMO REVENUE
        </span>
      </div>
    </div>
  );
}
