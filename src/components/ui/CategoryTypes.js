import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    root: {
      listStyle:'none',
    },
    categorytItem:{
        padding:'8px'
    }
  }));
  
const CategoryTypes = ({ data }) => {
    const categoryTypesClasses  = useStyles()
  return (
    <ul className={categoryTypesClasses.root}>
      {data?.map((category, index) => (
        <li key={index} className={categoryTypesClasses.categorytItem}>{category}</li>
      ))}
    </ul>
  );
};
export default CategoryTypes;
