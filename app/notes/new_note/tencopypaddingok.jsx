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
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
  });

  const initialContent = `<p>Initial</p>`;

  return (
    <View style={styles.container}>
      <View style={styles.fullScreen}>
        <View style={styles.notePadd}>
          <RichText editor={editor} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <Toolbar editor={editor} />
        </KeyboardAvoidingView>
      </View>
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
  },
  container: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    flex: 1,
  },
  notePadd: {
    padding: 14,
    flex: 1,
    backgroundColor: "white",
  },
});
