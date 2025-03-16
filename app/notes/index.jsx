import React, { useContext } from "react";
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
import { colors } from "../../helpers/themes";
import { Appearance } from "react-native";

export default function AllNotes() {
  const { notes, setNotes } = useContext(AppContext);
  const db = useSQLiteContext();
  const theme = useColorScheme();
  console.log(colors.bg_primary[theme]);
  return (
    <View style={[styles.container, colors.bg_primary[theme]]}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.singleNote}>
            <Link href={`notes/${item.id}/view`} style={styles.box} asChild>
              <Pressable>
                <View style={styles.box}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text>{item.body}</Text>
                  <Text>{item.id}</Text>
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
  theme: {
    light: "green",
    dark: "red",
  },
  container: {
    padding: 14,
    flex: 1,
    width: "100%",
  },
  lightContainer: {
    backgroundColor: "#FFFFFF",
  },
  darkContainer: {
    backgroundColor: "#000000",
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
    boxShadow: "2 2 2 lightgrey",
    backgroundColor: colors.bg_primary,
  },
  row: {},
  title: {
    fontWeight: "bold",
    fontSize: 17,
  },
  box: {
    width: "100%",
    height: "100%",
  },
});
