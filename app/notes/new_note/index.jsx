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
import {
  useLocalSearchParams,
  Stack,
  Link,
  router,
  useNavigation,
} from "expo-router";
import { NotesContext, addNote } from "../../../helpers/notes_provider";
import { SettingsContext } from "../../../helpers/settings_provider";
import { lightColors, darkColors, setStyle } from "../../../helpers/themes";
import { useSQLiteContext } from "expo-sqlite";
import {
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from "@10play/tentap-editor";

export default function NewNote() {
  const db = useSQLiteContext();
  const [titleFocused, setTitleFocused] = useState(false);
  const [bodyFocused, setBodyFocused] = useState(false);
  const [title, setTitle] = useState("");
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const navigation = useNavigation();
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    initialContent,
  });
  const [noteInDb, setNoteInDb] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const content = useEditorContent(editor, { type: "string" });

  const initialContent = `<p>Initial</p>`;
  /*
  useEffect(() => {
    // check if it's needed to render the content in the editor? or is it better to add interval/timeout to add to the database
    content && addNote(db, title, content)
  }, [content]);
  */
  useEffect(() => {
    const noteAction = (e) => {
      if (hasUnsavedChanges) {
        saveNote();
      }
    };

    navigation.addListener("beforeRemove", noteAction);

    return () => navigation.removeListener("beforeRemove", noteAction);
  }, []);

  function saveNote() {
    // is the note already in db?
    // if (noteInDb) {
    //   updateNote();
    // } else {
    //   addNewNote();
    // }
    addNewNote();
  }
  function addNewNote() {
    console.log(content);
    addNote(db, title, "aaa");
    setTitle("");
    router.push("/notes");
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "Add note",
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
      <Button title="Save" onPress={addNewNote} />
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
