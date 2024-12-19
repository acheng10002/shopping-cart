/* PageContext is the context object that will hold and provide shared 
   state and logic to any components wrapped by the PageProvider component 
PageProvider is the provider component with { children } prop that lets me 
wrap other components within PageProvider, making shared state and logic
available to its descendants 
- these wrapped components will have access to the context's state */

/* - creates a new context object to share state across components without
     passing props manually at every level
- manages the state in the PageProvider component */
import { createContext, useState } from "react";

export const PageContext = createContext();

export function PageProvider({ children }) {
  const [itemCounts, setItemCounts] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [checkoutAmount, setCheckoutAmount] = useState(0.0);

  // updates the cart when an item is added
  const handleAddClick = (productId, productPrice) => {
    /*
    // current count in the cart
    const currentCount = Number(itemCounts[productId] || 0);
    // reflects the latest count in the input
    const newCount = Number(currentCount);

    if (newCount !== currentCount) {
      const countDifference = newCount - currentCount;
      const priceDifference = countDifference * Number(productPrice);

      // update total items and checkout amount
      setTotalItems((prevCount) => prevCount + countDifference);
      setCheckoutAmount((prevAmount) => prevAmount + priceDifference);

      // update itemCounts with the new count
      setItemCounts((prevCounts) => ({
        ...prevCounts,
        [productId]: newCount,
      }));
    }
    */
    // retrieves current count of the product, defaults to 0 if it doesn't exist
    const itemCount = Number(itemCounts[productId] || 0);

    // if the count is greater than 0
    if (itemCount > 0) {
      // adds the current itemCount to total number of items
      setTotalItems((prevCount) => prevCount + itemCount);
      // adds the total price of itemCount to the checkoutAmount
      setCheckoutAmount(
        (prevAmount) => prevAmount + itemCount * Number(productPrice)
      );
    }
  };

  return (
    // component that makes context values availables to its children
    <PageContext.Provider
      value={{
        itemCounts,
        setItemCounts,
        totalItems,
        setTotalItems,
        checkoutAmount,
        setCheckoutAmount,
        handleAddClick,
      }}
    >
      {/* renders the child components passed into PageProvider */}
      {children}
    </PageContext.Provider>
  );
}

// How can I update the item count for a specific product after I've already added a item count to the cart?
