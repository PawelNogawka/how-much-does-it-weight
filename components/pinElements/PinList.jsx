"use client";

import React, { useState, useRef, useEffect } from "react";
import Pin from "./Pin";
import Rent from "../modalElements/Rent";
import Pagination from "../uiElements/Pagination";

const PinList = ({ pins }) => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pinsPerPage, setPinsPerPage] = useState(6);

  const mainRef = useRef(null);

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
  }, []);

  const lastPinIndex = currentPage * pinsPerPage;
  const firstPinIndex = lastPinIndex - pinsPerPage;
  const currentPins = pins.slice(firstPinIndex, lastPinIndex);

  const updatePage = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <ul ref={mainRef} className="pin-list">
        {currentPins.map((pin) => (
          <React.Fragment key={pin}>
            {showModal && (
              <Rent setShowModal={setShowModal} mode="edit" product={pin} />
            )}
            <Pin pin={pin} setShowEditModal={setShowModal} />
          </React.Fragment>
        ))}
      </ul>
      {pins.length > pinsPerPage && (
        <Pagination
          totalPosts={pins.length}
          postsPerPage={pinsPerPage}
          setCurrentPage={updatePage}
          currentPage={currentPage}
        />
      )}
    </>
  );
};

export default PinList;
