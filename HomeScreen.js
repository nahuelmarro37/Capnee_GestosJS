import React from "react";
import { View, Text, Button } from "react-native";
import { useCameraContext } from "./CameraContext";
import { StyleSheet } from "react-native";

function HomeScreen({ navigation }) {
  const { isLeftEyeOpen } = useCameraContext();

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          if (isLeftEyeOpen) {
            // Si isLeftEyeOpen es true, navega a la pantalla "Details"
            navigation.navigate("Details");
          }
        }}
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

export default HomeScreen;
