import React, { useState, useContext, useEffect } from "react";
import { NotesContext } from "../../helpers/notes_provider";
import NotesScreen from "../../helpers/notes_screen";

export default function AllNotes() {
  const { notes, openNotes, setOpenNotes } = useContext(NotesContext);

  useEffect(() => {
    const open = notes.filter((note) => note.status == "open");
    setOpenNotes(open);
  }, [notes]);

  return (
    <NotesScreen
      screen="openIndex"
      screenNotes={openNotes}
      screenNotesSetter={setOpenNotes}
      screenTitle={"All notes"}
      url={"notes"}
    />
  );
}
