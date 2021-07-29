import { makeStyles } from "@material-ui/core";
import dummyphone from "../assets/images/dummyphone.png";
import useCommonStyles from "../core/commonStyles";
import { constants } from "../core/utilities";
import CustomButton from "./CustomButton";
import SpaceTop from "./SpaceTop";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: constants.colors.categoriesBg,
    color: constants.colors.white,
    height: "530px",
    marginBottom: "30px",
    position:'relative'
  },
  innerText: {
    alignContent: "left",
    textAlign: "left",
    padding: "25px",
    position: 'relative',
  },
  price: {
    fontSize: "24px",
  },
  actionButton: {
    textAlign: "center",
    position: 'absolute',
    bottom: '0px',
    marginBottom:'20px',
    left: '35%'
  },
  grade: {
    border: `2px solid ${constants.colors.white}`,
    height: "100%",
    padding: "2px",
    margin: "12px 13px",
  },
}));

const ProductItem = ({ product }) => {
  const productItemClasses = useStyles();
  const commonStyles = useCommonStyles();
  return (
    <div className={productItemClasses?.root}>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div>
          <SpaceTop length={22} />
          <img
            width="100%"
            src={
              product?.imgUrl === ""
                ? dummyphone
                : product?.imgUrl ?? dummyphone
            }
            alt={product?.name}
          />
          <div className={productItemClasses?.innerText}>
            <div>
              <label>{product?.name}</label>
            </div>
            <div>
              <label>
                {product.lowestAsk && product?.lowestAsk?.carrier}{" "}
                {product.lowestAsk && "|"} {product?.lowestAsk?.storageSize}
              </label>
            </div>
            <SpaceTop length={12} />
            {product?.lowestAsk && (
              <>
                <div>Unit price</div>
                <div className={productItemClasses?.price}>
                  <b>${product?.lowestAsk?.price}</b>
                </div>
              </>
            )}
            <SpaceTop length={30} />
            {/* {!product.lowestAsk && <SpaceTop length={60} />} */}
            
          </div>
        </div>
        {product?.lowestAsk && (
          <div className={productItemClasses.grade}>
            {product?.lowestAsk?.grade}
          </div>
        )}
      </div>
      <div className={productItemClasses.actionButton}>
              <CustomButton caption="Buy"
              style={{
                width:'100px'
              }}
              />
            </div>
    </div>
  );
};
export default ProductItem;
