import { Text } from "react-native";
import BaseScreen from "@components/BaseScreen";
import { Typography } from "@/src/constants/Typography";

export default function Index() {
  return (
    <BaseScreen>
      <Text style={{ fontFamily: Typography.fonts.bold }}>Hello World!</Text>
    </BaseScreen>
  );
}
