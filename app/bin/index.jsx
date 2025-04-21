import React, { useContext, useEffect, useState, useLayoutEffect } from "react";
import { NotesContext } from "../../helpers/notes_provider";
import NotesScreen from "../../helpers/notes_screen";

export default function Bin() {
  const { notes, binNotes, setBinNotes } = useContext(NotesContext);

  useEffect(() => {
    const bin = notes.filter((note) => note.status == "bin");
    setBinNotes(bin);
  }, [notes]);

  return (
    <NotesScreen
      screen="binIndex"
      screenNotes={binNotes}
      screenNotesSetter={setBinNotes}
      screenTitle={"Bin"}
      url={"bin"}
    />
  );
}
