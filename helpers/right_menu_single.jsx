import React, { useContext, useEffect, useState, Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Entypo from "@expo/vector-icons/Entypo";
import { lightColors, darkColors, setStyle } from "./themes";
import { SettingsContext } from "./settings_provider";
import { useSQLiteContext } from "expo-sqlite";
import { NotesContext } from "./notes_provider";
import { useRouter } from "expo-router";

const CustomMenu = (props) => {
  const { style, children, layouts, ...other } = props;
  const position = { top: 200, left: 200 };
  return (
    <View {...other} style={[style, position]}>
      {children}
    </View>
  );
};

export default function RightMenuSingle({ noteId, screen }) {
  /* Workaround for a current bug - onPress doesn't work in react navigation header menu. Need to trigger menu to open on onPressIn instead */
  const [state, setState] = useState({ opened: false });
  const { notes, setNotes, changeStatus, deleteNotePerm } =
    useContext(NotesContext);
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const db = useSQLiteContext();
  const [menuData, setMenuData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    if (screen == "openNote") {
      setMenuData(openNoteMenu);
    } else if (screen == "archiveNote") {
      console.log("menu", archiveNoteMenu);
      setMenuData(archiveNoteMenu);
    } else if (screen == "binNote") {
      setMenuData(binNoteMenu);
    }
  }, [screen]);

  const openNoteMenu = [
    {
      id: "0",
      label: "Archive note",
      action: function () {
        changeStatus(db, noteId, "archive");
        console.log("id in popup ", noteId);
        router.back();
      },
    },
    {
      id: "1",
      label: "Delete note",
      action: function () {
        changeStatus(db, noteId, "bin");
        router.back();
      },
    },
  ];

  const archiveNoteMenu = [
    {
      id: "0",
      label: "Remove from archive",
      action: function () {
        const change = changeStatus(db, noteId, "open");
        console.log(change);
        router.back();
      },
    },
    {
      id: "1",
      label: "Delete note",
      action: function () {
        changeStatus(db, noteId, "bin");
        router.back();
      },
    },
  ];

  const binNoteMenu = [
    {
      id: "0",
      label: "Restore note",
      action: function () {
        changeStatus(db, noteId, "open");
        router.back();
      },
    },
    {
      id: "1",
      label: "Remove permanently",
      action: function () {
        deleteNotePerm(db, noteId);
        router.back();
      },
    },
  ];

  function onOptionSelect(value) {
    setState({ opened: false });
  }
  function onTriggerPress() {
    setState({ opened: true });
  }
  function onBackdropPress() {
    setState({ opened: false });
  }

  return (
    <Menu
      renderer={CustomMenu}
      opened={state.opened}
      onBackdropPress={() => onBackdropPress()}
      onSelect={(value) => onOptionSelect(value)}
    >
      <MenuTrigger
        style={styles.menuIcon}
        onPressIn={() => onTriggerPress()}
        customStyles={{
          triggerTouchable: { onPressIn: () => onTriggerPress() },
        }}
      >
        <Entypo
          name="dots-three-vertical"
          size={20}
          color={colors.menuIcon.color}
        />
      </MenuTrigger>
      <MenuOptions style={light.menu}>
        {/* <MenuOption onSelect={() => selector()} text={"label"} /> */}
        <FlatList
          data={menuData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MenuOption
              onSelect={() => item.action()}
              text={item.label}
              style={styles.menuText}
            />
          )}
        />
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flex: 1,
  },
  menu: {
    position: "absolute",
    top: 2,
    right: 2,
    zIndex: 10,
    paddingTop: 8,
    paddingBottom: 8,
  },
  menuItem: {
    padding: 0,
  },
  menuText: {
    fontSize: 20,
    marginVertical: 8,
    marginHorizontal: 22,
  },
  title: {
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 6,
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    paddingVertical: 10,
    paddingHorizontal: 6,
    fontSize: 18,
    padding: 4,
    marginBottom: 8,
    flexGrow: 1,
  },
  menuIcon: {
    marginRight: 15,
    borderRadius: 24,
    height: 24,
    width: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});

const light = StyleSheet.create({
  container: {
    backgroundColor: lightColors.secondary,
  },
  menu: {
    backgroundColor: lightColors.primary,
    boxShadow: "2 2 2 lightgrey, -1 2 2 lightgrey,",
  },
  text: {
    color: lightColors.font,
  },

  menuPressed: {
    backgroundColor: lightColors.detail,
  },
  menuUnpressed: {
    backgroundColor: lightColors.secondary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  menuIcon: {
    color: lightColors.font,
  },
});

const dark = StyleSheet.create({
  container: {
    backgroundColor: darkColors.secondary,
  },
  menu: {
    backgroundColor: lightColors.secondary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
  },
  body: {
    backgroundColor: darkColors.primary,
    boxShadow: "2 2 2 rgba(0, 0, 0, 0.8)",
    color: darkColors.font,
  },
  text: {
    color: darkColors.font,
  },
  menuPressed: {
    backgroundColor: darkColors.detail,
  },
  menuUnpressed: {
    backgroundColor: darkColors.secondary,
  },
  menuIcon: {
    color: darkColors.font,
  },
});
