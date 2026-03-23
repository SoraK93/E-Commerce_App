import { useSelector } from "react-redux";
import { selectProduct } from "./productsSlice";
import { useNavigate } from "react-router";

const AllProducts = () => {
  const navigate = useNavigate();
  const productList = useSelector(selectProduct.list);

  const handleOnClick = (e, id) => {
    e.stopPropagation();
    navigate(`/product/${id}`);
  };

  return (
    <ul>
      {productList.map((product) => (
        <li key={product.id}>
          <div onClick={(e) => handleOnClick(e, product.id)}>
            <p>{product.name}</p>
            <p>{product.description}</p>
            <p>
              {product.in_stock > 10
                ? "In stock"
                : product.in_stock || "Out of Stock"}
            </p>
            <p>
              {Number(product.price).toLocaleString(undefined, {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </p>
            <p>{product.seller.name}</p>
          </div>
        </li>
      ))}
    </ul>
  );
};

export { AllProducts };
