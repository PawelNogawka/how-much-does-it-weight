import React from "react";

import Button from "../formElements/Button";
import Wrapper from "../uiElements/Wrapper";

import "./LoginSpur.scss";

const LoginSpur = ({ setIsAuthOpen }) => {
  return (
    <section className="login-spur">
      <Wrapper>
        <div className="login-spur__container">
          <h2 className="login-spur__heading">
            Log in to see diagrams relating to your caloric needs.
          </h2>
          <p className="login-spur__desc">
            The diagrams below illustrate the caloric needs of an average
            person, log in to see the needs for your body or create an account.
          </p>

          <div className="login-spur__btns">
            <Button
              onClick={() => setIsAuthOpen("login")}
              secondary
              ariaLabel="Login into your account"
            >
              login
            </Button>
            <Button
              onClick={() => setIsAuthOpen("register")}
              white
              ariaLabel="Create an account"
            >
              register
            </Button>
          </div>
        </div>
      </Wrapper>
    </section>
  );
};

export default LoginSpur;
