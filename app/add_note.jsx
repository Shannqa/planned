import React, { useContext, useState, useEffect } from "react";
import { Link } from "expo-router";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import BaseText from "../helpers/base_text";
import BaseLink from "../helpers/base_link";
import BackButton from "../helpers/back_btn";
import { useSQLiteContext } from "expo-sqlite";
import { AppContext } from "../helpers/notes_provider";

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
    <View>
      <BaseText>Add note</BaseText>
      <BackButton />
      <TextInput style={styles.title} onChangeText={setTitle} value={title} />
      <TextInput
        style={styles.body}
        onChangeText={setBody}
        value={body}
        multiline
        textAlignVertical={"top"}
      />

      <Button onPress={addNote} title="Add" />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "lightgrey",
  },
  body: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "lightgrey",
  },
});
