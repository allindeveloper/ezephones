import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { constants } from "../../core/utilities";

const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: "none",
  },
}));
const StorageTypes = ({ data,value, handleChange }) => {
  const storageTypesClasses = useStyles();

  return (
    <ul className={storageTypesClasses.root}>
      <li>
        <RadioGroup
          aria-label={"storage-types"}
          name="storage-types"
          onChange={handleChange}
          value={value}
        >
          {data?.map((value, index) => (
            <FormControlLabel
              value={value}
              key={index}
              control={<Radio size={'medium'} style={{color:constants.colors.white}}/>}
              label={value}
            />
          ))}
        </RadioGroup>
      </li>
    </ul>
  );
};
export default StorageTypes;
