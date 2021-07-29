import { makeStyles } from "@material-ui/core";
import dummyphone from '../assets/images/dummyphone.png';
import useCommonStyles from "../core/commonStyles";
import { constants } from "../core/utilities";
const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: constants.colors.categoriesBg,
    color: constants.colors.white,
    height:'450px'
  },
  innerText: {
    alignContent: "left",
    textAlign: "left",
    padding:'25px'
  },
  price:{
      fontSize:'24px'
  }
}));

const ProductItem = ({ product }) => {
  const productItemClasses = useStyles();
  const commonStyles = useCommonStyles();
  return (
    <div className={productItemClasses?.root}>
      <img width="100%" src={product?.imgUrl ?? dummyphone} alt={product?.name} />
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

        {product?.lowestAsk && (
          <>
            <div>Unit price</div>
            <div className={productItemClasses?.price}><b>${product?.lowestAsk?.price}</b></div>
          </>
        )}
      </div>

      <div></div>
    </div>
  );
};
export default ProductItem;
