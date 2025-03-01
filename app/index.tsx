import { useContext } from "react";
import { Text, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import { ThemeContext } from "../utils/themeContext";
import { Stack } from "expo-router";

export default function Index() {
  const { colors } = useTheme(); // Get theme colors
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.background,
      }}
    >
      {/* <Stack options={{ headerShown: false }} /> */}

      <Text style={{ color: colors.primary }}>
        Edit app/index.tsx to edit this screen.
      </Text>

      <Text
        style={{
          marginTop: 20,
          color: colors.primary,
          fontWeight: "bold",
          textDecorationLine: "underline",
        }}
        onPress={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        Toggle Theme
      </Text>
    </View>
  );
}
