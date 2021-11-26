import ViewCategoryStyle from "./view_categories.module.css";
import { Link } from "react-router-dom";
import TextTruncate from "react-text-truncate";
import useHttp from "../../../hooks/use_http";
import { useEffect } from "react";

const ViewCategories = () => {
  const { send: getCategory, data: categories } = useHttp();

  useEffect(() => {
    getCategory({
      url: `http://localhost:3200/category/`,
      method: "GET",
    });
    // eslint-disable-next-line
  }, []);

  return (
    <div className="ViewCategories">
      <div className={ViewCategoryStyle.categoryList}>
        {categories && categories.map((category) => (
          <Link
            key={category._id}
            to={`/categories/${category._id}/subcategories`}
            className={ViewCategoryStyle.category}
          >
            <h3 className={ViewCategoryStyle.categoryHeader}>
              {category.name.toUpperCase()}
            </h3>
            <TextTruncate
              line={6}
              element="span"
              truncateText="…"
              className={ViewCategoryStyle.categoryBody}
              text={category.details}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ViewCategories;
