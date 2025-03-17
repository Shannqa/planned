import { StyleSheet } from "react-native";

export function setStyle(type, styles, colors) {
  return StyleSheet.compose(styles[type], colors[type]);
}

export const lightColors = {
  bg_primary: "#F2F2F2",
  bg_secondary: "#FFFFFF",
  font: "#000000",
};

export const darkColors = {
  bg_primary: "#121212",
  bg_secondary: "#1E1E1E",
  font: "#E0E0E0",
};
