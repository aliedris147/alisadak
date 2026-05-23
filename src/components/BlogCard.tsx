import { motion } from 'motion/react';
import { Post } from '../types';
import { formatDate } from '../lib/utils';
import { Clock } from 'lucide-react';

interface BlogCardProps {
  post: Post;
  index: number;
  onClick?: () => void;
}

export function BlogCard({ post, index, onClick }: BlogCardProps) {
  return (
    <motion.article 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-surface-soft rounded-lg mb-4">
        <img 
          src={post.image} 
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-brand">
          {post.category}
        </div>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center gap-3 text-[11px] font-medium text-surface-dim uppercase tracking-wider">
          <span>{formatDate(post.date)}</span>
          <span className="w-1 h-1 bg-surface-dim rounded-full" />
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
        </div>
        
        <h3 className="text-xl leading-tight group-hover:text-surface-dim transition-colors">
          {post.title}
        </h3>
        
        <p className="text-sm text-surface-dim line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>
      </div>
    </motion.article>
  );
}
