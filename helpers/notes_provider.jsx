import React, { createContext, useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

export const NotesContext = createContext({
  notes: [],
  setNotes: () => {},
});

export default function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    const createTable = async () => {
      // create a table for notes if it doesnt exists
      await db.execAsync(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY NOT null,
        title TEXT,
        body TEXT)`);
    };
    createTable();
  }, []);

  useEffect(() => {
    // fetch notes from db; returns an array of objects
    // const drop = async () => await db.execAsync("DROP TABLE notes");
    // drop();
    const resultNotes = async () =>
      await db.getAllAsync("SELECT * FROM notes;");
    setNotes(resultNotes);
  }, [db]);

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
