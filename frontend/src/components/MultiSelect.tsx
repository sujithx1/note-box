import { useState, useRef, useEffect } from "react";
import { Tag, X, ChevronDown } from "lucide-react";

// Example master list of tags from your database/API
const AVAILABLE_TAGS = [
  "React",
  "JavaScript",
  "Tailwind",
  "Node.js",
  "Design",
  "Work",
  "Personal",
  "Ideas",
];

const TagSelector = ({
  selectedTags,
  onTagsChange,
}: {
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
}) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter available tags based on search and exclude already selected ones
  const filteredTags = AVAILABLE_TAGS.filter(
    (tag) =>
      tag.toLowerCase().includes(query.toLowerCase()) &&
      !selectedTags.includes(tag),
  );

  const addTag = (tag: string) => {
    onTagsChange([...selectedTags, tag]);
    setQuery("");
    // Keep it open if there are more options, or close it
    if (filteredTags.length <= 1) setIsOpen(false);
  };

  const removeTag = (tagToRemove: string) => {
    onTagsChange(selectedTags.filter((t) => t !== tagToRemove));
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex-1" ref={containerRef}>
      <div
        className={`min-h-[42px] w-full flex flex-wrap gap-2 p-1.5 bg-gray-50 border rounded-lg transition-all ${
          isOpen
            ? "ring-2 ring-indigo-500 border-transparent bg-white"
            : "border-gray-200"
        }`}
        onClick={() => setIsOpen(true)}
      >
        <div className="flex items-center pl-2 text-gray-400">
          <Tag size={18} />
        </div>

        {/* Selected Tag Pills */}
        {selectedTags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md text-sm font-medium animate-in fade-in zoom-in duration-200"
          >
            {tag}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeTag(tag);
              }}
              className="hover:bg-indigo-200 rounded-full p-0.5 transition-colors"
            >
              <X size={14} />
            </button>
          </span>
        ))}

        {/* Input field for searching */}
        <input
          type="text"
          className="flex-1 bg-transparent border-none outline-none text-sm min-w-[120px] px-1 py-1"
          placeholder={selectedTags.length === 0 ? "Filter by tags..." : ""}
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => setQuery(e.target.value)}
        />

        <div className="flex items-center pr-2 text-gray-400 pointer-events-none">
          <ChevronDown
            size={16}
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && filteredTags.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="p-1">
            {filteredTags.map((tag) => (
              <button
                key={tag}
                onClick={() => addTag(tag)}
                className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors flex items-center justify-between group"
              >
                {tag}
                <span className="opacity-0 group-hover:opacity-100 text-xs text-indigo-400 italic">
                  Add +
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
export default TagSelector;
