import { useState } from "react";
import { type Notes } from "../apis/notes";
import NoteCard from "./NoteCard";
// Note: You might need to install lucide-react for icons: npm install lucide-react
import { ChevronLeft, ChevronRight, Plus, Search } from "lucide-react";
import TagSelector from "./MultiSelect";
import { useNavigate } from "@tanstack/react-router";

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
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const navigate=useNavigate();

  // Toggle tag selection (example logic)
  // const handleTagInput = (val: string) => {
  //   const newTags = val.split(',').map(t => t.trim()).filter(t => t !== "");
  //   setTags(newTags);
  // };


  

  return (
    <>
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Notes</h1>
            <p className="text-gray-500 text-sm">Organize your thoughts and ideas</p>
          </div>
          <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm">
            <Plus size={18} />
            <span>New Note</span>
          </button>
        </header>

        {/* Search and Filters Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search notes..."
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
       
          <TagSelector selectedTags={tags} onTagsChange={setTags} />
        </div>

        {/* Notes Grid */}
        {dummyData.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dummyData.map((note) => (
              <div key={note.id} className="transform hover:-translate-y-1 transition-transform duration-200" onClick={() => navigate({to: "/index/$id", params: { id : note.id.toString() }  })}>
                <NoteCard note={note} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-gray-400 text-lg">No notes found. Try adjusting your search.</p>
          </div>
        )}

        {/* Pagination Section */}
        <div className="mt-12 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} /> Previous
          </button>
          
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((num) => (
              <button
                key={num}
                onClick={() => setPage(num)}
                className={`w-10 h-10 rounded-md transition-colors ${
                  page === num ? 'bg-indigo-600 text-white' : 'hover:bg-gray-200 text-gray-700'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <button
            onClick={() => setPage(page + 1)}
            className="flex items-center gap-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Next <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
            </>
  );
}

export default Listes;