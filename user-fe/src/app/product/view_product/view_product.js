import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../../hooks/use_http.js";
import viewProductStyle from "./view_product.module.css";

const ViewProduct = () => {
  let { productid } = useParams();
  const { send: getProducts, data: product } = useHttp();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProducts({
      url: `http://localhost:3200/product/?_id=${productid}&pop=true`,
      method: "GET",
    });
    // eslint-disable-next-line
  }, [productid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let cartData = JSON.parse(localStorage.getItem("cart"));
    if(cartData !== null){
      cartData[productid] = quantity;
      localStorage.setItem("cart", JSON.stringify(cartData));
    }else{
      cartData = {}
      cartData[productid] = quantity;
      localStorage.setItem("cart", JSON.stringify(cartData));
    }
  };

  return (
    <div className="ViewProducts">
      {product && (
        <div className={viewProductStyle.container} key={product.docs[0]._id}>
          <span className={viewProductStyle.name}>{product.docs[0].name}</span>
          <div className={viewProductStyle.type}>
            <span className={viewProductStyle.category}>
              {product.docs[0].category.name}
            </span>
            <span> {">"} </span>
            <span className={viewProductStyle.subcategory}>
              {product.docs[0].subcategory}
            </span>
          </div>
          <div className={viewProductStyle.details}>
            <span className={viewProductStyle.imagePLaceHolder}>T</span>
            <div className={viewProductStyle.data}>
              <span className={viewProductStyle.description}>
                {product.docs[0].description}
              </span>
              <span className={viewProductStyle.price}>
                {product.docs[0].price + " EGP"}
              </span>
              <div className={viewProductStyle.tagContainer}>
                {product.docs[0].tags &&
                  product.docs[0].tags.map((tag) => (
                    <span key={tag._id} className={viewProductStyle.tag}>
                      {tag.name}
                    </span>
                  ))}
              </div>
              <form onSubmit={handleSubmit}>
                <div
                  className={`formField ${viewProductStyle.addToCartContainer}`}
                >
                  <input
                    className={`formInput ${viewProductStyle.addToCartInput}`}
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    min="1"
                    required
                    type="number"
                  ></input>
                  <button
                    type="submit"
                    className={`btn ${viewProductStyle.addToCartButton}`}
                  >
                    Add To Cart
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProduct;
