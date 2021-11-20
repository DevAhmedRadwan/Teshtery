import { Outlet } from "react-router-dom";
import Navbar from "./navbar/navbar.js";

const Home = ({ setisLoggedIn }) => {
  return (
    <div className="Home">
      <Navbar setisLoggedIn={setisLoggedIn} />
      <Outlet />
    </div>
  );
};

export default Home;
