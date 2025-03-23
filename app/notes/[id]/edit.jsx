import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { NotesContext, getNotes } from "../../../helpers/notes_provider";
import { SettingsContext } from "../../../helpers/settings_provider";
import { lightColors, darkColors, setStyle } from "../../../helpers/themes";
import { editNote } from "../../../helpers/sql_notes";
import { useSQLiteContext } from "expo-sqlite";

export default function EditNote() {
  const params = useLocalSearchParams();
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const { notes, setNotes, getNotes } = useContext(NotesContext);
  const [note, setNote] = useState({ id: "", title: "", body: "" });
  const [titleFocused, setTitleFocused] = useState(false);
  const [bodyFocused, setBodyFocused] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const db = useSQLiteContext();

  useEffect(() => {
    if (notes && params.id) {
      // console.log(notes);
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == params.id) {
          setNote({
            id: notes[i].id,
            title: notes[i].title,
            body: notes[i].body,
          });
          setTitle(notes[i].title);
          setBody(notes[i].body);
        }
      }
    }
  }, []);

  async function updateNote() {
    // console.log(note.id, title, body);
    await editNote(db, note.id, title, body);
    getNotes(db);
    router.push("/");
  }

  return (
    <View style={setStyle("container", styles, colors)}>
      <Stack.Screen
        options={{
          title: `Note id ${params.id}`,
        }}
      />
      <View style={styles.note}>
        <TextInput
          value={title}
          onFocus={() => setTitleFocused(true)}
          onBlur={() => setTitleFocused(false)}
          onChangeText={setTitle}
          style={
            titleFocused
              ? setStyle(["title", "focused"], styles, colors)
              : setStyle("title", styles, colors)
          }
        />
        <TextInput
          value={body}
          onFocus={() => setBodyFocused(true)}
          onBlur={() => setBodyFocused(false)}
          onChangeText={setBody}
          style={
            bodyFocused
              ? setStyle(["body", "focused"], styles, colors)
              : setStyle("body", styles, colors)
          }
        />
      </View>
      <Button title="Save" onPress={updateNote} />
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
    paddingVertical: 10,
    paddingHorizontal: 6,
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    fontSize: 18,
    marginBottom: 8,
    flexGrow: 1,
    textAlignVertical: "top",
  },
  focused: {
    borderWidth: 2,
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
  focused: {},
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
  focused: {},
});
