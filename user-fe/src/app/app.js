import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { isExpired } from "react-jwt";
import { useState } from "react";

// signin component
import Signin from "./signin/signin.js";
// signup component
import Signup from "./signup/signup.js";
// not found component
import PageNotFound from "./page_not_found/page_not_found.js";
// navbars components
import MainNavbar from "./navbars/main_navbar/main_navbar.js";
import CategoryNavbar from "./navbars/category_navbar/category_navbar.js";
// categories components
import Categories from "./categories/categories.js";
import ViewCategories from "./categories/view_categories/view_categories.js";
import ViewSubcategories from "./categories/view_subcategories/view_subcategories.js";
// products components
import Products from "./product/porducts.js";
import ViewProducts from "./product/view_products/view_products.js";
import ViewProduct from "./product/view_product/view_product.js";
// cart components
import ViewCart from "./view_cart/view_cart.js";
// order components
import ViewOrder from "./view_order/view_order.js";
import ViewOrders from "./view_orders/view_orders.js";

function App() {
  const token = localStorage.getItem("token");

  const [isLoggedIn, setIsLoggedIn] = useState(
    token !== undefined && token !== null && !isExpired(token)
  );

  const routing = (
    <Routes>
      {/*home route*/}
      <Route exact path="/" element={<Navigate to="/products" />} />
      {/*categories and subcategories route*/}
      <Route path="/categories" element={<Categories />}>
        <Route exact path="" element={<ViewCategories />} />
        <Route
          path=":categoryid/subcategories"
          element={<ViewSubcategories />}
        />
      </Route>
      {/*products route*/}
      <Route path="/products" element={<Products />}>
        <Route
          exact
          path=""
          element={<ViewProducts isLoggedIn={isLoggedIn} />}
        />
        <Route
          path=":productid"
          element={<ViewProduct isLoggedIn={isLoggedIn} />}
        />
      </Route>
      <Route
        exact
        path="/cart"
        element={isLoggedIn ? <ViewCart /> : <Navigate to="/signin" />}
      />
      <Route
        exact
        path="/order"
        element={isLoggedIn ? <ViewOrders /> : <Navigate to="/signin" />}
      />
      <Route
        exact
        path="/order/:orderid"
        element={isLoggedIn ? <ViewOrder /> : <Navigate to="/signin" />}
      />
      <Route
        exact
        path="/signin"
        element={
          !isLoggedIn ? (
            <Signin setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        exact
        path="/signup"
        element={
          !isLoggedIn ? (
            <Signup setIsLoggedIn={setIsLoggedIn} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
  return (
    <div className="App">
      <Router>
        <MainNavbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <CategoryNavbar />
        {routing}
      </Router>
    </div>
  );
}

export default App;
