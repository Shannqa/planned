import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import BaseText from "./base_text";
import BaseLink from "./base_link";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { BaseButton } from "react-native-gesture-handler";

export default function Home() {
  const [version, setVersion] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notes, setNotes] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    const createTable = async () => {
      await db.execAsync(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY NOT null,
        title TEXT,
        body TEXT)
        `);
    };
    createTable();

    // async function setup() {
    //   const result =
    //     (await db.getFirstAsync) <
    //     { "sqlite_version()": string } >
    //     "SELECT sqlite_version()";
    //   setVersion(result["sqlite_version"]);
    //   setup();
    // }
  }, [db]);

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
  const fetchNotes = async () => {
    const result = await db.getAllAsync("SELECT * FROM notes;");
    setNotes(result);
  };

  useEffect(() => {
    fetchNotes();
  }, [db]);

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <BaseText>Home screen</BaseText>
        <BaseLink href="/all_notes">All notes</BaseLink>
        <BaseLink href="/add_note">Add a note</BaseLink>
        <BaseText>SQLite version: {version}</BaseText>

        <TextInput onChangeText={setTitle} value={title} style={styles.title} />
        <TextInput
          onChangeText={setBody}
          value={body}
          multiline
          textAlignVertical={"top"}
          style={styles.body}
        />

        <Button onPress={addNote} title="Add" />

        <FlatList
          data={notes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={{ padding: 10, borderBottomWidth: 1 }}>
              <Text>{item.title}</Text>
              <Text>{item.body}</Text>
            </View>
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
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
