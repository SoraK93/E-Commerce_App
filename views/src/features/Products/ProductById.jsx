import { useDispatch, useSelector } from "react-redux";
import { selectProduct } from "./productsSlice";
import { addToUserCart } from "../cart/api/cartAPI";

export const ProductById = () => {
  const dispatch = useDispatch();
  const product = useSelector(selectProduct.list)[0];
  
  if (!product) return null;

  const handleButtonClick = async (e) => {
    try {
      const cartData = {
        productId: product.id,
        quantity: 1,
      };

      await dispatch(addToUserCart(cartData));
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div>
      <h1>{product.product_name}</h1>
      <p>{product.description}</p>
      <p>{product.price}</p>
      <p>{product.seller_name}</p>
      <p>
        {product.in_stock > 10
          ? "In stock"
          : product.in_stock || "Out of Stock"}
      </p>
      <button onClick={handleButtonClick} disabled={!product.in_stock}>
        Add to cart
      </button>
    </div>
  );
};
