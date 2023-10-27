import React from "react";
import { useMediaQuery } from 'react-responsive'
import { Spin } from "antd";

const Spinner = () => {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Spin
      size="large"
      style={{
        margin: 40,
        position: "absolute",
        top: isMobile ? "-25px" : "90px",
        left: isMobile ? "40%" : "48%",
        transform: "translate(-50%, 0)",
      }}
    />
  )
};
export default Spinner;
