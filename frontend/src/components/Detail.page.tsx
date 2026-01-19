// import { useParams, useNavigate } from "react-router-dom"; // Uncomment for real routing
import {
  ArrowLeft,
  Calendar,
  Clock,
  Edit3,
  Share2,
  Trash2,
} from "lucide-react";
import type { FC } from "react";
import { useGetNoteById } from "../apis/notes";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  noteId: string;
}
const NoteDetail: FC<Props> = ({ noteId }) => {
  const { data: note, isLoading, isError } = useGetNoteById(Number(noteId));
const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-gray-500">Loading note...</span>
      </div>
    );
  }

  if (isError || !note) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="text-red-500">
          Error loading note. Please try again later.
        </span>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-white md:bg-gray-50 pb-12">
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate({ to: "/" } )}
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
            {note?.tags?.map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider rounded-full"
              >
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
              <h4 className="font-semibold text-indigo-900">
                Finished with this note?
              </h4>
              <p className="text-indigo-700 text-sm">
                You can archive it to keep your workspace clean.
              </p>
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
