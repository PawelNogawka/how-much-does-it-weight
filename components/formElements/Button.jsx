import React from "react";
import Link from "next/link";

import "./Button.scss";

const Button = ({
  onClick,
  to,
  outline,
  empty,
  children,
  ariaLabel,
  disabled,
  type,
  dark,
  white,
  small,
  secondary,
}) => {
  if (to) {
    return (
      <Link
        href={to}
        aria-label={ariaLabel}
        className={`btn ${outline ? "btn--outline" : ""} ${
          dark ? "btn--dark" : ""
        } ${empty ? "btn--empty" : ""} ${disabled ? "btn--disabled" : ""} ${
          small ? "btn--small" : ""
        } ${secondary ? "btn--secondary" : ""} ${white ? "btn--white" : ""}`}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className={`btn ${outline ? "btn--outline" : ""} ${
          dark ? "btn--dark" : ""
        } ${empty ? "btn--empty" : ""} ${disabled ? "btn--disabled" : ""} ${
          small ? "btn--small" : ""
        } ${secondary ? "btn--secondary" : ""} ${white ? "btn--white" : ""}`}
        type={type || "button"}
        aria-label={ariaLabel}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
};

export default Button;
