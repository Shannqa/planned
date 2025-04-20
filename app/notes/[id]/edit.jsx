import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, router, Stack } from "expo-router";
import { NotesContext, getNotes } from "../../../helpers/notes_provider";
import { SettingsContext } from "../../../helpers/settings_provider";
import { lightColors, darkColors, setStyle } from "../../../helpers/themes";
import { editNote } from "../../../helpers/sql_notes";
import { useSQLiteContext } from "expo-sqlite";
import {
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from "@10play/tentap-editor";

export default function EditNote() {
  const params = useLocalSearchParams();
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const { notes, setNotes, getNotes } = useContext(NotesContext);
  const [note, setNote] = useState({ id: "", title: "", body: "" });
  const [titleFocused, setTitleFocused] = useState(false);
  const [bodyFocused, setBodyFocused] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const db = useSQLiteContext();
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
  });

  const content = useEditorContent(editor, { type: "html" });

  useEffect(() => {
    // set initial values of the existing note
    if (notes && params.id) {
      // console.log(notes);
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id == params.id) {
          setNote({
            id: notes[i].id,
            title: notes[i].title,
            body: notes[i].body,
          });
          setTitle(notes[i].title);
          setBody(notes[i].body);
          console.log(notes[i].body);
        }
      }
    }
  }, []);

  useEffect(() => {
    editor.setContent(body);
  }, [editor]);

  async function updateNote() {
    // console.log(note.id, title, body);
    await editNote(db, note.id, title, body);
    getNotes(db);
    router.push("/");
  }

  return (
    <View style={setStyle("container", styles, colors)}>
      <Stack.Screen
        options={{
          title: `Note id ${params.id}`,
        }}
      />
      <View style={[styles.title, colors.textField]}>
        <TextInput
          value={title}
          onFocus={() => setTitleFocused(true)}
          onBlur={() => setTitleFocused(false)}
          onChangeText={setTitle}
          style={
            titleFocused
              ? [styles.title, styles.focused, colors.text]
              : [styles.title, colors.text]
          }
        />
      </View>
      <View style={styles.fullScreen}>
        <View style={[styles.richTextContainer, colors.textField]}>
          <RichText editor={editor} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <Toolbar editor={editor} />
        </KeyboardAvoidingView>
      </View>
      <Button title="Save" onPress={updateNote} />

      {/* <View style={styles.note}>
        <TextInput
          value={title}
          onFocus={() => setTitleFocused(true)}
          onBlur={() => setTitleFocused(false)}
          onChangeText={setTitle}
          style={
            titleFocused
              ? setStyle(["title", "focused"], styles, colors)
              : setStyle("title", styles, colors)
          }
        />
        <TextInput
          value={body}
          onFocus={() => setBodyFocused(true)}
          onBlur={() => setBodyFocused(false)}
          onChangeText={setBody}
          style={
            bodyFocused
              ? setStyle(["body", "focused"], styles, colors)
              : setStyle("body", styles, colors)
          }
        />
      </View>
      <Button title="Save" onPress={updateNote} /> */}
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
    bottom: 8,
  },
  container: {
    paddingHorizontal: 14,
    paddingVertical: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    flex: 1,
  },
  richTextContainer: {
    flex: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 20,
  },
});

const light = StyleSheet.create({
  container: {
    backgroundColor: lightColors.secondary,
  },
  text: {
    color: lightColors.font,
  },
  textField: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey",
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  text: {
    color: darkColors.font,
  },
  textField: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
});
