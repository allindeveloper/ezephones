import { Grid, makeStyles, useMediaQuery } from "@material-ui/core";
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import appleshowcase from "../../assets/images/appleshowcase.png";
import sadface from '../../assets/images/sadface.svg';
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import CustomLinearProgress from "../../components/CustomLinearProgress";
import ProductItem from "../../components/ProductItem";
import SpaceTop from "../../components/SpaceTop";
import CategoriesSection from "../../components/ui/CategoriesSection";
import Axios from "../../core/axios";
import useCommonStyles from "../../core/commonStyles";
import { constants, formatRequestUrl } from "../../core/utilities";
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
  emptyProducts:{
    margin:'80px 0',
    textAlign:'center'
  }
}));

const Home = () => {
  const commonStyles = useCommonStyles();
  const homeClasses = useStyles();
  const matches = useMediaQuery("(min-width:600px)");

  const [products, setProducts] = useState([]);
  const [rangeValues, setrangeValues] = React.useState([50, 5000]);
  const [isLoading,setloading] = useState(false)
  const [productsSearchData, setproductsSearchData] = useState({
    keywords:''
  })
  const [categories, setcategories] = useState(constants.objCategorues)
  const [limit,setlimit ] = useState(50)
  const [selectedStorage, setselectedStorage] = useState('');
  const [debouncedproductsRangeValues] = useDebounce(rangeValues, 700);
  const [debounceselectedStorageType] = useDebounce(selectedStorage,700);
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = (minPrice=0,maxPrice=2500,limit=50,storageSize,splitted,otheryQuery) => {
      setloading(true)
    try {
      Axios.get(
        formatRequestUrl(minPrice,maxPrice,limit,storageSize,splitted,otheryQuery)
      )
        .then(({ data }) => {
          setloading(false)
          setProducts(data?.data?.data ?? []);
        })
        .catch((error) => {
            setloading(false)
        });
    } catch (error) {
        setloading(false)
    }
  };
  const handleChangeStorageType = (event) => {
    setselectedStorage(event.target.value);
  };

  const handleChangeCategoryType = (event)=>{
    setcategories({ ...categories, [event.target.name]: event.target.checked });
  }
  const handleSearchChange = (evt, name) => {
    setproductsSearchData((prevState) => ({
      ...prevState,
      [name]: evt.target.value,
    }));
  };

  const handleSearchClick = ()=>{
    let valuesString = productsSearchData.keywords
    const splitted = valuesString?.split(',')
    loadProducts(rangeValues?.[0],rangeValues?.[1],limit,selectedStorage,splitted,{})
  }

  const handleRangeChange = (values)=>{
    setrangeValues(values)
  }
  useEffect(()=>{
    if(debouncedproductsRangeValues?.[0]!== 50 || debouncedproductsRangeValues?.[1] !== 5000){
      loadProducts(debouncedproductsRangeValues?.[0],debouncedproductsRangeValues?.[1])
  }
  if(debounceselectedStorageType !== ""){
    loadProducts(rangeValues?.[0],rangeValues?.[1],limit,debounceselectedStorageType)
  }
  },[debouncedproductsRangeValues,debounceselectedStorageType,limit,rangeValues])

  const handleInputChange = (e,name)=>{
    const {value} = e.target
   const oldrangeValues = rangeValues
   if(name === 'minPrice'){
     let newrangeValues = [value,oldrangeValues?.[0]]
     setrangeValues(newrangeValues)
   }
   if(name === 'maxPrice'){
    let newrangeValues = [oldrangeValues?.[0],value]
    setrangeValues(newrangeValues)
  }
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
            <div className={clsx(styles.d_inline_flex,styles.flex_wrap)}>
                <div>
                <CustomInput 
                handleChange={(e) => handleSearchChange(e,'keywords')}
                value={productsSearchData?.keywords}
                id="searchproducts"
                width={matches && '45ch'}
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
              handleRangeChange={handleRangeChange}
              rangeValues={rangeValues}
              handleInputChange={handleInputChange}
              categories={categories}
              handleChangeCategoryType={handleChangeCategoryType}
            />
          </Grid>
         
          <Grid item xs={12} md={9} className={homeClasses.allproducts}>
            <Grid container spacing={3}>
                {isLoading &&
                <Grid item xs={12} >
                    <CustomLinearProgress />
                    </Grid>
                }
                {!isLoading && products.length === 0 &&
                <Grid item xs={12} className={homeClasses.emptyProducts}>
                    <img src={sadface} alt="No Products" width="20%"/>
                    <h5>No Products.</h5>
                    </Grid>
                }
              {products &&!isLoading && products.length>0&&
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
