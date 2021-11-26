import { useEffect, useState } from "react";
import useHttp from "../../hooks/use_http.js";
import viewCartStyle from "./view_cart.module.css";
import { useNavigate } from "react-router-dom";

const ViewCart = () => {
  const { send: getProducts, data: products, setData: setProducts } = useHttp();
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")));

  const { send, data, isPending } = useHttp();

  const navigate = useNavigate();

  useEffect(() => {
    if(cart){
      let url = "http://localhost:3200/product/?";
      let ids = Object.keys(cart);
      ids.forEach((id, index) => {
        url += `ids=${id}`;
        if (index < ids.length - 1) url += "&";
      });
  
      if (ids.length !== 0) {
        getProducts({
          url: url,
          method: "GET",
        });
      }
    }
    // eslint-disable-next-line
  }, [cart]);

  const changeCart = (value, id) => {
    if (value < 1) value = 1;
    let tempCart = JSON.parse(JSON.stringify(cart));
    tempCart[id] = value;
    setCart(tempCart);
    localStorage.setItem("cart", JSON.stringify(tempCart));
  };

  const removeFromCart = (id) => {
    let tempProducts = products;
    tempProducts.docs = tempProducts.docs.filter((val) => val._id !== id);
    setProducts(tempProducts);
    let tempCart = JSON.parse(JSON.stringify(cart));
    delete tempCart[id];
    setCart(tempCart);
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const total = () => {
    let sum = 0;
    if(products){
      products.docs.forEach(product=>{
        sum+= product.price * cart[product._id];
      });
    }
    return sum;
  };

  const placeOrder = (e) => {
    e.preventDefault();
    let products = [];
    Object.keys(cart).forEach(key=>{
      products.push({
        productId: key,
        quantity: cart[key]
      })
    })
    send({
      url: "http://localhost:3200/order/",
      headers: {
        "Authorization": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      method: "POST",
      body: { products },
    });
  };

  useEffect(() => {
    if(data){
      localStorage.removeItem("cart");
      navigate("/order/"+data.orderId);
    }
  },[data,navigate]);

  return (
    <div className="ViewCart">
      <div className={viewCartStyle.caontainer}>
        {products &&
          products.docs &&
          products.docs.map((product) => (
            <div key={product._id} className={viewCartStyle.product}>
              <div className={viewCartStyle.firstRow}>
                <span className={viewCartStyle.name}>{product.name}</span>
                <span className={viewCartStyle.total}>{`${
                  product.price * cart[product._id]
                } EGP`}</span>
              </div>
              <div className={viewCartStyle.secRow}>
                <button
                  onClick={() => removeFromCart(product._id)}
                  className={`btn ${viewCartStyle.remove}`}
                >
                  Remove
                </button>
                <input
                  className={`formInput ${viewCartStyle.count}`}
                  value={cart[product._id]}
                  onChange={(e) => changeCart(e.target.value, product._id)}
                  type="number"
                  min="1"
                ></input>
              </div>
            </div>
          ))}
        <div className={viewCartStyle.addContainer}>
          <span className={`${viewCartStyle.totalSum}`}>{total()+" EGP"}</span>
          <div className={viewCartStyle.line}></div>
          <button onClick={placeOrder} className={`btn ${viewCartStyle.add}`}>
            {isPending?"Placeing Order...":"Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewCart;
