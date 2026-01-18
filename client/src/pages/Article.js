import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "framer-motion";
import { ChevronLeft, Share2, MessageSquare, Clock } from "lucide-react";
import articleContent from "./article-content";

// Components
import Articles from "../components/Articles";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import NotFound from "./NotFound";

const Article = () => {
  const { name } = useParams();
  const article = articleContent.find((article) => article.name === name);
  const [articleInfo, setArticleInfo] = useState({ comments: [] });

  // Reading Progress Logic
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch(`/api/articles/${name}`);
      const body = await result.json();
      setArticleInfo(body);
    };
    fetchData();
    window.scrollTo(0, 0); // Reset scroll on entry
  }, [name]);

  if (!article) return <NotFound />;

  const otherArticles = articleContent.filter((a) => a.name !== name);

  return (
    <div className="relative">
      {/* Premium Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-green-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      <div className="max-w-4xl mx-auto px-4">
        {/* Back Navigation */}
        <Link to="/articles-list" className="inline-flex items-center text-slate-400 hover:text-green-600 transition-colors mb-8 group">
          <ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm">Back to Articles</span>
        </Link>

        {/* Hero Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
              Case Study
            </span>
            <span className="flex items-center gap-1 text-slate-400 text-xs font-medium">
              <Clock size={14} /> 5 min read
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tight mb-8">
            {article.title}
          </h1>
          <div className="flex items-center justify-between py-6 border-y border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-tr from-green-400 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold">
                TA
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Tech Academy</p>
                <p className="text-xs text-slate-400">Published Jan 2026</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-green-600">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="prose prose-slate prose-lg max-w-none prose-p:leading-loose prose-p:text-slate-600 prose-headings:font-black prose-headings:text-slate-900 mb-20"
        >
          {article.content.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </motion.div>

        {/* Interaction Section */}
        <section className="bg-slate-50 rounded-3xl p-8 md:p-12 mb-20">
          <div className="flex items-center gap-2 mb-10">
            <MessageSquare className="text-green-600" />
            <h2 className="text-2xl font-bold text-slate-900">Discussion</h2>
          </div>
          <CommentsList comments={articleInfo.comments} />
          <div className="mt-12">
            <AddCommentForm articleName={name} setArticleInfo={setArticleInfo} />
          </div>
        </section>

        {/* Footer Navigation */}
        <section className="border-t border-slate-100 pt-20 pb-10">
          <h3 className="text-2xl font-black text-slate-900 mb-10">More for You</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Articles articles={otherArticles.slice(0, 2)} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Article;