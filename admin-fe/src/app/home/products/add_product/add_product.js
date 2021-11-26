import AddProductStyle from "./add_product.module.css";
import useHttp from "../../../../hooks/use_http.js";
import { useState, useEffect } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tag] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(null);

  const { send, data, isPending, error } = useHttp();
  const { send: getTags, data: tagsData } = useHttp();
  const { send: getCategories, data: categoriesData } = useHttp();

  const addTag = (val) => {
    if (tags.filter((v) => v === val).length === 0) {
      let tempTags = tags;
      tempTags.push(val);
      setTags([...tempTags]);
    }
  };

  const removeTag = (val) => {
    setTags(tags.filter((v) => v !== val));
  };

  const getTagName = (val) => {
    return tagsData.filter((v) => v._id === val)[0].name;
  };

  const addCategory = (val) => {
    setCategory(val);
    setSelectedCategory(categoriesData.filter((v) => v._id === val)[0]);
  };

  useEffect(() => {
    getCategories({
      url: `http://localhost:3000/category/?page=0`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    getTags({
      url: `http://localhost:3000/tag/?page=0`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    // eslint-disable-next-line
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    send({
      url: "http://localhost:3000/product/",
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "POST",
      body: { name, description, price, tags, category, subcategory },
    });
  };

  useEffect(() => {
    if (isPending === false && data !== null && error === null) {
      setName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setSelectedCategory(null);
      setSubcategory("");
      setTags([]);
    }
  }, [isPending, data, error]);

  return (
    <div className="AddProduct">
      <div className={AddProductStyle.container}>
        <form onSubmit={handleSubmit} className={AddProductStyle.form}>
          <h3>Add Product</h3>
          <div className="formField">
            <input
              type="text"
              className="formInput"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            ></input>
          </div>
          <div className="formField">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`formInput ${AddProductStyle.textArea}`}
              required
            ></textarea>
          </div>
          <div className="formField">
            <input
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              type="number"
              className="formInput"
              required
            ></input>
          </div>
          {categoriesData && (
            <div className="formField">
              <select
                className="formInput dropdown"
                value={category}
                onChange={(e) => addCategory(e.target.value)}
                required
              >
                <option value="">---</option>
                {categoriesData.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          {selectedCategory && (
            <div className="formField">
              <select
                className="formInput dropdown"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option value="">---</option>
                {selectedCategory.subcategories.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="formField">
            {tags &&
              tags.map((val) => (
                <div key={val} className={AddProductStyle.tagsContainer}>
                  <label className={AddProductStyle.tags}>
                    {getTagName(val)}
                  </label>
                  <button
                    type="button"
                    className={`btn ${AddProductStyle.tagsBtn}`}
                    onClick={() => removeTag(val)}
                  >
                    Remove
                  </button>
                </div>
              ))}
          </div>
          {tagsData && (
            <div className="formField">
              <select
                className="formInput dropdown"
                value={tag}
                onChange={(e) => addTag(e.target.value)}
              >
                <option value="">---</option>
                {tagsData.map((tag) => (
                  <option key={tag._id} value={tag._id}>
                    {tag.name}
                  </option>
                ))}
              </select>
            </div>
          )}
          <div className="formField">
            <button
              type="submit"
              className={`btn ${AddProductStyle.submitBtn}`}
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
