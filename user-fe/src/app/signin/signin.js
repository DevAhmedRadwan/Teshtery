import SigninStyle from "./signin.module.css";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useHttp from "../../hooks/use_http.js";

const Signin = ({ setIsLoggedIn }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { send, data, isPending, error } = useHttp();

  const handleSubmit = (e) => {
    e.preventDefault();
    send({
      url: "http://localhost:3200/auth/signin",
      method: "POST",
      body: { id, password },
    });
  };

  useEffect(() => {
    if (!error && data) {
      Object.keys(data).forEach((key) => {
        localStorage.setItem(key, data[key]);
      });
      setIsLoggedIn(true);
      navigate("/");
    }
  }, [data, error, navigate, setIsLoggedIn]);

  return (
    <div className="Signin">
      <div className={SigninStyle.landingPage}>
        <form onSubmit={handleSubmit} className={SigninStyle.form}>
          <h3>Sign In</h3>
          <div className="formField">
            <input
              type="text"
              placeholder="Your e-mail or username"
              className="formInput"
              required
              value={id}
              onChange={(e) => setId(e.target.value)}
            ></input>
            {error?.data?.filter((val) => {
              return val.param === "id";
            })?.length > 0 && (
              <span className="error">Wrong email or username</span>
            )}
          </div>
          <div className="formField">
            <input
              type="password"
              placeholder="Your password"
              className="formInput"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {(error?.data?.filter((val) => {
              return val.param === "password";
            })?.length > 0 ||
              error?.message === "Incorrect password!") && (
              <span className="error">Wrong password</span>
            )}
          </div>
          <div className="formField">
            <button disabled={isPending} className="btn" type="submit">
              {isPending ? "Signing in..." : "Sign in"}
            </button>
          </div>
          <div className={SigninStyle.line}></div>
          <Link to="/signup" className={SigninStyle.newAccount}>
            Signup here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Signin;
