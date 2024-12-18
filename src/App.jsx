// import { useState } from "react";
import { Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import "./App.css";

const App = () => {
  return (
    <div>
      <Homepage />
    </div>
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
