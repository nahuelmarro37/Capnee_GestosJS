import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import { useCameraContext } from "./CameraContext";

export default function CameraBackground() {

  const [hasPermission, setHasPermission] = useState(false);
  const [faceData, setFaceData] = useState([]);
  const { setIsLeftEyeOpen } = useCameraContext();
  const { setIsRightEyeOpen } = useCameraContext(); // cambio

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (faceData.length > 0) {
      const firstFace = faceData[0];
      const ojoDerechoAbierto =
        firstFace.leftEyeOpenProbability > 0.9 &&
        firstFace.rightEyeOpenProbability < 0.1;
      const ojoIzquierdoAbierto =
        firstFace.rightEyeOpenProbability > 0.9 &&
        firstFace.leftEyeOpenProbability < 0.1;
      const sonrisa = firstFace.smilingProbability > 0.7;
      setIsLeftEyeOpen(ojoIzquierdoAbierto);
      setIsRightEyeOpen(ojoDerechoAbierto);
      
    } else {
      setIsLeftEyeOpen(false);
      setIsRightEyeOpen(false);
    }
  }, [faceData]);

  if (hasPermission === false) {
    return <Text>Acceso a la camara denegado</Text>;
  }

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
  };

  return (
    <Camera
      type={Camera.Constants.Type.front}
      onFacesDetected={handleFacesDetected}
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionInterval: 100,
        tracking: true,
      }}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: 1,
        height: 1,
        zIndex: -1,
      }}
    />
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    zIndex: -1, // Coloca la cámara detrás del contenido
  },
});
