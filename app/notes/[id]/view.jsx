import React, { useContext, useEffect, useState } from "react";
import {
  TextInput,
  View,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack, Link, router } from "expo-router";
import { NotesContext } from "../../../helpers/notes_provider";
import { SettingsContext } from "../../../helpers/settings_provider";
import { lightColors, darkColors, setStyle } from "../../../helpers/themes";
import RightMenuSingle from "../../../helpers/right_menu_single";
import {
  RichText,
  Toolbar,
  useEditorBridge,
  useEditorContent,
} from "@10play/tentap-editor";

export default function ViewNote() {
  const params = useLocalSearchParams();
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const { notes, setNotes } = useContext(NotesContext);
  const [note, setNote] = useState({ id: "", title: "", body: "" });
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const editor = useEditorBridge({
    autofocus: true,
    avoidIosKeyboard: true,
    editable: false,
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

          // editor?.setContent(notes[i].body);
        }
      }
    }
  }, []);

  useEffect(() => {
    editor.setContent(body);
  }, [editor]);

  return (
    <View style={setStyle("container", styles, colors)}>
      <Stack.Screen
        options={{
          title: `Note id ${params.id}`,
          headerRight: () => (
            <RightMenuSingle noteId={params.id} screen={"openNote"} />
          ),
        }}
      />
      <View style={[styles.title, colors.textField]}>
        <TextInput
          value={title}
          onFocus={() => setTitleFocused(true)}
          onBlur={() => setTitleFocused(false)}
          style={[styles.title, colors.text]}
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
      <Link href="./edit" asChild>
        <Button title="Edit" />
      </Link>
      {/* <View style={styles.note}>
        <Text style={setStyle("title", styles, colors)}>{note.title}</Text>
        <Text style={setStyle("body", styles, colors)}>{note.body}</Text>
      </View>
      <Link href="./edit" asChild>
        <Button title="Edit" />
      </Link> */}
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
