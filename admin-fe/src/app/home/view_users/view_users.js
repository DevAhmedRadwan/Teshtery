import ViewUsersStyle from "./view_users.module.css";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import useHttp from "../../../hooks/use_http.js";
import { useState, useEffect } from "react";

const ViewUsers = () => {
  const [pageSize] = useState(9);
  const [page, setPage] = useState(1);

  const { send: getUser, data } = useHttp();
  const {
    send: disableUser,
    isPending: disabling,
    data: disableUserData,
  } = useHttp();
  const {
    send: enableUser,
    isPending: enabling,
    data: enableUserData,
  } = useHttp();

  useEffect(() => {
    getUser({
      url: `http://localhost:3000/user/?page=${page}&pagesize=${pageSize}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    // eslint-disable-next-line
  }, [page, pageSize, disableUserData, enableUserData]);

  const ban = (id) => {
    disableUser({
      url: `http://localhost:3000/user/disable/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
  };

  const activate = (id) => {
    enableUser({
      url: `http://localhost:3000/user/enable/${id}`,
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      method: "PUT",
    });
  };

  return (
    <div className="ViewUsers">
      <div className={ViewUsersStyle.container}>
        {data &&
          data.docs.map((user) => (
            <div key={user.name} className={ViewUsersStyle.user}>
              <span className={ViewUsersStyle.userName}>{user.name}</span>
              <div>
                {user.disabled && (
                  <button
                    onClick={() => activate(user._id)}
                    className={ViewUsersStyle.enable}
                    disabled={disabling}
                  >
                    {disabling ? "Activating..." : "activate"}
                  </button>
                )}

                {!user.disabled && (
                  <button
                    type="button"
                    onClick={() => ban(user._id)}
                    className={ViewUsersStyle.disable}
                    disabled={enabling}
                  >
                    {disabling ? "Banning..." : "Ban"}
                  </button>
                )}
              </div>
            </div>
          ))}
        <div className={ViewUsersStyle.pagechangerContainer}>
          {data?.hasPrevPage && (
            <button
              onClick={() => {
                setPage(data.page - 1);
              }}
              className={ViewUsersStyle.pagechanger}
            >
              <AiFillLeftCircle></AiFillLeftCircle>
            </button>
          )}
          <span className={ViewUsersStyle.pagenumber}>{data?.page}</span>
          {data?.hasNextPage && (
            <button
              onClick={() => {
                setPage(data.page + 1);
              }}
              className={ViewUsersStyle.pagechanger}
            >
              <AiFillRightCircle></AiFillRightCircle>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewUsers;
