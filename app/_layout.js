import React, { useState, useEffect } from "react";
// import { Stack } from "expo-router";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotesProvider from "../helpers/notes_provider";
// import DrawerNavigator from "./drawer_navigator";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View, Text, TextInput, StyleSheet, Button, Link } from "react-native";
import { Drawer } from "expo-router/drawer";
import Home from "./index";
import { useNavigation } from "expo-router";
import { router } from "expo-router";
export default function RootLayout() {
  const [notes, setNotes] = useState([]);
  // const navigation = useNavigation();
  return (
    <GestureHandlerRootView>
      <SQLiteProvider databaseName="notes.db">
        <NotesProvider>
          <Drawer initialRouteName="index">
            <Drawer.Screen name="index" href="/" />
            <Drawer.Screen name="notes" href="/notes" />
            <Drawer.Screen name="/notes/add" href="/notes/add" />
          </Drawer>
        </NotesProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

function CustomDrawerContent(props) {
  // const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItem label="All notes" onPress={router.push("/notes/add")} />
      {/* <Link href="/notes">All notes</Link> */}
    </DrawerContentScrollView>
    // <View style={styles.drawerContainer}>
    //   <Link href="/notes">All notes</Link>
    //   {/* <Button
    //     style={styles.drawerButton}
    //     onPress={props.navigation.navigate("Home")}
    //   />
    //   <Button
    //     style={styles.drawerButton}
    //     onPress={props.navigation.navigate("All notes")}
    //   />
    //   <Button
    //     style={styles.drawerButton}
    //     onPress={props.navigation.navigate("Add note")}
    //   /> */}
    // </View>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    padding: 14,
  },
  drawerButton: {
    padding: 14,
  },
});

{
  /* <Drawer.Screen
name="index"
options={{
  drawerLabel: "Home",
  title: "Home",
}}
/>
<Drawer.Screen
name="all_notes"
options={{
  title: "All notes",
  // headerShown: false,
}}
/>
<Drawer.Screen
name="add_note"
options={{
  title: "Add a note",
  // headerShown: false,
}}
/> */
}
