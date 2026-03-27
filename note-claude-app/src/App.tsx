import { useState } from "react";
import { useNotes } from "./hooks/useNotes";
import { NoteList } from "./components/NoteList";

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
    <div className="flex bg-gray-50">
      {/* Side Bar */}
      <div className="flex flex-col w-80 p-4 divide-gray-300">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h6 className="font-bold text-lg">Notes</h6>
          <button
            onClick={handleCreateNew}
            className="bg-blue-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-blue-700 transition"
          >
            + New
          </button>
        </div>
        {/* Search */}
        <div className="mb-3">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 rounded-lg px-2 py-2 outline-none w-full focus:ring-2 focus:ring-blue-600 transition"
          />
        </div>
        {/* Tags Section */}
        {allTags.length > 0 &&
          allTags.map((tag) => (
            <div>
              <h6 className="font-semibold text-xs">Tags</h6>
              <div className="flex flex-wrap">
                <button
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                  className={`px-2 py-1 ronuded-md font-medium transition ${
                    selectedTag === tag
                      ? "text-white bg-gray-50"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  #{tag}
                </button>
              </div>
            </div>
          ))}
        {/* Clear Section */}
        <div>
          <button
            className="bg-gray-100 rounded px-2 py-1 text-gray-500 hover:bg-gray-200 hover:text-gray-400 transition cursor-pointer"
            onClick={handleClearFilter}
          >
            Clear Filter
          </button>
        </div>

        {/* Note List */}
        <div className="overflow-y-auto">
          <NoteList
            notes={filteredNotes}
            selectedId={selectedNoteId}
            onSelectNote={handleSelectNote}
            onDeleteNote={deleteNote}
          />
        </div>

        {/* Note Editor */}
      </div>
    </div>
  );
};
export default App;
