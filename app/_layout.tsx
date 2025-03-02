import { useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useColorScheme, StatusBar, Text } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { lightTheme, darkTheme } from "../theme/theme";
import { ThemeContext } from "../utils/themeContext";
import { AuthProvider } from "../utils/authContext";

// Prevent auto-hiding of splash screen
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme);
  const isDark = theme === "dark";

  // Load fonts
  const [fontsLoaded] = useFonts({
    "SpaceMono": require("../assets/fonts/SpaceMono-Regular.ttf"),
    "SFPro": require("../assets/fonts/SF-Pro-Display-Regular.otf"),
  });

  // Hide splash screen only when fonts are loaded
  if (!fontsLoaded) return null;

  SplashScreen.hideAsync();

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider value={isDark ? darkTheme : lightTheme}>
        <StatusBar
          barStyle={isDark ? "light-content" : "dark-content"}
          backgroundColor={isDark ? "#121212" : "#FFFFFF"}
        />
        <AuthProvider>
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
        </AuthProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}