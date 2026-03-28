import { useEffect, useState, type FC } from "react";
import type { InputNote, Note } from "../types";

interface NoteEditorProps {
  note: Note | null;
  onUpdate?: (id: string, input: InputNote) => void;
  onSave?: (input: InputNote) => void;
}

export const NoteEditor: FC<NoteEditorProps> = ({ note, onUpdate, onSave }) => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [tagInput, setInputTag] = useState("");

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setTags(note.tags);
      setContent(note.content);
    } else {
      setTitle("");
      setTags([]);
      setContent("");
    }
    setInputTag("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [note?.id]);

  //handle save
  const handleSave = () => {
    const input = {
      title: title || "Untitled",
      content,
      tags,
    };

    if (note && onUpdate) {
      onUpdate(note.id, input);
    } else if (onSave) {
      onSave(input);
    }
  };

  // handle add tag
  const handleAddTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setInputTag("");
  };

  //remove tag
  const handleRemoveTag = (tagRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagRemove));
  };

  return (
    <div className="bg-white flex flex-col p-6 h-full">
      {/* title section */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="placeholder-gray-400 font-bold text-gray-900 text-4xl pb-2
         focus:border-b-blue-600 focus:border-b-2 w-full focus:outline-none rounded-lg outline-none"
        />
      </div>

      {/* Add tag section */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={tagInput}
          onChange={(e) => setInputTag(e.target.value)}
          placeholder="Add a tag..."
          className="flex-1 px-3 py-1 border border-gray-200 outline-none focus:ring-blue-600 focus:outline-none 
        focus:ring-2 rounded-lg transition"
        />
        <button
          onClick={handleAddTag}
          className="bg-gray-200 text-gray-500 border-none rounded cursor-pointer hover:bg-gray-300 px-3 py-2 transition"
        >
          Add
        </button>
      </div>

      {/* Add button tag section */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-2 bg-blue-600 rounded-full px-3 py-1 mb-4 text-white font-medium text-sm"
            >
              #{tag}
              <button
                onClick={() => handleRemoveTag(tag)}
                className="opacity-70 hover:text-gray-400 transition cursor-pointer"
              >
                X
              </button>
            </span>
          ))}
        </div>
      )}

      {/* Content TextArea */}
      <div className="mb-6 flex-1">
        <textarea
          placeholder="Start typing..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-full rounded-lg border border-gray-200 px-3 py-1 outline-none focus:ring-blue-600 focus:ring-2 transition resize-none"
        />
      </div>

      {/* Svae Content */}
      <div>
        <button
          onClick={handleSave}
          className="bg-blue-600 text-white px-3 py-2 rounded-lg w-full hover:bg-blue-700 cursor-pointer transition"
        >
          {note ? "Update" : "Create"} Note
        </button>
      </div>
    </div>
  );
};
