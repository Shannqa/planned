// create notes table and view
export const dbPrepTables = async (db) => {
  try {
    await db.withExclusiveTransactionAsync(async (tx) => {
      await tx.execAsync(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY NOT null,
        title TEXT,
        body TEXT,
        category TEXT,
        status TEXT DEFAULT "open",
        createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        lastEditTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);

      /*
      await tx.execAsync(`CREATE VIEW IF NOT EXISTS notesbin AS SELECT
        id,
        title,
        body,
        category,
        archive,
        bin,
        createdTimestamp,
        lastEditTimestamp FROM notes WHERE bin = 1`);
      */
    });
  } catch (error) {
    console.log(error);
  }
};

// get one note
export const dbGetNote = async (db, id) => {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM settings WHERE id = ?",
      id
    );
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// get all notes from database
export const dbGetNoteMulti = async (db) => {
  try {
    const result = await db.getAllAsync("SELECT * FROM notes");
    if (result.length > 0) {
      return result;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// add one note
export const dbAddNote = async (db, title, body) => {
  try {
    const add = await db.runAsync(
      "INSERT INTO notes (title, body) VALUES (?, ?);",
      title,
      body
    );
    return { lastInsertRowId: add.lastInsertRowId };
  } catch (error) {
    console.log(error);
    return false;
  }
};

// edit content of one note
export const dbEditNote = async (db, id, title, body) => {
  try {
    const result = await db.runAsync(
      "UPDATE notes SET title = ?, body = ? WHERE id = ?;",
      title,
      body,
      id
    );
    // console.log(result);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// change status of a note: "open", "archive", "bin"
export const dbChangeStatus = async (db, id, newStatus) => {
  try {
    const result = await db.runAsync(
      "UPDATE notes SET status = ? WHERE id = ?;",
      newStatus,
      id
    );
    // console.log(result);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// change status of all notes in an array: "open", "archive", "bin"
export const dbChangeStatusMulti = async (db, ids, newStatus) => {
  try {
    await db.withExclusiveTransactionAsync(async (tx) => {
      for (const id of ids) {
        const result = await tx.runAsync(
          "UPDATE notes SET status = ? WHERE id = ?;",
          newStatus,
          id
        );
        console.log("result: ", result);
      }
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// permanently delete a note
export const dbDeleteNotePerm = async (db, id) => {
  try {
    const result = await db.runAsync("DELETE FROM notes WHERE id = ?", id);
    if (result) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// permanently delete multiple notes notes
export const dbDeleteNotePermMulti = async (db, ids) => {
  try {
    await db.withExclusiveTransactionAsync(async (tx) => {
      for (const id of ids) {
        await tx.runAsync("DELETE FROM notes WHERE id = ?", id);
      }
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// drop a table
export const dbDropTable = async (db) => {
  try {
    const result = await db.runAsync("DROP TABLE notes");
    if (result) return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
