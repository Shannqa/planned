import React from "react";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  // return <Stack screenOptions={{ headerShown: false }} />;

  return (
    <GestureHandlerRootView>
      <SQLiteProvider databaseName="notes.db">
        <Stack>
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
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
