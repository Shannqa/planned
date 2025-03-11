import { Link } from "expo-router";
import { View, Text } from "react-native";
import BaseLink from "./base_link";
import BackButton from "./back_btn";
import BaseText from "./base_text";

export default function AllNotes() {
  return (
    <View>
      <BaseText>All notes</BaseText>
      <BackButton />
      <BaseLink href="/add_note">Add a note</BaseLink>
      <BaseLink href="/about">About</BaseLink>
    </View>
  );
}
