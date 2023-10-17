import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

export default function App() {
  const [hasPermission, setHasPermission] = React.useState(false);
  const [faceData, setFaceData] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === false) {
    return <Text>Acceso a la camara denegado</Text>;
  }

  function getFaceDataView() {
    if (faceData.length === 0) {
      return (
      <View style={styles.faces}>
          <Text style={styles.facesDesc}> Rostro no detectado </Text>
      </View>
      );
    } else {
      return faceData.map((face) => {
        const ojosAbiertos = face.rightEyeOpenProbability< 0.4 && face.leftEyeOpenProbability < 0.4;
        const parpadeo = !ojosAbiertos && (face.rightEyeOpenProbability < 0.4 || face.leftEyeOpenProbability < 0.4);
        const sonrisa = face.smilingProbability > 0.7;
        return (
          <View style={styles.faces}>
            <Text style={styles.faceDesc}> OJOS ABIERTOS: {ojosAbiertos.toString()}</Text>
            <Text style={styles.faceDesc}> PARPADEO: {parpadeo.toString()}</Text>
            <Text style={styles.faceDesc}> SONRISA: {sonrisa.toString()}</Text>
          </View>
        )
      });
    }
  }

  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
    console.log(faces);
  };

  return (
    <Camera
      type={Camera.Constants.Type.front}
      style={styles.camera}
      onFacesDetected={handleFacesDetected}
      faceDetectorSettings={{
        mode: FaceDetector.FaceDetectorMode.fast,
        detectLandmarks: FaceDetector.FaceDetectorLandmarks.none,
        runClassifications: FaceDetector.FaceDetectorClassifications.all,
        minDetectionInterval: 100,
        tracking: true
      }}
    >
      {getFaceDataView()}
    </Camera>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  faces: {
    backgroundColor: '#ffffff',
    alingSelf: 'strech',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16

  },
  facesDesc:{
    fontSize: 20

  }
});
