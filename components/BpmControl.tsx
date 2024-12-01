import { ThemedView } from "./ThemedView";
import { Button, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { useContext } from "react";
import { MetronomeContext } from "@/contexts/MetronomeContext";

export const BpmControl = () => {
  const { bpm, setBpm } = useContext(MetronomeContext);

  const onPressSetBpm = (value: number) => () => {
    setBpm(value);
  };

  return (
    <ThemedView style={styles.bpmContainer}>
      <Button title="Minus" onPress={onPressSetBpm(bpm - 5)} />
      <ThemedText>BPM: {bpm}</ThemedText>
      <Button title="Plus" onPress={onPressSetBpm(bpm + 5)} />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  bpmContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 100,
  },
  divsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },
});
