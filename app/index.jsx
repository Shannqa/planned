import { Link } from "expo-router";
import { View, StyleSheet } from "react-native";
import BaseLink from "../helpers/base_link";
import { useEffect, useState } from "react";

export default function Home() {
  return (
    <View style={styles.container}>
      {/* <BaseText>Home screen</BaseText> */}
      <BaseLink href="/notes/">All notes</BaseLink>
      <BaseLink href="/add_note/">Add a note</BaseLink>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 14,
  },
});
