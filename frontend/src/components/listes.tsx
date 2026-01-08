import { useState } from "react";
import { useCreateNote, type Notes } from "../apis/notes";
import NoteCard from "./NoteCard";
import { useNavigate } from "@tanstack/react-router";
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Search, 
  LayoutDashboard, 
  StickyNote, 
  Settings, 
  Bell,
  Menu
} from "lucide-react";
import TagSelector from "./MultiSelect";
import NoteModal from "./Create.note";

const dummyData: Notes[] = [
  {
    id: 1,
    title: "Project Brainstorming",
    content: "Need to finalize the wireframes for the new dashboard and talk to the design team about the color palette.",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z",
    tags: ["Work", "Design", "Planning"],
  },
  {
    id: 2,
    title: "Grocery List",
    content: "Milk, Eggs, Bread, Avocado, and some snacks for the weekend trip.",
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-02T00:00:00Z",
    tags: ["Personal", "Shopping"],
  },
];

const Listes = () => {
  // const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [openForm, setOpenForm] = useState(false);
  const navigate = useNavigate();

  const  createMutate=useCreateNote();

  const handleSubmit = (noteData: { title: string; content: string; tags: string[] }) => {
    console.log("Saving Note:", noteData);

    createMutate.mutate(noteData);

    

    
    setOpenForm(false);
  };

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans antialiased text-slate-900">
      
      {/* 1. Sidebar (Hidden on Mobile) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          <span className="text-xl font-bold tracking-tight">Notepad.ai</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <NavItem icon={<LayoutDashboard size={20}/>} label="All Notes" active />
          <NavItem icon={<StickyNote size={20}/>} label="Favorites" />
          <NavItem icon={<Settings size={20}/>} label="Settings" />
        </nav>

        <div className="p-4 mt-auto">
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <p className="text-xs font-semibold text-slate-500 uppercase mb-2">Storage</p>
            <div className="w-full bg-slate-200 h-1.5 rounded-full mb-2">
              <div className="bg-indigo-600 h-1.5 rounded-full w-[65%]" />
            </div>
            <p className="text-xs text-slate-600">65% of 1GB used</p>
          </div>
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Header/Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center md:hidden gap-4">
             <Menu className="text-slate-500" />
             <span className="font-bold text-lg">Notepad.ai</span>
          </div>

          <div className="flex-1 max-w-xl hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="text"
                placeholder="Search across all notes..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all outline-none"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors relative">
               <Bell size={20} />
               <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button 
              onClick={() => setOpenForm(true)}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-semibold transition-all shadow-md shadow-indigo-100 active:scale-95"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">New Note</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Grid */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            
            {/* Context Filters */}
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
               <div>
                  <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Recent Notes</h2>
                  <p className="text-slate-500 text-sm">Showing your latest updates from this week.</p>
               </div>
               <div className="w-full sm:w-auto">
                  <TagSelector selectedTags={tags} onTagsChange={setTags} />
               </div>
            </div>

            {/* Grid */}
            {dummyData.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {dummyData.map((note) => (
                  <div 
                    key={note.id} 
                    className="cursor-pointer"
                    onClick={() => navigate({to: "/index/$id", params: { id : note.id.toString() } })}
                  >
                    <NoteCard note={note} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                  <StickyNote size={40} />
                </div>
                <h3 className="text-lg font-semibold text-slate-800">No notes found</h3>
                <p className="text-slate-500 max-w-xs">Try adjusting your filters or create a new note to get started.</p>
              </div>
            )}

            {/* Modern Pagination */}
            <footer className="mt-12 py-6 border-t border-slate-200 flex items-center justify-between">
              <p className="text-sm text-slate-500 hidden sm:block">Showing 1-10 of 124 notes</p>
              <div className="flex items-center gap-2 ml-auto sm:ml-0">
                <PaginationButton icon={<ChevronLeft size={18}/>} disabled />
                <button className="w-8 h-8 rounded-lg bg-indigo-600 text-white text-sm font-bold">1</button>
                <button className="w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-200 text-sm font-medium">2</button>
                <button className="w-8 h-8 rounded-lg text-slate-600 hover:bg-slate-200 text-sm font-medium">3</button>
                <PaginationButton icon={<ChevronRight size={18}/>} />
              </div>
            </footer>
          </div>
        </div>
      </main>

      {/* Modal Overlay */}
      <NoteModal 
        isOpen={openForm} 
        onSubmit={handleSubmit} 
        onCancel={() => setOpenForm(false)} 
      />
    </div>
  );
}

/* Helper UI Components to keep code clean */
const NavItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <button className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
    active ? 'bg-indigo-50 text-indigo-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
  }`}>
    {icon}
    {label}
  </button>
);

const PaginationButton = ({ icon, disabled = false }: { icon: React.ReactNode, disabled?: boolean }) => (
  <button 
    disabled={disabled}
    className="p-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
  >
    {icon}
  </button>
);

export default Listes;