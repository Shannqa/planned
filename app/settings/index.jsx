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
  let systemTheme = useColorScheme();
  const [selectedTheme, setSelectedTheme] = useState(
    themeBehavior == "auto" ? themeBehavior : currentTheme
  );
  let colors = currentTheme == "dark" ? darkColors : lightColors;
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

  console.log("selectedTheme", selectedTheme);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>Choose your preferred theme</Text>
        <RadioGroup
          radioButtons={radioTheme}
          onPress={saveTheme}
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
