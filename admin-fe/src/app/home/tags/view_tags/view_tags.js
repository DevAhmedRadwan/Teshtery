import ViewTagsStyle from "./view_tags.module.css";
import { Link, useNavigate } from "react-router-dom";
import { CgPlayListAdd } from "react-icons/cg";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import useHttp from "../../../../hooks/use_http.js";
import { useState, useEffect } from "react";

const ViewTags = () => {
  const [pageSize] = useState(9);
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const { send: getTag, data } = useHttp();
  const {
    send: deleteCategory,
    isPending: deleting,
    data: deletedCategory,
  } = useHttp();

  useEffect(() => {
    getTag({
      url: `http://localhost:3700/tag/?page=${page}&pagesize=${pageSize}`,
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
      url: `http://localhost:3700/tag/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });
  };

  return (
    <div className="ViewTags">
      <div className={ViewTagsStyle.container}>
        {data &&
          data.docs.map((tag) => (
            <div key={tag.name} className={ViewTagsStyle.tag}>
              <span className={ViewTagsStyle.tagName}>
                {tag.name.charAt(0).toUpperCase() + tag.name.slice(1)}
              </span>
              <div>
                <button
                  onClick={() => navigate(`/tags/edit/${tag._id}`)}
                  className={ViewTagsStyle.edit}
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => removeCategory(tag._id)}
                  className={ViewTagsStyle.delete}
                  disabled={deleting}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ))}
        <div className={ViewTagsStyle.pagechangerContainer}>
          {data?.hasPrevPage && (
            <button
              onClick={() => {
                setPage(data.page - 1);
              }}
              className={ViewTagsStyle.pagechanger}
            >
              <AiFillLeftCircle></AiFillLeftCircle>
            </button>
          )}
          <span className={ViewTagsStyle.pagenumber}>{data?.page}</span>
          {data?.hasNextPage && (
            <button
              onClick={() => {
                setPage(data.page + 1);
              }}
              className={ViewTagsStyle.pagechanger}
            >
              <AiFillRightCircle></AiFillRightCircle>
            </button>
          )}
        </div>
      </div>
      <Link to="/tags/add" className={ViewTagsStyle.addTag}>
        <CgPlayListAdd
          style={{
            color: "var(--font-color-light)",
          }}
          size="35"
          className={ViewTagsStyle.addTagIcon}
        />
      </Link>
    </div>
  );
}
 
export default ViewTags;