import React, { useContext } from "react";
import { Link } from "expo-router";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
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
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Link
              href={{
                pathname: "/notes/[id]",
                params: { id: item.id },
              }}
            >
              {item.title}
            </Link>
            <Text>{item.body}</Text>
            <Text>{item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
});
