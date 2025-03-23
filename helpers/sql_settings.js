export const createTable = async (db) => {
  console.log("creating table...");
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY NOT null,
      item TEXT UNIQUE,
      value TEXT)`);
  } catch (error) {
    console.log(error);
  }
};

export const getSettingsFromDb = async (db) => {
  try {
    const dbSettings = await db.getAllAsync("SELECT * FROM settings");
    // console.log("db...", dbSettings);
    if (dbSettings.length > 0) {
      return dbSettings;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setSettingInDb = async (db, item, value) => {
  try {
    const dbSettings = await db.getAllAsync(
      "SELECT * FROM settings WHERE item = ?",
      item
    );
    if (dbSettings.length > 0) {
      await db.runAsync(
        "UPDATE settings SET value = ? WHERE item = ?",
        value,
        item
      );
      // console.log("update", item, value);
    } else {
      await db.runAsync(
        "INSERT INTO settings (item, value) VALUES (?, ?);",
        item,
        value
      );
      // console.log("insert", item, value);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};
