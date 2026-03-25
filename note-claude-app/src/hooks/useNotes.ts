import { useEffect, useState } from "react"
import type { Note,InputNote } from "../types"


const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  useEffect(() => {
    const saved = localStorage.getItem('notes');
    if(saved) {
      const parsed = JSON.parse(saved);
      const notes = parsed.map((note:any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: new Date(note.updatedAt),
      }));
      setNotes(notes)
    }
  },[]);

  useEffect(() => {
    localStorage.setItem('notes',JSON.stringify('notes'))
  },[notes]);

  const addNote = (input:InputNote) => {
    const newNote:Note = {
      ...input,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    setNotes([...notes,newNote]);
    return newNote;
  }

  const updateNote = (id:string,input:InputNote) => {
    setNotes(notes.map(note => note.id === id ?{...note,...input, updatedAt: new Date()} : note ))
  }

  const deleteNote = (id:string) => {
    setNotes(notes.filter(note => note.id !== id));
  }

  const getNotes = (id:string) => {
    return notes.find(note => note.id === id)
  }

  const getAllTags = ():string[] => {
    const tagSet = new Set<string>();
    notes.forEach(note => {
      note.tags.forEach(tag => tagSet.add(tag))
    });
    return Array.from(tagSet).sort();
  }

  const getNotesByTags = (tag:string) => {
    notes.filter(note => note.tags.includes(tag))
  }
  return (
   
  )
}

export default useNotes
