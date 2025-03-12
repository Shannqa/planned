import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
// import Home from "./home";
// import AllNotes from "./all_notes";
// import AddNote from "./add_note";

const Drawer = createDrawerNavigator();

export default function drawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    ></Drawer.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <View style={styles.drawerContainer}>
      <Button
        style={styles.drawerButton}
        onPress={props.navigation.navigate("Home")}
      />
      <Button
        style={styles.drawerButton}
        onPress={props.navigation.navigate("All notes")}
      />
      <Button
        style={styles.drawerButton}
        onPress={props.navigation.navigate("Add note")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    padding: 10,
    borderWidth: 1,
    backgroundColor: "#FAF9F6",
  },
  drawerButton: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
    backgroundColor: "lightgrey",
  },
});
