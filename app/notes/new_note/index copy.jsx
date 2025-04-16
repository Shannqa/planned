import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack, Link, router } from "expo-router";
import { NotesContext } from "../../../helpers/notes_provider";
import { SettingsContext } from "../../../helpers/settings_provider";
import { lightColors, darkColors, setStyle } from "../../../helpers/themes";
import { addNote } from "../../../helpers/sql_notes";
import { useSQLiteContext } from "expo-sqlite";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";

export default function NewNote() {
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const { notes, setNotes, getNotes, addNote } = useContext(NotesContext);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const db = useSQLiteContext();

  /*function addNewNote() {
    addNote(db, title, body);
    setTitle("");
    setBody("");
    router.push("/notes");
  }*/
  const editor = useEditorBridge();

  return (
    <View style={styles.fullScreen}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: "absolute",
    width: "100%",
    bottom: 0,
    justifyContent: "center",
  },
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
