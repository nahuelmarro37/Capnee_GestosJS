import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useCameraContext } from "./CameraContext";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();
  const { isLeftEyeOpen, isRightEyeOpen } = useCameraContext();
  const [isFocused, setIsFocused] = useState(false);
  const [isFocused1, setIsFocused1] = useState(false);
  const touchableRefs = useRef([]);

  useEffect(() => {
    setIsFocused(true);
  }, []);

  useEffect(( ) => {

    console.log("--------------------------------------------------------------------------------------------------------------------------------------------------------");


if(isRightEyeOpen){

    console.log()
    for(let i=0;i<touchableRefs.current.length;i++){

      if(i== touchableRefs.current.length-1){
          if(touchableRefs.current[i][0]==true){
            touchableRefs.current[i][1](false);
            touchableRefs.current[0][1](true);
            break;
          }
      }
      if(touchableRefs.current[i][0]==true){
          touchableRefs.current[i][1](false);
          touchableRefs.current[i+1][1](true);
          break;
      }
    }
  } 

  if(isLeftEyeOpen){
    for(let i=0;i<touchableRefs.current.length;i++){

      if(touchableRefs.current[i][0]==true){
        const onClickFunction = touchableRefs.current[i]?.[2]?._internalFiberInstanceHandleDEV?.pendingProps?.onClick;
        onClickFunction();
      }
    }
  }


  }, [isLeftEyeOpen, isRightEyeOpen]);


  //Probar componente TouchableOpacity
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() =>  setTimeout(() => {
          navigation.navigate("Details");
        }, 500)} // Coloca onPress dentro del componente
        activeOpacity={0.7}
        ref={(ref) => (touchableRefs.current[0] = [isFocused, setIsFocused,ref])}
        style={[styles.touchable, isFocused && styles.focused]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        title="Details"
      >
        <Text>Details</Text>
        <View>{/* Contenido del TouchableOpacity */}</View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => console.log("Prueba")} // Coloca onPress dentro del componente
        activeOpacity={0.7}
        ref={(ref) => (touchableRefs.current[1] = [isFocused1, setIsFocused1,ref])}
        style={[styles.touchable, isFocused1 && styles.focused]}
        onFocus={() => setIsFocused1(true)}
        onBlur={() => setIsFocused1(false)}
        title="Details"
      >
        <Text>Details</Text>
        <View>{/* Contenido del TouchableOpacity */}</View>
      </TouchableOpacity>
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
  touchable: {
    backgroundColor: "green",
    padding: 20,
    borderRadius: 10,
  },
  focused: {
    backgroundColor: "red",
    borderWidth: 2,
  },
});

export default HomeScreen;