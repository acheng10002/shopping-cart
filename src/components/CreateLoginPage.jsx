import { useState, useContext } from "react";
import { PageContext } from "./PageContext";
import { useNavigate } from "react-router-dom";
import PageContainer from "./PageContainer";

const CreateLoginPage = () => {
  // setIsLoggedIn makes isLoggedIn true when user clicks Create Login & Log In
  const { setIsLoggedIn } = useContext(PageContext);
  /* sets formValues which will be bound to corresponding input values, 
  centralized representation of the user's input data, will be used to post
  data to the API */
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    phoneNumber: "",
    street: "",
    streetNumber: "",
    cityState: "",
    zipCode: "",
  });

  // will navigate the user to homepage after they log in
  const navigate = useNavigate();

  const getGeolocation = async (address) => {
    const apiKey = "d4ecf8b84fae44ab810d45905576f3d9";
    /* encodeURIComponent ensures that special characters in the input string are 
    are safely encoded, making it suitable for inclusion in an url */
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address
    )}&key=${apiKey}`;

    // try block for error handling
    try {
      // fetch response from API with api key, sends a GET request
      const response = await fetch(url);
      // parses the response as JSON
      const data = await response.json();

      // if json response has results array property and its length is > 0
      if (data.results && data.results.length > 0) {
        /* destructures the first element of the results array, extracting
        lat and lng from the element's geometry property */
        const { lat, lng } = data.results[0].geometry;
        return { lat, long: lng };
      } else {
        console.error("No geolocation results found.");
        return { lat: null, long: null };
      }
    } catch (error) {
      console.error("Geolocation fetch error:", error);
      return { lat: null, long: null };
    }
  };

  const handleCreateSubmit = async () => {
    /* formData object will be posted to FakeStoreAPI
     it's structured for valid posting and object values 
     come from the formValues state */
    const formData = {
      email: formValues.email,
      username: formValues.username,
      password: formValues.password,
      name: {
        firstname: formValues.firstName,
        lastname: formValues.lastName,
      },
      address: {
        city: formValues.cityState,
        street: formValues.street,
        number: "",
        zipcode: formValues.zipCode,
        // calls getGeoloction with three values from state
        geolocation: await getGeolocation(
          `${formValues.street}, ${formValues.cityState}, ${formValues.zipCode}`
        ),
      },
      phone: formValues.phone,
    };

    // posts formData that the user created when creating their login
    fetch("https://fakestoreapi.com/users", {
      method: "POST",
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        // log in the user
        setIsLoggedIn(true);
        // navigate the user to homepage
        navigate("/");
      })
      .catch((error) => console.error("Error:", error));
  };

  // updates the state when the user types into the input field
  const handleInputChange = (e) => {
    // destructures name and value attributes from input field
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      /* input's name attribute must be the same as a key in the formValues
      state object, and input's value attribute must be that key's
      value 
      input gets mapped to the corresponding key in formValues */
      [name]: value,
    }));
  };

  const fields = [
    { label: "First Name", type: "text", name: "firstName" },
    { label: "Last Name", type: "text", name: "lastName" },
    { label: "Email", type: "email", name: "email" },
    { label: "Username", type: "text", name: "username" },
    { label: "Password", type: "password", name: "password" },
    { label: "Phone Number", type: "tel", name: "phoneNumber" },
    { label: "Address", type: "text", name: "street" },
    { label: "Apt/Unit/Suite Number", type: "text", name: "aptUnitSuite" },
    { label: "City, State", type: "text", name: "cityState" },
    { label: "Zip Code", type: "text", name: "zipCode" },
  ];

  /* divides the total number of items in the fields array by 2
  and rounds up the result to the nearest integer */
  const midIndex = Math.ceil(fields.length / 2);
  // extracts items starting at index 0 and ending before midIndex
  const firstHalf = fields.slice(0, midIndex);
  // extracts items starting from midIndex and includes all remaining
  const secondHalf = fields.slice(midIndex);

  return (
    <PageContainer>
      <h2>Please complete this form.</h2>
      <div className="create-login-container">
        <div className="create-side">
          {/* map processes each object in the fields array */}
          {firstHalf.map((field, index) => (
            /* for each object, div with a unique key is created
                a label is added using field.label for its text
                and an input with attributes, type and placeholder, 
                set dynamically from fields array */
            <div className="create-detail" key={index}>
              <label className="create-label">{field.label}: </label>
              <input
                className="create-login-inputs"
                type={field.type}
                placeholder={`Enter ${field.label}`}
                /* input's name matches a key in the formValues 
                state object */
                name={field.name}
                /* two-way binding, ensures the input's value is bound
                to the formValues state 
                input's value attribute must be the value of the formValues key 
                binds the key in formValues state to an input */
                value={formValues[field.name]}
                // direct function reference triggered by onChange event handler
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
        <div className="create-side">
          {secondHalf.map((field, index) => (
            <div className="create-detail" key={index}>
              <label className="create-label">{field.label} </label>
              <input
                className="create-login-inputs"
                type={field.type}
                placeholder={`Enter ${field.label}`}
                name={field.name}
                value={formValues[field.name]}
                onChange={handleInputChange}
              />
            </div>
          ))}
        </div>
      </div>
      <div>
        <button className="create-submit" onClick={handleCreateSubmit}>
          Create Login & Log In
        </button>
      </div>
    </PageContainer>
  );
};

export default CreateLoginPage;
