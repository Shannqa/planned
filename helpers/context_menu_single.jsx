import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Pressable,
  FlatList,
  Item,
} from "react-native";
import { lightColors, darkColors, setStyle } from "./themes";
import { SettingsContext } from "./settings_provider";
import { useSQLiteContext } from "expo-sqlite";
import { NotesContext } from "./notes_provider";
import { useRouter } from "expo-router";

export default function ContextMenuSingle({ menuOpen, noteId, screen }) {
  const { notes, setNotes, changeNoteStatus, deleteNotePerm } =
    useContext(NotesContext);
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const db = useSQLiteContext();
  const [menuData, setMenuData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (screen == "openNote") {
      setMenuData(openNoteMenu);
    } else if (screen == "archiveNote") {
      setMenuData(archiveNoteMenu);
    } else if (screen == "binNote") {
      setMenuData(binNoteMenu);
    }
  }, [screen]);

  const openNoteMenu = [
    {
      id: "0",
      label: "Archive note",
      action: function () {
        changeNoteStatus(db, noteId, "archive");
        router.back();
      },
    },
    {
      id: "1",
      label: "Delete note",
      action: function () {
        changeNoteStatus(db, noteId, "bin");
        router.back();
      },
    },
  ];

  const archiveNoteMenu = [
    {
      id: "0",
      label: "Remove from archive",
      action: function () {
        changeNoteStatus(db, noteId, "open");
        router.back();
      },
    },
    {
      id: "1",
      label: "Delete note",
      action: function () {
        changeNoteStatus(db, noteId, "bin");
        router.back();
      },
    },
  ];

  const binNoteMenu = [
    {
      id: "0",
      label: "Restore note",
      action: function () {
        changeNoteStatus(db, noteId, "open");
        router.back();
      },
    },
    {
      id: "1",
      label: "Remove permanently",
      action: function () {
        deleteNotePerm(db, noteId);
        router.back();
      },
    },
  ];

  return (
    <View
      style={[
        setStyle("menu", styles, colors),
        { display: menuOpen ? "true" : "none" },
      ]}
    >
      <FlatList
        data={menuData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              pressed ? colors.menuPressed : colors.menuUnpressed,
              styles.menuItem,
            ]}
            onPress={() => item.action()}
          >
            <Text style={styles.menuText}>{item.label}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  menuItem: {
    padding: 0,
  },
  menuText: {
    fontSize: 20,
    marginVertical: 8,
    marginHorizontal: 22,
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
  menu: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey, -1 2 2 lightgrey,",
  },
  text: {
    color: lightColors.font,
  },

  menuPressed: {
    backgroundColor: lightColors.detail,
  },
  menuUnpressed: {
    // backgroundColor: lightColors.secondary,
    // boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  menu: {
    backgroundColor: lightColors.secondary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  body: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
    color: darkColors.font,
  },
  text: {
    color: darkColors.font,
  },
  menuPressed: {
    backgroundColor: darkColors.detail,
  },
  menuUnpressed: {
    backgroundColor: darkColors.secondary,
  },
});
