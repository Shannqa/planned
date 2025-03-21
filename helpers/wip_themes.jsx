// const [currentTheme, setCurrentTheme] = useState(""); // context
// const [settings, setSettings] = useState([]); // context

// useEffect(() => {
//   // create a table for settings if it doesnt exists
//   await db.execAsync(`CREATE TABLE IF NOT EXISTS settings (
//         id INTEGER PRIMARY KEY NOT null,
//         item TEXT,
//         value TEXT)`);
// }, [])

// useEffect(() => {
//   // fetch settings
//   fetchSettings()
// }, [])

// async function fetchSettings() {
//   // check for settings in the db
//   let currentSettings = {};
//   const dbSettings = await db.getAllAsync("SELECT * FROM settings;");
//   if (dbSettings.length > 0) {
//     // settings are in db
//     for (const row of dbSettings) {
//       currentSettings[row.item] = row.value;
//     }
//   } else {
//     currentSettings.theme = "theme0";
//   }
//   setSettings(...currentSettings);
//   setThemeUsingDb(currentSettings.theme);
// }

// function setThemeUsingDb(themeValue) {
//   // Add theme to the app context depending on the value fetched from the db. If there are no settings or are set to auto, use the system theme.
//   if (themeValue == "theme1") {
//     setTheme("light");
//   } else if (themeValue == "theme2") {
//     setTheme("dark");
//   } else {
//     let systemTheme = useColorScheme();
//     if (systemTheme) {
//       setTheme(systemTheme);
//     } else {
//       setTheme("light");
//     }
//   }
// }

// */
