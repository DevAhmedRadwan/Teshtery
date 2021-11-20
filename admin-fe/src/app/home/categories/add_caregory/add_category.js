import AddCategoryStyle from "./add_category.module.css";
import useHttp from "../../../../hooks/use_http.js";
import { useState, useEffect } from "react";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [subcategories, setSubcategories] = useState([]);

  const { send, data, isPending, error } = useHttp();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    send({
      url: "http://localhost:3700/category/",
      headers: {
        "Authorization": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      method: "POST",
      body: { name, details, subcategories },
    });
  };

  useEffect(() => {
    if (isPending === false && data !== null && error === null) {
      setName("");
      setDetails("");
      setSubcategory("");
      setSubcategories([]);
    }
  }, [isPending, data, error]);

  return (
    <div className="AddCategory">
      <div className={AddCategoryStyle.container}>
        <form onSubmit={handleSubmit} className={AddCategoryStyle.form}>
          <h3>Add Category</h3>
          <div className="formField">
            <input
              className="formInput"
              onChange={(e)=>setName(e.target.value)}
              value={name}
              required
            ></input>
          </div>
          <div className="formField">
            <textarea
              value={details}
              onChange={(e)=>setDetails(e.target.value)}
              className={`formInput ${AddCategoryStyle.textArea}`}
              required
            ></textarea>
          </div>
          <div
            className={`formField ${AddCategoryStyle.subcategoriesContainer}`}
          >
            {subcategories.map((val) => (
              <div key={val} className={AddCategoryStyle.subcategoryContainer}>
                <label className={AddCategoryStyle.subcategory}>{val}</label>
                <button
                  type="button"
                  className={`btn ${AddCategoryStyle.subcategoryBtn}`}
                  onClick={()=>removeSubCategory(val)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className={`formField ${AddCategoryStyle.addSubcategory}`}>
            <input
              onChange={(e) => {
                setSubcategory(e.target.value);
              }}
              value={subcategory}
              className={`formInput ${AddCategoryStyle.addSubcategoryInput}`}
            ></input>
            <button
              type="button"
              onClick={addSubcategory}
              className={`btn ${AddCategoryStyle.addSubcategoryBtn}`}
            >
              Add
            </button>
          </div>
          <div className="formField">
            <button
              type="submit"
              className={`btn ${AddCategoryStyle.submitBtn}`}
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
