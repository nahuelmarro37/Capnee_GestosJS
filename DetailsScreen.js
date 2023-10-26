import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import { useCameraContext } from "./CameraContext";
import { StyleSheet } from "react-native";

function DetailsScreen({ navigation }) {
  const { isLeftEyeOpen } = useCameraContext();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isLeftEyeOpen) {
      buttonRef.current && buttonRef.current.click();
    }
  }, [isLeftEyeOpen]);

  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate("Home")}
        ref={buttonRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default DetailsScreen;
