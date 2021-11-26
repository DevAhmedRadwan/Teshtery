import ViewSubcategoryStyle from "./view_subcategories.module.css";
import { Link, useParams } from "react-router-dom";
import useHttp from "../../../hooks/use_http";
import { useEffect } from "react";

const ViewSubcategories = () => {
  const { categoryid } = useParams();
  const { send: getCategory, data: category } = useHttp();

  useEffect(() => {
    getCategory({
      url: `http://localhost:3200/category/?_id=${categoryid}`,
      method: "GET",
    });
    // eslint-disable-next-line
  }, [categoryid]);

  return (
    category && (
      <div className="ViewSubcategories">
        <h3 className={ViewSubcategoryStyle.header}>
          {category[0].name.toUpperCase()}
        </h3>
        <div className={ViewSubcategoryStyle.subcategoryList}>
          {category[0].subcategories.map((subcategory) => (
            <Link
              to={`/products?categories=${category[0]._id}&subcategories=${subcategory}`}
              key={subcategory}
              className={ViewSubcategoryStyle.subcategory}
            >
              <h3>{subcategory.toUpperCase()}</h3>
            </Link>
          ))}
        </div>
      </div>
    )
  );
};

export default ViewSubcategories;
