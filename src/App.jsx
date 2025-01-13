// App.jsx is app's main entry point for both UI structure and routing
import { useContext } from "react";
/* React router is a package that lets me manage routing with the History 
API, which enables a website to interact with the browser's session history 
(i.e. list of pages that the user has visited in a given window ) 
Routes component is a container that defines all the possible routes in my app 
Route component defines individual route within the Routes component 
useNavigate navigates to the ShopPage */
import { Routes, Route, useNavigate } from "react-router-dom";
import { PageContext } from "./components/PageContext";
import Homepage from "./components/Homepage";
import ShopPage from "./components/ShopPage";
import LoginPage from "./components/LoginPage";
import CreateLoginPage from "./components/CreateLoginPage";
import CheckoutPage from "./components/CheckoutPage";
import "./App.css";

/* function One() - function declaration that is hoisted, meaning it is available throughout
                    its enclosing scope, even before its definition in the code
vs. const func = () = One() - arrow function assigned to a variable, function expression 
                                  that assigns an arrow function to the constant function 
                                  the arrow function is anonymous, is not hoisted, and executes
                                  the function One when called 
let - can be reassigned, optional initialization, block-scoped, hoisted but in TDZ, and allows 
      reassignment of the variable itself
const - cannot be reassigned, mandatory initialization, block-scoped, hoiste dbut in TDZ, and 
        cannot be assigned but concetnts can be modified */
const App = () => {
  // accesses isLoggedIn, setIsLoggedIn, cart, and handleLogin provided by PageContext.Provider
  const { isLoggedIn, setIsLoggedIn, cart, handleLogin } =
    useContext(PageContext);
  const navigate = useNavigate();

  /* onClick event (LoginPage) -> triggers handleLoginClick handler (Login) -> onLogin 
  event (App) -> triggers handleLoginSubmit handler (App) -> handleLoginSubmit calls 
  PageContext.Provider's handleLogin which checks user's credentials during login */
  const handleLoginSubmit = async (username, password) => {
    // fetches user, cart, and totalItems when user logs in with valid username and password
    const success = await handleLogin(username, password);
    // if valid, direct user to their cart on ShopPage
    if (success) {
      navigate("/shop");
      setIsLoggedIn(true);
    }
  };

  return (
    <Routes>
      {/* App is a parent to Homepage, ShopPage, LoginPage, CreateLoginPage,
      and CheckoutPage components */}
      <Route path="/" element={<Homepage />} />
      <Route
        path="shop"
        // ShopPage gets rendered with cart and isLoggedIn states passed in
        element={<ShopPage cart={cart} isLoggedIn={isLoggedIn} />}
      />
      <Route
        path="login"
        element={
          /* LoginPage gets rendered with onLogin event triggering handleLoginSubmit */
          <LoginPage
            /* onLogic event handler triggers handleLoginSubmit when username and password
            are passed in 
            uses an inline arrow function to call the handler when onLogin event occurs, 
            allows custom arguments, creates a new function on every render, for handlers 
            needing arguments or dynamic logic */
            onLogin={(username, password) =>
              handleLoginSubmit(username, password)
            }
          />
        }
      />
      {/* CreateLoginPage and CheckoutPage get rendered */}
      <Route path="create-login" element={<CreateLoginPage />} />
      <Route path="checkout" element={<CheckoutPage />} />
    </Routes>
  );
};

export default App;

/* test using React Testing Library
  - careful not to test react-router-dom
*routing should be handled as a single page app
*/
