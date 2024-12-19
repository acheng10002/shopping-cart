/* Homepage.jsx is app's Homepage component/element
- it's a child of the App component
- it's the parent to a PageContainer component */
import PageContainer from "./PageContainer";
import shop from "../assets/shop.png";
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <PageContainer>
      <h1>Welcome to My Store!</h1>
      <picture>
        <img src={shop} alt="image of storefront" className="storefront"></img>
      </picture>
      {/* React Router's custom element used instead of the a tag to prevent 
      browser reloading everytime I click the link on the navbar */}
      <div>
        <Link to="login" className="footer-links">
          I Have An Account
        </Link>
      </div>
      <div>
        <Link to="shop" className="footer-links">
          Start Shopping
        </Link>
      </div>
    </PageContainer>
  );
};

export default Homepage;
