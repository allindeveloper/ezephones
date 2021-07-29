import { Button } from "@material-ui/core";
import React from "react";
import { constants } from "../core/utilities";

const CustomButton = ({
  caption = "Buy",
  textColor = constants.colors.white,
  backgroundColor = constants.colors.buttonBg,
  width='50%',
  height,
  style,
  startIcon,
  endIcon,
  onClick
}) => {
  return (
    <Button
      variant="contained"
      startIcon={startIcon}
      endIcon={endIcon}
      onClick={onClick}
      style={{
        backgroundColor: backgroundColor,
        color: textColor,
        width: width,
        height:height,
        ...{...style}
      }}
    >
      {caption}
    </Button>
  );
};
export default CustomButton;
