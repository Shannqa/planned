import React, { createContext, useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import {
  createTable,
  getNotesFromDb,
  getNoteFromDb,
  addNote,
  editNote,
  deleteNote,
  getNotesFromBin,
  binNote,
  archiveNotes,
  setArchiveNotes,
} from "./sql_notes";

export const NotesContext = createContext({
  notes: [],
  setNotes: () => {},
  getNotes: () => {},
  binNotes: [],
  setBinNotes: () => {},
  archiveNotes: [],
  setArchiveNotes: () => {},
});

export default function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [binNotes, setBinNotes] = useState([]);
  const [archiveNotes, setArchiveNotes] = useState([]);
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

    // const DbBinNotes = await getNotesFromBin(db);
    // if (DbBinNotes) {
    //   setBinNotes(DbBinNotes);
    // }
    // console.log(DbBinNotes);
  };

  // async function binit() {
  //   const binnn = await binNote(db, 1);
  //   console.log(binnn);
  // }
  // binit();

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        getNotes,
        binNotes,
        setBinNotes,
        archiveNotes,
        setArchiveNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
