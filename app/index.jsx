import { Link } from "expo-router";
import { View, Text } from "react-native";
import BaseText from "./base_text";
import BaseLink from "./base_link";

export default function Home() {
  return (
    <View>
      <BaseText>Home screen</BaseText>
      <BaseLink href="/all_notes">All notes</BaseLink>
      <BaseLink href="/add_note">Add a note</BaseLink>
    </View>
  );
}
