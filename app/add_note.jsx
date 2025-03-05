import { Link } from "expo-router";
import { View, Text } from "react-native";
import { TextInput } from "react-native-web";
import BaseText from "./base_text";
import BaseLink from "./base_link";

export default function AddNote() {
  return (
    <View>
      <BaseText>Add note</BaseText>
      <BaseLink href="/">Back</BaseLink>
    </View>
  );
}
