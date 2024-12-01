import { useEffect } from "react";
import { StyleProp, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  interpolateColor,
} from "react-native-reanimated";

const BlinkingView: React.FC<{
  children: React.ReactNode;
  shouldBlink: boolean;
  color: string;
  style: StyleProp<ViewStyle>;
}> = ({ shouldBlink, color, children, style }) => {
  const progress = useSharedValue(0);

  useEffect(() => {
    if (shouldBlink) {
      progress.value = withTiming(1, { duration: 0 }, () => {
        progress.value = withTiming(0, { duration: 250 });
      });
    }
  }, [shouldBlink]);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", color]
    );
    return { backgroundColor };
  });

  return (
    <Animated.View style={[animatedStyle, style]}>{children}</Animated.View>
  );
};

export default BlinkingView;
