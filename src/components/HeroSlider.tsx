import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Pause, Play, Sparkles } from 'lucide-react';
import { BannerAd } from '../types';

interface HeroSliderProps {
  banners: BannerAd[];
  onAdInteract?: (type: 'impression' | 'click') => void;
}

export function HeroSlider({ banners, onAdInteract }: HeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Auto sliding timing system (3000ms slide delay)
  useEffect(() => {
    if (isPlaying && banners.length > 0) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 3000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPlaying, banners]);

  const handleNext = () => {
    setSlideDirection('right');
    setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    // Trigger impression on sliding into view
    if (onAdInteract) {
      onAdInteract('impression');
    }
  };

  const handlePrev = () => {
    setSlideDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    if (onAdInteract) {
      onAdInteract('impression');
    }
  };

  const handleDotClick = (index: number) => {
    setSlideDirection(index > currentIndex ? 'right' : 'left');
    setCurrentIndex(index);
    if (onAdInteract) {
      onAdInteract('impression');
    }
  };

  if (!banners || banners.length === 0) return null;

  const activeBanner = banners[currentIndex];

  // Motion animation parameters matching Transition Speed 700ms
  const variants = {
    enter: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: 'left' | 'right') => ({
      x: direction === 'right' ? -1000 : 1000,
      opacity: 0,
    }),
  };

  return (
    <section 
      className="relative w-full max-w-7xl mx-auto my-6 px-4 md:px-6"
      onMouseEnter={() => setIsPlaying(false)} // Pause on hover
      onMouseLeave={() => setIsPlaying(true)}  // Resume play
    >
      {/* Container holding exactly 1200x400px desktop ratio / adaptive mobile */}
      <div className="relative w-full h-[320px] md:h-[400px] rounded-2xl overflow-hidden shadow-xl bg-slate-900 border border-slate-800">
        
        {/* Sliding Canvas element */}
        <AnimatePresence initial={false} custom={slideDirection}>
          <motion.div
            key={currentIndex}
            custom={slideDirection}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 100, damping: 20 },
              opacity: { duration: 0.7 }, // 700ms speed transition
            }}
            className="absolute inset-0 w-full h-full flex flex-col justify-end"
          >
            {/* Background Image and gradient overlay */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={activeBanner.imageUrl} 
                alt={activeBanner.title} 
                className="w-full h-full object-cover opacity-35 transition-transform duration-700 hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-950/25" />
            </div>

            {/* Slide Content Overlay */}
            <div className="relative p-6 md:p-12 text-white max-w-3xl z-10 space-y-3.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/90 text-[10px] font-bold uppercase tracking-widest text-[#000]">
                <Sparkles className="w-3 h-3" />
                Featured Deal / Sponsor Ad {currentIndex + 1}
              </span>

              <h2 className="text-2xl md:text-4xl font-black leading-tight tracking-tight text-white">
                {activeBanner.title}
              </h2>

              <p className="text-sm md:text-base text-slate-300 leading-relaxed max-w-2xl line-clamp-2">
                {activeBanner.subtitle}
              </p>

              <div className="flex items-center gap-4 pt-2">
                <a 
                  href={activeBanner.linkUrl}
                  onClick={() => onAdInteract?.('click')}
                  className="inline-flex items-center justify-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold uppercase tracking-[0.2em] rounded-full transition-all hover:scale-105"
                >
                  {activeBanner.buttonText}
                </a>

                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold hidden sm:inline">
                  ✓ Verified Secure Sponsor • clicks simulate revenue
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Manual Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer border border-white/10"
          title="Previous Banner"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Manual Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer border border-white/10"
          title="Next Banner"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Indicator Dots & State Panel */}
        <div className="absolute bottom-4 left-6 md:left-12 z-20 flex items-center gap-4">
          <div className="flex gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all cursor-pointer ${idx === currentIndex ? 'bg-amber-500 w-8' : 'bg-white/40 hover:bg-white/80'}`}
                title={`Go to Banner ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-[10px] text-white/50 uppercase font-bold tracking-widest flex items-center gap-1 bg-black/30 px-2.5 py-1 rounded-full border border-white/5">
            {isPlaying ? (
              <>
                <Pause className="w-2.5 h-2.5 animate-pulse text-amber-500" />
                <span>Auto Play (Pause on Hover)</span>
              </>
            ) : (
              <>
                <Play className="w-2.5 h-2.5 text-zinc-400" />
                <span>Paused</span>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
