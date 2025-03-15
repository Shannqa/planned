import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { AppContext } from "../../helpers/notes_provider";

export default function Note() {
  const params = useLocalSearchParams();
  const { notes, setNotes } = useContext(AppContext);
  const [note, setNote] = useState({ id: "", title: "", body: "" });

  useEffect(() => {
    if (notes && params.note_id) {
      // console.log(notes);
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == params.note_id) {
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
    <View style={styles.note}>
      <Stack.Screen
        options={{
          title: `Note id ${params.note_id}`,
        }}
      />
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.body}>{note.body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  note: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
  body: {
    fontSize: 18,
  },
});
