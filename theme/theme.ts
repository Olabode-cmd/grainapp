import { DefaultTheme, DarkTheme } from "@react-navigation/native";

export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    backgroundFaint: "#F5F5F5",
    text: "#000000",
    textGrey: "#666666",
    textInverse: "#FFFFFF",
    border: "#DDDDDD",
    primary: "#1DB954",
    primaryLight: "#4DE47F",
    primaryDark: "#12803D",
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: "#121212",
    backgroundFaint: "#1E1E1E",
    text: "#FFFFFF",
    textGrey: "#B3B3B3",
    textInverse: "#000000",
    border: "#333333",
    primary: "#1DB954",
    primaryLight: "#4DE47F",
    primaryDark: "#12803D",
  },
};
