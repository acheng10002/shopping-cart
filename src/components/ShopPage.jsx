/* ShopPage.jsx is app's ShopPage component/element 
- it's a child of the App component
- it's the parent to a PageContainer component, which is a
  parent to the the CardsContainer component, which is a 
  parent to all the ProductCard components */
import PageContainer from "./PageContainer";
import CardsContainer from "./CardsContainer";

const ShopPage = () => {
  return (
    <PageContainer>
      <CardsContainer />
    </PageContainer>
  );
};

export default ShopPage;
