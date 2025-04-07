import React, { useContext, useEffect, useState, Component } from "react";
import { Text, View, StyleSheet, FlatList, Animated } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import Entypo from "@expo/vector-icons/Entypo";
import { lightColors, darkColors, setStyle } from "./themes";
import { SettingsContext } from "./settings_provider";
import { NotesContext } from "./notes_provider";

export default function LeftMenuMulti({
  screen,
  selecting,
  setSelecting,
  selectedNotes,
  setSelectedNotes,
  stopSelecting,
}) {
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  // let colors = currentTheme == "dark" ? dark : light;
  // const [leftMenuOpen, setLeftMenuOpen] = useState(false);

  function closeSelection() {
    stopSelecting();
  }

  return (
    <View style={styles.leftMenu}>
      <Pressable onPress={() => closeSelection()}>
        <Entypo name="cross" size={26} style={styles.icon} color="black" />
      </Pressable>
      <Text style={styles.text}>Selected notes: {selectedNotes.length}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  leftMenu: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
    padding: 6,
    textAlignVertical: "center",
  },
  text: {
    fontSize: 18,
  },
  icon: {
    paddingRight: 4,
  },
});
