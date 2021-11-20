import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useHttp from "../../hooks/use_http.js";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import viewOrdersStyle from "./view_orders.module.css";

const ViewOrders = () => {
  const { send: getOrders, data: orders } = useHttp();

  const [pageSize] = useState(5);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getOrders({
      url: `http://localhost:3700/order/?page=${page}&pagesize=${pageSize}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    // eslint-disable-next-line
  }, [page,pageSize]);

  return (
    <div className="ViewOrders">
      <div className={viewOrdersStyle.container}>
        {orders &&
          orders.docs &&
          orders.docs.map((order) => (
            <Link to={`/order/${order._id}`} key={order._id} className={viewOrdersStyle.order}>
              <span
                className={viewOrdersStyle.id}
              >{`Order ID: ${order._id}`}</span>
              <span
                className={viewOrdersStyle.total}
              >{`${order.total} EGP`}</span>
            </Link>
          ))}
      </div>
      <div className={viewOrdersStyle.pagechangerContainer}>
        {orders?.hasPrevPage && (
          <button
            onClick={() => {
              setPage(orders.page - 1);
            }}
            className={viewOrdersStyle.pagechanger}
          >
            <AiFillLeftCircle></AiFillLeftCircle>
          </button>
        )}
        <span className={viewOrdersStyle.pagenumber}>{orders?.page}</span>
        {orders?.hasNextPage && (
          <button
            onClick={() => {
              setPage(orders.page + 1);
            }}
            className={viewOrdersStyle.pagechanger}
          >
            <AiFillRightCircle></AiFillRightCircle>
          </button>
        )}
      </div>
    </div>
  );
};

export default ViewOrders;
