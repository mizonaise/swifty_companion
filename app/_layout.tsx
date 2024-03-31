import { useEffect } from "react";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack, router } from "expo-router";
import { useFonts } from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import Logo from "@/assets/icons/42";
import { AuthProvider } from "@/context/AuthProvider";
import { useColorScheme } from "@/components/useColorScheme";

import * as SecureStore from "expo-secure-store";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const handleLogout = async () => {
    await SecureStore.deleteItemAsync("user");
    router.replace("/");
  };

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen
            name="search"
            options={{
              headerTitle: (props) => <Logo {...props} />,
              headerRight: () => (
                <TouchableOpacity onPress={() => handleLogout()}>
                  <Ionicons name="search" size={32} color="green" />
                </TouchableOpacity>
              ),
            }}
          />
          <Stack.Screen
            name="details"
            options={{
              headerTitle: (props) => <Logo {...props} />,
              headerRight: () => (
                <TouchableOpacity onPress={() => handleLogout()}>
                  <Ionicons name="search" size={32} color="green" />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack>
      </AuthProvider>
    </ThemeProvider>
  );
}
