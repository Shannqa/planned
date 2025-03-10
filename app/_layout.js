//import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  // return <Stack screenOptions={{ headerShown: false }} />;
  return (
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
  );
}
