// create notes table
export const createTable = async (db) => {
  console.log("creating table...");
  try {
    await db.execAsync(`CREATE TABLE IF NOT EXISTS notes (
        id INTEGER PRIMARY KEY NOT null,
        title TEXT,
        body TEXT)`);
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
    await db.runAsync(
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
      "UPDATE notes SET title = ?, body = ? WHERE id = ?",
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

// delete one note
export const deleteNote = async (db, id, title, body) => {
  try {
    const del = await db.runAsync("DELETE FROM notes WHERE id = ?", id);
    // console.log(del);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
