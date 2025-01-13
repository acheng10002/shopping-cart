/* Homepage.jsx is a child of App and parent to a PageContainers */
import PageContainer from "./PageContainer";
import shop from "../assets/shop.png";
/* Link is React Router's custom element used instead of the a tag to prevent 
browser reloading every time I click the link on the navbar */
import { Link } from "react-router-dom";

const Homepage = () => {
  return (
    <PageContainer>
      <h1>Welcome to My Store!</h1>
      <picture>
        <img src={shop} alt="image of storefront" className="storefront"></img>
      </picture>
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
