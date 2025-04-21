import React, { useContext, useEffect, useState } from "react";
import { NotesContext } from "../../helpers/notes_provider";
import NotesScreen from "../../helpers/notes_screen";

export default function Archive() {
  const { notes, archiveNotes, setArchiveNotes } = useContext(NotesContext);

  useEffect(() => {
    const archived = notes.filter((note) => note.status == "archive");
    setArchiveNotes(archived);
  }, [notes]);

  return (
    <NotesScreen
      screen="archiveIndex"
      screenNotes={archiveNotes}
      screenNotesSetter={setArchiveNotes}
      screenTitle={"Archive"}
      url={"archive"}
    />
  );
}
