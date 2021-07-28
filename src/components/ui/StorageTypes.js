import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import React from "react";
import { constants } from "../../core/utilities";

const GreenCheckbox = withStyles({
  //   root: {
  //     color: green[400],
  //     '&$checked': {
  //       color: green[600],
  //     },
  //   },
  root: {
    color: constants.colors.white,
    "&$checked": {
      color: constants.colors.white,
    },
  },
  checked: {
    //   backgroundColor:'blue'
  },
})((props) => <Checkbox color="default" {...props} />);
const useStyles = makeStyles((theme) => ({
  root: {
    listStyle: "none",
  },
}));
const StorageTypes = ({ data, handleChange }) => {
  const storageTypesClasses = useStyles();

  return (
    <ul className={storageTypesClasses.root}>
      <li>
        <RadioGroup
          aria-label={"storage-types"}
          name="storage-types"
          onChange={handleChange}
        >
          {data?.map((value, index) => (
            <FormControlLabel
              value={value}
              key={index}
              control={<Radio />}
              label={value}
            />
          ))}
        </RadioGroup>
      </li>
    </ul>
  );
};
export default StorageTypes;
