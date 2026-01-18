import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Articles = ({ articles }) => {
  return (
    <>
      {articles.map((article, index) => (
        <motion.div
          key={article.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="flex flex-col group h-full bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
        >
          <Link to={`/article/${article.name}`} className="block overflow-hidden h-48">
            <img
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
              src={article.thumbnail}
              alt={article.title}
            />
          </Link>
          <div className='p-8 flex flex-col flex-grow'>
            <div className="mb-4">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-600 bg-green-50 px-3 py-1 rounded-full">
                Development
              </span>
            </div>
            <Link to={`/article/${article.name}`}>
              <h3 className='text-2xl font-bold text-slate-900 mb-3 leading-tight hover:text-green-600 transition-colors'>
                {article.title}
              </h3>
            </Link>
            <p className='text-slate-500 leading-relaxed mb-6 line-clamp-3 text-sm'>
              {article.content[0]}
            </p>
            <div className="mt-auto">
              <Link
                className='text-sm font-bold text-slate-900 inline-flex items-center gap-2 group/btn'
                to={`/article/${article.name}`}
              >
                Read Article
                <span className="group-hover/btn:translate-x-1 transition-transform text-green-500">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};

export default Articles;