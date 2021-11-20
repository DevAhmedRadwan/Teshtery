import AddAdminStyle from "./add_admin.module.css";
import useHttp from "../../../hooks/use_http.js";
import { useState, useEffect } from "react";

const AddAdmin = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showNotification, setShowNotification] = useState(false);

  const { send, data, isPending, error } = useHttp();

  const handleSubmit = (e) => {
    e.preventDefault();
    send({
      url: "http://localhost:3700/admin/",
      headers: {
        "Authorization": localStorage.getItem("token"),
        "Content-Type": "application/json"
      },
      method: "POST",
      body: { email, username, password },
    });
  };

  useEffect(() => {
    if (isPending === false && data !== null && error === null) {
      setEmail("");
      setUsername("");
      setPassword("");
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 2000);
    }
  }, [isPending, data, error]);

  return (
    <div className="AddAdmin">
      <div className={AddAdminStyle.container}>
        <form onSubmit={handleSubmit} className={AddAdminStyle.addAdmin}>
          <h3>Add Admin</h3>
          <div className="formField">
            <input
              type="text"
              placeholder="username"
              className={`formInput ${AddAdminStyle.formInput}`}
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              minLength="3"
            ></input>
            {error?.message === "Username already exist!" && (
              <span className="error">Username already exist!</span>
            )}
          </div>

          <div className="formField">
            <input
              type="text"
              placeholder="e-mail"
              className={`formInput ${AddAdminStyle.formInput}`}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              minLength="3"
            ></input>
            {error?.data?.filter((val) => {
              return val.param === "email";
            })?.length > 0 && <span className="error">Invalid email</span>}
            {error?.message === "Email already exist!" && (
              <span className="error">Email already exist!</span>
            )}
          </div>

          <div className="formField">
            <input
              type="password"
              placeholder="password"
              className={`formInput ${AddAdminStyle.lastFormInput} ${AddAdminStyle.formInput}`}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="6"
            ></input>
          </div>

          <div className={`formField ${AddAdminStyle.submitButton}`}>
            <button className="btn" type="submit">
              {isPending ? "Submiting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
      {showNotification && (
        <div className="notification">
          <span>Admin is added</span>
        </div>
      )}
    </div>
  );
};

export default AddAdmin;
