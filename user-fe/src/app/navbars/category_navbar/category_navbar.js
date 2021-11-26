import { useState } from "react";
import { Link } from "react-router-dom";
import CategoryNavbarStyle from "./category_navbar.module.css";
import { AiFillCaretDown } from "react-icons/ai";
import useHttp from "../../../hooks/use_http";
import { useEffect } from "react";

const CategoryNavbar = () => {
  const { send: getCategory, data: categories } = useHttp();

  // max number of categoris shown in the category bar
  const MAX_CATEGORIES_IN_BAR = 8;

  // submenu visabilty status
  const [isSubMenuShown, setSubMenuIsShown] = useState(true);
  // selected category data
  const [selectedCategory, setSelectedCategory] = useState(null);

  // on selecting category
  // change the status of the sub categories menu to show it
  // and collect the data of the selected category
  const onSelectCategory = (selectedCategory) => {
    setSubMenuIsShown(true);
    setSelectedCategory(selectedCategory);
  };

  useEffect(() => {
    getCategory({
      url: `http://localhost:3200/category/`,
      method: "GET",
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (categories != null) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, setSelectedCategory]);

  return (
    <div className="CategoryNavbar">
      {/*main bar*/}
      <div className={CategoryNavbarStyle.categorybar}>
        {/* all category list */}
        <div className={CategoryNavbarStyle.allCategoryContainer}>
          {/* all category button to show the list */}
          <Link className={CategoryNavbarStyle.allCategory} to="/categories">
            <span className={CategoryNavbarStyle.allCategoryText}>
              ALL CATEGORIES
            </span>
            <AiFillCaretDown className={CategoryNavbarStyle.allCategoryIcon} />
          </Link>
          {/* the main all categories and it's sub categories menu */}
          <div className={CategoryNavbarStyle.allCategoryMenu}>
            {/* show all the categories */}
            {categories &&
              categories.map((category) => {
                // change the className if it 's selected or not
                let className = CategoryNavbarStyle.allCategoryMenuSelectedItem;
                if (
                  selectedCategory != null &&
                  selectedCategory.name !== category.name
                ) {
                  className = CategoryNavbarStyle.allCategoryMenuItem;
                }
                return (
                  <Link
                    key={category.name}
                    onMouseEnter={() => onSelectCategory(category)}
                    className={className}
                    to={`/categories/${category._id}/subcategories`}
                  >
                    {
                      // show the category with the first letter upper case
                      // and every other letter is lower case
                      <span>
                        {category.name.slice(0, 1).toUpperCase() +
                          category.name.slice(1).toLowerCase()}
                      </span>
                    }
                  </Link>
                );
              })}
            {/* sub categories menu */}
            {selectedCategory && isSubMenuShown && (
              <div className={CategoryNavbarStyle.allCategorySubMenu}>
                <div className={CategoryNavbarStyle.allCategorySubMenuData}>
                  {/* show the name of the selected category */}
                  <Link
                    to={`/categories/${selectedCategory._id}/subcategories`}
                    className={CategoryNavbarStyle.allCategorySubMenuTitle}
                  >
                    <span>
                      {selectedCategory.name.slice(0, 1).toUpperCase() +
                        selectedCategory.name.slice(1).toLowerCase()}
                    </span>
                  </Link>
                  <div className={CategoryNavbarStyle.hLine}></div>
                  <div className={CategoryNavbarStyle.selectCategoryDetails}>
                    {
                      // show the sub category with the first letter upper case
                      // and every other letter is lower case
                      selectedCategory &&
                        selectedCategory.subcategories.map((subcategory) => (
                          <Link
                            key={subcategory}
                            to={`/products?categories=${selectedCategory._id}&subcategories=${subcategory.name}`}
                          >
                            <span className={CategoryNavbarStyle.subcategory}>
                              {subcategory.slice(0, 1).toUpperCase() +
                                subcategory.slice(1).toLowerCase()}
                            </span>
                          </Link>
                        ))
                    }
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {/* categories on the bar */}
        {
          //slice the categories list to only show the first MAX_CATEGORIES_IN_BAR categories
          categories &&
            categories.slice(0, MAX_CATEGORIES_IN_BAR).map((category) => (
              //show the category name all uppercase
              <Link
                key={category.name}
                to={`/categories/${category._id}/subcategories`}
              >
                <span className={CategoryNavbarStyle.category}>
                  {category.name.toUpperCase()}
                </span>
              </Link>
            ))
        }
      </div>
    </div>
  );
};

export default CategoryNavbar;
