import { Link } from "expo-router";
import { View, Text, TextInput, StyleSheet } from "react-native";
import BaseText from "./base_text";
import BaseLink from "./base_link";

export default function AddNote() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  
  return (
    <View>
      <BaseText>Add note</BaseText>
      <BaseLink href="/">Back</BaseLink>
      <TextInput
        style={styles.title}
        onChangeText={setTitle}
        value={title}
      />
      <TextInput 
        styles={styles.note}
        onChangeText={setNote}
        value={note}
        multiline
        textAlignVertical={top}
      >
      </TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    margin: 10,
    padding: 10
  },
  note: {
    margin: 10,
    padding: 10
  }
})