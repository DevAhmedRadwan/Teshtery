import NavbarStyle from "./navbar.module.css";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = ({setisLoggedIn}) => {

  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setisLoggedIn(false);
    navigate("/signin");
  };

  return (
    <div className={`Navbar ${NavbarStyle.navbar}`}>
      <div className={NavbarStyle.navbarContainer}>
        <div className={NavbarStyle.itemsContainer}>
          <div className={NavbarStyle.header}>
            <span>TESHTERY</span>
          </div>
          <NavLink to="/admin" activeclassname="active" className={NavbarStyle.item}>
            <span>Add Admin</span>
          </NavLink>
          <NavLink to="/categories" activeclassname="active" className={NavbarStyle.item}>
            <span>Categories</span>
          </NavLink>
          <NavLink to="/products" activeclassname="active" className={NavbarStyle.item}>
            <span>Products</span>
          </NavLink>
          <NavLink to="/tags" activeclassname="active" className={NavbarStyle.item}>
            <span>Tags</span>
          </NavLink>
          <NavLink to="/users" activeclassname="active" className={NavbarStyle.item}>
            <span>Users</span>
          </NavLink>
        </div>
        <div onClick={signout} className={NavbarStyle.signout}>
          <span>Sign Out</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
