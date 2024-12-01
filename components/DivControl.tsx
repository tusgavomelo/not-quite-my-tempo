import { ThemedView } from "./ThemedView";
import { Button, StyleProp, StyleSheet, ViewStyle } from "react-native";
import { ThemedText } from "./ThemedText";
import { useContext, useEffect, useState } from "react";
import { MetronomeContext } from "@/contexts/MetronomeContext";
import { FlatList } from "react-native-gesture-handler";
import BlinkingView from "./BlinkingView";

export const DivControl = () => {
  const { divs, setDivs, activeDiv } = useContext(MetronomeContext);
  const [divsArray, setDivsArray] = useState<number[]>([]);

  useEffect(() => {
    setDivsArray(Array.from(Array(divs + 1).keys()).slice(1));
  }, [divs]);

  const onPressSetDivision = (value: number) => () => {
    if (value >= 1) {
      setDivs(value);
    }
  };

  const renderItem = ({ item }: { item: number }) => {
    // return (
    //   <BlinkingView
    //     shouldBlink={item === activeDiv}
    //     color={"#f0f"}
    //     style={styles.divContainer}
    //   >
    //     <ThemedText>{item}</ThemedText>
    //   </BlinkingView>
    // );
    return (
      <ThemedView
        style={[
          styles.divContainer,
          item === activeDiv ? styles.activeDiv : {},
        ]}
      >
        <ThemedText>{item}</ThemedText>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={styles.divsContainer}>
      <ThemedView style={styles.divsControls}>
        <Button
          title="Remove"
          onPress={onPressSetDivision(divs - 1)}
          disabled={divs <= 2}
        />
        <ThemedText>divs: {divs}</ThemedText>
        <Button title="Add" onPress={onPressSetDivision(divs + 1)} />
      </ThemedView>
      <ThemedView>
        <FlatList
          data={divsArray}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          horizontal
          contentContainerStyle={styles.divsFlatList}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  divsContainer: {
    justifyContent: "center",
    marginBottom: 50,
  },
  divsControls: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 10,
  },
  divsFlatList: {
    flex: 1,
    justifyContent: "center",
  },
  divContainer: {
    marginHorizontal: 10,
  },
  activeDiv: {
    backgroundColor: "#f0f",
  },
});
