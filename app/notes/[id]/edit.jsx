import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { AppContext } from "../../../helpers/notes_provider";

export default function EditNote() {
  const params = useLocalSearchParams();
  const { notes, setNotes } = useContext(AppContext);
  const [note, setNote] = useState({ id: "", title: "", body: "" });
  const [titleFocused, setTitleFocused] = useState(false);
  const [bodyFocused, setBodyFocused] = useState(false);

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
        <TextInput
          value={note.title}
          onFocus={() => setTitleFocused(true)}
          onBlur={() => setTitleFocused(false)}
          style={[styles.title, titleFocused && styles.focused]}
        />
        <TextInput
          value={note.body}
          onFocus={() => setBodyFocused(true)}
          onBlur={() => setBodyFocused(false)}
          style={[styles.body, bodyFocused && styles.focused]}
        />
      </View>

      <Button title="Save" />
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
    textAlignVertical: "top",
  },
  focused: {
    backgroundColor: "white",
  },
});
