/* PageContainer.jsx is the app's component for single-page rendering
it's a child of Homepage component and ShopPage and parent to the NavBar
and other potential children (<h1>, <picture>, <Link>, or CardsContainer) */
import NavBar from "./NavBar.jsx";

// { children } prop lets me wrap other components within PageContainer
function PageContainer({ children }) {
  return (
    <div className="page-container">
      <NavBar />
      <div>{children}</div>
    </div>
  );
}

export default PageContainer;
