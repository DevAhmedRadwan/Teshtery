import EditProductStyle from "./edit_product.module.css";
import useHttp from "../../../../hooks/use_http.js";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditProduct = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [tags, setTags] = useState([]);
  const [tag] = useState("");
  const [init, setInit] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState(null);

  const {
    send,
    data,
    isPending,
    error,
    abortController: abortData,
  } = useHttp();
  const {
    send: getTags,
    data: tagsData,
    abortController: abortTagsData,
  } = useHttp();
  const {
    send: getCategories,
    data: categoriesData,
    abortController: abortCategoriesData,
  } = useHttp();
  const {
    send: getProduct,
    data: productData,
    abortController: abortProductData,
  } = useHttp();

  const addCategory = (val) => {
    setCategory(val);
    setSelectedCategory(categoriesData.filter((v) => v._id === val)[0]);
  };

  useEffect(() => {
    getProduct({
      url: `http://localhost:3000/product/?_id=${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (productData != null && categoriesData != null && init === false) {
      setName(productData.docs[0].name);
      setDescription(productData.docs[0].description);
      setCategory(productData.docs[0].category);
      setSubcategory(productData.docs[0].subcategory);
      setPrice(productData.docs[0].price);
      setTags(productData.docs[0].tags);
      setInit(true);
      addCategory(productData.docs[0].category);
    } else if (productData != null && productData.docs.length === 0) {
      abortData.abort();
      abortTagsData.abort();
      abortProductData.abort();
      abortCategoriesData.abort();
      navigate("/pageNotFound/");
    }
    // eslint-disable-next-line
  }, [
    productData,
    categoriesData,
    abortData,
    abortTagsData,
    abortProductData,
    abortCategoriesData,
    navigate,
  ]);

  const addTag = (val) => {
    if (tags.filter((v) => v === val).length === 0) {
      let tempTags = tags;
      tempTags.push(val);
      setTags([...tempTags]);
    }
  };

  const removeTag = (val) => {
    let tempTags = tags.filter((v) => v !== val);
    setTags([...tempTags]);
  };

  const getTagName = (val) => {
    return tagsData.filter((v) => v._id === val)[0].name;
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    send({
      url: `http://localhost:3000/product/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: { name, description, price, tags, category, subcategory },
    });
  };

  useEffect(() => {
    if (isPending === false && data !== null && error === null) {
      navigate("/products/");
    }
  }, [isPending, data, error, navigate]);

  return (
    <div className="EditProduct">
      <div className={EditProductStyle.container}>
        <form onSubmit={handleSubmit} className={EditProductStyle.form}>
          <h3>Edit Product</h3>
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
              className={`formInput ${EditProductStyle.textArea}`}
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
            {tagsData &&
              tags &&
              tags.map((val) => (
                <div key={val} className={EditProductStyle.tagsContainer}>
                  <label className={EditProductStyle.tags}>
                    {getTagName(val)}
                  </label>
                  <button
                    type="button"
                    className={`btn ${EditProductStyle.tagsBtn}`}
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
              className={`btn ${EditProductStyle.submitBtn}`}
            >
              Edit Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
