import React, { createContext, useState, useEffect } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { useColorScheme } from "react-native";
import { createTable, getSettingsFromDb, setSettingInDb } from "./sql_settings";

export const SettingsContext = createContext({
  settings: [],
  setSettings: () => {},
  currentTheme: "",
  themeBehavior: () => {},
});

export default function SettingsProvider({ children }) {
  const [settings, setSettings] = useState("");
  const db = useSQLiteContext();
  let systemTheme = useColorScheme();
  const [currentTheme, setCurrentTheme] = useState("");
  const [themeBehavior, setThemeBehavior] = useState("");

  useEffect(() => {
    // Create settings table if it doesn't exist
    const handleTable = async () => {
      await createTable(db);
    };
    handleTable();
    // Get settings from db
    const handleSettings = async () => {
      const dbSettings = await getSettingsFromDb(db);
      if (dbSettings) {
        setSettings(dbSettings);
        addToContext(dbSettings);
        console.log("dbSettings", dbSettings);
      } else {
        // set defaults
        const defaults = [
          { item: "theme", value: systemTheme },
          { item: "themeBehavior", value: "auto" },
        ];
        setSettings(defaults);
        addToContext(defaults);
      }
    };
    handleSettings();
  }, [db]);

  function addToContext(settings) {
    console.log("settings context", settings);
    for (let i = 0; i < settings.length; i++) {
      if (settings[i].item == "theme") {
        if (settings[i].value == "light" || settings[i].value == "dark") {
          setCurrentTheme(settings[i].value);
          setThemeBehavior("manual");
        } else {
          setCurrentTheme(systemTheme);
          setThemeBehavior("auto");
        }
      }
    }
  }

  function updateSetting(item, value) {
    console.log("to update", item, value);
    if (item == "theme") {
      if (value == "auto") {
        setCurrentTheme(systemTheme);
      } else {
        setCurrentTheme(value);
      }
    } else if (item == "themeBehavior") {
      setThemeBehavior(value);
    }
    const sett = async () => await setSettingInDb(db, item, value);
    sett();
  }

  // for testing
  // const drop = async () => await db.execAsync("DROP TABLE settings");
  // drop();

  // useEffect(() => {
  //   // create a table for settings if it doesnt exists
  //   const createTable = async () => {
  //     await db.execAsync(`CREATE TABLE IF NOT EXISTS settings (
  //       id INTEGER PRIMARY KEY NOT null,
  //       item TEXT UNIQUE,
  //       value TEXT)`);
  //   };
  //   createTable();
  // }, []);

  // useEffect(() => {
  //   // fetch settings from the db or add default settings
  //   const fetchSettings = async () => {
  //     const dbSettings = await db.getAllAsync("SELECT * FROM settings;");
  //     console.log(dbSettings);
  //     if (dbSettings.length > 0) {
  //       setSettings(...dbSettings);
  //       for (let i = 0; i < dbSettings.length; i++) {
  //         if (dbSettings[i].item == "theme") {
  //           if (
  //             dbSettings[i].value == "light" ||
  //             dbSettings[i].value == "dark"
  //           ) {
  //             setCurrentTheme(dbSettings[i].value);
  //           } else {
  //             setCurrentTheme(systemTheme);
  //           }

  //           console.log("value", dbSettings[i].value);
  //         } else {
  //           setCurrentTheme(systemTheme);
  //         }
  //       }
  //     } else {
  //       await db.runAsync(
  //         "INSERT INTO settings (item, value) VALUES (?, ?);",
  //         "theme",
  //         "auto"
  //       );
  //       setCurrentTheme(systemTheme);
  //     }
  //   };
  //   fetchSettings();
  // }, [db]);

  console.log("currentTheme", currentTheme);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        currentTheme,
        themeBehavior,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}
