import SignupStyle from "./signup.module.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useHttp from "../../hooks/use_http.js";

const Signup = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { send, data, isPending, error } = useHttp();

  const handleSubmit = (e) => {
    e.preventDefault();
    send({
      url: "http://localhost:3700/auth/signup",
      method: "POST",
      body: { username, email, password },
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
    <div className="Signup">
      <div className={SignupStyle.landingPage}>
        <form onSubmit={handleSubmit} className={SignupStyle.form}>
          <h3>Sign Up</h3>
          <div className="formField">
            <input
              type="text"
              placeholder="Your username"
              className="formInput"
              required
              minLength="3"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            ></input>
            {error?.data?.filter((val) => {
              return val.param === "username";
            })?.length > 0 && <span className="error">Invalid username</span>}
            {error?.message === "Username already exist!" && (
              <span className="error">Username already exist!</span>
            )}
          </div>
          <div className="formField">
            <input
              type="text"
              placeholder="Your e-mail"
              className="formInput"
              required
              minLength="3"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Your password"
              className="formInput"
              required
              minLength="6"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
            {error?.data?.filter((val) => {
              return val.param === "password";
            })?.length > 0 && <span className="error">Invalid password</span>}
          </div>
          <div className="formField">
            <button disabled={isPending} className="btn" type="submit">
              {isPending ? "Signing up..." : "Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
