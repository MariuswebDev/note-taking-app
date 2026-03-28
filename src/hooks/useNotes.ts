import { useEffect, useMemo, useState } from "react";
import type { InputNote, Note, StoredData } from "../types";

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>(() => {
    // localStorage
    const saved = localStorage.getItem("notesData");
    try {
      if (!saved) return [];
      const notesData: StoredData[] = JSON.parse(saved);
      return notesData.map((note) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
    } catch {
      return [];
    }
  });

  //save to localStorage on update...
  useEffect(() => {
    localStorage.setItem("notesData", JSON.stringify(notes));
  }, [notes]);

  //add note
  const addNote = (input: InputNote) => {
    const newNote: Note = {
      ...input,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setNotes((prev) => [...prev, newNote]);
    return newNote;
  };

  //update note
  const updateNote = (id: string, input: InputNote) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id ? { ...note, ...input, updatedAt: new Date() } : note,
      ),
    );
  };

  //delete todo...
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  //get Note...
  const getNote = (id: string) => {
    return notes.find((note) => note.id === id);
  };

  //get all tags...
  const getAllTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach((note) => note.tags.forEach((tag) => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [notes]);

  //get Notes by tags...
  const getNotesByTags = (tag: string) => {
    return notes.filter((note) => note.tags.includes(tag));
  };

  return {
    notes,
    addNote,
    updateNote,
    deleteNote,
    getNote,
    getAllTags,
    getNotesByTags,
  };
};
