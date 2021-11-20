import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { isExpired } from "react-jwt";
import { useState } from "react";

import Home from "../app/home/home.js";
import Signin from "./signin/signin.js";

import AddAdmin from "../app/home/add_admin/add_admin.js";

import Categories from "../app/home/categories/categories.js";
import AddCategory from "../app/home/categories/add_caregory/add_category.js";
import EditCategory from "../app/home/categories/edit_category/edit_category.js";
import ViewCategories from "../app/home/categories/view_categories/view_categories.js";

import Products from "../app/home/products/products.js";
import AddProduct from "../app/home/products/add_product/add_product.js";
import EditProduct from "../app/home/products/edit_product/edit_product.js";
import ViewProducts from "../app/home/products/view_products/view_products.js";

import Tags from "../app/home/tags/tags.js";
import AddTag from "../app/home/tags/add_tag/add_tag.js";
import EditTag from "../app/home/tags/edit_tag/edit_tag.js";
import ViewTags from "../app/home/tags/view_tags/view_tags.js";

import ViewUsers from "../app/home/view_users/view_users.js";

import PageNotFound from "../app/page_not_found/page_not_found.js";

function App() {
  const token = localStorage.getItem("token");

  const [isLoggedIn, setisLoggedIn] = useState(
    token !== undefined && token !== null && !isExpired(token)
  );

  const routing = (
    <Routes>
      <Route
        exact
        path="/"
        element={
          isLoggedIn ? (
            <Home setisLoggedIn={setisLoggedIn} />
          ) : (
            <Navigate to="/signin" />
          )
        }
      >
        <Route path="admin" element={<AddAdmin />} />
        <Route path="categories" element={<Categories />}>
          <Route path="" element={<ViewCategories />} />
          <Route path="add" element={<AddCategory />} />
          <Route path="edit/:id" element={<EditCategory />} />
        </Route>
        <Route path="products" element={<Products />}>
          <Route path="" element={<ViewProducts />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
        <Route path="tags" element={<Tags />}>
          <Route path="" element={<ViewTags />} />
          <Route path="add" element={<AddTag />} />
          <Route path="edit/:id" element={<EditTag />} />
        </Route>
        <Route path="users" element={<ViewUsers />} />
        <Route path="" element={<Navigate to="/admin" />} />
      </Route>
      <Route
        path="signin"
        element={
          !isLoggedIn ? (
            <Signin setisLoggedIn={setisLoggedIn} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="pageNotFound" element={<PageNotFound />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );

  return (
    <div className="App">
      <Router>{routing}</Router>
    </div>
  );
}

export default App;
