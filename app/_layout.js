import React, { useState, useEffect } from "react";
import { Stack } from "expo-router";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotesProvider from "./notes_provider";
import DrawerNavigator from "./drawer_navigator";

export default function RootLayout() {
  const [notes, setNotes] = useState([]);

  return (
    <GestureHandlerRootView>
      <SQLiteProvider databaseName="notes.db">
        <NotesProvider>
          <Stack>
          <Stack.Screen name="Drawer" component={DrawerNavigator} />
            <Stack.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="all_notes"
              options={{
                title: "All notes",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="add_note"
              options={{
                title: "Add a note",
                headerShown: false,
              }}
            />
          </Stack>
        </NotesProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
