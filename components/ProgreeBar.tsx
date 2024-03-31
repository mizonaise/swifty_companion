import React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";

const ProgressBar = ({ progress }: { progress: string }) => {
  const fractionalPart = (number: string) => {
    return String(number).split(".")[1];
  };

  return (
    <View
      style={styles.container}
      lightColor="rgba(0,0,0,0.1)"
      darkColor="rgba(255,255,255,0.4)"
    >
      <View
        style={[
          styles.progressBar,
          { width: `${parseInt(fractionalPart(progress), 10)}%` },
        ]}
      />
      <Text darkColor="white" lightColor="black" style={styles.progressText}>
        {progress}%
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 30,
    borderRadius: 5,
    overflow: "hidden",
    justifyContent: "center",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#02cdd1",
    borderRadius: 5,
  },

  progressText: {
    position: "absolute",
    top: 4,
    bottom: 0,
    left: 0,
    right: 0,
    textAlign: "center",
    lineHeight: 20,
    // color: "black",
    fontWeight: "bold",
  },
});

export default ProgressBar;
