import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./HomeScreen";
import DetailsScreen from "./DetailsScreen";
import { CameraProvider } from "./CameraContext";
import CameraBackground from "./CameraBackground";
const Stack = createStackNavigator();

function App() {
  return (
    <CameraProvider>
      <CameraBackground />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </CameraProvider>
  );
}

export default App;
