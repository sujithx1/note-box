import {  type FC } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Uncomment for real routing
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Edit3, 
  Trash2, 
  Share2, 
  // MoreVertical,
  // ChevronLeft
} from "lucide-react";
import type { Notes } from "../apis/notes";


interface NoteDetailProps {
  note: Notes;
}
const NoteDetail:FC<NoteDetailProps> = ({ note }) => {
  // const { id } = useParams();
  // const navigate = useNavigate();
  
  // Mock data for display - in real app, fetch this via useGetNote(id)
  // const note = {
  //   id: 1,
  //   title: "Project Brainstorming",
  //   content: `## Goals for Q1\n\n1. Launch the new landing page.\n2. Integrate the feedback loop in the user dashboard.\n3. Research competitor UI patterns.\n\n### Key Takeaways\nWe need to focus on performance and accessibility. The current lighthouse score is 82, we want to hit 95+. \n\nCheck with the dev team about the API latency issues we saw yesterday.`,
  //   tags: ["Work", "Design", "Planning"],
  //   createdAt: "2024-01-01T10:30:00Z",
  //   updatedAt: "2024-01-05T14:20:00Z",
  // };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 pb-12">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button 
            // onClick={() => navigate(-1)} 
            className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors group"
          >
            <div className="p-2 group-hover:bg-indigo-50 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </div>
            <span className="hidden sm:inline font-medium">Back to Notes</span>
          </button>

          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
              <Share2 size={20} />
            </button>
            <button className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors font-medium">
              <Edit3 size={18} />
              <span className="hidden sm:inline">Edit</span>
            </button>
            <button className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
              <Trash2 size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 pt-8">
        {/* Note Header */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {note.tags?.map(tag => (
              <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider rounded-full">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {note.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 border-b border-gray-100 pb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>Created {formatDate(note.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>Last edited {formatDate(note.updatedAt)}</span>
            </div>
          </div>
        </div>

        {/* Note Content Area */}
        <article className="prose prose-indigo prose-lg max-w-none">
          {/* If you have a markdown renderer, use it here. Otherwise, white-space-pre-wrap keeps formatting */}
          <div className="text-gray-800 leading-relaxed whitespace-pre-wrap">
            {note.content}
          </div>
        </article>

        {/* Footer info (Optional) */}
        <footer className="mt-16 pt-8 border-t border-gray-100">
          <div className="bg-indigo-50 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-semibold text-indigo-900">Finished with this note?</h4>
              <p className="text-indigo-700 text-sm">You can archive it to keep your workspace clean.</p>
            </div>
            <button className="whitespace-nowrap bg-white text-indigo-600 px-6 py-2 rounded-xl font-medium shadow-sm hover:shadow-md transition-all">
              Archive Note
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default NoteDetail;