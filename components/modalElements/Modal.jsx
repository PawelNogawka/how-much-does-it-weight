import React, { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";

import "./Modal.scss";

const Portal = ({ children, setShowModal }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const container = document.querySelector("#overlays");

  return mounted && container ? createPortal(children, container) : null;
};

const Modal = ({ label, title, subtitle, body, footer, setShowModal }) => {
  const [closing, setClosing] = useState(false);

  const handleCloseModal = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setShowModal("");
    }, 300);
  }, [setShowModal]);

  const handleModalClick = (e) => {
    const target = e.target;
    if (target.closest(".modal__inner")) {
      return;
    }
    setShowModal("");
  };

  return (
    <Portal setShowModal={setShowModal}>
      <div
        onClick={handleModalClick}
        className={`modal ${closing ? "modal--closing" : ""}`}
      >
        <div
          className={`modal__inner ${closing ? "modal__inner--closing" : ""}`}
        >
          <header className="modal__header">
            <button
              onClick={handleCloseModal}
              className="modal__close-btn"
              aria-label={`Close ${label} modal`}
            >
              <AiOutlineClose />
            </button>
            <span className="modal__label">{label}</span>
          </header>
          <div className="modal__body">
            <div className="modal__info">
              <h3 className="modal__title">{title}</h3>
              <span className="modal__subtitle">{subtitle}</span>
            </div>
            <div className="modal__body-inner">{body}</div>
          </div>
          <footer className="modal__footer">{footer}</footer>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
