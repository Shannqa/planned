import React, { createContext, useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

export const AppContext = createContext({
  notes: [],
  setNotes: () => {},
});

export default function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    const createTable = async () => {
      await db.execAsync(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY NOT null,
        title TEXT,
        body TEXT)
        `);
    };
    createTable();
  }, [db]);

  const fetchNotes = async () => {
    const result = await db.getAllAsync("SELECT * FROM notes;");
    setNotes(result);
  };

  useEffect(() => {
    fetchNotes();
  }, [db]);

  return (
    <AppContext.Provider
      value={{
        notes,
        setNotes,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
