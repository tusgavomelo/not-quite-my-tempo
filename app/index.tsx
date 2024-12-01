import { BpmControl } from "@/components/BpmControl";
import { DivControl } from "@/components/DivControl";
import { SubdivControl } from "@/components/SubdivControl";
import { ThemedView } from "@/components/ThemedView";
import { MetronomeContext } from "@/contexts/MetronomeContext";
import { useContext } from "react";
import { Button, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Metronome = () => {
  const { startInterval, stopInterval, intervalId, reset } =
    useContext(MetronomeContext);

  const onPressReset = () => {
    reset();
  };

  return (
    <SafeAreaView>
      <ThemedView>
        <BpmControl />
        <DivControl />
        <SubdivControl />
        {!intervalId && <Button title="Start" onPress={startInterval} />}
        {intervalId && <Button title="Stop" onPress={stopInterval} />}
        <Button title="Reset" onPress={onPressReset} />
      </ThemedView>
    </SafeAreaView>
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

export default Metronome;
