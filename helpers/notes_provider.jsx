import React, { createContext, useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { createTable, getNotesFromDb, getNoteFromDb, addNote, editNote, deleteNote } from "./sql_notes";

export const NotesContext = createContext({
  notes: [],
  setNotes: () => {},
});

export default function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    // create a table for notes if it doesnt exists
    const handleTable = async () => {
    await createTable(db);
    }
    handleTable();
  }, []);

  useEffect(() => {
    // const drop = async () => await db.execAsync("DROP TABLE notes");
    // drop();

    // get notes from the db
    const getNotes = async () => {
      const dbNotes = await getNotesFromDb(db);
      if (dbNotes) {
        setNotes(dbNotes);
      }
    }
    getNotes();
  }, [db]);
  
  
  async function addNote(db, title, body) {
    editNote
  }
  
  
  

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
