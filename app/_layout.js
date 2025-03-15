import React, { useState, useEffect } from "react";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotesProvider from "../helpers/notes_provider";
import { View, Text, TextInput, StyleSheet, Button, Link } from "react-native";
import { Drawer } from "expo-router/drawer";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SQLiteProvider databaseName="notes.db">
        <NotesProvider>
          <Drawer initialRouteName="index">
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
