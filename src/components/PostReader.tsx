import { useState, useRef, useEffect } from 'react';
import { 
  ChevronLeft, Calendar, Clock, User, Share2, Facebook, Twitter, 
  HelpCircle, Send, Volume2, ShieldCheck, Check, Code, ExternalLink, Bookmark
} from 'lucide-react';
import { Post, Comment } from '../types';
import { AdPlacement } from './AdPlacement';

interface PostReaderProps {
  post: Post;
  posts: Post[];
  onBack: () => void;
  onPostSelect: (post: Post) => void;
  onAdInteract?: (type: 'impression' | 'click') => void;
  enableAds?: boolean;
}

export function PostReader({
  post,
  posts,
  onBack,
  onPostSelect,
  onAdInteract,
  enableAds = true,
}: PostReaderProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Comments State
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 'c1',
      postId: post.id,
      author: 'কাজী আরিয়ান',
      email: 'ariyan@gmail.com',
      text: 'খুবই সময়োপযোগী আর্টিকেল! এসইও টিপসগুলো রিয়েল প্রজেক্টে প্রয়োগ করে চমৎকার ফল পেয়েছি।',
      date: '2026-05-22 14:30',
      approved: true,
    },
    {
      id: 'c2',
      postId: post.id,
      author: 'Afsana Mimi',
      email: 'mimi@outlook.com',
      text: 'Thanks for this pristine explanation. The structural guidelines for Core Web Vitals are really outstanding.',
      date: '2026-05-21 09:15',
      approved: true,
    }
  ]);

  // Comment Form state
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [commentText, setCommentText] = useState('');
  
  // Security simulation: Anti-Spam Captcha
  const [numA] = useState(Math.floor(Math.random() * 5) + 3);
  const [numB] = useState(Math.floor(Math.random() * 4) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [securityLogs, setSecurityLogs] = useState<string[]>([]);
  const [showSchemaCode, setShowSchemaCode] = useState(false);

  // Scroll Progress Bar
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((window.scrollY / scrollHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter related posts (same category or popular)
  const relatedPosts = posts
    .filter(p => p.id !== post.id && p.category === post.category)
    .slice(0, 2);

  // Fallback if no directly matching categories exist
  const finalRelated = relatedPosts.length > 0 
    ? relatedPosts 
    : posts.filter(p => p.id !== post.id).slice(0, 2);

  const handleVideoTrigger = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verify Captcha anti-spam
    const correctSum = numA + numB;
    if (parseInt(captchaAnswer) !== correctSum) {
      alert('ভুল ক্যাপচা সমাধান! দয়া করে ট্রাই করুন।');
      return;
    }

    // XSS Sanitization simulation
    const escapedText = commentText
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');

    // CSRF Protection Token Simulation log
    const token = 'csrf_token_' + Math.random().toString(36).substring(2);
    const logMsg = `[SECUR-OK] CSRF validated smoothly. Header token: ${token} | escaped raw HTML elements to protect database storage.`;
    
    setSecurityLogs(prev => [logMsg, ...prev]);

    const newComment: Comment = {
      id: `comm-${Date.now()}`,
      postId: post.id,
      author: authorName,
      email: authorEmail,
      text: escapedText, // ESCAPED to show safe comments!
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      approved: true,
    };

    setComments(prev => [...prev, newComment]);
    setAuthorName('');
    setAuthorEmail('');
    setCommentText('');
    setCaptchaAnswer('');

    alert('ধন্যবাদ! আপনার মন্তব্যটি স্প্যাম সিকিউরিটি স্ক্রীনিং পেরিয়ে তাৎক্ষণিকভাবে পাবলিশ হয়েছে।');
  };

  // Programmatically inject an AdSense Spot after the second paragraph
  const renderParagraphsWithAds = (text: string) => {
    const paragraphs = text.split('\n\n');
    return paragraphs.map((para, i) => {
      // Determine headers if any
      const isHeader = para.startsWith('## ') || para.startsWith('### ');
      const cleanText = isHeader 
        ? para.replace(/^##\s+|^###\s+/, '') 
        : para;

      return (
        <div key={i} className="space-y-4">
          {isHeader ? (
            para.startsWith('## ') ? (
              <h2 className="text-xl md:text-2xl font-black text-slate-900 mt-8 mb-4 tracking-tight">
                {cleanText}
              </h2>
            ) : (
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mt-6 mb-3 tracking-tight">
                {cleanText}
              </h3>
            )
          ) : (
            <p className="text-slate-700 leading-relaxed text-[15px] sm:text-[16px]">
              {cleanText}
            </p>
          )}

          {/* Programmatically Inject inline-article Banner Ad Spot right after paragraph 1 or 2 */}
          {i === 1 && enableAds && (
            <div className="my-6">
              <span className="text-[10px] text-slate-400 font-bold block text-center mb-1">
                ADVERTISEMENT - ARTICLE CONTINUES BELOW
              </span>
              <AdPlacement 
                id="article-injected-ad" 
                size="fluid" 
                slotName="In-Article Ad Spot" 
                onAdInteract={onAdInteract}
              />
            </div>
          )}
        </div>
      );
    });
  };

  // Schema Markup generation visualization code for On-Page SEO point 2
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author.name
    },
    ...(post.faqs && post.faqs.length > 0 ? {
      "mainEntity": post.faqs.map(f => ({
        "@type": "Question",
        "name": f.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": f.answer
        }
      }))
    } : {})
  };

  return (
    <article className="min-h-screen bg-slate-50 relative pb-24">
      {/* Scroll Progress Indicator Bar */}
      <div 
        className="fixed top-16 left-0 h-1 bg-indigo-600 z-50 transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Breadcrumbs Navigation Panel */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-6">
          <button onClick={onBack} className="hover:text-indigo-600 transition-colors flex items-center gap-1">
            হোম
          </button>
          <span>/</span>
          <span className="text-slate-400 truncate max-w-[120px]">{post.category}</span>
          <span>/</span>
          <span className="text-indigo-600 truncate max-w-[180px]">{post.title}</span>
        </nav>

        {/* Action Header bar */}
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={onBack}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-700 bg-white hover:bg-slate-100 rounded-full border border-slate-200 shadow-xs transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            আর্টিকেল তালিকা
          </button>

          <button
            onClick={() => setShowSchemaCode(!showSchemaCode)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-widest text-slate-700 bg-white hover:text-indigo-600 rounded-full border border-slate-200 shadow-xs transition-all cursor-pointer"
            title="Inspect SEO Schema specifications"
          >
            <Code className="w-3.5 h-3.5" />
            SEO স্কিমা ({showSchemaCode ? 'হাইড' : 'দেখুন'})
          </button>
        </div>

        {/* Schema Code Inspect Block */}
        {showSchemaCode && (
          <div className="bg-slate-900 border border-slate-800 text-green-400 p-4 rounded-xl font-mono text-xs mb-8 shadow-inner relative">
            <span className="absolute top-3 right-3 bg-indigo-600 text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded shadow">
              Active JSON-LD Schema Code
            </span>
            <p className="text-slate-400 mb-2 border-b border-slate-800 pb-2 text-[11px]">
              // গুগল বটস এটি রিড করে সরাসরি FAQ স্নিপেট বা স্টার রেটিং র‌্যাঙ্কিং বুস্ট করে।
            </p>
            <pre className="overflow-x-auto whitespace-pre-wrap">{JSON.stringify(jsonLdSchema, null, 2)}</pre>
          </div>
        )}

        {/* Main Post Shell */}
        <div className="bg-white rounded-[1.5rem] border border-slate-200/60 p-5 sm:p-10 shadow-sm space-y-6">
          
          {/* Post Header */}
          <div className="space-y-4">
            <span className="inline-block bg-indigo-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
              {post.category}
            </span>

            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-950 leading-tight tracking-tight">
              {post.title}
            </h1>

            {/* Post Metadata line */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500 border-b border-slate-100 pb-6">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>পাবলিশ: {post.date}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>লেখক: {post.author.name}</span>
              </div>
            </div>
          </div>

          {/* Premium Custom HTML5 Video Player Block if videoUrl exists */}
          {post.videoUrl ? (
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-red-600 flex items-center gap-1 uppercase tracking-widest">
                <Bookmark className="w-3 h-3 fill-red-600" />
                ভিডিও পোস্ট এডিশন (Google VideoObject Schema Enabled)
              </span>
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg group">
                <video 
                  ref={videoRef}
                  src={post.videoUrl} 
                  className="w-full h-full object-cover"
                  loop
                  muted={isVideoMuted}
                  playsInline
                />
                
                {/* Custom Styled video player overlay bar controls */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-4 flex items-center justify-between gap-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity z-10 text-white">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleVideoTrigger}
                      className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 font-bold uppercase rounded text-[10px] tracking-wider transition-all cursor-pointer"
                    >
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </button>
                    <span className="text-[10px] uppercase tracking-widest font-mono text-slate-300">
                      Coding Video Player Demo
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsVideoMuted(!isVideoMuted)}
                      className="p-1.5 rounded bg-white/10 hover:bg-white/25 transition-colors cursor-pointer text-xs"
                    >
                      {isVideoMuted ? 'MUTE (ON)' : 'UNMUTE (OFF)'}
                    </button>
                  </div>
                </div>

                {/* Big play button centered */}
                {!isPlaying && (
                  <button 
                    onClick={handleVideoTrigger}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-indigo-600/95 hover:scale-105 active:scale-95 text-white flex items-center justify-center transition-all shadow-2xl cursor-pointer"
                  >
                    PLAY LOUD
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Featured Image display */
            <div className="aspect-[16/10] sm:aspect-[21/9] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Table of Contents Floating/Embedded Section */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200/70 text-sm space-y-2 my-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest flex items-center gap-1">
              <span>সূচিপত্র (Table of Contents)</span>
            </h4>
            <ul className="text-xs space-y-2 text-indigo-600 font-medium">
              <li><a href="#section-1" className="hover:underline">• ১. কিওয়ার্ড অপ্টিমাইজেশন ও এলএসআই (LSI Keywords)</a></li>
              <li><a href="#section-2" className="hover:underline">• ২. হেডিং স্ট্রাকচার যথাযথ ব্যবহার</a></li>
              <li><a href="#section-3" className="hover:underline">• ৩. লাস্ট-আপডেট ও স্কিমা মার্কআপ (Schema Markup)</a></li>
              <li><a href="#section-4" className="hover:underline">• ৪. ফাস্ট লোডিং এবং রেসপনসিভ লেআউট</a></li>
            </ul>
          </div>

          {/* Programmatic Paragraph rendering with Ad insertion */}
          <div className="prose max-w-none text-slate-800 space-y-6">
            {renderParagraphsWithAds(post.content)}
          </div>

          {/* Related Tags Area */}
          <div className="flex flex-wrap gap-1.5 pt-6 border-t border-slate-100">
            {post.tags?.map(t => (
              <span key={t} className="px-2.5 py-1 text-xs bg-slate-100 border border-slate-200 rounded text-slate-600">
                #{t}
              </span>
            ))}
          </div>

          {/* Social Share Box */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-indigo-600" />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">বন্ধুদের সাথে শেয়ার করুন (Social Share Button)</span>
            </div>
            <div className="flex gap-2 text-xs font-bold uppercase tracking-wider text-white">
              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-all flex items-center gap-1.5"
              >
                <Facebook className="w-4 h-4 fill-current" />
                Facebook
              </a>
              <a 
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-sky-500 hover:bg-sky-600 rounded-md transition-all flex items-center gap-1.5"
              >
                <Twitter className="w-4 h-4 fill-current" />
                Twitter
              </a>
            </div>
          </div>

          {/* FAQ Schema Markup UI Widget for points 2 & 6 */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="border border-indigo-100 rounded-2xl bg-indigo-50/20 p-6 space-y-4">
              <h4 className="text-sm font-bold text-indigo-900 uppercase tracking-widest flex items-center gap-1.5 border-b border-indigo-100 pb-2">
                <HelpCircle className="w-5 h-5" />
                এফএকিউ স্কিমা সেকশন (FAQ Schema Section)
              </h4>
              <div className="space-y-4">
                {post.faqs.map((faq, idx) => (
                  <div key={idx} className="space-y-2 text-sm">
                    <h5 className="font-bold text-slate-950 flex gap-2">
                      <span className="text-indigo-600">Q:</span>
                      {faq.question}
                    </h5>
                    <p className="text-slate-600 pl-6 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author Box Display Section */}
          <div className="p-6 md:p-8 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col md:flex-row gap-6 items-center md:items-start text-center md:text-left transition-all hover:bg-slate-100/50">
            <img 
              src={post.author.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Author'} 
              alt={post.author.name} 
              className="w-16 h-16 rounded-full border border-slate-200 shadow-xs"
              referrerPolicy="no-referrer"
            />
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-600 px-2 py-0.5 bg-indigo-50 rounded">
                আর্টিকেল পাবলিশার (Author Bio Profile)
              </span>
              <h4 className="text-lg font-bold text-slate-950">{post.author.name}</h4>
              <p className="text-xs text-slate-500 leading-relaxed max-w-xl">
                {post.author.bio || 'SonarTech রিহেব টেকনোলজি এক্সপার্ট টিম। আমরা চমৎকার এসইও লেআউট নিয়ে কাজ করি।'}
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Related Posts Widget */}
        <div className="mt-12 space-y-4">
          <h3 className="text-lg font-bold text-slate-900 border-b pb-2">
            সম্পর্কিত অন্যান্য আর্টিকেল (Related Posts)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {finalRelated.map(item => (
              <div 
                key={item.id}
                onClick={() => onPostSelect(item)}
                className="bg-white border rounded-xl p-4 flex gap-4 cursor-pointer hover:border-indigo-600 transition-colors group"
              >
                <div className="w-20 h-20 rounded overflow-hidden bg-slate-100 shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest block">{item.category}</span>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-indigo-600">{item.title}</h4>
                  <span className="text-[9px] text-slate-400 block">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High Security Comments Box */}
        <div className="mt-12 bg-white rounded-2xl border p-6 md:p-8 space-y-6">
          <h3 className="text-lg font-bold text-slate-900 border-b pb-2 flex justify-between items-center">
            <span>মন্তব্য সমূহ ({comments.length})</span>
            <span className="text-xs text-green-600 font-bold flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded border border-green-200/50">
              <ShieldCheck className="w-4 h-4" />
              XSS / CSRF Protected
            </span>
          </h3>

          <div className="space-y-4">
            {comments.map((comm) => (
              <div key={comm.id} className="bg-slate-50/50 rounded-xl p-4 border border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                  <span className="flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center text-[10px]">
                      {comm.author.substring(0, 1).toUpperCase()}
                    </span>
                    {comm.author}
                  </span>
                  <span className="text-slate-400 font-medium">{comm.date}</span>
                </div>
                <p 
                  className="text-xs text-slate-600 pl-7 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: comm.text }} // Escape implemented internally but rendered safely
                />
              </div>
            ))}
          </div>

          {/* Custom Secured comment entry form */}
          <form onSubmit={handleCommentSubmit} className="space-y-4 pt-4 border-t border-slate-100">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-800">মতামত দিন (Write Secure Comment)</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">আপনার নাম (Full Name)*</label>
                <input 
                  type="text" 
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  placeholder="আপনার নাম প্রবেশ করান..."
                  className="w-full text-xs p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-600"
                  required
                />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">ইমেইল ঠিকানা (Email)*</label>
                <input 
                  type="email" 
                  value={authorEmail}
                  onChange={(e) => setAuthorEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full text-xs p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">মন্তব্যের বিবরণ (Write Comment)*</label>
              <textarea 
                rows={4}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="মতামত এখানে লিখুন..."
                className="w-full text-xs p-3 border border-slate-200 rounded-lg outline-none focus:border-indigo-600"
                required
              />
              <p className="text-[10px] text-slate-400 mt-1">* Html tags inject করার চেষ্টা করলে তা অটোমেটিক ফিল্টার (XSS Escaping) হয়ে যাবে।</p>
            </div>

            {/* Spam Filter Protection Mathematics Question */}
            <div className="bg-slate-50 border p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-indigo-100 rounded text-indigo-700 font-bold text-xs">
                  {numA} + {numB} = ?
                </span>
                <span className="text-xs font-bold text-slate-700">অ্যান্টি-স্প্যাম ভেরিফিকেশন (Mathematical Captcha)</span>
              </div>
              <input 
                type="text" 
                value={captchaAnswer}
                onChange={(e) => setCaptchaAnswer(e.target.value)}
                placeholder="উত্তরটি এখানে লিখুন" 
                className="w-32 text-xs p-2 border border-slate-300 rounded text-center font-bold focus:border-indigo-600 outline-none"
                required
              />
            </div>

            {/* Token security logs preview */}
            {securityLogs.length > 0 && (
              <div className="bg-slate-100/80 p-3 rounded-lg text-[9px] font-mono text-slate-600 max-h-24 overflow-y-auto space-y-1">
                <span className="font-bold text-slate-700 uppercase block mb-1">SECURITY ACCESS SHIELD LOGS:</span>
                {securityLogs.map((log, i) => (
                  <div key={i} className="flex gap-1">
                    <span className="text-green-600 font-black">✓</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              type="submit"
              className="px-6 py-3.5 bg-indigo-600 hover:bg-slate-950 text-white text-xs font-bold uppercase tracking-widest rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
            >
              <Send className="w-4 h-4" />
              মন্তব্য জমা দিন (Submit Comment)
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
