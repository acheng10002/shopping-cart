/* PageContainer.jsx is the app's component for single-page rendering
it's a child of the Homepage component as well as the ShopPage component 
it's a parent to the NavBar component and other potential children 
(<h1>, <picture>, <Link>, or CardsContainer) */
import NavBar from "./NavBar.jsx";

/* PageContainer component with { children } prop lets me wrap other 
components within PageContainer */
function PageContainer({ children }) {
  return (
    <div className="page-container">
      <NavBar />
      <div>{children}</div>
    </div>
  );
}

export default PageContainer;
