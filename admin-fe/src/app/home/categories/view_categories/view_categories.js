import ViewCategoriesStyle from "./view_categories.module.css";
import { Link, useNavigate } from "react-router-dom";
import { CgPlayListAdd } from "react-icons/cg";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import useHttp from "../../../../hooks/use_http.js";
import { useState, useEffect } from "react";

const ViewCategories = () => {
  const [pageSize] = useState(9);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { send: getCategory, data } = useHttp();
  const {
    send: deleteCategory,
    isPending: deleting,
    data: deletedCategory,
  } = useHttp();

  useEffect(() => {
    getCategory({
      url: `http://localhost:3700/category/?page=${page}&pagesize=${pageSize}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    // eslint-disable-next-line
  }, [page, pageSize, deletedCategory]);

  const removeCategory = (id) => {
    deleteCategory({
      url: `http://localhost:3700/category/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  };

  return (
    <div className="ViewCategories">
      <div className={ViewCategoriesStyle.container}>
        {data &&
          data.docs.map((category) => (
            <div key={category.name} className={ViewCategoriesStyle.category}>
              <span className={ViewCategoriesStyle.categoryName}>
                {category.name.charAt(0).toUpperCase() + category.name.slice(1)}
              </span>
              <div>
                <button
                  onClick={() => navigate(`/categories/edit/${category._id}`)}
                  className={ViewCategoriesStyle.edit}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => removeCategory(category._id)}
                  className={ViewCategoriesStyle.delete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        <div className={ViewCategoriesStyle.pagechangerContainer}>
          {data?.hasPrevPage && (
            <button
              onClick={() => {
                setPage(data.page - 1);
              }}
              className={ViewCategoriesStyle.pagechanger}
            >
              <AiFillLeftCircle></AiFillLeftCircle>
            </button>
          )}
          <span className={ViewCategoriesStyle.pagenumber}>{data?.page}</span>
          {data?.hasNextPage && (
            <button
              onClick={() => {
                setPage(data.page + 1);
              }}
              className={ViewCategoriesStyle.pagechanger}
            >
              <AiFillRightCircle></AiFillRightCircle>
            </button>
          )}
        </div>
      </div>
      <Link to="/categories/add" className={ViewCategoriesStyle.addCategory}>
        <CgPlayListAdd
          style={{
            color: "var(--font-color-light)",
          }}
          size="35"
          className={ViewCategoriesStyle.addCategoryIcon}
        />
      </Link>
    </div>
  );
};

export default ViewCategories;
