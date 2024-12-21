/* - PageContext is the context object that will store and provide shared 
     state and logic
- PageProvider is the provider component where shared state and logic are defined
- its { children } prop lets me wrap other components within PageProvider, 
  making shared state and logic available to its descendants 
- these wrapped components will have access to the context's state

- PageContext.Provider is mechanism that delivers the shared values (value) 
  to any component that consumes the context 
- consumer components are the child components that can access the shared 
  state and functions 
  
1. createContext creates PageContext
2. PageProvider initializes state and functions, then wraps child components
3. PageContext.Provider makes state and functions accessible via its value prop
4. child components inside PageProvider use useContext(pageContext) to access
   shared state and logic */

/* - creates a new context object to share state across components without
     passing props manually at every level
- manages the state in the PageProvider component */
import { createContext, useState } from "react";

export const PageContext = createContext();

export function PageProvider({ children }) {
  const [itemCounts, setItemCounts] = useState({});
  const [totalItems, setTotalItems] = useState(0);
  const [checkoutAmount, setCheckoutAmount] = useState(0.0);
  // track login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // store cart data for logged-in user
  const [cart, setCart] = useState([]);
  // store logged-in user
  const [user, setUser] = useState(null);

  /* updates itemCounts, totalItems, and checkoutAmount when an item is added,
  whether it's a user that already exists or doesn't */
  const handleAddClick = (productId, productPrice) => {
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

  /* fetches user, cart, totalItems, and checkoutAmount when user logs in
  with valid username and password */
  const handleLogin = async (username, password) => {
    try {
      // fetch users from the API
      const usersResponse = await fetch("https://fakestoreapi.com/users");
      const users = await usersResponse.json();

      /* validate credentials by finding a user with the matching username 
      and password */
      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        // set the logged-in user
        setUser(user);

        // fetch cart data for the user
        const cartsResponse = await fetch("https://fakestoreapi.com/carts");
        const allCarts = await cartsResponse.json();

        // filter carts for the logged-in user
        const userCart = allCarts.find((cart) => cart.userId === user.id);
        setCart(userCart);

        if (userCart && userCart.products) {
          /* calculate total items and checkout amount 
          reduce() processes the userCart.products array, reducing it to a 
          single value, sum, the total quantities of all product.quantity 
          in the array */
          const totalItems = userCart.products.reduce(
            // initializes sum to 0, and makes a running total of quantities
            (sum, product) => sum + product.quantity,
            0
          );
          /* async reduce() processes userCart.products array, reducing it 
          to an awaited sum, the total prices of all product.quantity 
          in the array */
          const checkoutAmount = await userCart.products.reduce(
            async (sum, product) => {
              // each iteration fetches the product price from the API
              const productResponse = await fetch(
                `https://fakestoreapi.com/products/${product.productId}`
              );
              const productData = await productResponse.json();
              /* calculates the total cost for the current product 
              ensures the running total is awaited before adding the 
              current product's cost */
              return (await sum) + product.quantity * productData.price;
            },
            // initializes sum to 0
            0
          );
          // updates totalItems for user's cart
          setTotalItems(totalItems);
          // updates checkoutAmount for user's cart
          setCheckoutAmount(checkoutAmount);
        }
        // update login state
        setIsLoggedIn(true);
        return true;
      } else {
        alert("Invalid username or password.");
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
      return false;
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
        isLoggedIn,
        setIsLoggedIn,
        handleLogin,
        cart,
        setCart,
        user,
      }}
    >
      {/* renders the child components passed into PageProvider */}
      {children}
    </PageContext.Provider>
  );
}

// How can I update the item count for a specific product after I've already added a item count to the cart?
