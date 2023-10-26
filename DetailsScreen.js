import React, { useState, useEffect, useRef } from "react";
import { View, Text, Button } from "react-native";
import { useCameraContext } from "./CameraContext";
import { StyleSheet } from "react-native";

function DetailsScreen({ navigation }) {
  const { isLeftEyeOpen } = useCameraContext();
  const buttonRef = useRef(null);

  useEffect(() => {
    if (isLeftEyeOpen) {
      // Si isLeftEyeOpen es true, navega a la pantalla "Home"
      navigation.navigate("Home");
    }
  }, [isLeftEyeOpen]);

  return (
    <View style={styles.container}>
      <Text>2da pantall</Text>
      <Button
        title="Volver al home"
        onPress={() => navigation.navigate("Home")}
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
