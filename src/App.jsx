// App.jsx is app's main entry point for both UI structure and routing
import { useContext } from "react";
/* useNavigate programmatically navigates to the ShopPage 
Routes component is a container that defines all the possible routes in my app 
Route component defines individual route within the Routes component */
import { Routes, Route, useNavigate } from "react-router-dom";
import { PageContext } from "./components/PageContext";
import Homepage from "./components/Homepage";
import ShopPage from "./components/ShopPage";
import LoginPage from "./components/LoginPage";
import "./App.css";

const App = () => {
  // accesses isLoggedIn, cart, and handleLogin provided by PageContext.Provider
  const { isLoggedIn, setIsLoggedIn, cart, handleLogin } =
    useContext(PageContext);
  const navigate = useNavigate();

  /* onClick handler -> triggers handleLoginClick -> onLogin handler -> 
  triggers handleLoginSubmit -> handleLogin from PageContext.Provider */
  // handleLoginSubmit calls handleLogin which checks user's credentials during login
  const handleLoginSubmit = async (username, password) => {
    /* fetches user, cart, totalItems, and checkoutAmount when user logs in
    with valid username and password */
    const success = await handleLogin(username, password);
    // if valid, direct user to their cart on ShopPage
    if (success) {
      navigate("/shop");
      setIsLoggedIn(true);
    }
  };

  return (
    /* React router is a package that lets me manage routing with the History 
    API, which enables a website to interact with the browser's session history 
    (i.e. list of pages that the user has visited in a given window ) */
    <Routes>
      {/* App is a parent to Homepage and ShopPage components */}
      <Route path="/" element={<Homepage />} />
      <Route
        path="shop"
        // ShopPage gets rendered with cart and isLoggedIn states passed in
        element={<ShopPage cart={cart} isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="login"
        element={
          <LoginPage
            onLogin={(username, password) =>
              handleLoginSubmit(username, password)
            }
          />
        }
      />
    </Routes>
  );
};

export default App;

/* what components?
- nav bar component, will be shared between homepage and shop page

A. homepage
  1. few image
  2. info
  3. nav bar
    a. displays number of items currently in the cart
    b. button next to nav bar for checkout and pay
    c. $ amount of car, that adjusts when a user submits their order
B. shop page
  1.
  2. individual product card elements 
    a. product file
    b. add to cart button
    c. input field for user to type how many items
    d. add an increment and decrement button next to input field
    e. fetch shop items from FakeStore API 
  3. nav bar
    a. displays number of items currently in the cart
    b. button next to nav bar for checkout and pay
    c. $ amount of cart, that adjusts when a user submits their order

*clear our missing in props validation errors 
*test using React Testing Library
  - careful not to test react-router-dom
*routing should be handled as a single page app
*/
