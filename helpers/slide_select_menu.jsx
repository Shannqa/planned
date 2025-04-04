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


export default function SlideSelect(
  screen,
  selecting,
  setSelecting,
  selectedNotes,
  setSelectedNotes,
  stopSelecting
) {
  const { notes, setNotes, changeNoteStatus, deleteNotePerm } =
    useContext(NotesContext);
    const { currentTheme, setCurrentTheme } = useContext(SettingsContext);
  let colors = currentTheme == "dark" ? dark : light;
  const [popupOpen, setPopupOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  
  useEffect(() => {
    if (screen == "openIndex") {
      setMenuData(openIndexMenu);
    } else if (screen == "archiveIndex") {
      setMenuData(archiveIndexMenu);
    } else if (screen == "binIndex") {
      setMenuData(binIndexMenu);
    }
  }, [screen])
  
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
  }

  return(
    <>
    <Menu
      renderer={SlideIn}
      opened={selecting}
    >
      <MenuOptions>
        <MenuOption onPress={() => closeSelection()}>
          <Entypo name="cross" size={22} color="black" />
        </MenuOption>
        <Text>{selectedNotes.length}</Text>
        <MenuOption onPress={() => {
          () => setPopupOpen(!popupOpen)}
        }>
          <Entypo name="dots-three-vertical" size={22} color="black" />
        </MenuOption>
      </MenuOptions>
    </Menu>
    
    <Menu
      opened={popupOpen}
    >
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
    </Menu>
    </>
  )
  
}