import ViewProductsStyle from "./view_products.module.css";
import { Link, useNavigate } from "react-router-dom";
import { CgPlayListAdd } from "react-icons/cg";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import useHttp from "../../../../hooks/use_http.js";
import { useState, useEffect } from "react";

const ViewProducts = () => {
  const [pageSize] = useState(9);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { send: getProduct, data } = useHttp();
  const {
    send: deleteProduct,
    isPending: deleting,
    data: deletedProduct,
  } = useHttp();

  useEffect(() => {
    getProduct({
      url: `http://localhost:3700/product/?page=${page}&pagesize=${pageSize}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    // eslint-disable-next-line
  }, [page, pageSize, deletedProduct]);

  const removeProduct = (id) => {
    deleteProduct({
      url: `http://localhost:3700/product/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  };

  return (
    <div className="ViewProducts">
      <div className={ViewProductsStyle.container}>
        {data &&
          data.docs.map((product) => (
            <div key={product.name} className={ViewProductsStyle.product}>
              <span className={ViewProductsStyle.productName}>
                {product.name}
              </span>
              <div>
                <button
                  onClick={() => navigate(`/products/edit/${product._id}`)}
                  className={ViewProductsStyle.edit}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => removeProduct(product._id)}
                  className={ViewProductsStyle.delete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        <div className={ViewProductsStyle.pagechangerContainer}>
          {data?.hasPrevPage && (
            <button
              onClick={() => {
                setPage(data.page - 1);
              }}
              className={ViewProductsStyle.pagechanger}
            >
              <AiFillLeftCircle></AiFillLeftCircle>
            </button>
          )}
          <span className={ViewProductsStyle.pagenumber}>{data?.page}</span>
          {data?.hasNextPage && (
            <button
              onClick={() => {
                setPage(data.page + 1);
              }}
              className={ViewProductsStyle.pagechanger}
            >
              <AiFillRightCircle></AiFillRightCircle>
            </button>
          )}
        </div>
      </div>
      <Link to="/products/add" className={ViewProductsStyle.addProduct}>
        <CgPlayListAdd
          style={{
            color: "var(--font-color-light)",
          }}
          size="35"
          className={ViewProductsStyle.addProductIcon}
        />
      </Link>
    </div>
  );
}
 
export default ViewProducts;