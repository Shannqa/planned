import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Pressable, Image } from "react-native";
import { useLocalSearchParams, Stack, Link, router } from "expo-router";
import { NotesContext } from "../../../helpers/notes_provider";
import { SettingsContext } from "../../../helpers/settings_provider";
import { lightColors, darkColors, setStyle } from "../../../helpers/themes";
import RightMenuSingle from "../../../helpers/right_menu_single";

export default function ViewNote() {
  const params = useLocalSearchParams();
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const { notes, setNotes } = useContext(NotesContext);
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
  }, [notes]);

  return (
    <View style={setStyle("container", styles, colors)}>
      <Stack.Screen
        options={{
          title: `Note id ${params.id}`,
          headerRight: () => (
            <RightMenuSingle noteId={params.id} screen={"archiveNote"} />
          ),
        }}
      />
      <View style={styles.note}>
        <Text style={setStyle("title", styles, colors)}>{note.title}</Text>
        <Text style={setStyle("body", styles, colors)}>{note.body}</Text>
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
  menuButton: {
    // backgroundColor: "green",
    // paddingHorizontal: 14,
    // paddingVertical: 20,
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
