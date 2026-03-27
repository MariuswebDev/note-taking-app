import type { FC } from "react";
import type { Note } from "../types";

interface NoteListProps {
  notes: Note[];
  selectedId: string | null;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
}

export const NoteList: FC<NoteListProps> = ({
  notes,
  selectedId,
  onSelectNote,
  onDeleteNote,
}) => {
  // If no notes created...
  if (notes.length === 0) {
    <div className="bg-green-50 px-2 py-1 text-green-600 rounded-lg">
      No notes yet...
    </div>;
  }
  return (
    <div className="divide-y divide-gray-300">
      {notes.map((note) => (
        <div
          key={note.id}
          className={`p-4 ${selectedId ? "border-l-blue-600 border bg-white" : "border-l-transparent bg-blue-100"}`}
        >
          //selected title & content
          <div onClick={() => onSelectNote(note.id)}>
            <h2 className="text-gray-500 truncate">
              {note.title || "Untitle"}
            </h2>
            <p className="text-gray-400 truncate">
              {note.content.substring(0, 50)}
              {note.content.length > 50 ? "..." : ""}
            </p>
          </div>
          //produce tags
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 rounded text-gray-300 hover:text-gray-400"
            >
              #{tag}
            </span>
          ))}
          <button
            onClick={(e) => {
              e.stopPropagation();
              {
                onDeleteNote(note.id);
              }
            }}
            className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg"
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
};
