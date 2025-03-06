import React from "react";
import { StyleSheet, Button } from "react-native";

export default function BaseButton({ onPress, title }) {
  return <Button 
    style={styles.button}
    onPress={onPress}
    title={title}
  />;
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
    padding: 20,
    width: 120,
    height: 30
  },
});
