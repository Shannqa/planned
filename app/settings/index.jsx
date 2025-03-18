import { Link } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState, useMemo } from "react";
import { lightColors, darkColors, setStyle } from "../../helpers/themes";
import RadioGroup from "react-native-radio-buttons";

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState("");
  
  const radioTheme = useMemo(() => ([
    {
      id: "theme0",
      label: "Auto, use device preference",
      value: "auto"
    },
    {
      id: "theme1",
      label: "Light mode",
      value: "light"
    },
    {
      id: "theme2",
      label: "Dark mode",
      value: "auto"
    },
    ]))
  
  
  return (
    <View style={styles.container}>
    <View>
      <Text style={styles.text}>Choose your preferred theme</Text>
      <RadioGroup
        radioButtons={radioTheme}
        onPress={setSelectedTheme}
        selectedId={selectedTheme}
      />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  text: {
    fontSize: 20,
  },
});

const light = StyleSheet.create({
  container: {
    backgroundColor: lightColors.secondary,
  },
  singleNote: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey",
  },
  title: {
    color: lightColors.font,
  },
  text: {
    color: lightColors.font,
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  singleNote: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  title: {
    color: darkColors.font,
  },
  text: {
    color: darkColors.font,
  },
});
