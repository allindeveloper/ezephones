import { TextField, withStyles } from "@material-ui/core";
import React from "react";
import { constants } from "../core/utilities";

const CustomTextField = withStyles({
    root: {
        color:constants.colors.white,
      '& label.Mui-focused': {
        borderColor: '#2D7EE5',
      },
      '& .MuiInput-underline:after': {
        // borderBottomColor: 'green',
      },
      '& .MuiOutlinedInput-root': {
        color:constants.colors.white,
        
        '& fieldset': {
          borderColor: constants.colors.white,
        color:constants.colors.white,
        },
        '&:hover fieldset': {
          borderColor: '#2D7EE5',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#2D7EE5',
        },
      },
    },
  })(TextField);
const CustomInput = ({
  id,
  label,
  variant = "outlined",
  value,
  handleChange,
  inputProps,
  placeholder,
  width,
  className
}) => {
  return (
      <CustomTextField
        id={id}
        value={value}
        label={label}
        onChange={handleChange}
        variant={variant}
        style={{
          width:width
        }}
        className={className}
        placeholder={placeholder}
        {...inputProps}
      />
  );
};
export default CustomInput;
