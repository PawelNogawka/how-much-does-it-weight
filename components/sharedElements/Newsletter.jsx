"use client";

import { useState } from "react";

import { useCreate } from "@/hooks/useCreate";
import Input from "../formElements/Input";
import Button from "../formElements/Button";
import Wrapper from "../uiElements/Wrapper";

import "./Newsletter.scss";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const { isLoading, error, create } = useCreate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || !/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email");
      return;
    }

    await create("/api/newsletter", { email });

    setEmail("");
  };

  return (
    <section id="newsletter" className="newsletter section-padding">
      <Wrapper>
        <h2 className="newsletter__heading">
          Don’t miss our weekly updates about donations
        </h2>
        <form onSubmit={handleSubmit} className="newsletter__row">
          <Input
            ariaLabel="Enroll to newsletter"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={"Enter your email address"}
          />
          <Button
            disabled={isLoading}
            type="submit"
            secondary
            ariaLabel="Confirm email"
          >
            {isLoading ? "Loading..." : "Subscribe"}
          </Button>
        </form>
        {error && <span className="newsletter__error">{error.message}</span>}
        {emailError && <span className="newsletter__error">{emailError}</span>}
      </Wrapper>
    </section>
  );
};

export default Newsletter;
