import type { Notes } from "../apis/notes";
import { Calendar, Tag, MoreVertical } from "lucide-react";

export default function NoteCard({ note }: { note: Notes }) {
  // Format date nicely (e.g., "Jan 12, 2024")
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="group bg-white border border-slate-200 rounded-xl p-5 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-200 flex flex-col h-full relative">
      
      {/* Top Section: Date & Menu */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Calendar size={14} />
          <span className="text-xs font-medium">{formatDate(note.createdAt)}</span>
        </div>
        <button className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors">
          <MoreVertical size={16} />
        </button>
      </div>

      {/* Title */}
      <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
        {note.title}
      </h3>

      {/* Content Body */}
      <p className="text-slate-600 text-sm leading-relaxed line-clamp-4 mb-5">
        {note.content}
      </p>

      {/* Footer: Tags */}
      <div className="mt-auto pt-4 border-t border-slate-50 flex flex-wrap gap-1.5">
        {note.tags?.map((tag) => (
          <span 
            key={tag} 
            className="inline-flex items-center px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-md border border-transparent group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all"
          >
            <Tag size={10} className="mr-1 opacity-70" />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}