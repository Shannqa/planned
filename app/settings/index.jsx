import { Link } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState, useMemo, useContext } from "react";
import { lightColors, darkColors, setStyle } from "../../helpers/themes";
import { useSQLiteContext } from "expo-sqlite";
import { AppContext } from "../../helpers/notes_provider";
import RadioGroup from "react-native-radio-buttons-group";

export default function Settings() {
  const [selectedTheme, setSelectedTheme] = useState("");
  const { notes, setNotes, settings, setSettings } = useContext(AppContext);

  const db = useSQLiteContext();

  const radioTheme = useMemo(() => [
    {
      id: "theme0",
      label: "Auto, use device preference",
      value: "auto",
    },
    {
      id: "theme1",
      label: "Light mode",
      value: "light",
    },
    {
      id: "theme2",
      label: "Dark mode",
      value: "auto",
    },
  ]);

  useEffect(() => {
    console.log(selectedTheme);
    console.log("settings", settings);

    async function checkDb() {
      const resultSettings = await db.getAllAsync(
        "SELECT * FROM settings WHERE item = ?",
        "theme"
      );
      console.log("result: ", resultSettings);
      if (resultSettings.length == 0) {
        await db.runAsync(
          "INSERT INTO settings (item, value) VALUES (?, ?);",
          "theme",
          selectedTheme
        );
        setSettings(resultSettings); // only theme for now
      } else if (resultSettings.length == 1) {
        await db.runAsync(
          "UPDATE settings SET value = ? WHERE item = ?",
          selectedTheme,
          "theme"
        );
      }
      setSettings(resultSettings); // only theme for now
    }

    checkDb();
    // async function addToDb() {
    //   await db.runAsync(
    //     "INSERT INTO settings (item, value) VALUES (?, ?);",
    //     "theme",
    //     selectedTheme
    //   );

    // addToDb();
    // }
    // const changeSettings = async () => {
    //   if (selectedTheme) {
    //     // await db.runAsync(
    //     //   "INSERT INTO settings (title, body) VALUES (?, ?);",
    //     //   title,
    //     //   body
    //     // );
    //   }
    // };
  }, [db, selectedTheme]);

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
