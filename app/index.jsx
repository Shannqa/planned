import React, { useContext, useEffect, useState } from "react";
import { Link } from "expo-router";
import { View, StyleSheet, Text, Button } from "react-native";
import { SettingsContext } from "../helpers/settings_provider";
import { lightColors, darkColors, setStyle } from "../helpers/themes";
import { NotesContext } from "../helpers/notes_provider";

export default function Home() {
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  const { dropTable } = useContext(NotesContext);
  let colors = currentTheme == "dark" ? dark : light;
  // console.log("colors", colors, "currentTheme", currentTheme);

  return (
    <View style={setStyle("container", styles, colors)}>
      {/* <BaseText>Home screen</BaseText> */}
      <Link style={setStyle("link", styles, colors)} href="/notes/">
        All notes
      </Link>

      <Text>Dev</Text>
      <Button title="Drop table" onPress={() => dropTable()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flex: 1,
    width: "100%",
  },
  link: {
    fontSize: 20,
  },
});

const light = StyleSheet.create({
  container: {
    backgroundColor: lightColors.secondary,
  },
  link: {
    color: lightColors.font,
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  link: {
    color: darkColors.font,
  },
});
