import { StyleSheet } from "react-native";

export function setStyle(type, styles, colors) {
  // Check how many types are provided. If only one, it can be added as a string, if more than one, it's an array of strings.
  if (typeof type == "string") {
    return StyleSheet.compose(styles[type], colors[type]);
  } else if (Array.isArray(type)) {
    if (type.length == 1) {
      return StyleSheet.compose(styles[type], colors[type]);
    } else if (type.length > 1) {
      // More than one type.
      let styleArray = [];
      for (let i = 0; i < type.length; i++) {
        styleArray.push(styles[type[i]]);
        styleArray.push(colors[type[i]]);
      }
      return Stylesheet.compose(...styleArray);
    } else {
      return "";
    }
  } else {
    return "";
  }
}

export const lightColors = {
  primary: "#F2F2F2", // bg, front, lighter
  secondary: "#FFFFFF", // bg, back, darker
  font: "#000000",
};

export const darkColors = {
  primary: "#121212", // bg, front, lighter
  secondary: "#1E1E1E", // bg, back, darker
  font: "#E0E0E0",
};
