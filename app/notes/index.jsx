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
import { useSQLiteContext } from "expo-sqlite";
import { AppContext } from "../../helpers/notes_provider";
import { lightColors, darkColors, setStyle } from "../../helpers/themes";

export default function AllNotes() {
  const { notes, setNotes } = useContext(AppContext);
  let theme = useColorScheme();
  let colors = theme == "dark" ? dark : light;
  const db = useSQLiteContext();

  return (
    <View style={setStyle("container", styles, colors)}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={setStyle("singleNote", styles, colors)}>
            <Link href={`notes/${item.id}/view`} asChild>
              <Pressable>
                <View>
                  <Text style={setStyle("title", styles, colors)}>
                    {item.title}
                  </Text>
                  <Text style={setStyle("text", styles, colors)}>
                    {item.body}
                  </Text>
                  <Text tyle={setStyle("text", styles, colors)}>{item.id}</Text>
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
    padding: 4,
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
    backgroundColor: lightColors.bg_primary,
  },
  singleNote: {
    backgroundColor: lightColors.bg_secondary,
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
    backgroundColor: darkColors.bg_primary,
  },
  singleNote: {
    backgroundColor: darkColors.bg_secondary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  title: {
    color: darkColors.font,
  },
  text: {
    color: darkColors.font,
  },
});
