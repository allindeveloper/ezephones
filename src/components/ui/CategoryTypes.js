import { Checkbox, FormControlLabel, FormGroup, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
      listStyle:'none',
    },
    categorytItem:{
        padding:'8px'
    }
  }));
  
const CategoryTypes = ({ data ,handleChange,categories}) => {
    const categoryTypesClasses  = useStyles()
  return (
    <ul className={categoryTypesClasses.root}>
          <li  className={categoryTypesClasses.categorytItem}>
     <FormGroup>
          
      {data?.map((category, index) => (
        <FormControlLabel
        key={`${category}-${index}`}
        control={<Checkbox  checked={categories?.[category]} onChange={handleChange} name={category} />}
        label={category}
      />
      ))}
      </FormGroup>
      </li>
      
    </ul>
  );
};
export default CategoryTypes;
