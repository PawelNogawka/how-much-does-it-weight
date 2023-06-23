"use client";
import React, { useState } from "react";

import "./Input.scss";

const Input = ({
  type,
  name,
  id,
  label,
  placeholder,
  ariaLabel,
  value,
  onChange,
  error,
  required,
  sufiks,
  disabled,
  outline,
}) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    setFocused(false);
  };

  return (
    <div className="input">
      {label && (
        <label htmlFor={id} className="input__label">
          {label}
        </label>
      )}

      {sufiks && !error && focused && (
        <span className="input__sufiks">{sufiks}</span>
      )}

      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          disbaled={disabled ? disabled : false}
          placeholder={!focused && error ? error : placeholder}
          aria-label={ariaLabel}
          className={
            !focused && error
              ? "input__input input__input--error"
              : "input__input"
          }
          value={error !== null && !focused ? error : value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          spellCheck={error ? false : true}
        />
      ) : (
        <input
          type={error ? "text" : type}
          id={id}
          name={name}
          disbaled={disabled ? disabled : false}
          aria-label={ariaLabel}
          value={error !== null && !focused ? error : value}
          onChange={onChange}
          placeholder={!focused && error ? error : placeholder}
          className={
            !focused && error
              ? "input__input input__input--error"
              : "input__input"
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required ? true : false}
        />
      )}
    </div>
  );
};

export default Input;
