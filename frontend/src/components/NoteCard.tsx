import type { Notes } from "../apis/notes";

export default function NoteCard({ note }: { note: Notes }) {



  return (


    <div className="border rounded-lg p-4 bg-white hover:shadow">
      <h3 className="font-semibold text-lg mb-1">{note.title}</h3>
      <p className="text-sm text-gray-600 line-clamp-3">
        {note.content}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        {note.tags?.map(tag => (
          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-semibold uppercase tracking-wider rounded-full">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  )
}
