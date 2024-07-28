import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

const SessionsScreen = () => {
  const { bookId } = useLocalSearchParams<{ bookId: string }>();

  return (
    <View>
      <Text>SessionsScreen</Text>
    </View>
  );
};

export default SessionsScreen;
