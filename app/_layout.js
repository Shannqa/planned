import React, { useState, useEffect, useContext } from "react";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotesProvider from "../helpers/notes_provider";
import { StyleSheet } from "react-native";
import { Drawer } from "expo-router/drawer";
// import { lightColors, darkColors, setStyle } from "../helpers/themes";
import SettingsProvider, {
  SettingsContext,
  useSettings,
} from "../helpers/settings_provider";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <SQLiteProvider databaseName="notes.db">
        <SettingsProvider>
          <NotesProvider>
            <DrawerCustom />
          </NotesProvider>
        </SettingsProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

function DrawerCustom() {
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  return (
    <>
      <StatusBar
        backgroundColor={colors.primary}
        style={colors.statusBarColor}
      />
      <Drawer
        initialRouteName="index"
        screenOptions={{
          drawerActiveBackgroundColor: colors.primary,
          drawerActiveTintColor: colors.font,
          drawerInactiveTintColor: colors.font,
          drawerStyle: {
            backgroundColor: colors.secondary,
            width: 240,
          },
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.font,
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
          name="settings"
          href="/settings"
          options={{ title: "Settings", drawerLabel: "Settings" }}
        />
        <Drawer.Screen
          name="archive"
          href="/archive"
          options={{ title: "Archive", drawerLabel: "Archive" }}
        />
        <Drawer.Screen
          name="bin"
          href="/bin"
          options={{ title: "Bin", drawerLabel: "Bin" }}
        />
      </Drawer>
    </>
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
export const light = {
  primary: "#FFFFFF", // bg, front, lighter
  secondary: "#F2F2F2", // bg, back, darker
  font: "#000000",
  statusBarColor: "dark",
};

export const dark = {
  primary: "#1E1E1E", // bg, front, lighter
  secondary: "#121212", // bg, back, darker
  font: "#E0E0E0",
  statusBarColor: "light",
};
