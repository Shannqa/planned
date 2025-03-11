import React, { useContext } from "react";
import { Link } from "expo-router";
import { View, Text, FlatList } from "react-native";
import BaseLink from "./base_link";
import BackButton from "./back_btn";
import BaseText from "./base_text";
import { useSQLiteContext } from "expo-sqlite";
import { AppContext } from "./notes_provider";

export default function AllNotes() {
  const { notes, setNotes } = useContext(AppContext);
  const db = useSQLiteContext();
  return (
    <View>
      <BaseText>All notes</BaseText>
      <BackButton />
      <BaseLink href="/add_note">Add a note</BaseLink>
      <BaseLink href="/about">About</BaseLink>

      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ padding: 10, borderBottomWidth: 1 }}>
            <Text>{item.title}</Text>
            <Text>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}
