import React, { createContext, useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useColorScheme } from "react-native";

export const AppContext = createContext({
  notes: [],
  setNotes: () => {},
  settings: [],
  setSettings: () => {},
  theme: "",
  setTheme: () => {},
});

export default function DatabaseProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [settings, setSettings] = useState("");
  const [theme, setTheme] = useState("auto");
  const db = useSQLiteContext();
  let systemTheme = useColorScheme();

  useEffect(() => {
    const createTables = async () => {
      await db.execAsync(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY NOT null,
        title TEXT,
        body TEXT)`);
      await db.execAsync(`CREATE TABLE IF NOT EXISTS settings (
        id INTEGER PRIMARY KEY NOT null,
        item TEXT,
        value TEXT)`);
    };
    createTables();
  }, [db]);

  const fetchDb = async () => {
    // returns an array of objects
    const resultNotes = await db.getAllAsync("SELECT * FROM notes;");
    const resultSettings = await db.getAllAsync("SELECT * FROM settings;");
    setNotes(resultNotes);

    // check if there is a theme chosen
    if (resultSettings.length > 0) {
      setSettings(resultSettings);

      for (const setting of resultSettings) {
        if (setting.item == "theme") {
          if (setting.value == "theme0") {
            setTheme("auto");
          } else if (setting.value == "theme1") {
            setTheme("light");
          } else if (setting.value == "theme2") {
            setTheme("dark");
          } else if (systemTheme) {
            setTheme(systemTheme);
          } else {
            setTheme("auto");
          }
        }
      }
    }
  };

  useEffect(() => {
    fetchDb();
  }, [db]);

  console.log(settings);
  return (
    <AppContext.Provider
      value={{
        notes,
        setNotes,
        settings,
        setSettings,
        theme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
