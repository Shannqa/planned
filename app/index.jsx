import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import { useEffect, useState, useContext } from "react";
import { SettingsContext } from "../helpers/settings_provider";
import { lightColors, darkColors, setStyle } from "../helpers/themes";

export default function Home() {
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  console.log("colors", colors, "currentTheme", currentTheme);
  return (
    <View style={setStyle("container", styles, colors)}>
      {/* <BaseText>Home screen</BaseText> */}
      <Link style={setStyle("link", styles, colors)} href="/notes/">
        All notes
      </Link>
      <Link style={setStyle("link", styles, colors)} href="/add_note/">
        Add a note
      </Link>
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
