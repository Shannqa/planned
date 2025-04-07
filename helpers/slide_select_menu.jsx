import React, { useContext, useEffect, useState, Component } from "react";
import { Text, View, StyleSheet, FlatList, Animated } from "react-native";
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
   // slide menu off screen
  const [translateY] = useState(new Animated.Value(200)); 

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
    if (slideOpen) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true
      }).start();
    } else {
      Animated.spring(translateY, {
        toValue: 200,
        useNativeDriver: true
      }).start();
    }
  }, [slideOpen, translateY]);
  
  function toggleSlide() {
    setSlideOpen(!slideOpen)
  }

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
  }

  return (
    <Animated.View style={[styles.slideContainer, { transform: [{ translateY }]}]}>
      <View style={styles.slide}>
        <Pressable
          onPress={() => closeSelection()}>
          <Entypo name="cross" size={26} style={styles.icon} color="black" />
        </Pressable>
        
        <Text style={styles.text}>Selected notes: {selectedNotes.length}</Text>
      </View>
    </Animated.View>

  );
}

const styles = StyleSheet.create({
  slide: {
    position: "absolute",
    bottom: 0,
    zIndex: 10,
    display: "flex",
    flexDirection: "row",
    width: "100%",
    flex: 1,
    alignItems: "center",
    padding: 6,
    textAlignVertical: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 18,
  },
  icon: {
    paddingRight: 4,
  },
  menuStyles: {
    display: "flex",
    flexDirection: "row",
    flex: 1,
  },
});
