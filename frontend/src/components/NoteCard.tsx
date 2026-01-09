import { Calendar, MoreVertical, ArrowUpRight } from "lucide-react";
import type { Note } from "../apis/notes";

export default function NoteCard({ note }: { note: Note}) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="group relative bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.1)] hover:border-indigo-200 flex flex-col h-full">
      
      {/* Decorative Gradient Corner on Hover */}
      <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-indigo-50 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Header Area */}
      <div className="flex items-start justify-between mb-4 relative z-10">
        <div className="px-2.5 py-1 bg-slate-50 border border-slate-100 rounded-full flex items-center gap-1.5 text-slate-500 group-hover:bg-indigo-50 group-hover:border-indigo-100 group-hover:text-indigo-600 transition-colors">
          <Calendar size={12} className="stroke-[2.5px]" />
          <span className="text-[11px] font-bold uppercase tracking-wider">{formatDate(note.createdAt)}</span>
        </div>
        
        <div className="flex gap-1">
           <button className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
            <ArrowUpRight size={16} />
          </button>
          <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="space-y-2 relative z-10 flex-1">
        <h3 className="font-extrabold text-slate-800 text-xl leading-tight group-hover:text-indigo-600 transition-colors line-clamp-2">
          {note.title}
        </h3>
        <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
          {note.content || "No description provided..."}
        </p>
      </div>

      {/* Footer: Tags & Indicators */}
      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between relative z-10">
        <div className="flex flex-wrap gap-2">
          {note.tags?.slice(0, 2).map((tag) => (
            <span 
              key={tag} 
              className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-md transition-all group-hover:bg-white group-hover:shadow-sm group-hover:text-indigo-500 border border-transparent group-hover:border-indigo-100"
            >
              #{tag.toLowerCase()}
            </span>
          ))}
          {note.tags && note.tags.length > 2 && (
            <span className="text-[10px] font-bold text-slate-400 self-center">
              +{note.tags.length - 2} more
            </span>
          )}
        </div>
        
        {/* Visual indicator of "Read More" */}
        <div className="w-1.5 h-1.5 rounded-full bg-slate-200 group-hover:bg-indigo-400 group-hover:scale-150 transition-all" />
      </div>
    </div>
  );
}