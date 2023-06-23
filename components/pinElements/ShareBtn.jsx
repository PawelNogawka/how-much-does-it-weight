import React from "react";
import { AiOutlineShareAlt } from "@react-icons/all-files/ai/AiOutlineShareAlt";

import "./ShareBtn.scss";

const ShareBtn = () => {
  return (
    <button aria-label="share this article" className="share-btn">
      <AiOutlineShareAlt />
    </button>
  );
};

export default ShareBtn;
