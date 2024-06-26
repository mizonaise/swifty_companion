import { View } from "react-native";
import { Path, Svg } from "react-native-svg";
import { useThemeColor } from "@/components/Themed";

export default function Logo({
  tintColor,
  darkColor,
  lightColor,
}: {
  tintColor?: string;
  darkColor?: string;
  lightColor?: string;
}) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background"
  );

  return (
    <View style={{ marginRight: 8 }}>
      <Svg
        fill={tintColor ? tintColor : backgroundColor}
        width={28}
        height={28}
        viewBox="0 -200 960 960"
      >
        <Path d="M32 412.6h330.1V578h164.7V279.1H197.3L526.8-51.1H362.1L32 279.1zM597.9 114.2L762.7-51.1H597.9zM762.7 114.2L597.9 279.1v164.8h164.8V279.1L928 114.2V-51.1H762.7z"></Path>
        <Path d="M928 279.1L762.7 443.9H928z"></Path>
      </Svg>
    </View>
  );
}
