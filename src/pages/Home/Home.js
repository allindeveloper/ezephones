import { Grid, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import appleshowcase from "../../assets/images/appleshowcase.png";
import ProductItem from "../../components/ProductItem";
import CategoriesSection from "../../components/ui/CategoriesSection";
import Axios from "../../core/axios";
import useCommonStyles from "../../core/commonStyles";
import styles from "./home.module.css";
const useStyles = makeStyles((theme) => ({
  mainHeader: {
    fontSize: "34pt",
  },
  leftDiv: {},
  rightDiv: {},
  topContainer: {
    marginTop: "30px",
  },
  allproducts:{
      marginLeft:'40px'
  }
}));

const Home = () => {
  const commonStyles = useCommonStyles();
  const homeClasses = useStyles();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = () => {
    try {
      Axios.get(
        `sell-request/in-stock?sort=new&limit=50&page=1&minPrice=0&maxPrice=2500&storageSizeString=&conditionString=&category=Smartphones&brand=Apple,Samsung,Google,Huawei,LG,Motorola,OnePlus`
      )
        .then(({ data }) => {
          console.log("data of all products", data?.data?.data);
          setProducts(data?.data?.data ?? []);
        })
        .catch((error) => {});
    } catch (error) {}
  };
  const handleChangeStorageType = () => {};
  return (
    <div className={styles?.root}>
      <div>
        <Grid container spacing={4} className={homeClasses.topContainer}>
          <Grid item xs={12} md={7}>
            <div className={homeClasses.leftDiv}>
              <h1
                className={clsx(commonStyles.textWhite, homeClasses.mainHeader)}
              >
                SHOP OUR LATEST <br />
                AVAILABLE STOCK HERE
              </h1>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div>
              <img src={appleshowcase} width="100%" alt="Apple show case" />
            </div>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={12} md={3}>
            <CategoriesSection
              caption="Categories"
              handleChangeStorageType={handleChangeStorageType}
            />
          </Grid>
          <Grid item xs={12} md={7} className={homeClasses.allproducts}>
            <Grid container spacing={3}>
              {products &&
                products?.map((product, i) => (
                  <Grid item xs={6} sm={3}>
                    <ProductItem key={i} product={product} />
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Home;
