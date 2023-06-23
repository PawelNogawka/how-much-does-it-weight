import React from "react";

import "./FeatureBox.scss";

const FeatureBox = ({ icon, title, desc }) => {
  return (
    <li className="feature">
      <div className="feature__left">{icon}</div>
      <div className="feature__right">
        <h3 className="feature__title">{title}</h3>
        <p className="feature__desc">{desc}</p>
      </div>
    </li>
  );
};

export default FeatureBox;
