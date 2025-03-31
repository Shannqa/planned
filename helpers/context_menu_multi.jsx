import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { lightColors, darkColors, setStyle } from "./themes";
import { SettingsContext } from "./settings_provider";
import { useSQLiteContext } from "expo-sqlite";
import { NotesContext } from "./notes_provider";
 
export default function ContextMenuMulti({ menuOpen, noteId, screen }) {
  const { notes, setNotes, changeNoteStatus } = useContext(NotesContext);
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const db = useSQLiteContext();

  let options;

  if (screen == "singleNote") {
    options = {
      label: "Archive",
      action: changeNoteStatus(db, noteId, "bin"),
    };
  } else if (screen == "openNotes") {
    options = {
      label: "Delete",
      onPress: changeNoteStatus(db, noteId, "bin"),
    };
  } else if (screen == "archiveNotes") {
    options = {
      label: "Remove from archive",
      onPress: changeNoteStatus(db, noteId, "open"),
    };
  } else if (screen == "binNotes") {
    options = [
      {
        label: "Restore",
        onPress: changeNoteStatus(db, noteId, "open"),
      },
      {
        label: "Remove permanently",
        onPress: deleteNotePerm(db, noteId),
      },
    ];
  } else if (screen == "openIndex") {
    (options = {
      label: "Delete notes",
      onPress: multiChangeNoteStatus(db, [noteIds], "delete"),
    }),
      {
        label: "Archive notes",
        onPress: multiChangeNoteStatus(db, [noteIds], "archive"),
      };
  } else if (screen == "archiveIndex") {
    options = [
      {
        label: "Move back to open notes",
        onPress: multiChangeNoteStatus(db, [noteIds], "open"),
      },
      {
        label: "Delete notes",
        onPress: multiChangeNoteStatus(db, [noteIds], "bin"),
      },
    ];
  } else if (screen == "binIndex") {
    options = [
      {
        label: "Restore notes",
        onPress: multiChangeNoteStatus(db, [noteIds], "open"),
      },
      {
        label: "Permanently delete notes",
        onPress: multiDeleteNotesPerm(db, [noteIds]),
      },
    ];
  }

  return (
    <View
      style={[
        setStyle("menu", styles, colors),
        { display: menuOpen ? "true" : "none" },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          pressed ? colors.menuPressed : colors.menuUnpressed,
          styles.menuItem,
        ]}
        onPress={() => changeNoteStatus(db, noteId, "bin")}
      >
        <Text style={styles.menuText}>Delete</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          pressed ? colors.menuPressed : colors.menuUnpressed,
          styles.menuItem,
        ]}
        onPress={() => changeNoteStatus(db, noteId, "archive")}
      >
        <Text style={styles.menuText}>Archive</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  menuItem: {
    padding: 0,
  },
  menuText: {
    fontSize: 20,
    marginVertical: 8,
    marginHorizontal: 22,
  },
  title: {
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 6,
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    fontSize: 18,
    padding: 4,
    marginBottom: 8,
    flexGrow: 1,
  },
});

const light = StyleSheet.create({
  container: {
    backgroundColor: lightColors.secondary,
  },
  menu: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey, -1 2 2 lightgrey,",
  },
  text: {
    color: lightColors.font,
  },

  menuPressed: {
    backgroundColor: lightColors.detail,
  },
  menuUnpressed: {
    // backgroundColor: lightColors.secondary,
    // boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  menu: {
    backgroundColor: lightColors.secondary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  body: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
    color: darkColors.font,
  },
  text: {
    color: darkColors.font,
  },
  menuPressed: {
    backgroundColor: darkColors.detail,
  },
  menuUnpressed: {
    backgroundColor: darkColors.secondary,
  },
});
