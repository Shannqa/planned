import { Link } from "expo-router";
import { View, Text, TextInput, StyleSheet } from "react-native";
import BaseText from "./base_text";
import BaseLink from "./base_link";
import React, { useState } from "react";
import BackButton from "./back_btn";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");

  return (
    <View>
      <BaseText>Add note</BaseText>
      <BackButton />
      <TextInput style={styles.title} onChangeText={setTitle} value={title} />
      <TextInput
        style={styles.title}
        onChangeText={setNote}
        value={note}
        multiline
        textAlignVertical={"top"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "lightgrey",
  },
  note: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "lightgrey",
  },
});
