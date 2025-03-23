import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TextInput } from "react-native";
import { useLocalSearchParams, Stack, Link, router } from "expo-router";
import { NotesContext } from "../../../helpers/notes_provider";
import { SettingsContext } from "../../../helpers/settings_provider";
import { lightColors, darkColors, setStyle } from "../../../helpers/themes";
import { addNote } from "../../../helpers/sql_notes";
import { useSQLiteContext } from "expo-sqlite";

export default function NewNote() {
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const { notes, setNotes, getNotes } = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const db = useSQLiteContext();

  async function addNewNote() {
    await addNote(db, title, body);
    getNotes(db);
    // router.back();
    router.push("/notes");
  }

  return (
    <View style={setStyle("container", styles, colors)}>
      <Stack.Screen
        options={{
          title: "Add note",
        }}
      />
      <View style={styles.note}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={setStyle("title", styles, colors)}
        />
        <TextInput
          value={body}
          onChangeText={setBody}
          style={setStyle("body", styles, colors)}
          multiline
          textAlignVertical={"top"}
        />
      </View>
      <Button title="Add note" onPress={addNewNote} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    flex: 1,
  },
  note: {
    flex: 1,
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
  title: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey",
    color: lightColors.font,
  },
  body: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey",
    color: lightColors.font,
  },
  text: {
    color: lightColors.font,
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  title: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
    color: darkColors.font,
  },
  body: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
    color: darkColors.font,
  },
  text: {
    color: darkColors.font,
  },
});
