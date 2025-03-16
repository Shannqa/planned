import { Link } from "expo-router";
import { View, Text, StyleSheet, Button } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Theme</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  text: {
    fontSize: 20,
  },
});
