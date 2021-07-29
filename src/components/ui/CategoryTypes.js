import { Checkbox, FormControlLabel, FormGroup, makeStyles } from "@material-ui/core";
import React from "react";
import { constants } from "../../core/utilities";

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
    <div className={categoryTypesClasses.root}>
          <div  className={categoryTypesClasses.categorytItem}>
     <FormGroup>
          
      {data?.map((category, index) => (
        <FormControlLabel
        key={`${category}-${index}`}
        control={<Checkbox  
        style ={{
          color: constants.colors.white
        }}
        checked={categories?.[category]} onChange={handleChange} name={category} />}
        label={category}
      />
      ))}
      </FormGroup>
      </div>
      
    </div>
  );
};
export default CategoryTypes;
