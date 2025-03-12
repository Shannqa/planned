import React, { useState, useEffect } from "react";
// import { Stack } from "expo-router";
import { SQLiteProvider, useSQLiteContext } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotesProvider from "../helpers/notes_provider";
// import DrawerNavigator from "./drawer_navigator";
// import { createDrawerNavigator } from "@react-navigation/drawer";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { Drawer } from "expo-router/drawer";
import Home from "./index";

export default function RootLayout() {
  const [notes, setNotes] = useState([]);

  return (
    <GestureHandlerRootView>
      <SQLiteProvider databaseName="notes.db">
        <NotesProvider>
          <Drawer>
            <Drawer.Screen
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
                headerShown: false,
              }}
            />
            <Drawer.Screen
              name="add_note"
              options={{
                title: "Add a note",
                headerShown: false,
              }}
            />
          </Drawer>
          {/* <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
          </Drawer.Navigator> */}
          {/* <Stack> */}
          {/* <Stack.Screen name="Drawer" component={DrawerNavigator} /> */}
          {/* <Stack.Navigator initialRouteName="Drawer">
              <Stack.Screen name="Drawer" component={DrawerNavigator} />
            </Stack.Navigator> */}
          {/* <Stack.Screen name="drawer_navigator" />
            <Stack.Screen
              name="index"
              options={{
                title: "Home",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="all_notes"
              options={{
                title: "All notes",
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="add_note"
              options={{
                title: "Add a note",
                headerShown: false,
              }}
            />
          </Stack> */}
        </NotesProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}

// const Drawer = createDrawerNavigator();

// function CustomDrawerContent(props) {
//   return (
//     <View style={styles.drawerContainer}>
//       <Button
//         style={styles.drawerButton}
//         onPress={props.navigation.navigate("Home")}
//       />
//       <Button
//         style={styles.drawerButton}
//         onPress={props.navigation.navigate("All notes")}
//       />
//       <Button
//         style={styles.drawerButton}
//         onPress={props.navigation.navigate("Add note")}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   drawerContainer: {
//     padding: 10,
//     borderWidth: 1,
//     backgroundColor: "#FAF9F6",
//   },
//   drawerButton: {
//     margin: 10,
//     padding: 10,
//     borderWidth: 1,
//     backgroundColor: "lightgrey",
//   },
// });

// const DrawerNavigator = () => {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={HomeScreen} />
//       <Drawer.Screen name="Settings" component={SettingsScreen} />
//     </Drawer.Navigator>
//   );
// };
