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

export default function AllNotes() {
  const { notes, setNotes } = useContext(NotesContext);
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  // console.log(notes);
  // console.log(colors);
  return (
    <View style={setStyle("container", styles, colors)}>
      <FlatList
        data={notes}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flex: 1,
    width: "100%",
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
});
