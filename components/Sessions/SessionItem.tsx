import dayjs from "dayjs";
import { Pressable } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import { Session } from "types/Session";
import { formatTime } from "utils/utils";

interface Props {
  session: Session;
}

const SessionItem = (props: Props) => {
  const { session } = props;
  const { date, duration, pages } = session;
  return (
    <YStack my="$2" padding="$2" bg="$backgroundHover" br="$4" gap="$2">
      <XStack jc="space-between" ai="center">
        <Text fontSize={12} color="$color10">
          {dayjs(date).format("LL")}
        </Text>
        <Pressable>
          <Text fontSize={10} color="$color10">
            ⦁ ⦁ ⦁
          </Text>
        </Pressable>
      </XStack>
      <XStack jc="space-between" px="$2">
        <Text>{formatTime(duration)}</Text>
        <Text>{pages} pages</Text>
      </XStack>
    </YStack>
  );
};

export default SessionItem;
