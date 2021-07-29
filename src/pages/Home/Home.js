import { Grid, makeStyles } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import appleshowcase from "../../assets/images/appleshowcase.png";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import ProductItem from "../../components/ProductItem";
import SpaceTop from "../../components/SpaceTop";
import CategoriesSection from "../../components/ui/CategoriesSection";
import Axios from "../../core/axios";
import useCommonStyles from "../../core/commonStyles";
import styles from "./home.module.css";
const useStyles = makeStyles((theme) => ({
  mainHeader: {
    fontSize: "34pt",
  },
  bottomContainer:{
    justifyContent:'space-between'
  },
  leftDiv: {},
  rightDiv: {},
  topContainer: {
    marginTop: "30px",
  },
  allproducts: {
    // marginLeft: "40px",
    [theme.breakpoints.down("lg")]: {
      marginLeft: 0,
    },
  },
}));

const Home = () => {
  const commonStyles = useCommonStyles();
  const homeClasses = useStyles();
  const [products, setProducts] = useState([]);
  const [productsSearchData, setproductsSearchData] = useState({
    keywords:''
  })
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

  const handleSearchChange = (evt, name) => {
    setproductsSearchData((prevState) => ({
      ...prevState,
      [name]: evt.target.value,
    }));
  };

  const handleSearchClick = ()=>{
      alert(productsSearchData.keywords)
  }
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
            <div className={styles.d_inline_flex}>
                <div>
                <CustomInput 
                handleChange={(e) => handleSearchChange(e,'keywords')}
                value={productsSearchData?.keywords}
                id="searchproducts"
                placeholder="Enter Search Term (e.g IPhone x, 128GB or A1)"
                />
                </div>
               <div>
                   <CustomButton 
                   width="200px"
                   onClick={handleSearchClick}
                    style={{padding:'16px',marginLeft:'20px'}}
                    endIcon={<ArrowForwardIcon/>}
                   caption="Search"/>
               </div>
            </div>
          </Grid>
          <Grid item xs={12} md={4}>
            <div>
              <img src={appleshowcase} width="100%" alt="Apple show case" />
            </div>
          </Grid>
        </Grid>
        <SpaceTop length={90}/>
        <Grid container spacing={4} className={homeClasses.bottomContainer}>
          <Grid item xs={12} md={3}>
            <CategoriesSection
              caption="Categories"
              handleChangeStorageType={handleChangeStorageType}
            />
          </Grid>
          <Grid item xs={12} md={9} className={homeClasses.allproducts}>
            <Grid container spacing={3}>
              {products &&
                products?.map((product, i) => (
                  <Grid item xs={12} sm={3} md={3}>
                    <ProductItem key={i+product?._id} product={product} />
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
