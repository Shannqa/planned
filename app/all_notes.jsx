import { Link } from "expo-router";
import { View, Text } from "react-native";
import BaseLink from "./base_link";

export default function AllNotes() {
  return (
    <View>
      <BaseLink href="/add_note">Add a note</BaseLink>
      <BaseLink href="/about">About</BaseLink>
    </View>
  );
}
