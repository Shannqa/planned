import React, { useContext, useState, useEffect } from "react";
import { Link } from "expo-router";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { AppContext } from "../../helpers/notes_provider";

export default function AddNote() {
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
    <View style={styles.container}>
      {/* <BaseText>Add note</BaseText> */}
      {/* <BackButton /> */}
      <View style={styles.note}>
        <TextInput style={styles.title} onChangeText={setTitle} value={title} />
        <TextInput
          style={styles.body}
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
    backgroundColor: "white",
    fontWeight: "bold",
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    fontSize: 18,
    backgroundColor: "white",
    marginBottom: 8,
    flexGrow: 1,
  },
});
