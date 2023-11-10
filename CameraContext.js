import React, { createContext, useContext, useState } from "react";

const CameraContext = createContext();

export function CameraProvider({ children }) {
  const [isCameraActive, setIsCameraActive] = useState(true); // La cámara está siempre activa
  const [isLeftEyeOpen, setIsLeftEyeOpen] = useState(false); // Estado del ojo izquierdo
  const [isRightEyeOpen, setIsRightEyeOpen] = useState(false); // Estado del ojo izquierdo
 
  return (
    <CameraContext.Provider
      value={{
        isCameraActive,
        setIsCameraActive,
        isRightEyeOpen,
        setIsRightEyeOpen,
        isLeftEyeOpen,
        setIsLeftEyeOpen,
        
      }}
    >
      {children}
    </CameraContext.Provider>
  );
}

export function useCameraContext() {
  const context = useContext(CameraContext);
  if (!context) {
    throw new Error(
      "useCameraContext debe ser utilizado dentro de un CameraProvider"
    );
  }
  return context;
}
