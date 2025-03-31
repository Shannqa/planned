import React, { createContext, useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import {
  dbPrepTables,
  dbGetNote,
  dbGetNoteMulti,
  dbAddNote,
  dbEditNote,
  dbChangeStatus,
  dbChangeStatusMulti,
  dbDeleteNotePerm,
  dbDeleteNotePermMulti,
  dbDropTable
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
    // on loading the app prepare the database - create a table and fetch all notes
    prepTables(db);
    getNoteMulti(db);
  }, [db]);

  async function prepTables(db) {
    await dbPrepTables(db);
  }

  // get notes from db, put them inside context
  async function getNoteMulti(db) {
    const result = await dbGetNoteMulti(db);
    if (result) {
      setNotes(result);
    }
  }
  
  // add note to db, then fetch notes
  async function addNote(db, title, body) {
    const result = await dbAddNote(db, title, body);
    if (result) {
      await getNoteMulti(db);
    } 
  }

  async function editNote(db, id, title, body) {
    const result = await dbEditNote(db, id, title, body);
    
    if (result) {
      // update context
      const updatedNotes = notes.map((note) => {
        if (note.id == id) {
          return { ...note, title: title, body: body };
        } else {
          return note;
        }
      });
      setNotes(updatedNotes);
    } else {
      console.log("failed to edit note");
    }
  }
  
  // change note's status - "open", "bin" or "archive"
  async function changeStatus(db, id, newStatus) {
    const result = await dbChangeStatus(db, id, newStatus);

    if (result) {
      // update context
      const updatedNotes = notes.map((note) => {
        if (note.id == id) {
          return { ...note, status: newStatus };
        } else {
          return note;
        }
      });
      setNotes(updatedNotes);
    } else {
      console.log("failed to update note status");
    }
  }

async function changeStatusMulti(db, ids, newStatus) {
    const result = await dbChangeStatusMulti(db, ids, newStatus);

    if (result) {
      // update context
      const updatedNotes = notes.map((note) => {
        // gotta update multiple notes
        if (ids.includes(note.id)) {
          return { ...note, status: newStatus };
        } else {
          return note;
        }
      });
      setNotes(updatedNotes);
    } else {
      console.log("failed to update status");
    }
  }


    

  async function deleteNotePerm(db, id) {
    const result = await dbDeleteNotePerm(db, id);
    if (result) {
      // update context
      const updatedNotes = notes.filter((note) => note.id != id);
      setNotes(updatedNotes);
    } else {
      console.log("failed to delete note");
    }
  }

  async function deleteNotePermMulti(db, ids) {
    const result = await dbDeleteNotePermMulti(db, ids);
    if (result) {
      // update context
      const updatedNotes = notes.filter((note) => !ids.includes(note.id));
      setNotes(updatedNotes);
    } else {
      console.log("failed to delete notes");
    }
  }

  function dropTable(db) {
    dbDropTable(db);
    prepTables(db);
    getNoteMulti(db);
  }

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        openNotes,
        setOpenNotes,
        binNotes,
        setBinNotes,
        archiveNotes,
        setArchiveNotes,
        getNote,
        getNoteMulti,
        addNote,
        editNote,
        changeStatus,
        changeStatusMulti,
        deleteNotePerm,
        deleteNotePermMulti,
        dropTable
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}
