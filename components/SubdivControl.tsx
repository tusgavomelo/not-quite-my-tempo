import { ThemedView } from "./ThemedView";
import { Button, FlatList, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { useContext, useEffect, useState } from "react";
import { MetronomeContext } from "@/contexts/MetronomeContext";
import BlinkingView from "./BlinkingView";

export const SubdivControl = () => {
  const { subdivs, setSubdivs, activeSubdiv } = useContext(MetronomeContext);
  const [subdivsArray, setSubdivsArray] = useState<number[]>([]);

  useEffect(() => {
    setSubdivsArray(Array.from(Array(subdivs).keys()).slice(1));
  }, [subdivs]);

  const onPressSetSubdivision = (value: number) => () => {
    if (value >= 1) {
      setSubdivs(value);
    }
  };

  const renderItem = ({ item }: { item: number }) => {
    return (
      <BlinkingView
        shouldBlink={item === activeSubdiv}
        color={"#00f"}
        style={styles.subdivContainer}
      >
        <ThemedText>{item}</ThemedText>
      </BlinkingView>
    );
  };

  return (
    <ThemedView style={styles.subdivsContainer}>
      <ThemedView style={styles.subdivsControls}>
        <Button
          title="Remove"
          onPress={onPressSetSubdivision(subdivs - 1)}
          disabled={subdivs === 1}
        />
        <ThemedText>subdivs: {subdivs - 1}</ThemedText>
        <Button title="Add" onPress={onPressSetSubdivision(subdivs + 1)} />
      </ThemedView>
      <ThemedView>
        <FlatList
          data={subdivsArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={styles.subdivsFlatList}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  subdivsContainer: {
    justifyContent: "center",
    marginBottom: 50,
  },
  subdivsControls: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  subdivsFlatList: {
    flex: 1,
    justifyContent: "center",
  },
  subdivContainer: {
    marginHorizontal: 10,
  },
  activeSubdiv: {
    backgroundColor: "#00f",
  },
});
