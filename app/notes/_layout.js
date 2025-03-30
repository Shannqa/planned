import React, { useState, useEffect, useContext } from "react";
import { Stack } from "expo-router";
import { SettingsContext } from "../../helpers/settings_provider";

export default function Layout() {
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;

  return (
    <Stack
      initialRouteName="index"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: colors.font,
        headerRight: null,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="[id]/view" />
      <Stack.Screen name="[id]/edit" />
      <Stack.Screen name="new_note/index" />
    </Stack>
  );
}
export const light = {
  primary: "#FFFFFF", // bg, front, lighter
  secondary: "#F2F2F2", // bg, back, darker
  font: "#000000",
};

export const dark = {
  primary: "#1E1E1E", // bg, front, lighter
  secondary: "#121212", // bg, back, darker
  font: "#E0E0E0",
};
