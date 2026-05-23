import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX, Eye, Flame, ChevronRight } from 'lucide-react';
import { MOCK_SHORTS } from '../constants';

export function ShortsWidget() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({});
  const [isMuted, setIsMuted] = useState(true);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  const togglePlay = (id: string) => {
    const video = videoRefs.current[id];
    if (video) {
      if (video.paused) {
        // Pause all other videos
        Object.keys(videoRefs.current).forEach((key) => {
          if (key !== id) {
            videoRefs.current[key]?.pause();
            isPlaying[key] = false;
          }
        });
        video.play().catch(() => {});
        setIsPlaying({ ...isPlaying, [id]: true });
      } else {
        video.pause();
        setIsPlaying({ ...isPlaying, [id]: false });
      }
    }
  };

  const handleNextShort = () => {
    const nextIdx = activeIndex === MOCK_SHORTS.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIdx);
    // Pause any old video playing
    const oldId = MOCK_SHORTS[activeIndex].id;
    if (videoRefs.current[oldId]) {
      videoRefs.current[oldId]?.pause();
    }
    // Lazy autoplay next
    setTimeout(() => {
      const nextId = MOCK_SHORTS[nextIdx].id;
      const nextVideo = videoRefs.current[nextId];
      if (nextVideo) {
        nextVideo.currentTime = 0;
        nextVideo.play().catch(() => {});
        setIsPlaying({ [nextId]: true });
      }
    }, 150);
  };

  const activeShort = MOCK_SHORTS[activeIndex];

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-500 animate-pulse" />
          <h4 className="text-sm font-bold uppercase tracking-wider text-slate-100">
            রিসেন্ট শর্টস (Shorts Section)
          </h4>
        </div>
        <button 
          onClick={handleNextShort}
          className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
        >
          পরবর্তী রিল
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="relative aspect-[9/16] w-full max-w-[280px] mx-auto bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-md group">
        
        {/* HTML Video player mock loop */}
        <video
          ref={(el) => { videoRefs.current[activeShort.id] = el; }}
          src={activeShort.videoUrl}
          className="w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          onClick={() => togglePlay(activeShort.id)}
        />

        {/* Backdrop overlay for text detail */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

        {/* Video Control Buttons Layer */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-1.5 rounded-full bg-black/50 text-white hover:bg-black/80 transition-all cursor-pointer"
            title={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5 text-amber-500" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Center Play Button indicator if paused */}
        {!isPlaying[activeShort.id] && (
          <button
            onClick={() => togglePlay(activeShort.id)}
            className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-indigo-600/90 text-white hover:bg-indigo-600 flex items-center justify-center transition-all shadow-lg scale-100 cursor-pointer"
          >
            <Play className="w-5 h-5 fill-current ml-1" />
          </button>
        )}

        {/* Short Text overlay info */}
        <div className="absolute bottom-3 inset-x-3 text-white space-y-1.5 z-10">
          <span className="inline-flex items-center gap-1 bg-red-600 text-[8px] font-bold uppercase px-1.5 py-0.5 rounded tracking-wider">
            LIVE SHORTS
          </span>
          <p className="text-xs font-semibold leading-relaxed line-clamp-2">
            {activeShort.title}
          </p>
          
          <div className="flex items-center justify-between text-[9px] text-slate-300 font-bold uppercase pt-1">
            <span className="truncate">@{activeShort.author}</span>
            <span className="flex items-center gap-0.5">
              <Eye className="w-3 h-3 text-slate-400" />
              {activeShort.views} ভিউ
            </span>
          </div>
        </div>
      </div>

      <div className="text-[10px] text-slate-400 leading-normal text-center bg-slate-950/40 py-2 rounded">
        প্রযুক্তি ও টেকনিক্যাল টিপস স্লাইড করুন। ভিডিও প্লে করতে মিডল ক্লিক করুন।
      </div>
    </div>
  );
}
