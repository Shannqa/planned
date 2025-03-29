import React, { useContext, useEffect, useState } from "react";
import { Text, View, StyleSheet, Button, Pressable } from "react-native";
import { lightColors, darkColors, setStyle } from "./themes";
import { SettingsContext } from "./settings_provider";
import { useSQLiteContext } from "expo-sqlite";
import { NotesContext } from "./notes_provider";

export default function ContextMenu({ menuOpen, noteId, screen }) {
  const { notes, setNotes, changeNoteStatus } = useContext(NotesContext);
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const db = useSQLiteContext();
  const [menuData, setMenuData] = useState([])

  if (screen == "openNote") {
    setMenuData(...openNoteMenu);
  } else if (screen == "archiveNote") {
    setMenuData(...archiveNoteMenu);
  } else if (screen == "binNote") {
    setMenuData(...openBinMenu);

  }
  const openNoteMenu = [
    {
      label: "Archive note",
      action: changeNoteStatus(db, noteId, "archive"),
    },
    {
      label: "Delete note",
      onPress: changeNoteStatus(db, noteId, "bin"),
    }
  ];
  
  const archivedNoteMenu = [
    {
      label: "Remove from archive",
      onPress: changeNoteStatus(db, noteId, "open")
    },
    {
     label: "Delete note",
     onPress: changeNoteStatus(db, noteId, "bin")
    }
  ];
  
  const binNoteMenu = [
    {
      label: "Restore note",
      onPress: changeNoteStatus(db, noteId, "open")
    },
    {
      label: "Remove permanently",
      onPress: deleteNotePerm(db, noteId)
    }
  ];
    

  <FlatList
        data={menuData}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={setStyle("singleNote", styles, colors)}>
            <Link
              style={setStyle("box", styles, colors)}
              href={`notes/${item.id}/view`}
              asChild
            >
              <Pressable>
                <View>
                  <Text style={setStyle("title", styles, colors)}>
                    {item.title}
                  </Text>
                  <Text style={setStyle("text", styles, colors)}>
                    {item.body}
                  </Text>
                </View>
              </Pressable>
            </Link>
          </View>
        )}
      />
   


  return (
    <View
      style={[
        setStyle("menu", styles, colors),
        { display: menuOpen ? "true" : "none" },
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          pressed ? colors.menuPressed : colors.menuUnpressed,
          styles.menuItem,
        ]}
        onPress={() => changeNoteStatus(db, noteId, "bin")}
      >
        <Text style={styles.menuText}>Delete</Text>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          pressed ? colors.menuPressed : colors.menuUnpressed,
          styles.menuItem,
        ]}
        onPress={() => changeNoteStatus(db, noteId, "archive")}
      >
        <Text style={styles.menuText}>Archive</Text>
      </Pressable>
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
