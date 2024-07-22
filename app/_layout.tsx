import "../tamagui-web.css";

import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { Providers } from "./Providers";
import { Button } from "tamagui";
import { lightTheme, darkTheme } from "../utils/themes";
import { SquarePen } from "@tamagui/lucide-icons";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <Providers>
      <ThemeProvider value={colorScheme === "light" ? lightTheme : darkTheme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="books/search-book"
            options={{
              title: "Search online",
              presentation: "modal",
              animation: "slide_from_bottom",
            }}
          />
          <Stack.Screen
            name="books/add"
            options={{
              title: "Add a book",
              headerRight(props) {
                return <Button onPress={() => {}}>Add</Button>;
              },
            }}
          />
          <Stack.Screen
            name="books/book-details"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="modal"
            options={{
              title: "Reading",
              presentation: "fullScreenModal",
              animation: "slide_from_bottom",
              headerRight(props) {
                return (
                  <Button
                    onPress={() => {}}
                    icon={<SquarePen size={16} />}
                    backgroundColor="transparent"
                    p="0"
                  >
                    Add note
                  </Button>
                );
              },
            }}
          />
        </Stack>
      </ThemeProvider>
    </Providers>
  );
}
