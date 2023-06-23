"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";

import Button from "../formElements/Button";

import "./ConfirmModal.scss";

const Portal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const container = document.querySelector("#overlays");

  return mounted && container ? createPortal(children, container) : null;
};

const ConfirmModal = ({ title, onSubmit, setShowModal, isLoading, error }) => {
  return (
    <Portal>
      <form onSubmit={onSubmit} className="confirm-modal">
        <button
          type="button"
          onClick={() => setShowModal(false)}
          className="confirm-modal__close-btn"
          aria-label="Cancel and close modal"
        >
          <AiOutlineClose />
        </button>
        <h3 className="confirm-modal__title">{title}</h3>
        <div className="confirm-modal__btns">
          <Button
            disabled={isLoading}
            type="submit"
            secondary
            ariaLabel="Confirm"
          >
            {isLoading ? "loading..." : "confirm"}
          </Button>
          <Button
            onClick={() => setShowModal(false)}
            dark
            ariaLabel="Cancel and close modal"
            disabled={isLoading}
          >
            cancel
          </Button>
        </div>
        {error && <span className="confirm-modal__error">{error.message}</span>}
      </form>
    </Portal>
  );
};

export default ConfirmModal;
