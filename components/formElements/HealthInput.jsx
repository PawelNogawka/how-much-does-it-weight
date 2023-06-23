"use client";
import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";

import "./HealthInput.scss";

const HealthInput = ({ setHealth }) => {
  const [feature, setFeature] = useState({
    title: "",
    desc: "",
  });

  const [featureError, setFeatureError] = useState({
    title: null,
    desc: null,
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (!feature.title.trim()) {
      setFeatureError((prev) => ({
        ...prev,
        title: "Title is required.",
      }));
      return;
    }

    if (!feature.desc.trim()) {
      setFeatureError((prev) => ({
        ...prev,
        desc: "Description is required.",
      }));
      return;
    }

    setHealth((prevHealth) => [
      ...prevHealth,
      { title: feature.title, desc: feature.desc },
    ]);

    setFeature({
      title: "",
      desc: "",
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let error = null;

    if (!value.trim()) {
      error = "Value is required.";
    } else if (name === "title" && value.length < 5) {
      error = "Title must contain at least 5 characters.";
    } else if (name === "desc" && value.length < 20) {
      error = "Description must contain at least 20 characters.";
    }

    setFeatureError((prev) => ({ ...prev, [name]: error }));
    setFeature((prev) => ({ ...prev, [name]: value }));
  };

  const isDisabled =
    Object.values(featureError).some((error) => error !== null) ||
    Object.values(feature).some((value) => value === "");

  return (
    <form onSubmit={handleFormSubmit} className="health-input">
      <Input
        error={featureError.title}
        value={feature.title}
        type="text"
        placeholder="Enter health feature..."
        onChange={handleInputChange}
        label="title"
        name="title"
        id="title"
      />
      <Input
        error={featureError.desc}
        type="textarea"
        placeholder="Describe the health feature..."
        value={feature.desc}
        label="description"
        onChange={handleInputChange}
        name="desc"
        id="desc"
      />
      <Button
        disabled={isDisabled}
        type="submit"
        ariaLabel="Add another health feature"
      >
        add new feature
      </Button>
    </form>
  );
};

export default HealthInput;
