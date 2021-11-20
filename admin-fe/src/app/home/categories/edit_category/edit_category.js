import EditCategoryStyle from "./edit_category.module.css";
import useHttp from "../../../../hooks/use_http.js";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditCategory = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const {
    send,
    data,
    isPending,
    error,
    abortController: abortData,
  } = useHttp();
  const {
    send: getCategory,
    data: categoryData,
    abortController: abortCategoryData,
  } = useHttp();

  const addSubcategory = () => {
    if (subcategories.filter((v) => v === subcategory).length === 0) {
      let tempSubcategories = subcategories;
      tempSubcategories.push(subcategory);
      setSubcategories(tempSubcategories);
    }
    setSubcategory("");
  };

  const removeSubCategory = (subcategory) => {
    setSubcategories(subcategories.filter((v) => v !== subcategory));
  };

  useEffect(() => {
    getCategory({
      url: `http://localhost:3700/category/?_id=${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (categoryData != null && categoryData.docs.length>0) {
      setName(categoryData.docs[0].name);
      setDetails(categoryData.docs[0].details);
      setSubcategories(categoryData.docs[0].subcategories);
    } else if(categoryData != null) {
      abortData.abort();
      abortCategoryData.abort();
      navigate("/pageNotFound/");
    }
  }, [categoryData,abortData,abortCategoryData,navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    send({
      url: `http://localhost:3700/category/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: { name, details, subcategories },
    });
  };

  useEffect(() => {
    if (isPending === false && data !== null && error === null) {
      setName("");
      setDetails("");
      setSubcategory("");
      setSubcategories([]);
      navigate("/categories/");
    }
  }, [isPending, data, error, navigate]);

  return (
    <div className="AddCategory">
      <div className={EditCategoryStyle.container}>
        <form onSubmit={handleSubmit} className={EditCategoryStyle.form}>
          <h3>Edit Category</h3>
          <div className="formField">
            <input
              className="formInput"
              onChange={(e) => setName(e.target.value)}
              value={name}
            ></input>
          </div>
          <div className="formField">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className={`formInput ${EditCategoryStyle.textArea}`}
            ></textarea>
          </div>
          <div
            className={`formField ${EditCategoryStyle.subcategoriesContainer}`}
          >
            {subcategories.map((val) => (
              <div key={val} className={EditCategoryStyle.subcategoryContainer}>
                <label className={EditCategoryStyle.subcategory}>{val}</label>
                <button
                  type="button"
                  className={`btn ${EditCategoryStyle.subcategoryBtn}`}
                  onClick={() => removeSubCategory(val)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className={`formField ${EditCategoryStyle.addSubcategory}`}>
            <input
              onChange={(e) => {
                setSubcategory(e.target.value);
              }}
              value={subcategory}
              className={`formInput ${EditCategoryStyle.addSubcategoryInput}`}
            ></input>
            <button
              type="button"
              onClick={addSubcategory}
              className={`btn ${EditCategoryStyle.addSubcategoryBtn}`}
            >
              Add
            </button>
          </div>
          <div className="formField">
            <button
              type="submit"
              className={`btn ${EditCategoryStyle.submitBtn}`}
            >
              Edit Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
