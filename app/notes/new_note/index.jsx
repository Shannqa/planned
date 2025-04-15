import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, TextInput, KeyboardAvoidingView, Platform } from "react-native";
import { useLocalSearchParams, Stack, Link, router } from "expo-router";
import { NotesContext } from "../../../helpers/notes_provider";
import { SettingsContext } from "../../../helpers/settings_provider";
import { lightColors, darkColors, setStyle } from "../../../helpers/themes";
import { addNote } from "../../../helpers/sql_notes";
import { useSQLiteContext } from "expo-sqlite";
import { RichText, Toolbar, useEditorBridge } from "@10play/tentap-editor";

export default function NewNote() {
  //const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  //let colors = currentTheme == "dark" ? dark : light;
  //const { notes, setNotes, getNotes, addNote } = useContext(NotesContext);
  //const [title, setTitle] = useState("");
  //const [body, setBody] = useState("");
  //const db = useSQLiteContext();

  /*function addNewNote() {
    addNote(db, title, body);
    setTitle("");
    setBody("");
    router.push("/notes");
  }*/

  return (
    <View style={styles.fullScreen}>
      <RichText editor={editor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <Toolbar editor={editor} />
      </KeyboardAvoidingView>
    </View>
  )
}


const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
  },
  keyboardAvoidingView: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
  },
});