import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageContainer from "./PageContainer";

// onLogic event prop will trigger handleLoginSubmit handler
const LoginPage = ({ onLogin }) => {
  // local state to manage username and password credentials
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  /* onClick event (LoginPage) -> triggers handleLoginClick handler
  (LoginPage) -> onLogin event (App) -> triggers handleLoginSubmit 
  handler (App) -> calls handleLogin (PageContext) */
  const handleLoginClick = async () => {
    const success = await onLogin(username, password);
    if (!success) {
      setUsername("");
      setPassword("");
    }
  };

  const handleCreateLogin = () => {
    navigate("/create-login");
  };

  return (
    <PageContainer>
      <h1>Please Log In</h1>
      <div className="login-container">
        <div className="login-detail">
          <label className="login-label">Username: </label>
          <input
            className="login-inputs"
            value={username}
            /* -onChange event handler passes event object into setUsername,
            calling it with the new value of the input field and updating the
            component's state
            e.target property - element that triggers the event
            e.target.value - current value of the input fields */
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login-detail">
          <label className="login-label">Password: </label>
          <input
            className="login-inputs"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <button className="nav-login-buttons" onClick={handleLoginClick}>
        Login
      </button>
      <div>
        <button
          className="nav-login-buttons create"
          /* onClick event handler calls handleCreateLogin
           directly passing function reference to event handler */
          onClick={handleCreateLogin}
        >
          Create Login
        </button>
      </div>
    </PageContainer>
  );
};

export default LoginPage;
