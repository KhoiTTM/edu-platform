import React from 'react';
import { Database, ArrowRight, MoreVertical } from 'lucide-react';
import Link from 'next/link';

interface CollectionCardProps {
  collection: {
    id: string;
    title: string;
    subject_slug: string;
    grade: number;
    status: string;
    created_at: string;
  };
}

export function CollectionCard({ collection }: CollectionCardProps) {
  const statusColors: Record<string, string> = {
    'draft': 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
    'published': 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
    'archived': 'bg-slate-100 text-slate-700 dark:bg-slate-900/30 dark:text-slate-400',
  };

  return (
    <div className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:shadow-xl hover:border-sky-500/50 transition-all duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-sky-500/5 rounded-full blur-2xl group-hover:bg-sky-500/10 transition-all"></div>
      
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-sky-600 group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20 transition-all`}>
          <Database size={24} />
        </div>
        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors p-1">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-black text-slate-800 dark:text-white group-hover:text-sky-600 transition-colors mb-1 line-clamp-1">
          {collection.title}
        </h3>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          {collection.subject_slug} • Grade {collection.grade}
        </p>
      </div>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50 dark:border-slate-800">
        <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-full ${statusColors[collection.status] || statusColors['draft']}`}>
          {collection.status}
        </span>
        
        <Link 
          href={`/assessment-studio/collections/${collection.id}`}
          className="flex items-center gap-1.5 text-xs font-black text-sky-600 hover:text-sky-700 group-hover:translate-x-1 transition-all"
        >
          OPEN <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
