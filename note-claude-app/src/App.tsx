import { useState } from "react";
import { useNotes } from "./hooks/useNotes";

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
  const handleSelectedId = (id: string) => {
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
    <div className="flex h-screen bg-gray-50">
      {/* Side Bar */}
      <div className="w-80 flex flex-col mb-4 p-4">
        {/* Header */}
        <div className="flex justify-content-between items-center">
          <h6>Notes</h6>
          <button className="text-white btn px-4 bg-blue-600">+ New</button>
        </div>
        {/* Search */}
        <div>
          <input
            type="text"
            value={searchTerm}
            className="focus:ring-2 border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-blue-500 w-full"
            placeholder="Search notes..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* Tags */}
        {allTags.length > 0 && (
          <div className="border-b border-gray-300 p-4">
            <h6 className="font-semibold text-xs text-gray-500">Tags</h6>
            <div className="flex flex-wrap">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() =>
                    setSelectedTag(selectedTag === tag ? null : tag)
                  }
                ></button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
