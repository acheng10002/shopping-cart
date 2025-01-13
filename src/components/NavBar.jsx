// NavBar.jsx is a child of PageContainer
import { useContext, useState, useEffect } from "react";
import { PageContext } from "./PageContext";
// useNavigate programmatically navigates to the LoginPage
import { Link, useNavigate } from "react-router-dom";
import "../index.css";

function NavBar() {
  /* accesses itemCounts, totalItems, isLoggedIn, handleLogout, and priceCache
  provided by the PageContext.Provider */
  const { itemCounts, totalItems, isLoggedIn, handleLogout, priceCache } =
    useContext(PageContext);
  const navigate = useNavigate();
  // local state tracking checkoutAmount including tax
  const [checkoutAmount, setCheckoutAmount] = useState(0.0);

  // updates checkoutAmount in DOM
  useEffect(() => {
    const calculateCheckoutAmount = () => {
      // returns an array of itemCounts' string-keyed property pairs
      const entries = Object.entries(itemCounts);
      // iterates over the entries array, accumulates a result, total, starts as 0
      const totalAmount = entries.reduce((total, [productId, quantity]) => {
        // for each product, gets its price from the priceCache
        const price = priceCache.current[productId] || 0;
        // accumulates the cost of each product's quantity
        return total + quantity * price;
      }, 0);
      setCheckoutAmount(totalAmount);
    };
    calculateCheckoutAmount();
    // re-runs side effect when itemCounts changes
  }, [itemCounts]);

  // logs user out and redirects to /login route
  const handleLoginRedirectClick = () => {
    handleLogout();
    navigate("/login");
  };

  // redirects to checkout route
  const handleCheckoutClick = () => {
    navigate("/checkout");
  };

  return (
    <div className="header">
      <nav>
        <ul className="nav-ul">
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
      {/* login button's onClick handler triggers the navigation 
       direct function reference to onClick event handler */}
      <button className="nav-login-buttons" onClick={handleLoginRedirectClick}>
        {isLoggedIn ? "🚪 Logout" : "🖊️ User Login"}
      </button>
      {/* displays checkoutAmount formated to two decimal places 
      direct function reference to onClick event handler*/}
      <button className="nav-login-buttons" onClick={handleCheckoutClick}>
        🛍️ Checkout: ${(checkoutAmount * 1.06).toFixed(2)}{" "}
      </button>
    </div>
  );
}

export default NavBar;
