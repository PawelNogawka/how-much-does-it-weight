"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import { useAuthContext } from "@/hooks/useAuthContext";
import { useDelete } from "@/hooks/useDelete";

import { AiFillDelete } from "@react-icons/all-files/ai/AiFillDelete";
import { FaPencilAlt } from "@react-icons/all-files/fa/FaPencilAlt";

import Diagram from "../sharedElements/Diagram";
import Ingredients from "../sharedElements/Ingredients";
import ConfirmModal from "../sharedElements/ConfirmModal";

import "./Pin.scss";

const Pin = ({ pin, setShowEditModal }) => {
  const { title, image, category, nutrition, _id, photoEnergy, creator } = pin;

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const router = useRouter();
  const { user } = useAuthContext();
  const { deleteItem, isLoading, error } = useDelete();

  const handlePinClick = (e) => {
    const target = e.target;
    if (target.closest(".pin__user-btn")) {
      return;
    }
    router.push(`/products/${_id}`);
  };

  const handleDeleteButtonClick = (e) => {
    e.stopPropagation();
    setShowConfirmModal(true);
  };

  const handleEditButtonClick = (e) => {
    e.stopPropagation();
    setShowEditModal(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (user?._id !== creator) return;

    await deleteItem(`/api/products/${_id}/delete/${user._id}`);

    setShowConfirmModal(false);
  };

  return (
    <>
      {showConfirmModal && (
        <ConfirmModal
          onSubmit={handleFormSubmit}
          setShowModal={setShowConfirmModal}
          title="Are you sure to delete this product?"
          isLoading={isLoading}
          error={error}
        />
      )}
      <li onClick={handlePinClick} className="pin">
        {user && user?._id === creator && (
          <div className="pin__btns">
            <button
              onClick={handleDeleteButtonClick}
              className="pin__user-btn pin__user-btn--delete"
              aria-label="Delete product"
            >
              <AiFillDelete size={20} />
            </button>
            <button
              onClick={handleEditButtonClick}
              className="pin__user-btn pin__user-btn--edit"
              aria-label="Edit product"
            >
              <FaPencilAlt size={17} />
            </button>
          </div>
        )}
        <div className="pin__portion">
          <span className="pin__portion-txt">{`${image.amount} g on the photo`}</span>
        </div>
        <Image src={image.photo} alt={title} width={300} height={300} />

        <div className="pin__bottom">
          <b className="pin__category">{category}</b>
          <div className="pin__row">
            <h3 className="pin__title">{title}</h3>
            <Ingredients
              title={`${image.amount} g of products contains`}
              nutrition={nutrition.photoWeight}
              small
            />
          </div>

          <Diagram energy={photoEnergy?.amount} userBmr={user?.bmr} />
        </div>
      </li>
    </>
  );
};

export default Pin;
