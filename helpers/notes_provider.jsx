import React, { createContext, useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";

export const AppContext = createContext({
  notes: [],
  setNotes: () => {},
  settings: [],
  setSettings: () => {},
});

export default function DatabaseProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [settings, setSettings] = useState("");
  const db = useSQLiteContext();

  useEffect(() => {
    const createTables = async () => {
      await db.execAsync(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY NOT null,
        title TEXT,
        body TEXT)`);
      await db.execAsync(`CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY NOT null,
        item TEXT,
        value TEXT)`);
    };
    createTables();
  }, [db]);

  const fetchDb = async () => {
    // returns an array of objects
    const resultNotes = await db.getAllAsync("SELECT * FROM notes;");
    const resultSettings = await db.getAllAsync("SELECT * FROM settings;");
    setNotes(resultNotes);
    setSettings(resultSettings);
  };

  useEffect(() => {
    fetchDb();
  }, [db]);
  console.log(settings);
  return (
    <AppContext.Provider
      value={{
        notes,
        setNotes,
        settings,
        setSettings,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
