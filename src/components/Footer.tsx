import { Twitter, Github, Linkedin, Mail } from 'lucide-react';
import { SITE_CONFIG } from '../constants';

export function Footer() {
  return (
    <footer className="w-full border-t border-surface-soft bg-white pt-24 pb-12 px-6 mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="space-y-6 max-w-sm text-center md:text-left">
          <div className="text-2xl font-bold tracking-tighter flex justify-center md:justify-start items-center gap-2">
            <div className="w-6 h-6 bg-brand rounded-sm" />
            {SITE_CONFIG.name.toUpperCase()}
          </div>
          <p className="text-surface-dim leading-relaxed">
            {SITE_CONFIG.tagline} Built with performance and modern readability at its core.
          </p>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <a href="#" className="p-2 hover:bg-surface-soft rounded-full transition-colors"><Twitter className="w-5 h-5 text-surface-dim hover:text-brand" /></a>
            <a href="#" className="p-2 hover:bg-surface-soft rounded-full transition-colors"><Github className="w-5 h-5 text-surface-dim hover:text-brand" /></a>
            <a href="#" className="p-2 hover:bg-surface-soft rounded-full transition-colors"><Linkedin className="w-5 h-5 text-surface-dim hover:text-brand" /></a>
            <a href="#" className="p-2 hover:bg-surface-soft rounded-full transition-colors"><Mail className="w-5 h-5 text-surface-dim hover:text-brand" /></a>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand">Explore</h4>
            <ul className="space-y-2 text-sm text-surface-dim">
              <li><a href="#" className="hover:text-brand transition-colors">Categories</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Popular</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Featured</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Resources</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand">Connect</h4>
            <ul className="space-y-2 text-sm text-surface-dim">
              <li><a href="#" className="hover:text-brand transition-colors">Newsletter</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand transition-colors">Sitemap</a></li>
            </ul>
          </div>
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <h4 className="text-xs font-bold uppercase tracking-widest text-brand">Velocity UI</h4>
            <p className="text-xs text-surface-dim leading-relaxed max-w-[200px] mx-auto md:mx-0">
              A high-end blog theme designed for professional writers and digital publications.
            </p>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-24 border-t border-surface-soft mt-12 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-surface-dim uppercase tracking-widest">
        <span>© 2026 {SITE_CONFIG.name} Project. ALL RIGHTS RESERVED.</span>
        <div className="flex gap-8">
          <a href="#" className="hover:text-brand transition-colors">PRIVACY POLICY</a>
          <a href="#" className="hover:text-brand transition-colors">TERMS OF SERVICE</a>
        </div>
      </div>
    </footer>
  );
}
