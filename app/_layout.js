import React, { useState, useEffect, useContext } from "react";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AppContext } from "../helpers/notes_provider";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  Link,
  useColorScheme,
} from "react-native";
import { Drawer } from "expo-router/drawer";
import { lightColors, darkColors, setStyle } from "../helpers/themes";

export default function RootLayout() {
  const { theme, setTheme } = useContext(AppContext);
  let colors = theme == "dark" ? darkColors : lightColors;

  return (
    <GestureHandlerRootView>
      <SQLiteProvider databaseName="notes.db">
        <NotesProvider>
          <Drawer
            initialRouteName="index"
            screenOptions={{
              drawerActiveBackgroundColor: "green",
              drawerStyle: {
                backgroundColor: colors.bg_secondary,
                color: colors.font,
              },
            }}
          >
            <Drawer.Screen
              name="index"
              href="/"
              options={{ title: "Home", drawerLabel: "Home" }}
            />
            <Drawer.Screen
              name="notes"
              href="/notes"
              options={{ title: "All notes", drawerLabel: "All notes" }}
            />
            <Drawer.Screen
              name="add_note"
              href="/add_note"
              options={{ title: "Add a note", drawerLabel: "Add a note" }}
            />
            <Drawer.Screen
              name="settings"
              href="/settings"
              options={{ title: "Settings", drawerLabel: "Settings" }}
            />
          </Drawer>
        </NotesProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    padding: 14,
  },
  drawerButton: {
    padding: 14,
  },
});
