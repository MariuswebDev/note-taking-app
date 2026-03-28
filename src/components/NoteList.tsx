import type { FC } from "react";
import type { Note } from "../types";

interface NotesListProps {
  notes: Note[];
  selectedId: string | null;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

const NoteList: FC<NotesListProps> = ({
  notes,
  selectedId,
  onSelectNote,
  onDeleteNote,
}) => {
  if (notes.length === 0) {
    return (
      <div className="p-4 m-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
        No notes yet
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`p-4 cursor-pointer transition border-l-4 ${
            selectedId === note.id
              ? "bg-blue-50 border-l-blue-600"
              : "bg-white border-l-transparent hover:bg-gray-50"
          }`}
        >
          <div onClick={() => onSelectNote(note.id)} className="flex-1">
            <h6 className="font-semibold text-gray-900 truncate mb-1">
              {note.title || "Untitled"}
            </h6>
            <p className="text-sm text-gray-600 truncate mb-2">
              {note.content.substring(0, 50)}
              {note.content.length > 50 ? "..." : ""}
            </p>

            {/* Display tags */}
            {note.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-2 py-0.5 text-xs bg-gray-200 text-gray-700 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-500">
              {new Date(note.updatedAt).toLocaleDateString()}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onDeleteNote(note.id);
            }}
            className="mt-2 w-full cursor-pointer px-3 py-1 text-sm bg-red-50 text-red-600 rounded hover:bg-red-100 transition font-medium"
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
