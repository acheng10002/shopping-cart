/*  1. createContext creates PageContext, context object that will store and share 
       state and logic across components without passing props manually at every level
2. PageProvider initializes/defines state and functions, then wraps child components
   its { children } prop lets me wrap other components within PageProvider, 
   making shared state and logic available to its descendants 
   - these wrapped components will have access to the context's state
3. PageContext.Provider makes state and functions accessible via its value prop
4. child components inside PageProvider are consumer components, and they use 
   useContext(pageContext) to access shared state and logic (includes ShopPage, 
   NavBar, CardsContainer, and CreateLoginPage) 

   state - data managed by a component that can change over time
   useState - adds and manages state variables, replacing the need for class components
              to manage state
   useRef - creates a mutable reference that persists across renders without 
            causing re-renders when updated, can hold references to DOM elements
   useEffect - allow side effects to get performed (ex. fetching data, subscribing
               to events, directly updating the DOM, starting timers or animations) */
import { createContext, useState, useEffect, useRef } from "react";

export const PageContext = createContext();

// again these children components will get access to the shared state and logic
export function PageProvider({ children }) {
  // tracks count of individual items
  const [itemCounts, setItemCounts] = useState({});
  // tracks count all items
  const [totalItems, setTotalItems] = useState(0);
  // tracks login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // store cart data for logged-in user
  const [cart, setCart] = useState([]);
  // stores logged-in user
  const [user, setUser] = useState(null);
  // creates references to all the items' prices
  const priceCache = useRef({});

  // Fetches all prices at once and store in cache
  useEffect(() => {
    const fetchAllPrices = async () => {
      /* try block for error handling, ensuring specific code is executed regardless
      of whether an error occurs */
      try {
        // fetch response from API, sends a GET request
        const response = await fetch("https://fakestoreapi.com/products");
        // parses the response as JSON
        const products = await response.json();
        // iterates over products array, accumulates a result, acc, starts as {}
        const prices = products.reduce((acc, product) => {
          // for each product, adds a key-value pair to the accumulator
          acc[product.id] = product.price;
          // acc objects has each product's id as key and the its price as value
          return acc;
        }, {});
        // stores all prices in cache
        priceCache.current = prices;
      } catch (error) {
        // on failure, logs the error to the console
        console.error("Error fetching product prices:", error);
      }
    };

    fetchAllPrices();
    // only runs this side effect once
  }, []);

  /* updates itemCounts and totalItems when an item is added, whether it's for 
  a user that exists or for no user at all */
  const handleAddClick = async (productId, newQuantity) => {
    // receives current state and calculates new state
    setItemCounts((prevCounts) => {
      /* spread operator copies existing itemCounts state, and updates 
      quantity of specific product */
      const updatedCounts = {
        ...prevCounts,
        [productId]: newQuantity,
      };
      // retrieves all quantities values from updatedCounts object
      const updatedTotalItems = Object.values(updatedCounts).reduce(
        /* iterates over the quantities and accumulates their sum 
        starts sum at 0 */
        (sum, quantity) => sum + quantity,
        0
      );
      /* updates totalItems state with updatedTotalItems, calculated
      total number of items in the cart */
      setTotalItems(updatedTotalItems);
      // setItemCounts uses updatedCounts to update the itemCounts
      return updatedCounts;
    });
  };

  /* gets user, cart, totalItems, and checkoutAmount when user logs in
  with valid username and password (updated in LoginPage) */
  const handleLogin = async (username, password) => {
    // try block for error handling
    try {
      // fetches users from the API
      const usersResponse = await fetch("https://fakestoreapi.com/users");
      // parses users response as JSON
      const users = await usersResponse.json();

      /* goes through users array and locates first element/user that has 
      credentials matching the arguments passed in */
      const loggedInUser = users.find(
        (u) => u.username === username && u.password === password
      );

      if (loggedInUser) {
        // temporarily store logged-in user in a variable
        const userToSet = loggedInUser;

        // sets the logged-in user as state
        setUser(userToSet);

        // fetches user cart data from the API
        const cartsResponse = await fetch("https://fakestoreapi.com/carts");
        // parses carts response as JSON
        const allCarts = await cartsResponse.json();

        /* goes through allCarts array and locates first element/cart whose
            userId matches the id property of the user 
            userToSet holds the value of loggedInUser and avoids waiting for 
            the async setUser call to complete */
        console.log(user);
        const userCart = allCarts.find((cart) => cart.userId === userToSet.id);
        // sets the logged-in user's cart as state
        setCart(userCart);

        // if logged-in user's cart exists and their cart has products
        if (userCart && userCart.products) {
          // iterates over the userCart array, accumulates a result, sum
          const totalItems = userCart.products.reduce(
            // accumulates running total of quantities
            (sum, product) => sum + product.quantity,
            // initializes sum at 0
            0
          );
          // updates totalItems for user's cart
          setTotalItems(totalItems);
        }
        // updates login state
        setIsLoggedIn(true);
        return true;
      } else {
        alert("Invalid username or password.");
        return false;
      }
      // on failure, logs the error to the console and show error pop-up
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
      return false;
    }
  };

  /* upon logout, isLoggedIn state is false, no user logged in, cart is empty, 
  itemCounts is empty, and 0 total items */
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setCart([]);
    setItemCounts({});
    setTotalItems(0);
  };

  return (
    /* provider component that makes context values availables to its children 
    PageContext.Provider's value prop is mechanism that delivers the shared 
    values to any component that consumes the context*/
    <PageContext.Provider
      value={{
        itemCounts,
        setItemCounts,
        totalItems,
        handleAddClick,
        isLoggedIn,
        setIsLoggedIn,
        handleLogin,
        handleLogout,
        cart,
        priceCache,
      }}
    >
      {/* renders the child components passed into PageProvider */}
      {children}
    </PageContext.Provider>
  );
}

/* X after clicking checkout, shop page needs to show the same amount 
   X seeing "cart is empty" before cart loads 
   X totalItems and checkoutAmount not accurate
   X shop page of a logged in user doesn't show correct input values */
