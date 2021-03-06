import { Grid, Hidden, makeStyles, useMediaQuery } from "@material-ui/core";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import InfiniteScroller from "react-infinite-scroller";
import { useDebounce } from "use-debounce";
import appleshowcase from "../../assets/images/appleshowcase.png";
import sadface from "../../assets/images/sadface.svg";
import CustomButton from "../../components/CustomButton";
import CustomCircularProgress from "../../components/CustomCircularProgress";
import CustomInput from "../../components/CustomInput";
import CustomLinearProgress from '../../components/CustomLinearProgress';
import CustomTilt from "../../components/CustomTilt";
import ProductItem from "../../components/ProductItem";
import SpaceTop from "../../components/SpaceTop";
import CategoriesSection from "../../components/ui/CategoriesSection";
import Axios from "../../core/axios";
import useCommonStyles from "../../core/commonStyles";
import {
  constants,
  extractValue,
  filterObj,
  formatRequestUrl
} from "../../core/utilities";
import styles from "./home.module.css";



const useStyles = makeStyles((theme) => ({
  mainHeader: {
    fontSize: "34pt",
  },
  bottomContainer: {
    justifyContent: "space-between",
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
  emptyProducts: {
    margin: "80px 0",
    textAlign: "center",
  },
}));

const Home = () => {
  const commonStyles = useCommonStyles();
  const homeClasses = useStyles();
  const matches = useMediaQuery("(min-width:600px)");
  const matchesMobile = useMediaQuery("(max-width:479px)");

  const [mount, setMount] = useState(false);

  const [products, setProducts] = useState([]);
  const [rangeValues, setrangeValues] = React.useState([50, 5000]);
  const [isLoading, setloading] = useState(false);
  const [productsSearchData, setproductsSearchData] = useState({
    keywords: "",
    categories: "",
  });
  const [categories, setcategories] = useState(constants.objCategories);
  const [limit, setlimit] = useState(20);
  const [selectedStorage, setselectedStorage] = useState("");
  const [debouncedproductsRangeValues] = useDebounce(rangeValues, 700);
  const [debounceselectedStorageType] = useDebounce(selectedStorage, 700);
  const [hasNextPage, sethasNextPage] = useState(false);
  const [debouncedCategoryChecks] = useDebounce(
    productsSearchData.categories,
    700
  );
  const [scrolled,setscrolled] = useState(false)
  useEffect(() => {
    if (!mount) {
      setMount(true);
      loadProducts();
    }
  }, []);

  const loadProducts = (
    minPrice = 0,
    maxPrice = 2500,
    limit=20,
    storageSize,
    brands = "Apple",
    splitted,
    otheryQuery
  ) => {
    setloading(true);
    try {
      Axios.get(
        formatRequestUrl(
          minPrice,
          maxPrice,
          limit,
          storageSize,
          brands,
          splitted,
          otheryQuery
        )
      )
        .then(({ data }) => {
          setloading(false);
          if (data.data?.data.length > 0) {
            sethasNextPage(true);
            if(scrolled === true){
            setProducts(products.concat(data?.data?.data ?? []));
            }else{
              setProducts(data?.data?.data ?? []);
            }
          } else {
            setProducts([]);
            sethasNextPage(false)
          }
        })
        .catch((error) => {
          setloading(false);
        });
    } catch (error) {
      setloading(false);
    }
  };
  const handleChangeStorageType = (event) => {
    setselectedStorage(event.target.value);
  };

  const handleChangeCategoryType = (event) => {
    let extracted = "";
    let filtered = {};
    let updatedCategories = {};
    if (event.target.name.toLowerCase() === "all") {
      if (event.target.checked === true) {
        updatedCategories = Object.fromEntries(
          Object.keys(constants.objCategories).map((key) => [key, true])
        );
      } else {
        updatedCategories = Object.fromEntries(
          Object.keys(constants.objCategories).map((key) => [key, false])
        );
      }
      filtered = filterObj(updatedCategories, (category) => category === true);
      extracted = extractValue(filtered);
      setcategories({
        ...updatedCategories,
        [event.target.name]: event.target.checked,
      });
    } else {
      const newCategories = {
        ...categories,
        [event.target.name]: event.target.checked,
      };
      filtered = filterObj(newCategories, (category) => category === true);
      extracted = extractValue(filtered);

      setcategories({
        ...categories,
        [event.target.name]: event.target.checked,
      });
    }
    setproductsSearchData((prevState) => ({
      ...prevState,
      categories: extracted,
    }));
  };
  const handleSearchChange = (evt, name) => {
    setproductsSearchData((prevState) => ({
      ...prevState,
      [name]: evt.target.value,
    }));
  };

  const handleSearchClick = () => {
    let valuesString = productsSearchData.keywords;
    if(valuesString){
    const splitted = valuesString?.split(",");
    loadProducts(
      rangeValues?.[0],
      rangeValues?.[1],
      limit,
      selectedStorage,
      productsSearchData.categories,
      splitted,
      {}
    );
    }
  };

  const handleRangeChange = (values) => {
    setrangeValues(values);
  };
  useEffect(() => {
    if (
      debouncedproductsRangeValues?.[0] !== 50 ||
      debouncedproductsRangeValues?.[1] !== 5000
    ) {
      loadProducts(
        debouncedproductsRangeValues?.[0],
        debouncedproductsRangeValues?.[1]
      );
    }
  }, [debouncedproductsRangeValues]);

  useEffect(() => {
    if (debounceselectedStorageType !== "") {
      loadProducts(
        rangeValues?.[0],
        rangeValues?.[1],
        limit,
        debounceselectedStorageType
      );
    }
  }, [debounceselectedStorageType]);

  useEffect(() => {
    if (debouncedCategoryChecks !== "") {
      const brands = debouncedCategoryChecks.split(",");
      loadProducts(
        rangeValues?.[0],
        rangeValues?.[1],
        limit,
        selectedStorage,
        brands
      );
    }
  }, [debouncedCategoryChecks]);
  
  const handleInputChange = (e, name) => {
    const { value } = e.target;
    const oldrangeValues = rangeValues;
    if (name === "minPrice") {
      let newrangeValues = [value, oldrangeValues?.[0]];
      setrangeValues(newrangeValues);
    }
    if (name === "maxPrice") {
      let newrangeValues = [oldrangeValues?.[0], value];
      setrangeValues(newrangeValues);
    }
  };

  function handleLoadMore() {
    setloading(true);
    setscrolled(true)
    setlimit(limit + 20);
    loadProducts(
      rangeValues?.[0],
      rangeValues?.[1],
      limit + 20,
      selectedStorage
    );
    
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
            <div className={clsx((styles.d_inline_flex), styles.flex_wrap,styles.mobile_search)}>
              <div>
                <CustomInput
                  handleChange={(e) => handleSearchChange(e, "keywords")}
                  value={productsSearchData?.keywords}
                  id="searchproducts"
                  width={matches && "45ch"}
                  inputProps={{
                    fullWidth:true
                  }}
                  placeholder="Enter Search Term (e.g IPhone x, 128GB or A1)"
                />
              </div>
              {matchesMobile &&<SpaceTop length={20}/>}
              <div>
                <CustomButton
                  width={matches&&"200px"}
                  onClick={handleSearchClick}
                  style={{ padding: "16px", marginLeft: matches &&"20px" }}
                  endIcon={<ArrowForwardIcon />}
                  caption="Search"
                />
              </div>
            </div>
          </Grid>
          <Hidden xsDown>
          <Grid item xs={12} md={4}>
            <CustomTilt>
            <div>
              <img src={appleshowcase} width="100%" alt="Apple show case" />
            </div>
            </CustomTilt>
          </Grid>
          </Hidden>
        </Grid>
        <SpaceTop length={90} />
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
            {isLoading && !scrolled &&<CustomLinearProgress />}
            <InfiniteScroller
              initialLoad={false}
              threshold={400}
              loader={
                isLoading && (
                  <Grid item xs={12} className={styles.align_center}>
                    <div>
                      <CustomCircularProgress />
                    </div>
                  </Grid>
                )
              }
              className="infinite-scroll"
              hasMore={hasNextPage && !isLoading}
              loadMore={handleLoadMore}
            >
              <Grid container spacing={3}>
                {!isLoading && products.length === 0 && (
                  <Grid item xs={12} className={homeClasses.emptyProducts}>
                    <img src={sadface} alt="No Products" width="20%" />
                    <h5>No Products.</h5>
                  </Grid>
                )}
                {products &&
                  products.length > 0 &&
                  products?.map((product, i) => (
                    <Grid item xs={12} sm={3} md={3} key={i}>
                        <ProductItem  product={product} />
                    </Grid>
                  ))}
              </Grid>
              {isLoading && scrolled && (
                <Grid item xs={12} className={styles.align_center}>
                  <div>
                    <CustomCircularProgress />
                  </div>
                </Grid>
              )}
            </InfiniteScroller>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default Home;
