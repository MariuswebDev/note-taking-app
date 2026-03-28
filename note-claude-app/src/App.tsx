import { useState } from "react";
import { useNotes } from "./hooks/useNotes";
import NoteList from "./components/NoteList";
import { NoteEditor } from "./components/NoteEditor";

const App = () => {
  const { notes, addNote, updateNote, deleteNote, getNote, getAllTags } =
    useNotes();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const selectedNote = selectedNoteId ? getNote(selectedNoteId) : null;

  //search by filter and tags
  let filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  //filter by tags...
  if (selectedTag) {
    filteredNotes = filteredNotes.filter((note) =>
      note.tags.includes(selectedTag),
    );
  }

  //handle create note...
  const handleCreateNew = () => {
    setSelectedNoteId(null);
  };

  //handle selected id
  const handleSelectNote = (id: string) => {
    setSelectedNoteId(id);
  };

  //handle clearFilter note...
  const handleClearFilter = () => {
    setSelectedTag(null);
  };

  //get all tags...
  const allTags = getAllTags;

  //Display UI
  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className="w-80 border-r border-gray-200 bg-white flex flex-col overflow-hidden">
        {/* Header */}
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Notes</h1>
          <button
            onClick={handleCreateNew}
            className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition"
          >
            + New
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Tags section */}
        {allTags.length > 0 && (
          <div className="border-b border-gray-200 p-4">
            <h6 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
              Tags
            </h6>
            <div className="flex flex-wrap gap-2 mb-3">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                  className={`px-3 py-1 text-sm font-medium rounded transition ${
                    selectedTag === tag
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
            {selectedTag && (
              <button
                onClick={handleClearFilter}
                className="text-sm text-gray-500 hover:text-gray-700 transition"
              >
                Clear filter
              </button>
            )}
          </div>
        )}

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          <NoteList
            notes={filteredNotes}
            selectedId={selectedNoteId}
            onSelectNote={handleSelectNote}
            onDeleteNote={deleteNote}
          />
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-y-auto">
        {selectedNote ? (
          <NoteEditor note={selectedNote} onUpdate={updateNote} />
        ) : (
          <NoteEditor note={null} onSave={addNote} />
        )}
      </div>
    </div>
  );
};

export default App;
