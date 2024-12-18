import { useState } from "react";
import { Link } from "react-router-dom";
import "../index.css";

function NavBar({ totalItems, checkoutAmount }) {
  return (
    <div className="header">
      <nav>
        <ul>
          <li>
            <Link to="/">Homepage</Link>
          </li>
          <li>
            <Link to="/shoppage">Shop Page</Link>
          </li>
          <li>Total Items: {totalItems}</li>
        </ul>
      </nav>
      <button>Checkout: ${checkoutAmount.toFixed(2)} </button>
    </div>
  );
}

export default NavBar;
