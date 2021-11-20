import AddTagStyle from "./add_tag.module.css";
import useHttp from "../../../../hooks/use_http.js";
import { useState, useEffect } from "react";

const AddTag = () => {
  const [name, setName] = useState("");
  const { send, data, isPending, error } = useHttp();

  const handleSubmit = (e) => {
    e.preventDefault();
    send({
      url: "http://localhost:3700/tag/",
      headers: {
        "Authorization": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      method: "POST",
      body: { name },
    });
  };

  useEffect(() => {
    if (isPending === false && data !== null && error === null) {
      setName("");
    }
  }, [isPending, data, error]);

  return ( 
    <div className="AddTag">
      <div className={AddTagStyle.container}>
        <form onSubmit={handleSubmit} className={AddTagStyle.form}>
          <h3>Add Tag</h3>
          <div className="formField">
            <input
              className="formInput"
              onChange={(e)=>setName(e.target.value)}
              value={name}
              required
            ></input>
            {error?.message === "Name already exist!" && (
              <span className="error">Name already exist!</span>
            )}
          </div>
          <div className="formField">
            <button
              type="submit"
              className={`btn ${AddTagStyle.submitBtn}`}
            >
              Add Rag
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
 
export default AddTag;