import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { AppContext } from "../../../helpers/notes_provider";
import { lightColors, darkColors, setStyle } from "../../../helpers/themes";

export default function EditNote() {
  const params = useLocalSearchParams();
  let theme = useColorScheme();
  let colors = theme == "dark" ? dark : light;
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
    <View style={setStyle("contain", styles, colors)}>
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
          style={
            titleFocused
              ? setStyle(["title", "focused"], styles, colors)
              : setStyle("title", styles, colors)
          }
        />
        <TextInput
          value={note.body}
          onFocus={() => setBodyFocused(true)}
          onBlur={() => setBodyFocused(false)}
          style={
            bodyFocused
              ? setStyle(["body", "focused"], styles, colors)
              : setStyle("body", styles, colors)
          }
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
  text: {
    color: darkColors.font,
  },
  focused: {},
});
