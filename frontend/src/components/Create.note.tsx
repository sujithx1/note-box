import React, { useState } from 'react';
import { X, Save, Type, AlignLeft, Tag as TagIcon } from 'lucide-react';

interface CreateNote {
  title: string;
  content: string;
  tags: string[];
}

interface NoteFormProps {
  isOpen: boolean; // Control visibility
  initialData?: CreateNote;
  onSubmit: (note: CreateNote) => void;
  onCancel: () => void;
}

const NoteModal: React.FC<NoteFormProps> = ({ isOpen, initialData, onSubmit, onCancel }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [tags, setTags] = useState<string[]>(initialData?.tags || []);
  const [currentTag, setCurrentTag] = useState('');

  // // Reset form when initialData changes or modal opens
  // useEffect(() => {
  //   if (isOpen) {
  //     setTitle(initialData?.title || '');
  //     setContent(initialData?.content || '');
  //     setTags(initialData?.tags || []);
  //   }
  // }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentTag.trim()) {
      e.preventDefault();
      if (!tags.includes(currentTag.trim())) {
        setTags([...tags, currentTag.trim()]);
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((t) => t !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, tags });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* 1. Backdrop/Overlay */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
        onClick={onCancel} 
      />

      {/* 2. Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-slate-800">
              {initialData ? 'Edit Note' : 'Create New Note'}
            </h2>
            <button 
              type="button" 
              onClick={onCancel} 
              className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Type size={16} /> Title
            </label>
            <input
              required
              autoFocus
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your note a name..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800"
            />
          </div>

          {/* Content Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <AlignLeft size={16} /> Content
            </label>
            <textarea
              required
              rows={5}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-slate-800 resize-none"
            />
          </div>

          {/* Tags Input */}
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <TagIcon size={16} /> Tags
            </label>
            <div className="flex flex-wrap gap-2 p-2 bg-slate-50 border border-slate-200 rounded-lg min-h-[45px]">
              {tags.map((tag) => (
                <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-md uppercase tracking-wider">
                  {tag}
                  <button type="button" onClick={() => removeTag(tag)} className="hover:text-blue-900">
                    <X size={12} />
                  </button>
                </span>
              ))}
              <input
                type="text"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Add tag..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-800 min-w-[120px]"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-md shadow-blue-200 active:scale-95"
            >
              <Save size={18} />
              {initialData ? 'Update Note' : 'Save Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;