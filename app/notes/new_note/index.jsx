// @ts-nocheck
import React, { useContext, useEffect, useState, useRef } from "react";
import {
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
import { NotesContext } from "../../../helpers/notes_provider";
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
  const { addNote } = useContext(NotesContext);
  const [titleFocused, setTitleFocused] = useState(false);
  const [bodyFocused, setBodyFocused] = useState(false);
  const [title, setTitle] = useState("");
  const [noteId, setNoteId] = useState(null);
  const { currentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const navigation = useNavigation();
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    // initialContent,
    onChange: () => !hasUnsavedChanges && setHasUnsavedChanges(true),
  });
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const initialContent = `<p>Initial</p>`;
  const content = useEditorContent(editor, { type: "html" });
  const contentRef = useRef(content);
  const titleRef = useRef(title);
  const idRef = useRef(noteId);
  const unsavedRef = useRef(hasUnsavedChanges);

  useEffect(() => {
    // add refs to make sure values are up-to-date inside the effect with an event listener
    contentRef.current = content;
    titleRef.current = title;
    idRef.current = noteId;
    unsavedRef.current = hasUnsavedChanges;
  }, [content, title, noteId, hasUnsavedChanges]);

  useEffect(() => {
    // use current refs insead of adding title and content in dependencies array so the listeners aren't readded with every keystroke
    const noteAction = async (e) => {
      if (unsavedRef.current) {
        console.log(unsavedRef.current);
        e.preventDefault();
        await saveNote();
      }
      navigation.dispatch(e.data.action);
    };
    navigation.addListener("beforeRemove", noteAction);

    return () => navigation.removeListener("beforeRemove", noteAction);
  }, [navigation]);

  async function saveNote() {
    // using refs so data doesn't get stale when called from
    const currentTitle = titleRef.current;
    const currentContent = contentRef.current;
    const currentId = idRef.current;
    console.log("title", currentTitle, "cont", currentContent);
    //  (NOBRIDGE) LOG  title  cont <p></p>
    if (!currentTitle && !currentContent) {
      console.log("empty title and content");
      return;
    }
    if (noteId) {
      const result = await editNote(
        db,
        currentId,
        currentTitle,
        currentContent
      );
      setHasUnsavedChanges(false);
      unsavedRef.current = false;
    } else {
      const id = await addNote(db, title, content);
      setNoteId(id);
      idRef.current = id;
      setHasUnsavedChanges(false);
      unsavedRef.current = false;
    }
  }

  /**********
   * async function saveNote() {
  const currentNoteId = noteIdRef.current;
  const currentTitle = titleRef.current;
  const currentContent = contentRef.current;

  if (currentNoteId) {
    await editNote(db, currentNoteId, currentTitle, currentContent);
    setHasUnsavedChanges(false);
  } else {
    const id = await addNote(db, currentTitle, currentContent);
    setNoteId(id); // update state
    noteIdRef.current = id; // update ref
    setHasUnsavedChanges(false);
  }
}
   * 
   * 
   * 
   */
  // async function addNewNote() {
  //   console.log(content);
  //   const result = await addNote(db, title, content);
  //   console.log("noteId ", result);
  //   setTitle("");
  //   router.push("/notes");
  // }

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
      <Button title="Save" onPress={saveNote} />
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
