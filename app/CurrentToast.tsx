import { CheckCircle2, XCircle } from "@tamagui/lucide-icons";
import { Toast, useToastState } from "@tamagui/toast";
import { XStack, YStack, isWeb, useTheme } from "tamagui";

export function CurrentToast() {
  const currentToast = useToastState();
  const theme = useTheme();

  if (!currentToast || currentToast.isHandledNatively) return null;

  const { customData } = currentToast;
  const { type } = customData ?? {};

  const getBgColor = () => {
    if (type === "success") return theme.green9Dark;
    if (type === "error") return theme.red10Dark;
    return;
  };

  const getIcon = () => {
    if (type === "success") return <CheckCircle2 />;
    if (type === "error") return <XCircle />;
    return;
  };

  return (
    <Toast
      key={currentToast.id}
      duration={currentToast.duration ?? 3000}
      viewportName={currentToast.viewportName}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={isWeb ? "$12" : 0}
      br="$6"
      animation="quicker"
      backgroundColor={getBgColor()}
    >
      <YStack ai="center" p="$2" gap="$2">
        <XStack ai="center" gap="$2">
          <Toast.Title fow="bold">{currentToast.title}</Toast.Title>
          {getIcon()}
        </XStack>

        {!!currentToast.message && (
          <Toast.Description>{currentToast.message}</Toast.Description>
        )}
      </YStack>
    </Toast>
  );
}
