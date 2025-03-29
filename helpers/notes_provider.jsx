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
  dbChangeStatus,
  archiveNotes,
  setArchiveNotes,
  dbDropTable,
} from "./sql_notes";

export const NotesContext = createContext({
  notes: [],
  setNotes: () => {},
  getNotes: () => {},
  openNotes: [],
  setOpenNotes: () => {},
  binNotes: [],
  setBinNotes: () => {},
  archiveNotes: [],
  setArchiveNotes: () => {},
  changeNoteStatus: () => {},
  dropTable: () => {},
  deleteNotePerm: () => {},
  multiChangeNoteStatus: () => {},
  multiDeleteNotePerm: () => {},
});

export default function NotesProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [openNotes, setOpenNotes] = useState([]);
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

  // change note's status - "open", "bin" or "archive"
  async function changeNoteStatus(db, id, newStatus) {
    const action = await dbChangeStatus(db, id, newStatus);
    if (action) {
      // update context
      setNotes(
        notes.map((note) => {
          if (note.id == id) {
            return (note.status = newStatus);
          } else {
            return note;
          }
        })
      );
    } else {
      console.log("failed to update status");
    }
  }

  function dropTable() {
    dbDropTable(db);
    createTable(db);
    getNotes(db);
  }

  function deleteNotePerm() {}

  function multiChangeNoteStatus() {}

  function multiDeleteNotePerm() {}

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
        changeNoteStatus,
        dropTable,
        openNotes,
        setOpenNotes,
        deleteNotePerm,
        multiChangeNoteStatus,
        multiDeleteNotePerm,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
