import React, { useContext } from "react";
import { Link } from "expo-router";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Pressable,
} from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { AppContext } from "../../helpers/notes_provider";

export default function AllNotes() {
  const { notes, setNotes } = useContext(AppContext);
  const db = useSQLiteContext();

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        renderItem={({ item }) => (
          <View style={styles.singleNote}>
            <Link
              href={{
                pathname: "/notes/[id]",
                params: { id: item.id },
              }}
              style={styles.box}
              asChild
            >
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
  container: {
    padding: 14,
    flex: 1,
    width: "100%",
  },
  singleNote: {
    borderWidth: 1,
    borderColor: "grey",
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
