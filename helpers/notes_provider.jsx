import React, { createContext, useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import {
  createTable,
  getNotesFromDb,
  getNoteFromDb,
  addNote,
  editNote,
  deleteNote,
} from "./sql_notes";

export const NotesContext = createContext({
  notes: [],
  setNotes: () => {},
  getNotes: () => {},
});

export default function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    // const drop = async () => await db.execAsync("DROP TABLE notes");
    // drop();
    // create a table for notes if it doesnt exists
    const handleTable = async () => {
      await createTable(db);
    };
    handleTable();
  }, []);

  useEffect(() => {
    // get notes from the db
    getNotes();
  }, [db]);

  const getNotes = async () => {
    const dbNotes = await getNotesFromDb(db);
    if (dbNotes) {
      setNotes(dbNotes);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        getNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
