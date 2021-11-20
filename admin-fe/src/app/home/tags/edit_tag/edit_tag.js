import EditTagStyle from "./edit_tag.module.css";
import useHttp from "../../../../hooks/use_http.js";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const EditTag = () => {
  let { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const {
    send,
    data,
    isPending,
    error,
    abortController: abortData,
  } = useHttp();
  const {
    send: getTag,
    data: tagData,
    abortController: abortTagData,
  } = useHttp();

  useEffect(() => {
    getTag({
      url: `http://localhost:3700/tag/?_id=${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (tagData != null && tagData.length > 0) {
      setName(tagData[0].name);
    } else if (tagData != null) {
      abortData.abort();
      abortTagData.abort();
      navigate("/pageNotFound/");
    }
  }, [tagData, abortTagData, abortData, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    send({
      url: `http://localhost:3700/tag/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: { name },
    });
  };

  useEffect(() => {
    if (isPending === false && data !== null && error === null) {
      setName("");
      navigate("/tags/");
    }
  }, [isPending, data, error, navigate]);

  return (
    <div className="EditTag">
      <div className={EditTagStyle.container}>
        <form onSubmit={handleSubmit} className={EditTagStyle.form}>
          <h3>Edit Tag</h3>
          <div className="formField">
            <input
              className="formInput"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            ></input>
            {error?.message === "Name already exist!" && (
              <span className="error">Name already exist!</span>
            )}
          </div>
          <div className="formField">
            <button type="submit" className={`btn ${EditTagStyle.submitBtn}`}>
              Edit Tag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTag;
