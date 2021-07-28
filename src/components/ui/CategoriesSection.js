import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import useCommonStyles from "../../core/commonStyles";
import { constants } from "../../core/utilities";
import CategoryTypes from "./CategoryTypes";
import StorageTypes from "./StorageTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: constants.colors.categoriesBg,
    height: "600px",
    width: "25%",
    padding: "1rem",
  },
}));

const CategoriesSection = ({ handleChangeStorageType, caption }) => {
  const commonStyles = useCommonStyles();
  const categoriesSectionClasses = useStyles();
  return (
    <div
      className={clsx(categoriesSectionClasses.root, commonStyles.textWhite)}
    >
      <h4>{caption || "Categories"}</h4>
      <CategoryTypes 
      data={constants.categories}
      />

      <h4>Storage</h4>
      <StorageTypes
        handleChange={handleChangeStorageType}
        data={constants.storageTypes}
      />
    </div>
  );
};

export default CategoriesSection;
