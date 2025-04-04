import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Link, useRouter, Drawer, Stack, Screen } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import { NotesContext } from "../../helpers/notes_provider";
import { lightColors, darkColors, setStyle } from "../../helpers/themes";
import { SettingsContext } from "../../helpers/settings_provider";
import Entypo from "@expo/vector-icons/Entypo";
import PopupMenuMulti from "../../helpers/popup_multi";
import { useSegments } from "expo-router";
import { useNavigation } from "@react-navigation/native";

export default function AllNotes({ ...props }) {
  const { notes, setNotes, openNotes, setOpenNotes } = useContext(NotesContext);
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  // console.log(notes);
  const [selecting, setSelecting] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const router = useRouter();
  const navigation = useNavigation();
  // make sure drawer button appears only on notes/ screen, not any nested screens. segments should be ["notes"]
  const segments = useSegments();
  const showDrawerMenuButton = segments.length === 1;
  // console.log(props);
  useEffect(() => {
    const open = notes.filter((note) => note.status == "open");
    // console.log("open", open);
    setOpenNotes(open);
  }, [notes]);

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    // console.log(parent);
    parent.setOptions({
      // headerTitle: "bzz",
      // title: "bzz",
      // drawerLabel: "bb",
      headerRight: () => (
        <PopupMenuMulti
          screen={"openIndex"}
          selecting={selecting}
          setSelecting={setSelecting}
          selectedNotes={selectedNotes}
          setSelectedNotes={setSelectedNotes}
        />
      ),
      // headerRight: showDrawerMenuButton
      // ? () => <PopupMenuMulti screen={"openIndex"} />
      // : null,
    });
  }, [navigation]);


  function startSelecting() {
    setSelecting(true)
    // show slide in menu
  }
  
  function stopSelecting() {
    setSelecting(false);
    setSelectedNotes([]);
    // hide slide in menu
    
  }
  
  
  function toggleSelection(id) {
    // add or remove note from selection
    console.log("selection", selectedNotes);
    if (selectedNotes.includes(id)) {
      const newList = selectedNotes.filter((note_id) => note_id != id);
      setSelectedNotes(newList);
    } else {
      const newList = [...selectedNotes, id];
      setSelectedNotes(newList);
    }
  }
  return (
    <View style={setStyle("container", styles, colors)}>
      <FlatList
        data={openNotes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => {
          const isSelected = selectedNotes.includes(item.id);
          return (
            <View
              style={
                isSelected
                  ? [styles.singleNote, colors.selected]
                  : [styles.singleNote, colors.notSelected]
                // isSelected
                //   ? setStyle(["singleNote", "selected"], styles, colors)
                //   : setStyle(["singleNote", "notSelected"], styles, colors)
              }
            >
              {/* <Link
                style={setStyle("box", styles, colors)}
                href={`notes/${item.id}/view`}
                asChild
              > */}
              <Pressable
                // onPress={() => router.push(`notes/${item.id}/view`)}
                onPress={
                  selecting
                    ? () => toggleSelection(item.id)
                    : () => router.push(`notes/${item.id}/view`)
                }
                onLongPress={() => toggleSelection(item.id)}
                style={styles.box}
              >
                <View>
                  <Text style={setStyle("title", styles, colors)}>
                    {item.title}
                  </Text>
                  <Text style={setStyle("text", styles, colors)}>
                    {item.body}
                  </Text>
                </View>
              </Pressable>
              {/* </Link> */}
            </View>
          );
        }}
      />
      <View style={setStyle("buttonContainer", styles, colors)}>
        <View style={setStyle("addButton", styles, colors)}>
          <Link href="notes/new_note/" asChild>
            <Pressable>
              <View>
                <Text style={setStyle("addButtonText", styles, colors)}>+</Text>
              </View>
            </Pressable>
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flex: 1,
    width: "100%",
    height: "100%",
  },
  singleNote: {
    margin: 4,
    padding: 8,
    fontSize: 17,
    flexBasis: 1,
    flexGrow: 1,
    flexDirection: "column",
    flex: 1,
    height: 150,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
  },
  text: {},
  box: {
    width: "100%",
    height: "100%",
  },
  buttonContainer: {
    position: "relative",
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  addButton: {
    width: 80,
    height: 80,
    position: "absolute",
    bottom: 10,
    right: 0,
    borderRadius: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 48,
  },
  selected: {
    // backgroundColor: "yellow",
  },
});

const light = StyleSheet.create({
  container: {
    backgroundColor: lightColors.secondary,
  },
  singleNote: {
    // backgroundColor: lightColors.primary,
    // boxShadow: "2 2 2 lightgrey",
  },
  title: {
    color: lightColors.font,
  },
  text: {
    color: lightColors.font,
  },
  buttonContainer: {},
  addButton: {
    backgroundColor: lightColors.detail,
  },
  addButtonText: {
    color: lightColors.font,
  },
  selected: {
    backgroundColor: lightColors.detail2,
    boxShadow: "2 2 2 lightgrey",
  },
  notSelected: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey",
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  singleNote: {
    // backgroundColor: darkColors.primary,
    // boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  title: {
    color: darkColors.font,
  },
  text: {
    color: darkColors.font,
  },
  buttonContainer: {},
  addButton: {
    backgroundColor: darkColors.detail,
  },
  addButtonText: {
    color: darkColors.font,
  },
  selected: {
    backgroundColor: darkColors.detail2,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  notSelected: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
});
