import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { Pressable } from "react-native";

export default function BackButton() {
  function onPress() {
    router.back();
  }

  return (
    <Pressable onPress={onPress}>
      <Entypo name="back" size={24} color="black" />
    </Pressable>
  );
}
