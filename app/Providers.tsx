import { useColorScheme } from "react-native";
import {
  PortalProvider,
  TamaguiProvider,
  type TamaguiProviderProps,
} from "tamagui";
import { ToastProvider, ToastViewport } from "@tamagui/toast";
import { CurrentToast } from "./CurrentToast";
import { config } from "../tamagui.config";
import { QueryClient, QueryClientProvider } from "react-query";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { db } from "db/db";
// @ts-ignore - For some reason TS doesn't recognize the migrations file
import migrations from "../drizzle/migrations";
import StopwatchService from "components/StopwatchService";
import ModalsAndSheets from "./ModalsAndSheets";

export function Providers({
  children,
  ...rest
}: Omit<TamaguiProviderProps, "config">) {
  const colorScheme = useColorScheme();
  const queryClient = new QueryClient();
  const { error } = useMigrations(db, migrations);
  if (error) {
    console.log("Migrations error", error);
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider
        config={config}
        defaultTheme={colorScheme === "dark" ? "dark" : "light"}
        {...rest}
      >
        <PortalProvider shouldAddRootHost>
          <ToastProvider
            swipeDirection="horizontal"
            duration={6000}
            native={
              [
                /* uncomment the next line to do native toasts on mobile. NOTE: it'll require you making a dev build and won't work with Expo Go */
                // 'mobile'
              ]
            }
          >
            {children}
            <ModalsAndSheets />
            <StopwatchService />
            <CurrentToast />
            <ToastViewport top="$8" left={0} right={0} />
          </ToastProvider>
        </PortalProvider>
      </TamaguiProvider>
    </QueryClientProvider>
  );
}
