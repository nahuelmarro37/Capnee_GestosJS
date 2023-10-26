import React,{useEffect} from "react";
import { View, Text, Button } from "react-native";
import { useCameraContext } from "./CameraContext";
import { StyleSheet } from "react-native";

function HomeScreen({ navigation }) {
  const { isLeftEyeOpen } = useCameraContext();

  useEffect(() => {
    if (isLeftEyeOpen) {
      console.log("Deberia navegar hacia la 2da pantalla");
      // Si isLeftEyeOpen es true, navega a la pantalla "Home"
      navigation.navigate("Details");
    }
  }, [isLeftEyeOpen]);

  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="Avanzar 2da pantalla"
        onPress={() => navigation.navigate("Details")}
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
