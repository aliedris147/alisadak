import { motion } from 'motion/react';
import { Post } from '../types';
import { formatDate } from '../lib/utils';
import { ArrowRight, Clock } from 'lucide-react';

interface HeroProps {
  post: Post;
}

export function Hero({ post }: HeroProps) {
  return (
    <section className="relative w-full min-h-[60vh] flex flex-col md:flex-row items-center gap-8 md:gap-16 py-12 md:py-24 px-6 max-w-7xl mx-auto overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 space-y-6 z-10"
      >
        <div className="inline-flex items-center gap-4 bg-surface-soft px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] text-brand">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand"></span>
          </span>
          Featured Post
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl leading-[1.1] font-bold tracking-tight">
          {post.title}
        </h1>

        <p className="text-lg md:text-xl text-surface-dim max-w-2xl leading-relaxed">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center gap-6 pt-4">
          <div className="flex items-center gap-3">
            <img 
              src={post.author.avatar} 
              alt={post.author.name}
              className="w-10 h-10 rounded-full border border-surface-soft shadow-sm"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold">{post.author.name}</span>
              <span className="text-[11px] text-surface-dim uppercase tracking-wider">{formatDate(post.date)}</span>
            </div>
          </div>
          
          <div className="h-8 w-[1px] bg-surface-soft hidden sm:block" />
          
          <div className="flex items-center gap-2 text-sm text-surface-dim border-b border-transparent hover:border-brand transition-all cursor-pointer group">
            <span className="font-medium group-hover:text-brand">Read Full Article</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform group-hover:text-brand" />
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="flex-1 w-full aspect-[4/3] md:aspect-auto md:h-[600px] relative rounded-2xl overflow-hidden shadow-2xl"
      >
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
        
        <div className="absolute bottom-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl text-white">
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest">
            <Clock className="w-3 h-3" />
            Reading Time: {post.readTime}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
