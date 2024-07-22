import { Tabs } from "expo-router";
import { Button } from "tamagui";
import {
  Home,
  LibraryBig,
  PieChart,
  Plus,
  Settings,
} from "@tamagui/lucide-icons";
import useModalsStore from "stores/modals.store";

export default function TabLayout() {
  const setIsModalOpen = useModalsStore((state) => state.setIsAddBookModalOpen);

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Home color={color} />,
          headerRight: () => (
            <Button
              icon={<Plus size={24} />}
              mr="$2"
              chromeless
              onPress={() => setIsModalOpen(true)}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: "Library",
          tabBarIcon: ({ color }) => <LibraryBig color={color} />,
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => <PieChart color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color }) => <Settings color={color} />,
        }}
      />
    </Tabs>
  );
}
