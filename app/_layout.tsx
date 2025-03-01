import { useEffect, useState } from "react";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useColorScheme, StatusBar } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { lightTheme, darkTheme } from "../theme/theme";
import { ThemeContext } from "../utils/themeContext";

// Prevent the splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState(systemColorScheme);
  const isDark = theme === "dark";

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        await Font.loadAsync({
          "SpaceMono-Regular": require("../assets/fonts/SpaceMono-Regular.ttf"),
        });
      } catch (e) {
        console.warn("Error loading fonts", e);
      } finally {
        setTimeout(() => {
          setIsReady(true);
          SplashScreen.hideAsync();
        }, 500); 
      }
    }
    loadResources();
  }, []);

  if (!isReady) return null;

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider value={isDark ? darkTheme : lightTheme}>
        <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />
        <Stack>
          {/* The (tabs) folder is automatically treated as a nested navigator */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
