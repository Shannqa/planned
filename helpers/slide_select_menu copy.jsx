import React, { useContext, useEffect, useState, Component } from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  renderers,
} from "react-native-popup-menu";
import Entypo from "@expo/vector-icons/Entypo";
import { lightColors, darkColors, setStyle } from "./themes";
import { SettingsContext } from "./settings_provider";
import { NotesContext } from "./notes_provider";

export default function SlideSelect({
  screen,
  selecting,
  setSelecting,
  selectedNotes,
  setSelectedNotes,
  stopSelecting,
}) {
  const {
    notes,
    setNotes,
    changeNoteStatus,
    changeNoteStatusMulti,
    deleteNotePerm,
    deleteNotePermMulti,
  } = useContext(NotesContext);
  const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  // let colors = currentTheme == "dark" ? dark : light;
  const [popupOpen, setPopupOpen] = useState(false);
  const [slideOpen, setSlideOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    if (screen == "openIndex") {
      setMenuData(openIndexMenu);
    } else if (screen == "archiveIndex") {
      setMenuData(archiveIndexMenu);
    } else if (screen == "binIndex") {
      setMenuData(binIndexMenu);
    }
  }, [screen]);

  useEffect(() => {
    setSlideOpen(selecting);
  }, [selecting]);

  // options for the popup menu
  const openIndexMenu = [
    {
      id: "0",
      label: "Archive notes",
      action: function () {
        changeNoteStatusMulti(db, selectedNotes, "archive");
        closeSelection();
      },
    },
    {
      id: "1",
      label: "Delete notes",
      action: function () {
        changeNoteStatusMulti(db, selectedNotes, "bin");
        closeSelection();
      },
    },
  ];

  const archiveIndexMenu = [
    {
      id: "0",
      label: "Remove from archive",
      action: function () {
        changeNoteStatusMulti(db, selectedNotes, "open");
        closeSelection();
      },
    },
    {
      id: "1",
      label: "Delete notes",
      action: function () {
        changeNoteStatusMulti(db, selectedNotes, "bin");
        closeSelection();
      },
    },
  ];

  const binIndexMenu = [
    {
      id: "0",
      label: "Restore notes",
      action: function () {
        changeNoteStatusMulti(db, selectedNotes, "open");
        closeSelection();
      },
    },
    {
      id: "1",
      label: "Remove permanently",
      action: function () {
        deleteNotePermMulti(db, selectedNotes);
        closeSelection();
      },
    },
  ];

  function closeSelection() {
    setPopupOpen(false);
    setSlideOpen(false);
    stopSelecting();
  }

  function onOptionSelect(value) {
    setPopupOpen(false);
  }
  function onTriggerPress() {
    setPopupOpen(true);
  }
  function onBackdropPress() {
    setPopupOpen(false);
    setSlideOpen(false);
  }

  return (
    <>
      <Menu
        renderer={renderers.SlideInMenu}
        opened={slideOpen}
        // onBackdropPress={() => onBackdropPress()}
      >
        <MenuTrigger>
          <Text>...</Text>
        </MenuTrigger>
        <MenuOptions style={styles.menuStyles}>
          <MenuOption onPress={() => closeSelection()}>
            <Entypo name="cross" size={22} color="black" />
          </MenuOption>
          <Text>{selectedNotes.length}</Text>
          <MenuOption
            onPress={() => {
              () => setPopupOpen(!slideOpen);
            }}
          >
            <Entypo name="dots-three-vertical" size={22} color="black" />
          </MenuOption>
        </MenuOptions>
      </Menu>

      {/* <Menu opened={popupOpen}>
        <MenuOptions>
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
      </Menu> */}
    </>
  );
}

const styles = StyleSheet.create({
  menuStyles: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
});
