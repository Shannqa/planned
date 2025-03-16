import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { useLocalSearchParams, Stack, Link } from "expo-router";
import { AppContext } from "../../../helpers/notes_provider";

export default function ViewNote() {
  const params = useLocalSearchParams();
  const { notes, setNotes } = useContext(AppContext);
  const [note, setNote] = useState({ id: "", title: "", body: "" });

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
        }
      }
    }
  }, []);

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: `Note id ${params.id}`,
        }}
      />
      <View style={styles.note}>
        <Text style={styles.title}>{note.title}</Text>
        <Text style={styles.body}>{note.body}</Text>
      </View>
      <Link href="./edit" asChild>
        <Button title="Edit" />
      </Link>
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
    backgroundColor: "white",
    fontWeight: "bold",
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    fontSize: 18,
    padding: 4,
    backgroundColor: "white",
    marginBottom: 8,
    flexGrow: 1,
  },
});
