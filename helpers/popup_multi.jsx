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

const CustomMenu = (props) => {
  const { style, children, layouts, ...other } = props;
  const position = { top: 200, left: 200 };
  return (
    <View {...other} style={[style, position]}>
      {children}
    </View>
  );
};

export default function PopupMenuMulti({
  screen,
  startSelecting,
  stopSelecting,
  selecting,
  setSelecting,
}) {
  /* Workaround for a current bug - onPress doesn't work in react navigation header menu. Need to trigger menu to open on onPressIn instead */
  const [popupOpen, setPopupOpen] = useState(false);
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const [menuSelecting, setMenuSelecting] = useState(false);

  const menuData = [
    {
      id: 0,
      label: "Select notes",
      action: function () {
        startSelecting();
        onOptionSelect();
        setMenuSelecting(true);
      },
    },
    {
      id: 1,
      label: "Cancel selection",
      action: function () {
        stopSelecting();
        onOptionSelect();
        setMenuSelecting(false);
      },
    },
  ];

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
        style={styles.trigger}
        onPressIn={() => onTriggerPress()}
        customStyles={{
          triggerTouchable: { onPressIn: () => onTriggerPress() },
        }}
      >
        <Entypo name="dots-three-vertical" size={22} color="black" />
      </MenuTrigger>

      <MenuOptions style={light.menu}>
        <FlatList
          data={menuData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (item.id == 0 && !menuSelecting) {
              return (
                <MenuOption
                  onSelect={() => item.action()}
                  text={item.label}
                  style={styles.menuText}
                />
              );
            } else if (item.id == 1 && menuSelecting) {
              return (
                <MenuOption
                  onSelect={() => item.action()}
                  text={item.label}
                  style={styles.menuText}
                />
              );
            }
          }}
        />
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  trigger: {
    paddingRight: 15,
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
  text1: {
    backgroundColor: "green",
  },
  text2: {
    backgroundColor: "red",
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
});

/*
  useEffect(() => {
    if (screen == "openIndex") {
      setMenuData(openIndexMenu);
    }
    } else if (screen == "archiveNote") {
    //   console.log("menu", archiveNoteMenu);
    //   setMenuData(archiveNoteMenu);
    // } else if (screen == "binNote") {
    //   setMenuData(binNoteMenu);
    // }
  }, [screen]);
*/
/*
  const openIndexMenu = [
    {
      id: "0",
      label: "Select notes...",
      action: function (e) {
        console.log(e);
        setSelecting(true);
        setState({ opened: false });
      },
    },
    {
      id: "1",
      label: "Cancel selection",
      action: function () {
        setSelectedNotes([]);
        setSelecting(false);
        setState({ opened: false });
      },
    },
    {
      id: "2",
      label: "Archive notes",
      action: function () {
        const change = changeNoteStatus(db, noteId, "archive");
      },
    },
    {
      id: "3",
      label: "Delete notes",
      action: function () {
        changeNoteStatus(db, noteId, "bin");
      },
    },
  ];

  const archiveNoteMenu = [
    {
      id: "0",
      label: "Remove from archive",
      action: function () {
        const change = changeNoteStatus(db, noteId, "open");
        console.log(change);
      },
    },
    {
      id: "1",
      label: "Delete note",
      action: function () {
        changeNoteStatus(db, noteId, "bin");
      },
    },
  ];

  const binNoteMenu = [
    {
      id: "0",
      label: "Restore note",
      action: function () {
        changeNoteStatus(db, noteId, "open");
      },
    },
    {
      id: "1",
      label: "Remove permanently",
      action: function () {
        deleteNotePerm(db, noteId);
      },
    },
  ];
*/
