import React from "react";
import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';

export default function Hamburger() {
  
  function onPress() {
    // for now, go back home
    // later open the menu
  }
  
  return (
    <Entypo name="menu" size={24} color="black" />
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 20,
  },
});
