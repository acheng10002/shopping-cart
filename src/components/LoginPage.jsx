import { useState } from "react";
import PageContainer from "./PageContainer";

// onLogic handler prop will trigger handleLoginSubmit function
const LoginPage = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  /* when Login button gets clicked, calls handleLoginClick, in turn 
  calls onLogin, in turn calls handleLoginSubmit */
  const handleLoginClick = async () => {
    const success = await onLogin(username, password);
    if (!success) {
      setUsername("");
      setPassword("");
    }
  };

  return (
    <PageContainer>
      <h1>Please Log In</h1>
      <div className="login-container">
        <div>
          <label>Username: </label>
          <input
            className="login-inputs"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Password: </label>
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
    </PageContainer>
  );
};

export default LoginPage;
