/* ShopPage.jsx is app's ShopPage component/element 
- it's a child of the App component
- it's the parent to a PageContainer component, which is a
  parent to the the CardsContainer component, which is a 
  parent to all the ProductCard components 
  
useContext exports the context object, PageContext, for consumption
in child components, allows child components to access shared state
and logic in PageProvider */
import { useContext } from "react";
import { PageContext } from "./PageContext";
import PageContainer from "./PageContainer";
import CardsContainer from "./CardsContainer";

const ShopPage = () => {
  // accesses isLoggedIn and cart provided by PageContext.Provider
  const { isLoggedIn, cart } = useContext(PageContext);

  return (
    <PageContainer>
      {/* if isLoggedIn is true and cart exists, render Here's Your Cart */}
      {isLoggedIn && cart ? (
        <>
          <h1>Here's Your Cart:</h1>
          {/* isDefaultView prop is false when isLoggedIn is true and cart,
           exists, renders user cart view */}
          <CardsContainer isDefaultView={false} />
        </>
      ) : (
        <>
          <h1>Hello, Shopper!</h1>
          <p className="new-shopper-note">
            Browse our products and start adding items to your cart.
          </p>
          {/* isDefaultView prop is true when isLoggedIn is false and cart 
          doesn't exist, renders default cart view */}
          <CardsContainer isDefaultView={true} />
        </>
      )}
    </PageContainer>
  );
};

export default ShopPage;
