import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack initialRouteName="index">
      <Stack.Screen name="index" />
      <Stack.Screen name="[note_id]" />
      <Stack.Screen name="add" />
    </Stack>
  );
}
