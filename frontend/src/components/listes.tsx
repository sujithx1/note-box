import { useNavigate } from "@tanstack/react-router";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Menu,
  Plus,
  Search,
  StickyNote,
} from "lucide-react";
import { useState } from "react";
import { useCreateNote, useGetNotes } from "../apis/notes";
import NoteModal from "./Create.note";
import TagSelector from "./MultiSelect";
import NoteCard from "./NoteCard";

const Listes = () => {
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();

  const createMutate = useCreateNote();

  const handleSubmit = (noteData: {
    title: string;
    content: string;
    tags: string[];
  }) => {
    createMutate.mutate(noteData);
    setOpenForm(false);
  };

  const { data: notes, isLoading } = useGetNotes({
    limit: 10,
    page: 1,
    search,
  });

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden font-sans antialiased text-slate-900">
      {/* 1. Sidebar - Refined with subtle borders and better padding */}

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header - Glassmorphism effect on scroll */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-10 shrink-0 z-20">
          <div className="flex items-center md:hidden gap-4">
            <Menu className="text-slate-500" />
            <span className="font-black text-lg">N.</span>
          </div>

          <div className="flex-1 max-w-2xl hidden md:block">
            <div className="relative group">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                size={18}
              />
              <input
                type="text"
                placeholder="Search your thoughts..."
                className="w-full pl-12 pr-4 py-2.5 bg-slate-100/50 border border-transparent rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all outline-none text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-5">
            <button className="p-2.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all relative group">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white group-hover:scale-125 transition-transform"></span>
            </button>
            <button
              onClick={() => setOpenForm(true)}
              className="flex items-center gap-2 bg-slate-900 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-slate-200 hover:shadow-indigo-200 active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Note</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {/* Header Content */}
            <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                  My Notes
                </h1>
                <p className="text-slate-500 font-medium">
                  Capture ideas, organize thoughts, and stay productive.
                </p>
              </div>
              <div className="w-full sm:w-72">
                <TagSelector selectedTags={tags} onTagsChange={setTags} />
              </div>
            </div>

            {/* Grid - Improved spacing and loading states */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 opacity-50">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-64 bg-slate-200 animate-pulse rounded-2xl"
                  />
                ))}
              </div>
            ) : notes && notes.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {notes.map((note) => (
                  <div
                    key={note.id}
                    className="h-full"
                    onClick={() =>
                      navigate({
                        to: "/index/$id",
                        params: { id: note.id.toString() },
                      })
                    }
                  >
                    <NoteCard note={note} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-32 text-center bg-white rounded-3xl border-2 border-dashed border-slate-200">
                <div className="w-24 h-24 bg-indigo-50 rounded-3xl flex items-center justify-center mb-6 text-indigo-500 shadow-inner">
                  <StickyNote size={40} />
                </div>
                <h3 className="text-xl font-bold text-slate-800">
                  Your garden is empty
                </h3>
                <p className="text-slate-500 max-w-xs mt-2 font-medium">
                  Start planting your ideas and watch them grow.
                </p>
              </div>
            )}

            {/* Footer Pagination */}
            <footer className="mt-16 py-8 border-t border-slate-200/60 flex items-center justify-between">
              <p className="text-sm font-bold text-slate-400">PAGE 1 OF 12</p>
              <div className="flex items-center gap-3">
                <PaginationButton icon={<ChevronLeft size={18} />} disabled />
                <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                  <button className="px-4 py-1.5 rounded-lg bg-white shadow-sm text-indigo-600 text-xs font-black">
                    1
                  </button>
                  <button className="px-4 py-1.5 rounded-lg text-slate-500 text-xs font-bold hover:text-slate-800">
                    2
                  </button>
                  <button className="px-4 py-1.5 rounded-lg text-slate-500 text-xs font-bold hover:text-slate-800">
                    3
                  </button>
                </div>
                <PaginationButton icon={<ChevronRight size={18} />} />
              </div>
            </footer>
          </div>
        </div>
      </main>

      <NoteModal
        isOpen={openForm}
        onSubmit={handleSubmit}
        onCancel={() => setOpenForm(false)}
      />
    </div>
  );
};

const PaginationButton = ({
  icon,
  disabled = false,
}: {
  icon: React.ReactNode;
  disabled?: boolean;
}) => (
  <button
    disabled={disabled}
    className="p-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 hover:border-indigo-300 hover:text-indigo-600 disabled:opacity-30 disabled:grayscale transition-all shadow-sm active:scale-90"
  >
    {icon}
  </button>
);

export default Listes;
