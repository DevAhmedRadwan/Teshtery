import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { AiOutlineShoppingCart, AiOutlineUnorderedList } from "react-icons/ai";
import MainNavbarStyle from "./main_navbar.module.css";

const MainNavbar = ({ isLoggedIn, setIsLoggedIn }) => {
  // change the color of the icon on hover
  const [signInIconColor, setSignInIconColor] = useState(
    "var(--font-color-light)"
  );
  const [cartIconColor, setCartIconColor] = useState("var(--font-color-light)");
  const [orderIconColor, setOrderIconColor] = useState("var(--font-color-light)");

  let location = useLocation();

  const navigate = useNavigate();

  const signout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate(location.pathname + location.search);
  };

  return (
    <div className="MainNavbar">
      <div className={MainNavbarStyle.navbar}>
        {/* site logo */}
        <Link to="/" className={MainNavbarStyle.headerText}>
          <span
            className={`${MainNavbarStyle.headerText} ${MainNavbarStyle.headerFirstLetter}`}
          >
            T
          </span>
          <span className={MainNavbarStyle.headerRestOfLetters}>ESHTERY</span>
        </Link>
        {/* main links */}
        <div className={MainNavbarStyle.links}>
          {/* sign in */}
          {!isLoggedIn && (
            <Link
              to="/signin"
              onMouseOver={() => setSignInIconColor("var(--primary)")}
              onMouseOut={() => setSignInIconColor("var(--font-color-light)")}
              className={MainNavbarStyle.link}
            >
              <span className={MainNavbarStyle.linkText}>Sign In</span>
              <CgProfile
                color={signInIconColor}
                size="18"
                className={MainNavbarStyle.icon}
              />
            </Link>
          )}
          {/* sign up */}
          {isLoggedIn && (
            <div
              onClick={signout}
              onMouseOver={() => setSignInIconColor("var(--primary)")}
              onMouseOut={() => setSignInIconColor("var(--font-color-light)")}
              className={MainNavbarStyle.link}
            >
              <span className={MainNavbarStyle.linkText}>Sign out</span>
              <CgProfile
                color={signInIconColor}
                size="18"
                className={MainNavbarStyle.icon}
              />
            </div>
          )}
          {/* divider */}
          {isLoggedIn && <div className={MainNavbarStyle.vLine}></div>}
          {/* cart */}
          {isLoggedIn && (
            <Link
              to="/cart"
              onMouseOver={() => setCartIconColor("var(--primary)")}
              onMouseOut={() => setCartIconColor("var(--font-color-light)")}
              className={MainNavbarStyle.link}
            >
              <span className={MainNavbarStyle.linkText}>Cart</span>
              <AiOutlineShoppingCart
                color={cartIconColor}
                size="18"
                className={MainNavbarStyle.icon}
              />
            </Link>
          )}
          {/* divider */}
          {isLoggedIn && <div className={MainNavbarStyle.vLine}></div>}
          {/* order */}
          {isLoggedIn && (
            <Link
              to="/order"
              onMouseOver={() => setOrderIconColor("var(--primary)")}
              onMouseOut={() => setOrderIconColor("var(--font-color-light)")}
              className={MainNavbarStyle.link}
            >
              <span className={MainNavbarStyle.linkText}>Orders</span>
              <AiOutlineUnorderedList
                color={orderIconColor}
                size="18"
                className={MainNavbarStyle.icon}
              />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
