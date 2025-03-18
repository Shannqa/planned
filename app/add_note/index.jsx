import React, { useContext, useState, useEffect } from "react";
import { Link } from "expo-router";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { AppContext } from "../../helpers/notes_provider";
import { lightColors, darkColors, setStyle } from "../../helpers/themes";

export default function AddNote() {
  let theme = useColorScheme();
  let colors = theme == "dark" ? dark : light;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { notes, setNotes } = useContext(AppContext);
  const db = useSQLiteContext();

  const fetchNotes = async () => {
    const result = await db.getAllAsync("SELECT * FROM notes;");
    setNotes(result);
  };

  const addNote = async () => {
    if (title && body) {
      await db.runAsync(
        "INSERT INTO notes (title, body) VALUES (?, ?);",
        title,
        body
      );
      setTitle("");
      setBody("");
      fetchNotes();
    }
  };

  return (
    <View style={setStyle("container", styles, colors)}>
      <View style={styles.note}>
        <TextInput style={setStyle("title", styles, colors)} onChangeText={setTitle} value={title} />
        <TextInput
          style={setStyle("body", styles, colors)}
          onChangeText={setBody}
          value={body}
          multiline
          textAlignVertical={"top"}
        />
      </View>

      <Button onPress={addNote} title="Add" />
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
