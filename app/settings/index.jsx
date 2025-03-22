import { Link } from "expo-router";
import { View, Text, StyleSheet, Button, useColorScheme } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState, useMemo, useContext } from "react";
import { lightColors, darkColors, setStyle } from "../../helpers/themes";
import { useSQLiteContext } from "expo-sqlite";
import { SettingsContext } from "../../helpers/settings_provider";
import RadioGroup from "react-native-radio-buttons-group";

export default function Settings() {
  const { settings, updateSetting, currentTheme, themeBehavior } =
    useContext(SettingsContext);
  const [selectedTheme, setSelectedTheme] = useState(
    themeBehavior == "auto" ? themeBehavior : currentTheme
  );
  let colors = currentTheme == "dark" ? dark : light;
  const db = useSQLiteContext();

  const radioTheme = useMemo(() => [
    {
      id: "auto",
      label: "Auto, use device preference",
      value: "auto",
    },
    {
      id: "light",
      label: "Light mode",
      value: "light",
    },
    {
      id: "dark",
      label: "Dark mode",
      value: "dark",
    },
  ]);

  function saveTheme(id) {
    setSelectedTheme(id);
    const upp = async () => {
      await updateSetting("theme", id);
      if (id == "auto") {
        await updateSetting("themeBehavior", "auto");
      } else {
        await updateSetting("themeBehavior", "manual");
      }
    };
    upp();
    // theme behavior: manual / auto
  }

  // function saveTheme(id) {
  //   setSelectedTheme(id);
  //   if (id == "light" || id == "dark") {
  //     setCurrentTheme(id);
  //   } else {
  //     setCurrentTheme(systemTheme);
  //   }
  //   const addToDb = async () => {
  //     await db.runAsync(
  //       "INSERT OR REPLACE INTO settings (item, value) VALUES (?, ?)",
  //       "theme",
  //       id
  //     );
  //   };
  //   addToDb();
  //   console.log(id);
  // }

  // async function dropSettings() {
  //   await db.execAsync("DROP TABLE settings");
  // }
  // dropSettings();

  console.log(
    "selectedTheme",
    selectedTheme,
    "currentTheme",
    currentTheme,
    "themeBehavior",
    themeBehavior
  );
  return (
    <View style={setStyle("container", styles, colors)}>
      <View style={setStyle("category", styles, colors)}>
        <Text style={setStyle("heading", styles, colors)}>
          Choose your preferred theme
        </Text>
        <RadioGroup
          radioButtons={radioTheme}
          onPress={saveTheme}
          selectedId={selectedTheme}
          containerStyle={styles.group}
          labelStyle={setStyle("label", styles, colors)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
    flex: 1,
    width: "100%",
  },
  heading: {
    fontSize: 18,
  },
  category: {
    padding: 8,
  },
  group: {
    alignItems: "flex-start",
  },
  label: {
    color: "white",
  },
});

const light = StyleSheet.create({
  container: {
    backgroundColor: lightColors.secondary,
  },
  category: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey",
  },
  heading: {
    color: lightColors.font,
  },
  text: {
    color: lightColors.font,
  },
  label: {
    color: lightColors.font,
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  category: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  heading: {
    color: darkColors.font,
  },
  text: {
    color: darkColors.font,
  },
  label: {
    color: darkColors.font,
  },
});
