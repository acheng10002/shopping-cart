import NavBar from "./NavBar";
import shop from "../assets/shop.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <div className="page-container">
      <NavBar />
      <h1>Welcome to My Store!</h1>
      <picture>
        <img src={shop} alt="image of storefront" className="storefront"></img>
      </picture>
      <Link to="shoppage">Start Shopping</Link>
    </div>
  );
};

export default Homepage;
