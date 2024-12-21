/* NavBar.jsx is the app's component for navigation section
it's a child of PageContainer component 
useContext is a hook used to consume context values provided by PageContext.Provider */
import { useContext } from "react";
import { PageContext } from "./PageContext";
// useNavigate programmatically navigates to the LoginPage
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function NavBar() {
  // access totalItems, checkoutAmount, isLoggedIn, and setIsLoggedIn provided by the PageContext.Provider
  const { totalItems, checkoutAmount, isLoggedIn, setIsLoggedIn } =
    useContext(PageContext);
  const navigate = useNavigate();

  // redirects to /login route
  const handleLoginRedirectClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
    }
    navigate("/login");
  };

  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            {/* again, Link used instead of the a tag to prevent browser 
             reloading every time I click the link on the navbar */}
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/shop">Shop Page</Link>
          </li>
          {/* displays totalItems, dynamically retrieved from PageContext */}
          <li>Total Items: {totalItems}</li>
        </ul>
      </nav>
      {/* login button's onClick handler triggers the navigation */}
      <button className="nav-login-buttons" onClick={handleLoginRedirectClick}>
        {isLoggedIn ? "🚪 Logout" : "🖊️ User Login"}
      </button>
      {/* displays checkoutAmount formated to two decimal places */}
      <button className="nav-login-buttons">
        🛍️ Checkout: ${checkoutAmount.toFixed(2)}{" "}
      </button>
    </div>
  );
}

export default NavBar;
