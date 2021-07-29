import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import useCommonStyles from "../../core/commonStyles";
import { constants } from "../../core/utilities";
import CustomInput from "../CustomInput";
import DualSlider from "../DualSlider";
import SpaceTop from "../SpaceTop";
import CategoryTypes from "./CategoryTypes";
import StorageTypes from "./StorageTypes";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: constants.colors.categoriesBg,
    minHeight: "750px",
    padding: "1rem",
    top: "25px",
    position: "sticky",
  },
  alignCenter:{
      margin:'auto',
      textAlign:'center'
  }
}));

const CategoriesSection = ({
  handleChangeStorageType,
  caption,
  rangeValues,
  handleRangeChange,
}) => {
  const commonStyles = useCommonStyles();
  const categoriesSectionClasses = useStyles();
  return (
    <div
      className={clsx(categoriesSectionClasses.root,commonStyles.textWhite)}
    >
      <h4>{caption || "Categories"}</h4>
      <CategoryTypes data={constants.categories} />
      <h4>{"Price Filter"}</h4>
      <SpaceTop length={50} />
      {/* <CustomRangeSlider
        value={rangeValues}
        handleChange={handleRangeChange}
        rangeStep={10}
        minRange={0}
        maxRange={5000}
      /> */}
      <DualSlider 
      rangeStep={10}
      minRange={0}
      maxRange={5000}
      />
      <SpaceTop length={30} />
      <div className={categoriesSectionClasses.alignCenter}>
      <CustomInput
        //  handleChange={(e) => handleSearchChange(e,'keywords')}
        // value={productsSearchData?.keywords}
        width="35ch"
        id="searchproducts"
        placeholder="Min"
      />
      <SpaceTop length={20} />
      <CustomInput
        //  handleChange={(e) => handleSearchChange(e,'keywords')}
        // value={productsSearchData?.keywords}
        width="35ch"
        id="searchproducts"
        placeholder="Max"
      />
      </div>
      <h4>Storage</h4>
      <StorageTypes
        handleChange={handleChangeStorageType}
        data={constants.storageTypes}
      />
    </div>
  );
};

export default CategoriesSection;
