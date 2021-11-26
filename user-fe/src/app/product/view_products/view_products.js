import { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import viewProductsStyle from "./view_products.module.css";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
//import queryString from 'query-string';
import useHttp from "../../../hooks/use_http.js";

const ViewProducts = () => {
  const { search } = useLocation();
  const { send: getProducts, data: products } = useHttp();

  const [pageSize] = useState(20);
  const [page, setPage] = useState(1);

  useEffect(() => {
    //const query = queryString.parse(search);

    getProducts({
      url: `http://localhost:3200/product/?page=${page}&pagesize=${pageSize}`,
      method: "GET",
    });
    // eslint-disable-next-line
  }, [search,page,pageSize]);

  return (
    <div className="ViewProducts">
      <div className={viewProductsStyle.container}>
        {products?.docs &&
          products.docs.map((product) => (
            <Link key={product._id} to={`/products/${product._id}`} className={viewProductsStyle.product}>
              <span className={viewProductsStyle.imagePLaceHolder}>T</span>
              <span className={viewProductsStyle.name}>{product.name}</span>
              <span className={viewProductsStyle.price}>
                {product.price + " EGP"}
              </span>
            </Link>
          ))}
      </div>
      <div className={viewProductsStyle.pagechangerContainer}>
          {products?.hasPrevPage && (
            <button
              onClick={() => {
                setPage(products.page - 1);
              }}
              className={viewProductsStyle.pagechanger}
            >
              <AiFillLeftCircle></AiFillLeftCircle>
            </button>
          )}
          <span className={viewProductsStyle.pagenumber}>{products?.page}</span>
          {products?.hasNextPage && (
            <button
              onClick={() => {
                setPage(products.page + 1);
              }}
              className={viewProductsStyle.pagechanger}
            >
              <AiFillRightCircle></AiFillRightCircle>
            </button>
          )}
        </div>
    </div>
  );
};

export default ViewProducts;
