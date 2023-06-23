"use client";

import { useState, useEffect, useRef } from "react";
import { useCreate } from "@/hooks/useCreate";
import { useAuthContext } from "@/hooks/useAuthContext";

import Input from "@/components/formElements/Input";
import Button from "@/components/formElements/Button";

import "./CommentsForm.scss";

const CommentsForm = ({ productId, commentId, setCommentId }) => {
  const emailRegex = /^\S+@\S+\.\S+$/;

  const formRef = useRef(null);

  const [values, setValues] = useState({
    name: "",
    email: "",
    comment: "",
    rate: "",
  });

  const [errors, setErrors] = useState({
    name: null,
    email: null,
    comment: null,
    rate: null,
  });

  const { user } = useAuthContext();
  const { isLoading, create, error } = useCreate();

  useEffect(() => {
    if (commentId && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [commentId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (commentId) {
      let shouldReject =
        (!user &&
          (Object.values(values).some((value) => value.trim() === "") ||
            Object.values(errors).some((error) => error !== null))) ||
        (user && (values.comment.trim() === "" || errors.comment !== null));

      if (!shouldReject) {
        const url = `/api/products/${productId}/comment/${commentId}`;

        let comment = null;

        if (user) {
          comment = {
            text: values.comment,
            date: new Date(),
            creator: {
              id: user._id,
              name: user.username,
              email: user.email,
            },
          };
        } else {
          comment = {
            text: values.comment,
            date: new Date(),
            creator: {
              name: values.name,
              email: values.email,
            },
          };
        }

        await create(url, comment);

        setValues({ name: "", email: "", comment: "", rate: "" });
      }
    } else {
      let shouldReject =
        (!user &&
          (Object.values(values).some((value) => value.trim() === "") ||
            Object.values(errors).some((error) => error !== null))) ||
        (user &&
          (values.rate === "" ||
            values.comment.trim() === "" ||
            errors.rate !== null ||
            errors.comment !== null));

      if (!shouldReject) {
        const url = `/api/products/${productId}/comment`;

        let comment = null;

        if (user) {
          comment = {
            text: values.comment,
            rate: values.rate,
            date: new Date(),
            creator: {
              id: user._id,
              name: user.username,
              email: user.email,
            },
          };
        } else {
          comment = {
            text: values.comment,
            rate: values.rate,
            date: new Date(),
            creator: {
              name: values.name,
              email: values.email,
            },
          };
        }

        await create(url, comment);

        setValues({ name: "", email: "", comment: "", rate: "" });
      }
    }

    let shouldReject =
      (!user &&
        (Object.values(values).some((value) => value.trim() === "") ||
          Object.values(errors).some((error) => error !== null))) ||
      (user &&
        (values.rate === "" ||
          values.comment.trim() === "" ||
          errors.rate !== null ||
          errors.comment !== null));

    if (!shouldReject) {
      const url = `/api/products/${productId}/comment/${"edded"}`;

      let comment = null;

      if (user) {
        comment = {
          text: values.comment,
          rate: values.rate,
          date: new Date(),
          creator: {
            id: user._id,
            name: user.username,
            email: user.email,
          },
        };
      } else {
        comment = {
          text: values.comment,
          rate: values.rate,
          date: new Date(),
          creator: {
            name: values.name,
            email: values.email,
          },
        };
      }

      await create(url, comment);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let error = null;

    if (!value.trim()) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (name === "name" && value.length < 2) {
      error = "Name must have at least 2 characters";
    } else if (name === "email" && !emailRegex.test(values.email)) {
      error = "Enter a correct email";
    } else if (name === "rate") {
      if (isNaN(value)) {
        error = "Rate must be a number";
      } else if (+value > 5 || +value < 1) {
        error = "Rate must be between 1 and 5";
      }
      setValues((prev) => ({ ...prev, [name]: +value }));
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form ref={formRef} onSubmit={handleFormSubmit} className="comments-form">
      <h3 className="comments-form__heading">
        {commentId ? "Reply to Comment" : "Write a Comment"}
      </h3>

      {!user && (
        <div className="comments-form__row">
          <Input
            type="text"
            name="name"
            id="name"
            label="Name"
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
          {!commentId && (
            <Input
              type="text"
              name="rate"
              id="rate"
              label="Rate"
              placeholder="Rate this product from 1 to 5"
              ariaLabel="Rate this product from 1 to 5"
              onChange={handleInputChange}
              error={errors.rate}
              value={values.rate}
            />
          )}
        </div>
      )}

      {user && !commentId && (
        <div className="comments-form__rate">
          <Input
            type="text"
            name="rate"
            id="rate"
            label="Rate"
            placeholder="Rate this product from 1 to 5"
            ariaLabel="Rate this product from 1 to 5"
            onChange={handleInputChange}
            error={errors.rate}
            value={values.rate}
          />
        </div>
      )}

      <Input
        type="textarea"
        error={errors.comment}
        value={values.comment}
        onChange={handleInputChange}
        ariaLabel="Enter a comment"
        id="comment"
        name="comment"
        placeholder="Leave a comment"
        label="Comment"
      />

      <div className="comments-form__btns">
        <Button
          type="submit"
          disabled={
            (!user &&
              !commentId &&
              (Object.values(values).some((value) => value.trim() === "") ||
                Object.values(errors).some((error) => error !== null))) ||
            (user &&
              !commentId &&
              (values.rate === "" ||
                values.comment.trim() === "" ||
                errors.rate !== null ||
                errors.comment !== null))
          }
          secondary
          ariaLabel="Post a comment"
        >
          {isLoading ? "Loading..." : commentId ? "Reply" : "Post a Comment"}
        </Button>

        {commentId && (
          <Button
            onClick={() => setCommentId(null)}
            ariaLabel="Back to write a new comment"
          >
            WRITE NEW
          </Button>
        )}
      </div>

      {error && <span className="comments-form__error">{error}</span>}
    </form>
  );
};

export default CommentsForm;
