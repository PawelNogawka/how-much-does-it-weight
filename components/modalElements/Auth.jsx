"use client";

import React, { useState } from "react";
import Link from "next/link";

import { GiCastle } from "@react-icons/all-files/gi/GiCastle";

import { useRegister } from "@/hooks/useRegister";
import { useLogin } from "@/hooks/useLogin";

import Modal from "./Modal";
import Input from "../formElements/Input";
import Button from "../formElements/Button";
import PhotoInput from "../formElements/PhotoInput";

import "./Auth.scss";

const Auth = ({ setShowModal, mode }) => {
  const [modalMode, setModalMode] = useState(mode);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmedPassword: "",
    photo: "",
    gender: "male",
    age: "",
    weight: "",
    height: "",
    activity: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    password: null,
    confirmedPassword: null,
    photo: null,
    gender: null,
    age: null,
    weight: null,
    height: null,
    activity: null,
  });

  const {
    error: registerError,
    isLoading: isRegisterLoading,
    register,
  } = useRegister();

  const { error: loginError, isLoading: isLoginLoading, login } = useLogin();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    setErrors({
      name: null,
      email: null,
      password: null,
      confirmedPassword: null,
      photo: null,
      gender: null,
      age: null,
      weight: null,
      height: null,
      activity: null,
    });

    let shouldSubmit = true;

    const emailRegex = /^\S+@\S+\.\S+$/;

    if (errors.photo !== null) {
      shouldSubmit = false;
    }

    if (!values.email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
      shouldSubmit = false;
    } else if (!emailRegex.test(values.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email address.",
      }));
      shouldSubmit = false;
    }

    if (!values.password.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
      shouldSubmit = false;
    }

    if (values.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long.",
      }));
      shouldSubmit = false;
    }

    if (mode === "login") {
      if (shouldSubmit) {
        await login({
          email: values.email,
          password: values.password,
        });
      }
      setShowModal("");
      return;
    }

    if (!values.name.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name is required.",
      }));
      shouldSubmit = false;
    }

    if (!values.confirmedPassword.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmedPassword: "Confirmed is required.",
      }));
      shouldSubmit = false;
    }

    if (values.confirmedPassword !== values.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmedPassword: "Passwords don't match.",
      }));
      shouldSubmit = false;
    }

    if (!values.gender.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        gender: "Gender is required.",
      }));
      shouldSubmit = false;
    }

    if (!values.age.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "Age is required.",
      }));
      shouldSubmit = false;
    } else if (isNaN(values.age) || values.age <= 0 || values.age > 115) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "Invalid age.",
      }));
      shouldSubmit = false;
    }

    if (!values.weight.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        weight: "Weight is required.",
      }));
      shouldSubmit = false;
    } else if (
      isNaN(values.weight) ||
      values.weight <= 0 ||
      values.weight > 300
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        weight: "Invalid weight.",
      }));
      shouldSubmit = false;
    }

    if (!values.height.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        height: "Height is required.",
      }));
      shouldSubmit = false;
    } else if (
      isNaN(values.height) ||
      values.height <= 0 ||
      values.height > 250
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        height: "Invalid height.",
      }));
      shouldSubmit = false;
    }

    if (!values.activity.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        activity: "Activity level is required.",
      }));
      shouldSubmit = false;
    } else if (
      isNaN(values.activity) ||
      values.activity < 1 ||
      values.activity > 2
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        activity: "Invalid activity.",
      }));
      shouldSubmit = false;
    }

    if (shouldSubmit) {
      const response = await register({
        ...values,
        age: parseInt(values.age),
        weight: parseFloat(values.weight),
        height: parseFloat(values.height),
        activity: parseFloat(values.activity),
      });

      if (response && response.statusText == "OK") {
        setShowModal("");
      }
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let error = null;

    if (name === "name" && !value.trim()) {
      error = "Name is required.";
    } else if (name === "email") {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!value.trim()) {
        error = "Email is required.";
      } else if (!emailRegex.test(value)) {
        error = "Invalid email address.";
      }
    } else if (name === "password") {
      if (!value.trim()) {
        error = "Password is required.";
      } else if (value.length < 6) {
        error = "Password must be at least 6 characters long.";
      }
    } else if (name === "confirmedPassword") {
      if (!value.trim()) {
        error = "Confirmed password is required.";
      } else if (value !== values.password) {
        error = "Passwords don't match.";
      }
    } else if (name === "height") {
      if (!value.trim()) {
        error = "Height is required.";
      } else if (isNaN(parseFloat(value))) {
        error = "Height must be a number.";
      } else if (value < 70 || value > 250) {
        error = "Height must be between 70 and 250.";
      }
    } else if (name === "weight") {
      if (!value.trim()) {
        error = "Weight is required.";
      } else if (isNaN(parseFloat(value))) {
        error = "Weight must be a number.";
      } else if (value < 30 || value > 300) {
        error = "Weight must be between 30 and 300.";
      }
    } else if (name === "age") {
      if (!value.trim()) {
        error = "Age is required.";
      } else if (isNaN(parseFloat(value))) {
        error = "Age must be a number.";
      } else if (value < 8 || value > 115) {
        error = "Age must be between 8 and 115.";
      }
    } else if (name === "activity") {
      if (!value.trim()) {
        error = "Activity is required.";
      } else if (isNaN(parseFloat(value))) {
        error = "Activity must be a number.";
      } else if (value < 1 || value > 2) {
        error = "Activity must be between '1' and '2'.";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleClearButtonClick = () => {
    setErrors({
      name: null,
      email: null,
      password: null,
      confirmedPassword: null,
      photo: null,
      gender: null,
      age: null,
      weight: null,
      height: null,
      activity: null,
    });

    setValues({
      name: "",
      email: "",
      password: "",
      confirmedPassword: "",
      photo: "",
      gender: "",
      age: 0,
      weight: 0,
      height: 0,
      activity: 0,
    });
  };

  const handleModeLinkClick = () => {
    if (modalMode == "login") {
      setModalMode("register");
    } else if (modalMode == "register") {
      setModalMode("login");
    }
  };

  const body = (
    <form onSubmit={handleFormSubmit} className="auth">
      {modalMode == "register" && (
        <>
          <h3 className="auth__step-heading">1. Lets add some basic data</h3>
          <div className="auth__input-group">
            <Input
              type="text"
              name="name"
              id="name"
              label="Name:"
              placeholder="Enter your name..."
              ariaLabel="Enter your name"
              onChange={handleInputChange}
              error={errors.name}
              value={values.name}
            />
            <Input
              type="email"
              name="email"
              id="email"
              label="Email"
              placeholder="Enter your email..."
              ariaLabel="Enter your email"
              onChange={handleInputChange}
              error={errors.email}
              value={values.email}
            />
          </div>
          <div className="auth__input-group">
            <Input
              type="password"
              name="password"
              id="password"
              label="Password"
              placeholder="Enter your password..."
              ariaLabel="Enter your password"
              value={values.password}
              error={errors.password}
              onChange={handleInputChange}
            />
            <Input
              type="password"
              name="confirmedPassword"
              id="confirm-password"
              label="Confirm password"
              placeholder="Confirm your password..."
              ariaLabel="Confirm your password"
              value={values.confirmedPassword}
              error={errors.confirmedPassword}
              onChange={handleInputChange}
            />
          </div>
          <div className="auth__select">
            <label htmlFor="gender" className="auth__select-label">
              Gender
            </label>
            <select
              value={values.gender}
              onChange={handleInputChange}
              name="gender"
              id="gender"
              className="auth__select-form"
            >
              <option value="male">male</option>
              <option value="female">female</option>
            </select>
          </div>
          <h3 className="auth__step-heading">
            2. Lets calculate your caloric needs
          </h3>
          <div className="auth__input-group">
            <Input
              type="text"
              name="age"
              id="age"
              label="your age"
              placeholder="25"
              ariaLabel="Enter your age"
              onChange={handleInputChange}
              error={errors.age}
              value={values.age}
            />
            <Input
              type="text"
              name="weight"
              id="weight"
              label="Your weight (kg)"
              placeholder="96"
              ariaLabel="Enter your email"
              onChange={handleInputChange}
              error={errors.weight}
              value={values.weight}
            />
          </div>
          <div className="auth__input-group">
            <Input
              type="text"
              name="height"
              id="height"
              label="your height (cm)"
              placeholder="187"
              ariaLabel="Enter your age"
              onChange={handleInputChange}
              error={errors.height}
              value={values.height}
            />
            <Input
              type="text"
              name="activity"
              id="activity"
              label="Your activity"
              placeholder="1.2"
              ariaLabel="Enter your activity"
              onChange={handleInputChange}
              error={errors.activity}
              value={values.activity}
            />
          </div>
          <h3 className="auth__step-heading">
            3. Lets add your photo <span> (You may ommit this step)</span>
          </h3>
          <PhotoInput
            setValues={setValues}
            values={values}
            label={"photo"}
            errors={errors}
            setErrors={setErrors}
          />
          {errors.photo && <span className="auth__error">{errors.photo}</span>}
        </>
      )}
      {modalMode == "login" && (
        <>
          <Input
            type="email"
            name="email"
            id="email"
            label="Email"
            placeholder="Enter your email..."
            ariaLabel="Enter your email"
            onChange={handleInputChange}
            error={errors.email}
            value={values.email}
          />
          <Input
            type="password"
            name="password"
            id="password"
            label="Password"
            placeholder="Enter your password..."
            ariaLabel="Enter your password"
            value={values.password}
            error={errors.password}
            onChange={handleInputChange}
          />
        </>
      )}
      {loginError && <span className="auth__error">{loginError.message}</span>}
      {registerError && (
        <span className="auth__error">{registerError.message}</span>
      )}

      <div className="auth__btns">
        <Button
          secondary
          disabled={isLoginLoading || isRegisterLoading}
          type="submit"
          ariaLabel="Continue to photo upload"
        >
          {!isLoginLoading && !isRegisterLoading ? "Continue" : "Loading..."}
        </Button>
        <Button
          dark
          onClick={handleClearButtonClick}
          outline
          ariaLabel="Clear the form"
        >
          Clear form
        </Button>
      </div>
    </form>
  );

  const footer = (
    <>
      <div className="auth__footer-bottom">
        <Link href="/" className="auth__logo" aria-label="Back to home">
          <GiCastle />
        </Link>
        <button
          onClick={handleModeLinkClick}
          className="auth__change-link"
          aria-label="Go to login"
        >
          {modalMode == "login"
            ? "Don't have an account? register"
            : "Have an account? login"}
        </button>
        <Link
          href="/"
          className="auth__footer-link"
          aria-label="Go to terms and conditions"
        >
          Terms and Conditions
        </Link>
      </div>
    </>
  );

  return (
    <Modal
      body={body}
      footer={footer}
      label={modalMode == "login" ? "Login" : "Register"}
      title={
        modalMode == "login" ? "Log in to your account" : "Create an account"
      }
      subtitle={
        modalMode === "login"
          ? "Log in and Discover your dream rental apartment hassle-free!"
          : "Register and Discover your dream rental apartment hassle-free!"
      }
      setShowModal={setShowModal}
    />
  );
};

export default Auth;
