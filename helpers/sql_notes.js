// create notes table
export const createTable = async (db) => {
  // console.log("creating table...");
  try {
    // available statuses: open, bin, archive
    await db.execAsync(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY NOT null,
        title TEXT,
        body TEXT,
        category TEXT,
        status TEXT DEFAULT "open",
        createdTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        lastEditTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);

    await db.execAsync(
      `CREATE VIEW IF NOT EXISTS notesbin AS SELECT
        id,
        title,
        body,
        category,
        archive,
        bin,
        createdTimestamp,
        lastEditTimestamp FROM notes WHERE bin = 1`
    );
  } catch (error) {
    console.log(error);
  }
};

// get all notes from database
export const getNotesFromDb = async (db) => {
  try {
    const dbNotes = await db.getAllAsync("SELECT * FROM notes");
    if (dbNotes.length > 0) {
      return dbNotes;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// get all notes from database
export const getNotesFromBin = async (db) => {
  try {
    const dbNotes = await db.getAllAsync("SELECT * FROM notesbin");
    if (dbNotes.length > 0) {
      return dbNotes;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// get one note
export const getNoteFromDb = async (db, id) => {
  try {
    const dbNote = await db.getFirstAsync(
      "SELECT * FROM settings WHERE id = ?",
      id
    );
    if (dbNote) {
      return dbNote;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

// add one note
export const addNote = async (db, title, body) => {
  try {
    const add = await db.runAsync(
      "INSERT INTO notes (title, body) VALUES (?, ?);",
      title,
      body
    );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// edit one note
export const editNote = async (db, id, title, body) => {
  try {
    const update = await db.runAsync(
      "UPDATE notes SET title = ?, body = ? WHERE id = ?;",
      title,
      body,
      id
    );
    // console.log(update);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// move one note to bin
export const dbChangeStatus = async (db, id, newStatus) => {
  try {
    const update = await db.runAsync(
      "UPDATE notes SET status = ? WHERE id = ?;",
      newStatus,
      id
    );
    // console.log(update);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// move one note to archive
export const archiveNote = async (db, id) => {
  try {
    const update = await db.runAsync(
      "UPDATE notes SET archive = ? WHERE id = ?;",
      1,
      id
    );
    console.log(update);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// permanently delete a note
export const dbDeleteNote = async (db, id) => {
  try {
    const del = await db.runAsync("DELETE FROM notes WHERE id = ?", id);
    // console.log(del);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

// drop a table
export const dbDropTable = async (db) => {
  try {
    const drop = await db.execAsync("DROP TABLE notes");
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
