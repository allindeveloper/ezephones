import React from "react";
import Tilt from "react-tilt";

const CustomTilt = ({ children }) => {
  return (
    <Tilt className="Tilt" options={{ max: 20 }}>
      {children}
    </Tilt>
  );
};
export default CustomTilt;
