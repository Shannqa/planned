import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function BaseLink({ href, children }) {
  return (
    <Link style={styles.text} href={href}>
      {children}
    </Link>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
  },
});
