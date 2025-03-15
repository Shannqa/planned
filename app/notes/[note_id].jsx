import React from "react";
import { Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Stack } from "expo-router";

export default function Note() {
  const params = useLocalSearchParams();
  return (
    <View>
      <Stack.Screen
        options={{
          title: `Note id ${params.note_id}`,
        }}
      />
      <Text>Note screen.</Text>
      <Text>{params.note_id}</Text>
    </View>
  );
}
