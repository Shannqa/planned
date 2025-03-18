import { Link } from "expo-router";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Button,
} from "react-native";
import BaseText from "../helpers/base_text";
import BaseLink from "../helpers/base_link";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={styles.container}>
          {/* <BaseText>Home screen</BaseText> */}
          <BaseLink href="/notes/">All notes</BaseLink>
          <BaseLink href="/add_note/">Add a note</BaseLink>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
});
