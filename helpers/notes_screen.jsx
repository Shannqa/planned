import React, { useState, useContext, useEffect, useLayoutEffect } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  LogBox,
} from "react-native";
import { lightColors, darkColors } from "./themes";
import { SettingsContext } from "./settings_provider";
import { useNavigation } from "@react-navigation/native";
import RightMenuMulti from "./right_menu_multi";
import LeftMenuMulti from "./left_menu_multi";
import RenderHtml from "react-native-render-html";

export default function NotesScreen({ screen, screenNotes, screenTitle, url }) {
  const { currentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const [selecting, setSelecting] = useState(false);
  const [selectedNotes, setSelectedNotes] = useState([]);
  const router = useRouter();
  const navigation = useNavigation();

  // temporary fix for an error with renderHtml
  (function fixRenderer() {
    const ignoreErrors = [
      "Support for defaultProps will be removed",
      // /Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead./,
    ];
    const error = console.error;
    console.error = (...arg) => {
      for (const error of ignoreErrors) if (arg[0].includes(error)) return;
      error(...arg);
    };
    LogBox.ignoreLogs(ignoreErrors);
  })();

  useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({
      headerRight: () => (
        <RightMenuMulti
          screen={screen}
          selecting={selecting}
          startSelecting={startSelecting}
          stopSelecting={stopSelecting}
          selectedNotes={selectedNotes}
        />
      ),
    });

    if (selecting) {
      parent.setOptions({
        title: "",
        headerLeft: () => (
          <LeftMenuMulti
            screen={screen}
            selecting={selecting}
            startSelecting={startSelecting}
            stopSelecting={stopSelecting}
            selectedNotes={selectedNotes}
          />
        ),
      });
    } else {
      parent.setOptions({
        title: screenTitle,
        headerLeft: null,
      });
    }
  }, [navigation, selecting, selectedNotes]);

  function startSelecting() {
    setSelecting(true);
    // show slide in menu
  }

  function stopSelecting() {
    setSelecting(false);
    setSelectedNotes([]);
    // hide slide in menu
  }

  function toggleSelection(id) {
    // add or remove note from selection
    if (selectedNotes.includes(id)) {
      // remove selection
      const newList = selectedNotes.filter((note_id) => note_id != id);
      if (new Promise((resolve, reject) => {})) setSelectedNotes(newList);
      if (newList.length == 0) {
        setSelecting(false);
      }
      console.log("selection", newList);
    } else {
      // add note to selection
      const newList = [...selectedNotes, id];
      setSelectedNotes(newList);
      if (!selecting) {
        setSelecting(true);
      }
    }
  }

  return (
    <>
      <View style={[styles.container, colors.container]}>
        <FlatList
          data={screenNotes}
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
                }
              >
                <Pressable
                  onPress={
                    selecting
                      ? () => toggleSelection(item.id)
                      : () => router.push(`${url}/${item.id}/view`)
                  }
                  onLongPress={() => toggleSelection(item.id)}
                  style={styles.box}
                >
                  <View>
                    <Text style={[styles.title, colors.title]}>
                      {item.title}
                    </Text>
                    <RenderHtml
                      source={{ html: item.body }}
                      contentWidth={200}
                    />
                  </View>
                </Pressable>
              </View>
            );
          }}
        />
        {screen == "openIndex" && (
          <View style={[styles.buttonContainer, colors.buttonContainer]}>
            <View style={[styles.addButton, colors.addButton]}>
              <Link href="notes/new_note/" asChild>
                <Pressable>
                  <View>
                    <Text style={[styles.addButtonText, colors.addButtonText]}>
                      +
                    </Text>
                  </View>
                </Pressable>
              </Link>
            </View>
          </View>
        )}
      </View>
    </>
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
  selected: {},
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
    bottom: 32,
    right: 0,
    borderRadius: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 48,
  },
});

const light = StyleSheet.create({
  container: {
    backgroundColor: lightColors.secondary,
  },
  singleNote: {},
  title: {
    color: lightColors.font,
  },
  text: {
    color: lightColors.font,
  },
  buttonContainer: {},
  selected: {
    backgroundColor: lightColors.detail2,
    boxShadow: "2 2 2 lightgrey",
  },
  notSelected: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey",
  },
  addButton: {
    backgroundColor: lightColors.detail,
  },
  addButtonText: {
    color: lightColors.font,
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  singleNote: {},
  title: {
    color: darkColors.font,
  },
  text: {
    color: darkColors.font,
  },
  buttonContainer: {},
  selected: {
    backgroundColor: darkColors.detail2,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  notSelected: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  addButton: {
    backgroundColor: darkColors.detail,
  },
  addButtonText: {
    color: darkColors.font,
  },
});
