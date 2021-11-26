import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useHttp from "../../hooks/use_http.js";
import viewOrderStyle from "./view_order.module.css";

const ViewOrder = () => {
  let { orderid } = useParams();

  const { send: getOrder, data: order } = useHttp();

  useEffect(() => {
    getOrder({
      url: `http://localhost:3200/order/?_id${orderid}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    // eslint-disable-next-line
  }, [orderid]);
  // this component not finished
  return (
    <div className="ViewOrder">
      {order && order.docs && order.docs.length === 1 && (
        <div className={viewOrderStyle.caontainer}>
          {order.docs[0].products.map((product) => (
            <div key={product.productId._id} className={viewOrderStyle.product}>
              <div className={viewOrderStyle.firstRow}>
                <span className={viewOrderStyle.name}>
                  {product.productId.name}
                </span>
                <span
                  className={viewOrderStyle.total}
                >{`${product.total} EGP`}</span>
              </div>
              <div className={viewOrderStyle.secRow}>
                <button
                  className={`btn ${viewOrderStyle.remove}`}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className={viewOrderStyle.addContainer}>
            <span className={`${viewOrderStyle.totalSum}`}>
              {order.docs[0].total + " EGP"}
            </span>
            <div className={viewOrderStyle.line}></div>
            <button
              className={`btn ${viewOrderStyle.add}`}
            >
              Update Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewOrder;
