/* ShopPage.jsx is a child of the App, parent to a PageContainer, which is parent 
to the CardsContainer, which is a parent to all the ProductCard components 
useContext is a hook that exports PageContext context object, so its values
can be consumed by child components, allowing them to access shared state 
and logic from PageProvider component */
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
          {/* isDefaultView prop is false when user is logged in (isLoggedIn 
          is true) and cart exists, renders user cart view */}
          <CardsContainer isDefaultView={false} />
        </>
      ) : (
        // if isLoggedIn is false and cart doesn't exist, render Hello Shopper
        <>
          <h1>Hello, Shopper!</h1>
          <p className="new-shopper-note">
            Browse our products and start adding items to your cart.
          </p>
          {/* isDefaultView prop is true when no user logged in (isLoggedIn 
          is false and cart doesn't exist, renders default cart view */}
          <CardsContainer isDefaultView={true} />
        </>
      )}
    </PageContainer>
  );
};

export default ShopPage;
