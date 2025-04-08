import React, { useContext, useEffect, useState, Component } from "react";
import { Text, View, StyleSheet, FlatList, Pressable } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";
import Entypo from "@expo/vector-icons/Entypo";
import { lightColors, darkColors, setStyle } from "./themes";
import { SettingsContext } from "./settings_provider";
import { NotesContext } from "./notes_provider";
import { useSQLiteContext } from "expo-sqlite";

// const CustomMenu = (props) => {
//   const { style, children, layouts, ...other } = props;
//   const position = { top: 200, left: 200 };
//   return (
//     <View {...other} style={[style, position]}>
//       {children}
//     </View>
//   );
// };

export default function RightMenuMulti({
  screen,
  startSelecting,
  stopSelecting,
  selecting,
  setSelecting,
  selectedNotes,
}) {
  const { changeStatusMulti, deleteNotePermMulti } = useContext(NotesContext);
  const [popupOpen, setPopupOpen] = useState(false);
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const [menuData, setMenuData] = useState([]);
  const db = useSQLiteContext();

  useEffect(() => {
    // list of options in the menu, depending on the current open screen and if the user is currently selecting notes or not
    if (screen == "openIndex") {
      if (!selecting) {
        setMenuData([allScreensMenu[0]]);
      } else {
        setMenuData([allScreensMenu[1], ...openIndexMenu]);
      }
    } else if (screen == "archiveIndex") {
      if (!selecting) {
        setMenuData([allScreensMenu[0]]);
      } else {
        setMenuData([allScreensMenu[1], ...archiveIndexMenu]);
      }
    } else if (screen == "binIndex") {
      if (!selecting) {
        setMenuData([allScreensMenu[0]]);
      } else {
        setMenuData([allScreensMenu[1], ...binIndexMenu]);
      }
    }
  }, [screen, selecting]);

  const allScreensMenu = [
    {
      id: 0,
      label: "Select notes",
      action: function () {
        startSelecting();
        onOptionSelect();
      },
    },
    {
      id: 1,
      label: "Cancel selection",
      action: function () {
        stopSelecting();
        onOptionSelect();
      },
    },
  ];

  const openIndexMenu = [
    {
      id: 2,
      label: "Archive notes",
      action: function (selectedNotes) {
        // console.log("selectednotes", selectedNotes.length);
        changeStatusMulti(db, selectedNotes, "archive");
        closeSelection();
      },
    },
    {
      id: 3,
      label: "Delete notes",
      action: function (selectedNotes) {
        changeStatusMulti(db, selectedNotes, "bin");
        closeSelection();
      },
    },
  ];

  const archiveIndexMenu = [
    {
      id: 2,
      label: "Remove from archive",
      action: function (selectedNotes) {
        changeStatusMulti(db, selectedNotes, "open");
        closeSelection();
      },
    },
    {
      id: 3,
      label: "Delete notes",
      action: function (selectedNotes) {
        changeStatusMulti(db, selectedNotes, "bin");
        closeSelection();
      },
    },
  ];

  const binIndexMenu = [
    {
      id: 2,
      label: "Restore notes",
      action: function (selectedNotes) {
        changeStatusMulti(db, selectedNotes, "open");
        closeSelection();
      },
    },
    {
      id: 3,
      label: "Remove permanently",
      action: function (selectedNotes) {
        deleteNotePermMulti(db, selectedNotes);
        closeSelection();
      },
    },
  ];

  function closeSelection() {
    onOptionSelect();
    stopSelecting();
    // (do the action in notes provider)
    // right menu - close right menu
    // left menu - close left menu
    // index - set selecting false, set selected notes arr to empty
  }

  function onOptionSelect(value) {
    setPopupOpen(false);
  }
  function onTriggerPress() {
    setPopupOpen(true);
  }
  function onBackdropPress() {
    setPopupOpen(false);
  }

  return (
    <Menu
      // renderer={CustomMenu}
      opened={popupOpen}
      onBackdropPress={() => onBackdropPress()}
      // onSelect={(value) => onOptionSelect()}
    >
      <MenuTrigger
        style={styles.menuIcon}
        onPressIn={() => onTriggerPress()}
        customStyles={{
          triggerTouchable: { onPressIn: () => onTriggerPress() },
        }}
      >
        <Entypo name="dots-three-vertical" size={22} color={colors.menuIcon.color} />
      </MenuTrigger>

      <MenuOptions style={light.menu}>
        <FlatList
          data={menuData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            return (
              <MenuOption
                onSelect={() => item.action(selectedNotes)}
                text={item.label}
                style={styles.menuText}
              />
            );
          }}
        />
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  
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
  text1: {
    backgroundColor: "green",
  },
  text2: {
    backgroundColor: "red",
  },
  menuIcon: {
    paddingRight: 15,
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
    color: lightColors.font
  }
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
    color: darkColors.font
  }
});
