import PageContainer from "./PageContainer";

const LoginPage = () => {
  return (
    <PageContainer>
      <div className="login-container">
        <div>
          <label>Username: </label>
          <input className="login-inputs"></input>
        </div>
        <div>
          <label>Password: </label>
          <input className="login-inputs"></input>
        </div>
      </div>
      <button className="nav-login-buttons">Login</button>
    </PageContainer>
  );
};

export default LoginPage;
