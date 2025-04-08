import React, { useContext, useEffect } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Pressable,
  useColorScheme,
} from "react-native";
import { NotesContext } from "../../helpers/notes_provider";
import { lightColors, darkColors, setStyle } from "../../helpers/themes";
import { SettingsContext } from "../../helpers/settings_provider";
 import RightMenuMulti from "../../helpers/right_menu_multi";
import LeftMenuMulti from "../../helpers/left_menu_multi";

export default function Archive() {
  const { notes, setNotes, archiveNotes, setArchiveNotes } =
    useContext(NotesContext);
  const [selecting, setSelecting] = useState(false);
const [selectedNotes, setSelectedNotes] = useState([]);
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;

  useEffect(() => {
    const archived = notes.filter((note) => note.status == "archive");
    // console.log("archived", archived);
    // console.log("notes", notes);
    setArchiveNotes(archived);
  }, [notes]);

useLayoutEffect(() => {
    const parent = navigation.getParent();
    parent.setOptions({
      headerRight: () => (
        <RightMenuMulti
          screen={"openIndex"}
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
            screen={"archiveIndex"}
            selecting={selecting}
            startSelecting={startSelecting}
            stopSelecting={stopSelecting}
            selectedNotes={selectedNotes}
          />
        ),
      });
    } else {
      parent.setOptions({
        title: "Archive",
        headerLeft: null,
      });
    }
  }, [navigation, selecting, selectedNotes]);


  return (
    <View style={setStyle("container", styles, colors)}>
      <FlatList
        data={archiveNotes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={setStyle("singleNote", styles, colors)}>
            <Link
              style={setStyle("box", styles, colors)}
              href={`archive/${item.id}/view`}
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
});

const light = StyleSheet.create({
  container: {
    backgroundColor: lightColors.secondary,
  },
  singleNote: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey",
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
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  singleNote: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
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
});
